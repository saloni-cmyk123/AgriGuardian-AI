from contextlib import asynccontextmanager
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings
from app.database.mongodb import connect_to_mongo, close_mongo_connection
from app.middleware.logging_middleware import RequestLoggingMiddleware
from app.middleware.rate_limiter import limiter, SLOWAPI_AVAILABLE
from app.utils.exceptions import (
    AgriGuardianException,
    agriguardian_exception_handler,
    generic_exception_handler,
)
from app.utils.logger import logger
from app.api.router import api_router

if SLOWAPI_AVAILABLE:
    from slowapi import _rate_limit_exceeded_handler
    from slowapi.errors import RateLimitExceeded

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing AgriGuardian AI Backend Service...")
    await connect_to_mongo()
    yield
    logger.info("Shutting down AgriGuardian AI Backend Service...")
    await close_mongo_connection()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Enterprise-Grade AI-Powered Agricultural Intelligence Platform Backend API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan
)

# Rate Limiter State Setup
if SLOWAPI_AVAILABLE and limiter:
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Custom Exception Handlers
app.add_exception_handler(AgriGuardianException, agriguardian_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

# Middlewares
app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API v1 Router
app.include_router(api_router)

@app.get("/", tags=["Health Check"])
async def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health", tags=["Health Check"])
async def health_check():
    return {
        "status": "healthy",
        "database": "connected"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

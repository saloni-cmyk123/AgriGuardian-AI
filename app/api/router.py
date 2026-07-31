from fastapi import APIRouter
from app.api.routes import (
    auth,
    users,
    farms,
    crops,
    disease,
    weather,
    market,
    agritwin,
    national_intelligence,
    schemes,
    chatbot,
    predictions,
)

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(farms.router)
api_router.include_router(crops.router)
api_router.include_router(disease.router)
api_router.include_router(weather.router)
api_router.include_router(market.router)
api_router.include_router(agritwin.router)
api_router.include_router(national_intelligence.router)
api_router.include_router(schemes.router)
api_router.include_router(chatbot.router)
api_router.include_router(predictions.router)

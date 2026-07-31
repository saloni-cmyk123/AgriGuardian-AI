import os
from typing import List, Union
from pydantic_settings import BaseSettings
from pydantic import field_validator

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgriGuardian AI Backend"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Database
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "agriguardian_db"

    # JWT Authentication
    JWT_SECRET_KEY: str = "super-secret-jwt-key-agriguardian-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    # CORS Configuration
    ALLOWED_ORIGINS: Union[str, List[str]] = "*"

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: str = "60/minute"

    # External APIs
    WEATHER_API_KEY: str = "mock-weather-key"
    MARKET_API_KEY: str = "mock-market-key"

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            if v == "*":
                return ["*"]
            return [i.strip() for i in v.split(",")]
        return v

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

settings = Settings()

from fastapi import APIRouter, Query, Depends
from app.models.weather import WeatherObservation, WeatherForecastResponse
from app.models.common import APIResponse
from app.services.weather_service import WeatherService
from app.utils.security import get_current_user

router = APIRouter(prefix="/weather", tags=["Weather Intelligence"])

@router.get("/current", response_model=APIResponse[WeatherObservation])
async def get_current_weather(
    lat: float = Query(..., ge=-90.0, le=90.0),
    lon: float = Query(..., ge=-180.0, le=180.0),
    current_user: dict = Depends(get_current_user)
):
    """
    Get real-time weather observations for given latitude and longitude.
    """
    observation = await WeatherService.get_current_weather(lat, lon)
    return APIResponse(data=observation)

@router.get("/forecast", response_model=APIResponse[WeatherForecastResponse])
async def get_weather_forecast(
    lat: float = Query(..., ge=-90.0, le=90.0),
    lon: float = Query(..., ge=-180.0, le=180.0),
    current_user: dict = Depends(get_current_user)
):
    """
    Get 3-day weather forecast with agricultural advisories.
    """
    forecast = await WeatherService.get_forecast(lat, lon)
    return APIResponse(data=forecast)

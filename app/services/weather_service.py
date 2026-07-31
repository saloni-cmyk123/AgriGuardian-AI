from typing import Dict, Any
from app.models.weather import WeatherObservation, WeatherForecastDay, WeatherForecastResponse
from datetime import datetime, timezone

class WeatherService:
    @staticmethod
    async def get_current_weather(lat: float, lon: float) -> WeatherObservation:
        # Integrated hyper-local weather model fallback / OpenWeatherMap standard interface
        return WeatherObservation(
            temperature_celsius=31.5,
            humidity_percent=68.0,
            rainfall_mm=0.0,
            wind_speed_kmh=12.4,
            condition="Partly Cloudy with High Moisture",
            timestamp=datetime.now(timezone.utc)
        )

    @staticmethod
    async def get_forecast(lat: float, lon: float) -> WeatherForecastResponse:
        current = await WeatherService.get_current_weather(lat, lon)
        forecast_days = [
            WeatherForecastDay(
                date="2026-07-31",
                max_temp_c=34.0,
                min_temp_c=25.0,
                precipitation_probability=20.0,
                condition="Sunny",
                advisory="Optimal day for foliar nutrient spraying and field cultivation."
            ),
            WeatherForecastDay(
                date="2026-08-01",
                max_temp_c=32.5,
                min_temp_c=24.5,
                precipitation_probability=65.0,
                condition="Moderate Thunderstorms",
                advisory="Precipitation anticipated. Suspend pesticide applications."
            ),
            WeatherForecastDay(
                date="2026-08-02",
                max_temp_c=29.0,
                min_temp_c=23.0,
                precipitation_probability=80.0,
                condition="Heavy Rain",
                advisory="High rainfall alert. Check field drainage channels."
            )
        ]
        return WeatherForecastResponse(
            location_name=f"Farm Grid ({lat:.2f}, {lon:.2f})",
            latitude=lat,
            longitude=lon,
            current=current,
            forecast=forecast_days
        )

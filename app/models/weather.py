from datetime import datetime, timezone
from typing import List, Optional
from pydantic import BaseModel, Field

class WeatherObservation(BaseModel):
    temperature_celsius: float
    humidity_percent: float
    rainfall_mm: float
    wind_speed_kmh: float
    condition: str = Field(..., example="Sunny / Heavy Rain / High Humidity")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class WeatherForecastDay(BaseModel):
    date: str
    max_temp_c: float
    min_temp_c: float
    precipitation_probability: float
    condition: str
    advisory: str

class WeatherForecastResponse(BaseModel):
    location_name: str
    latitude: float
    longitude: float
    current: WeatherObservation
    forecast: List[WeatherForecastDay]

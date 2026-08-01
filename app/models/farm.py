from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class LocationCoordinates(BaseModel):
    latitude: float = Field(..., ge=-90.0, le=90.0)
    longitude: float = Field(..., ge=-180.0, le=180.0)

class SoilProfile(BaseModel):
    soil_type: str = Field(..., example="Alluvial / Black Soil")
    ph_level: Optional[float] = Field(default=6.5, ge=0.0, le=14.0)
    nitrogen_level: Optional[float] = Field(default=140.0, description="mg/kg")
    phosphorus_level: Optional[float] = Field(default=35.0, description="mg/kg")
    potassium_level: Optional[float] = Field(default=200.0, description="mg/kg")

class FarmCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    location: LocationCoordinates
    total_area_acres: float = Field(..., gt=0.0)
    irrigation_source: str = Field(..., example="Canal / Drip / Rainfed")
    soil: SoilProfile

class FarmResponse(BaseModel):
    id: str
    owner_id: str
    name: str
    location: LocationCoordinates
    total_area_acres: float
    irrigation_source: str
    soil: SoilProfile
    health_status: Optional[str] = Field(default="OPTIMAL", example="OPTIMAL / WARNING / CRITICAL")
    latest_disease_report: Optional[Dict[str, Any]] = None
    created_at: datetime

class FarmModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    owner_id: str
    name: str
    location: LocationCoordinates
    total_area_acres: float
    irrigation_source: str
    soil: SoilProfile
    health_status: Optional[str] = "OPTIMAL"
    latest_disease_report: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


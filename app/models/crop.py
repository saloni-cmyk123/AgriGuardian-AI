from datetime import datetime, timezone
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field

class CropGrowthStage(str, Enum):
    GERMINATION = "germination"
    VEGETATIVE = "vegetative"
    FLOWERING = "flowering"
    MATURITY = "maturity"
    HARVESTED = "harvested"

class CropCreate(BaseModel):
    farm_id: str
    crop_name: str = Field(..., example="Wheat / Rice / Cotton")
    variety: str = Field(..., example="HD-2967 / Basmati")
    area_allocated_acres: float = Field(..., gt=0.0)
    sowing_date: datetime
    expected_harvest_date: datetime
    growth_stage: CropGrowthStage = CropGrowthStage.VEGETATIVE

class CropResponse(BaseModel):
    id: str
    farm_id: str
    crop_name: str
    variety: str
    area_allocated_acres: float
    sowing_date: datetime
    expected_harvest_date: datetime
    growth_stage: CropGrowthStage
    created_at: datetime

class CropModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    farm_id: str
    crop_name: str
    variety: str
    area_allocated_acres: float
    sowing_date: datetime
    expected_harvest_date: datetime
    growth_stage: CropGrowthStage = CropGrowthStage.VEGETATIVE
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

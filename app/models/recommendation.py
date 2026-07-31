from datetime import datetime, timezone
from typing import Optional, List
from pydantic import BaseModel, Field
from app.models.common import XAIResponseModel

class RecommendationType(str):
    IRRIGATION = "irrigation"
    FERTILIZER = "fertilizer"
    PEST_ALERT = "pest_alert"
    MARKET_ADVISORY = "market_advisory"

class RecommendationModel(XAIResponseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    farm_id: str
    category: str = Field(..., example="Irrigation Schedule / Fertilizer Advisory")
    priority: str = Field(..., example="High / Medium / Low")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

from datetime import datetime, timezone
from typing import List, Optional
from pydantic import BaseModel, Field
from app.models.common import XAIResponseModel

class GovernmentSchemeModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    scheme_name: str
    scheme_code: str
    description: str
    sponsoring_agency: str = Field(..., example="Central Government / PM-KISAN")
    eligible_states: List[str]
    max_land_area_acres: Optional[float] = None
    financial_benefit_amount: str
    official_portal_url: str

class SchemeMatchResult(XAIResponseModel):
    scheme_id: str
    scheme_name: str
    sponsoring_agency: str
    financial_benefit_amount: str
    match_score: float
    official_portal_url: str

class SchemeRecommendationResponse(BaseModel):
    total_eligible_schemes: int
    recommended_schemes: List[SchemeMatchResult]

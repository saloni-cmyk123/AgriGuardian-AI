from datetime import datetime, timezone
from typing import Optional, List
from pydantic import BaseModel, Field
from app.models.common import XAIResponseModel

class DiseaseDiagnosisRequest(BaseModel):
    farm_id: str
    crop_name: str
    symptoms_description: str = Field(..., example="Yellowing leaves with brown spots on the underside")
    image_url: Optional[str] = Field(default=None, example="https://example.com/leaf.jpg")

class DiseaseDiagnosisResponse(XAIResponseModel):
    diagnosis_id: str
    disease_detected: str
    severity_level: str = Field(..., example="Moderate / High")
    organic_remedies: List[str]
    chemical_treatments: List[str]
    created_at: datetime

class DiseaseLogModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    farm_id: str
    crop_name: str
    symptoms_description: str
    image_url: Optional[str] = None
    disease_detected: str
    severity_level: str
    explanation: str
    confidence_score: float
    possible_risks: List[str]
    recommended_action: List[str]
    organic_remedies: List[str]
    chemical_treatments: List[str]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

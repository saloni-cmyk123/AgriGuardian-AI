from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from app.models.common import XAIResponseModel

class AffectedRegion(BaseModel):
    box: List[int] = Field(..., description="[x, y, width, height] bounding coordinates")
    region_name: str = Field(..., example="Leaf Lesion Cluster")
    lesion_severity: str = Field(..., example="High")
    confidence: float = Field(..., ge=0.0, le=1.0)

class SuitableMedicine(BaseModel):
    chemical: List[str] = Field(default_factory=list, example=["Propiconazole 25% EC @ 1ml/L"])
    organic: List[str] = Field(default_factory=list, example=["Neem oil (5ml/L) spray"])

class DiseaseDiagnosisRequest(BaseModel):
    farm_id: Optional[str] = Field(default=None, example="60d5ecf9b3f1a23456789abc")
    crop_name: Optional[str] = Field(default="Wheat", example="Wheat")
    symptoms_description: Optional[str] = Field(default="", example="Yellowing leaves with brown spots")
    image_url: Optional[str] = Field(default=None, example="https://example.com/leaf.jpg")
    image_base64: Optional[str] = Field(default=None, description="Base64 encoded crop image data string")

class DiseaseDiagnosisResponse(XAIResponseModel):
    diagnosis_id: str
    disease_detected: str = Field(..., example="Wheat Yellow Rust (Puccinia striiformis)")
    severity_level: str = Field(..., example="High")
    affected_regions: List[AffectedRegion] = Field(default_factory=list)
    highlighted_image_url: Optional[str] = Field(default=None, description="Visual heatmap/overlay of leaf lesions")
    suitable_medicine: SuitableMedicine
    treatment_steps: List[str] = Field(default_factory=list)
    preventive_measures: List[str] = Field(default_factory=list)
    organic_remedies: List[str] = Field(default_factory=list)
    chemical_treatments: List[str] = Field(default_factory=list)
    farm_id: Optional[str] = None
    crop_name: str = "Crop"
    created_at: datetime

class DiseaseLogModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    user_id: str
    farm_id: Optional[str] = None
    crop_name: str
    symptoms_description: str
    image_url: Optional[str] = None
    disease_detected: str
    severity_level: str
    confidence_score: float
    explanation: str
    affected_regions: List[Dict[str, Any]] = Field(default_factory=list)
    highlighted_image_url: Optional[str] = None
    suitable_medicine: Dict[str, List[str]] = Field(default_factory=dict)
    treatment_steps: List[str] = Field(default_factory=list)
    preventive_measures: List[str] = Field(default_factory=list)
    possible_risks: List[str] = Field(default_factory=list)
    recommended_action: List[str] = Field(default_factory=list)
    organic_remedies: List[str] = Field(default_factory=list)
    chemical_treatments: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


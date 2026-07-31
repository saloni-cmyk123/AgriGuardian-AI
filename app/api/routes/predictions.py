from typing import Dict, Any
from fastapi import APIRouter, Query, Depends
from app.models.common import APIResponse
from app.ai.yield_predictor import yield_predictor_engine
from app.ai.pest_predictor import pest_predictor_engine
from app.utils.security import get_current_user

router = APIRouter(prefix="/predict", tags=["Predictive Analytics (Yield & Pest)"])

@router.post("/yield", response_model=APIResponse[Dict[str, Any]])
async def predict_crop_yield(
    crop_name: str = Query(..., description="Crop name e.g. Wheat"),
    variety: str = Query(..., description="Crop variety e.g. HD-2967"),
    allocated_acres: float = Query(..., gt=0.0, description="Allocated area in acres"),
    soil_type: str = Query(default="Alluvial"),
    irrigation_type: str = Query(default="Drip Irrigation"),
    current_user: dict = Depends(get_current_user)
):
    """
    Predict crop harvest yield with Explainable AI rationale and risk analysis.
    """
    result = await yield_predictor_engine.predict_yield(
        crop_name=crop_name,
        variety=variety,
        allocated_acres=allocated_acres,
        soil_type=soil_type,
        irrigation_type=irrigation_type
    )
    return APIResponse(message="Yield prediction completed", data=result)

@router.post("/pest-risk", response_model=APIResponse[Dict[str, Any]])
async def predict_pest_risk(
    crop_name: str = Query(..., description="Crop name e.g. Paddy Rice"),
    humidity: float = Query(..., ge=0.0, le=100.0, description="Relative humidity percent"),
    temperature: float = Query(..., ge=-10.0, le=60.0, description="Temperature in celsius"),
    growth_stage: str = Query(default="Vegetative"),
    current_user: dict = Depends(get_current_user)
):
    """
    Predict pest outbreak risks based on humidity, temperature, and crop vulnerability.
    """
    result = await pest_predictor_engine.predict_pest_risk(
        crop_name=crop_name,
        humidity=humidity,
        temperature=temperature,
        growth_stage=growth_stage
    )
    return APIResponse(message="Pest risk assessment completed", data=result)

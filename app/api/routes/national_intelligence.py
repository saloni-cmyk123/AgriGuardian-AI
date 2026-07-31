from typing import Dict, Any
from fastapi import APIRouter, Query, Depends
from app.models.common import APIResponse
from app.ai.national_intel import national_intel_engine
from app.utils.security import get_current_user

router = APIRouter(prefix="/national-intel", tags=["National Crop Intelligence"])

@router.get("/summary", response_model=APIResponse[Dict[str, Any]])
async def get_national_intelligence_summary(
    state: str = Query(..., description="State name e.g. Punjab"),
    district: str = Query(..., description="District name e.g. Ludhiana"),
    current_user: dict = Depends(get_current_user)
):
    """
    Get regional macro agricultural intelligence, satellite NDVI greenness status, and pest alerts.
    """
    intel_data = await national_intel_engine.get_regional_intelligence(state, district)
    return APIResponse(data=intel_data)

from typing import Dict, Any
from fastapi import APIRouter, Query, Depends
from app.models.common import APIResponse
from app.services.market_service import MarketIntelligenceService
from app.utils.security import get_current_user

router = APIRouter(prefix="/market", tags=["Market Intelligence"])

@router.get("/prices", response_model=APIResponse[Dict[str, Any]])
async def get_market_prices(
    crop_name: str = Query(..., description="Crop name e.g. Wheat"),
    state: str = Query(..., description="State name e.g. Punjab"),
    current_user: dict = Depends(get_current_user)
):
    """
    Get live Mandi market prices, 15-day price trend analysis, and sell recommendations.
    """
    market_data = await MarketIntelligenceService.get_market_prices(crop_name, state)
    return APIResponse(data=market_data)

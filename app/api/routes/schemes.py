from fastapi import APIRouter, Query, Depends
from app.models.scheme import SchemeRecommendationResponse
from app.models.common import APIResponse
from app.services.scheme_service import SchemeService
from app.utils.security import get_current_user

router = APIRouter(prefix="/schemes", tags=["Government Scheme Recommendation"])

@router.get("/recommendations", response_model=APIResponse[SchemeRecommendationResponse])
async def get_recommended_schemes(
    state: str = Query(..., description="State name e.g. Punjab"),
    land_acres: float = Query(..., gt=0.0, description="Land holdings in acres"),
    current_user: dict = Depends(get_current_user)
):
    """
    Intelligent matching of farmer profile and land holdings against central & state government schemes.
    """
    schemes = await SchemeService.get_recommended_schemes(state, land_acres)
    return APIResponse(data=schemes)

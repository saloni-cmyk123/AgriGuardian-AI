from typing import Dict, Any
from fastapi import APIRouter, Depends, Query
from app.models.common import APIResponse
from app.ai.agritwin_engine import agritwin_engine
from app.services.farm_service import FarmService
from app.utils.security import get_current_user

router = APIRouter(prefix="/agritwin", tags=["AgriTwin Digital Twin AI"])

@router.post("/simulate", response_model=APIResponse[Dict[str, Any]])
async def run_agritwin_simulation(
    farm_id: str,
    temp_override_c: float = Query(default=31.5),
    current_user: dict = Depends(get_current_user)
):
    """
    Run AgriTwin Digital Twin physical simulation for a farm.
    Calculates 48-hour moisture decay, stress thresholds, and irrigation urgency.
    """
    user_id = current_user["_id"]
    farm = await FarmService.get_farm_by_id(farm_id, user_id)

    simulation = await agritwin_engine.simulate_farm_state(
        farm_name=farm.name,
        total_area=farm.total_area_acres,
        soil_type=farm.soil.soil_type,
        temp_celsius=temp_override_c
    )

    return APIResponse(message="AgriTwin simulation generated", data=simulation)

from typing import List
from fastapi import APIRouter, Depends, status
from app.models.farm import FarmCreate, FarmResponse
from app.models.common import APIResponse
from app.services.farm_service import FarmService
from app.utils.security import get_current_user

router = APIRouter(prefix="/farms", tags=["Farm Management"])

@router.post("", response_model=APIResponse[FarmResponse], status_code=status.HTTP_201_CREATED)
async def create_farm(
    farm_in: FarmCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new farm record associated with current user.
    """
    user_id = current_user["_id"]
    farm = await FarmService.create_farm(user_id, farm_in)
    return APIResponse(message="Farm registered successfully", data=farm)

@router.get("", response_model=APIResponse[List[FarmResponse]])
async def get_my_farms(current_user: dict = Depends(get_current_user)):
    """
    Retrieve all registered farms for current authenticated user.
    """
    user_id = current_user["_id"]
    farms = await FarmService.get_user_farms(user_id)
    return APIResponse(data=farms)

@router.get("/{farm_id}", response_model=APIResponse[FarmResponse])
async def get_farm_details(
    farm_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get detailed information for a specific farm by ID.
    """
    user_id = current_user["_id"]
    farm = await FarmService.get_farm_by_id(farm_id, user_id)
    return APIResponse(data=farm)

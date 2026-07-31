from typing import List
from fastapi import APIRouter, Depends, status
from app.models.crop import CropCreate, CropResponse
from app.models.common import APIResponse
from app.services.crop_service import CropService
from app.utils.security import get_current_user

router = APIRouter(prefix="/crops", tags=["Crop Management"])

@router.post("", response_model=APIResponse[CropResponse], status_code=status.HTTP_201_CREATED)
async def create_crop(
    crop_in: CropCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Register a new crop batch assigned to a specific farm.
    """
    user_id = current_user["_id"]
    crop = await CropService.create_crop(user_id, crop_in)
    return APIResponse(message="Crop added successfully", data=crop)

@router.get("/farm/{farm_id}", response_model=APIResponse[List[CropResponse]])
async def get_crops_by_farm(
    farm_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get all active and past crops for a given farm.
    """
    crops = await CropService.get_crops_by_farm(farm_id)
    return APIResponse(data=crops)

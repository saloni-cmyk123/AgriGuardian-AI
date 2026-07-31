from fastapi import APIRouter, Depends
from app.models.user import UserResponse
from app.models.common import APIResponse
from app.services.user_service import UserService
from app.utils.security import get_current_user
from typing import Dict, Any

router = APIRouter(prefix="/users", tags=["User Management"])

@router.get("/profile", response_model=APIResponse[UserResponse])
async def get_profile(current_user: dict = Depends(get_current_user)):
    """
    Get detailed user profile of currently authenticated user.
    """
    user_id = current_user["_id"]
    profile = await UserService.get_user_profile(user_id)
    return APIResponse(data=profile)

@router.put("/profile", response_model=APIResponse[UserResponse])
async def update_profile(
    update_payload: Dict[str, Any],
    current_user: dict = Depends(get_current_user)
):
    """
    Update profile details for currently authenticated user.
    """
    user_id = current_user["_id"]
    updated_profile = await UserService.update_user_profile(user_id, update_payload)
    return APIResponse(message="Profile updated successfully", data=updated_profile)

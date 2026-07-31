from typing import Dict, Any
from app.database.mongodb import get_database
from app.models.user import UserResponse
from app.utils.exceptions import ResourceNotFoundException
from bson import ObjectId
from datetime import datetime, timezone

class UserService:
    @staticmethod
    async def get_user_profile(user_id: str) -> UserResponse:
        db = get_database()
        try:
            user = await db.users.find_one({"_id": ObjectId(user_id)})
        except Exception:
            user = None

        if not user:
            raise ResourceNotFoundException("User", user_id)

        return UserResponse(
            id=str(user["_id"]),
            full_name=user["full_name"],
            email=user["email"],
            phone_number=user.get("phone_number"),
            role=user["role"],
            language_preference=user.get("language_preference", "en"),
            state=user.get("state", ""),
            district=user.get("district", ""),
            created_at=user["created_at"]
        )

    @staticmethod
    async def update_user_profile(user_id: str, update_data: Dict[str, Any]) -> UserResponse:
        db = get_database()
        update_data["updated_at"] = datetime.now(timezone.utc)
        
        await db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data}
        )
        return await UserService.get_user_profile(user_id)

from typing import List
from app.database.mongodb import get_database
from app.models.farm import FarmCreate, FarmResponse
from app.utils.exceptions import ResourceNotFoundException, PermissionDeniedException
from bson import ObjectId
from datetime import datetime, timezone

class FarmService:
    @staticmethod
    async def create_farm(user_id: str, farm_in: FarmCreate) -> FarmResponse:
        db = get_database()
        now = datetime.now(timezone.utc)
        
        farm_doc = {
            "owner_id": user_id,
            "name": farm_in.name,
            "location": farm_in.location.model_dump(),
            "total_area_acres": farm_in.total_area_acres,
            "irrigation_source": farm_in.irrigation_source,
            "soil": farm_in.soil.model_dump(),
            "created_at": now,
            "updated_at": now
        }

        result = await db.farms.insert_one(farm_doc)
        farm_id = str(result.inserted_id)

        return FarmResponse(
            id=farm_id,
            owner_id=user_id,
            name=farm_in.name,
            location=farm_in.location,
            total_area_acres=farm_in.total_area_acres,
            irrigation_source=farm_in.irrigation_source,
            soil=farm_in.soil,
            created_at=now
        )

    @staticmethod
    async def get_user_farms(user_id: str) -> List[FarmResponse]:
        db = get_database()
        cursor = db.farms.find({"owner_id": user_id})
        farms = []
        async for doc in cursor:
            farms.append(FarmResponse(
                id=str(doc["_id"]),
                owner_id=doc["owner_id"],
                name=doc["name"],
                location=doc["location"],
                total_area_acres=doc["total_area_acres"],
                irrigation_source=doc["irrigation_source"],
                soil=doc["soil"],
                created_at=doc["created_at"]
            ))
        return farms

    @staticmethod
    async def get_farm_by_id(farm_id: str, user_id: str) -> FarmResponse:
        db = get_database()
        try:
            doc = await db.farms.find_one({"_id": ObjectId(farm_id)})
        except Exception:
            doc = None

        if not doc:
            raise ResourceNotFoundException("Farm", farm_id)

        if doc["owner_id"] != user_id:
            raise PermissionDeniedException("You do not have access to this farm")

        return FarmResponse(
            id=str(doc["_id"]),
            owner_id=doc["owner_id"],
            name=doc["name"],
            location=doc["location"],
            total_area_acres=doc["total_area_acres"],
            irrigation_source=doc["irrigation_source"],
            soil=doc["soil"],
            created_at=doc["created_at"]
        )

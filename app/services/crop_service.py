from typing import List
from app.database.mongodb import get_database
from app.models.crop import CropCreate, CropResponse
from app.utils.exceptions import ResourceNotFoundException
from bson import ObjectId
from datetime import datetime, timezone

class CropService:
    @staticmethod
    async def create_crop(user_id: str, crop_in: CropCreate) -> CropResponse:
        db = get_database()
        now = datetime.now(timezone.utc)

        crop_doc = {
            "farm_id": crop_in.farm_id,
            "crop_name": crop_in.crop_name,
            "variety": crop_in.variety,
            "area_allocated_acres": crop_in.area_allocated_acres,
            "sowing_date": crop_in.sowing_date,
            "expected_harvest_date": crop_in.expected_harvest_date,
            "growth_stage": crop_in.growth_stage,
            "created_at": now,
            "updated_at": now
        }

        result = await db.crops.insert_one(crop_doc)
        crop_id = str(result.inserted_id)

        return CropResponse(
            id=crop_id,
            farm_id=crop_in.farm_id,
            crop_name=crop_in.crop_name,
            variety=crop_in.variety,
            area_allocated_acres=crop_in.area_allocated_acres,
            sowing_date=crop_in.sowing_date,
            expected_harvest_date=crop_in.expected_harvest_date,
            growth_stage=crop_in.growth_stage,
            created_at=now
        )

    @staticmethod
    async def get_crops_by_farm(farm_id: str) -> List[CropResponse]:
        db = get_database()
        cursor = db.crops.find({"farm_id": farm_id})
        crops = []
        async for doc in cursor:
            crops.append(CropResponse(
                id=str(doc["_id"]),
                farm_id=doc["farm_id"],
                crop_name=doc["crop_name"],
                variety=doc["variety"],
                area_allocated_acres=doc["area_allocated_acres"],
                sowing_date=doc["sowing_date"],
                expected_harvest_date=doc["expected_harvest_date"],
                growth_stage=doc["growth_stage"],
                created_at=doc["created_at"]
            ))
        return crops

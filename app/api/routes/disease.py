from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

from app.ai.disease_detector import disease_detector
from app.database.mongodb import get_database
from app.models.common import APIResponse
from app.models.disease import DiseaseDiagnosisRequest, DiseaseDiagnosisResponse
from app.services.farm_service import FarmService
from app.utils.exceptions import AgriGuardianException, ResourceNotFoundException
from app.utils.security import get_current_user

router = APIRouter(prefix="/disease", tags=["Disease Detection & XAI"])


@router.post(
    "/diagnose",
    response_model=APIResponse[DiseaseDiagnosisResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Diagnose crop leaf symptoms/imagery",
    description="Diagnoses crop leaf symptoms and imagery using Explainable AI (XAI), saving diagnostic history to MongoDB.",
)
async def diagnose_crop_disease(
    req: DiseaseDiagnosisRequest,
    current_user: dict = Depends(get_current_user),
) -> APIResponse[DiseaseDiagnosisResponse]:
    """
    Diagnose crop leaf symptoms/imagery using Explainable AI (XAI).
    Returns explanation, confidence score, possible risks, organic remedies, and chemical treatments.
    """
    user_id = str(current_user["_id"])
    
    # Verify farm access ownership before recording diagnosis
    if req.farm_id:
        await FarmService.get_farm_by_id(req.farm_id, user_id)

    db = get_database()
    now = datetime.now(timezone.utc)

    # Execute AI Disease Detection Engine
    try:
        result = await disease_detector.diagnose(
            crop_name=req.crop_name,
            symptoms=req.symptoms_description,
            image_url=req.image_url,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Disease detection engine error: {str(exc)}",
        )

    # Save diagnosis record to MongoDB
    doc = {
        "user_id": user_id,
        "farm_id": req.farm_id,
        "crop_name": req.crop_name,
        "symptoms_description": req.symptoms_description,
        "image_url": req.image_url,
        "disease_detected": result["disease_detected"],
        "severity_level": result["severity_level"],
        "explanation": result["explanation"],
        "confidence_score": result["confidence_score"],
        "possible_risks": result["possible_risks"],
        "recommended_action": result["recommended_action"],
        "organic_remedies": result["organic_remedies"],
        "chemical_treatments": result["chemical_treatments"],
        "created_at": now,
    }

    try:
        insert_res = await db.disease_history.insert_one(doc)
        diagnosis_id = str(insert_res.inserted_id)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to persist disease diagnosis history: {str(exc)}",
        )

    response_data = DiseaseDiagnosisResponse(
        diagnosis_id=diagnosis_id,
        disease_detected=result["disease_detected"],
        severity_level=result["severity_level"],
        explanation=result["explanation"],
        confidence_score=result["confidence_score"],
        possible_risks=result["possible_risks"],
        recommended_action=result["recommended_action"],
        organic_remedies=result["organic_remedies"],
        chemical_treatments=result["chemical_treatments"],
        created_at=now,
    )

    return APIResponse(
        success=True,
        message="Diagnosis complete",
        data=response_data,
    )


@router.get(
    "/history/{farm_id}",
    response_model=APIResponse[List[Dict[str, Any]]],
    summary="Get crop disease history",
    description="Retrieves historical crop disease diagnostic records for a specific farm.",
)
async def get_disease_history(
    farm_id: str,
    current_user: dict = Depends(get_current_user),
) -> APIResponse[List[Dict[str, Any]]]:
    """
    Get historical crop disease diagnostic records for a specific farm.
    Validates farm ownership prior to returning records.
    """
    user_id = str(current_user["_id"])
    
    # Verify user owns the farm before exposing diagnostic records
    await FarmService.get_farm_by_id(farm_id, user_id)

    db = get_database()
    try:
        cursor = db.disease_history.find({"farm_id": farm_id, "user_id": user_id}).sort("created_at", -1)

        history: List[Dict[str, Any]] = []
        async for doc in cursor:
            history.append({
                "id": str(doc["_id"]),
                "farm_id": doc.get("farm_id"),
                "crop_name": doc["crop_name"],
                "disease_detected": doc["disease_detected"],
                "severity_level": doc["severity_level"],
                "confidence_score": doc["confidence_score"],
                "explanation": doc["explanation"],
                "organic_remedies": doc.get("organic_remedies", []),
                "chemical_treatments": doc.get("chemical_treatments", []),
                "created_at": doc["created_at"],
            })

        return APIResponse(
            success=True,
            message="Disease history retrieved successfully",
            data=history,
        )
    except AgriGuardianException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve disease history: {str(exc)}",
        )

from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form

from app.ai.disease_detector import disease_detector
from app.ai.agritwin_engine import agritwin_engine
from app.database.mongodb import get_database
from app.models.common import APIResponse
from app.models.disease import (
    DiseaseDiagnosisRequest,
    DiseaseDiagnosisResponse,
    AffectedRegion,
    SuitableMedicine,
)
from app.services.farm_service import FarmService
from app.utils.exceptions import AgriGuardianException, ResourceNotFoundException
from app.utils.security import get_current_user

router = APIRouter(prefix="/disease", tags=["Disease Detection & XAI"])


async def _process_and_save_diagnosis(
    user_id: str,
    farm_id: Optional[str],
    crop_name: str,
    symptoms_description: str,
    image_url: Optional[str] = None,
    image_base64: Optional[str] = None,
    image_bytes: Optional[bytes] = None,
) -> DiseaseDiagnosisResponse:
    """Helper service logic for diagnosing disease, logging to MongoDB, and syncing AgriTwin."""
    farm = None
    if farm_id:
        farm = await FarmService.get_farm_by_id(farm_id, user_id)

    db = get_database()
    now = datetime.now(timezone.utc)

    # Run AI Detection Engine
    try:
        result = await disease_detector.diagnose(
            crop_name=crop_name or (farm.name if farm else "Crop"),
            symptoms=symptoms_description or "",
            image_url=image_url,
            image_base64=image_base64,
            image_bytes=image_bytes,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Disease detection engine error: {str(exc)}",
        )

    # Recalibrate AgriTwin Digital Twin
    agritwin_state = None
    if farm:
        try:
            agritwin_state = await agritwin_engine.recalibrate_with_disease_report(
                farm_name=farm.name,
                total_area=farm.total_area_acres,
                soil_type=farm.soil.soil_type,
                disease_report=result,
            )
        except Exception:
            agritwin_state = None

    # Construct Document for MongoDB Persistence
    doc = {
        "user_id": user_id,
        "farm_id": farm_id,
        "crop_name": crop_name or "Crop",
        "symptoms_description": symptoms_description or "",
        "image_url": image_url,
        "disease_detected": result["disease_detected"],
        "severity_level": result["severity_level"],
        "confidence_score": result["confidence_score"],
        "explanation": result["explanation"],
        "affected_regions": result.get("affected_regions", []),
        "highlighted_image_url": result.get("highlighted_image_url"),
        "suitable_medicine": result.get("suitable_medicine", {}),
        "treatment_steps": result.get("treatment_steps", []),
        "preventive_measures": result.get("preventive_measures", []),
        "possible_risks": result.get("possible_risks", []),
        "recommended_action": result.get("recommended_action", []),
        "organic_remedies": result.get("organic_remedies", []),
        "chemical_treatments": result.get("chemical_treatments", []),
        "created_at": now,
    }

    try:
        insert_res = await db.disease_history.insert_one(doc)
        diagnosis_id = str(insert_res.inserted_id)
        doc["_id"] = diagnosis_id
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to persist disease diagnosis history: {str(exc)}",
        )

    # Update Farm Document & AgriTwin History in MongoDB
    if farm_id:
        await FarmService.update_farm_health_and_disease_history(
            farm_id=farm_id,
            user_id=user_id,
            disease_report=doc,
            agritwin_state=agritwin_state,
        )

    affected_objs = [
        AffectedRegion(
            box=r["box"],
            region_name=r["region_name"],
            lesion_severity=r["lesion_severity"],
            confidence=r["confidence"],
        )
        for r in result.get("affected_regions", [])
    ]

    med_dict = result.get("suitable_medicine", {})
    medicine_obj = SuitableMedicine(
        chemical=med_dict.get("chemical", result.get("chemical_treatments", [])),
        organic=med_dict.get("organic", result.get("organic_remedies", [])),
    )

    return DiseaseDiagnosisResponse(
        diagnosis_id=diagnosis_id,
        disease_detected=result["disease_detected"],
        severity_level=result["severity_level"],
        explanation=result["explanation"],
        confidence_score=result["confidence_score"],
        possible_risks=result["possible_risks"],
        recommended_action=result["recommended_action"],
        affected_regions=affected_objs,
        highlighted_image_url=result.get("highlighted_image_url"),
        suitable_medicine=medicine_obj,
        treatment_steps=result.get("treatment_steps", []),
        preventive_measures=result.get("preventive_measures", []),
        organic_remedies=result.get("organic_remedies", []),
        chemical_treatments=result.get("chemical_treatments", []),
        farm_id=farm_id,
        crop_name=crop_name or "Crop",
        created_at=now,
    )


@router.post(
    "/diagnose",
    response_model=APIResponse[DiseaseDiagnosisResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Diagnose crop leaf symptoms / Base64 / URL imagery",
    description="Diagnoses crop leaf symptoms using Explainable AI (XAI), updates AgriTwin Digital Twin, and saves report to MongoDB.",
)
async def diagnose_crop_disease(
    req: DiseaseDiagnosisRequest,
    current_user: dict = Depends(get_current_user),
) -> APIResponse[DiseaseDiagnosisResponse]:
    """Diagnose crop leaf symptoms / Base64 payload via JSON request."""
    user_id = str(current_user["_id"])
    response_data = await _process_and_save_diagnosis(
        user_id=user_id,
        farm_id=req.farm_id,
        crop_name=req.crop_name or "Crop",
        symptoms_description=req.symptoms_description or "",
        image_url=req.image_url,
        image_base64=req.image_base64,
    )

    return APIResponse(
        success=True,
        message="Disease diagnosis complete with XAI visual insights",
        data=response_data,
    )


@router.post(
    "/upload-diagnose",
    response_model=APIResponse[DiseaseDiagnosisResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Upload crop leaf image file for AI Disease Diagnosis",
    description="Uploads crop leaf image file (multipart/form-data), generates XAI visual heatmap, updates AgriTwin Digital Twin, and saves report.",
)
async def upload_and_diagnose_crop_disease(
    file: UploadFile = File(..., description="Crop leaf image file (JPEG, PNG, WEBP)"),
    farm_id: Optional[str] = Form(None, description="Target Farm ID"),
    crop_name: Optional[str] = Form("Wheat", description="Crop type"),
    symptoms_description: Optional[str] = Form("", description="Observed leaf symptoms"),
    current_user: dict = Depends(get_current_user),
) -> APIResponse[DiseaseDiagnosisResponse]:
    """Direct multipart image file upload endpoint for AI Disease Detection."""
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File provided must be a valid image format (JPEG, PNG, WEBP).",
        )

    try:
        content = await file.read()
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not read uploaded image file: {str(exc)}",
        )

    user_id = str(current_user["_id"])
    response_data = await _process_and_save_diagnosis(
        user_id=user_id,
        farm_id=farm_id,
        crop_name=crop_name or "Crop",
        symptoms_description=symptoms_description or "",
        image_bytes=content,
    )

    return APIResponse(
        success=True,
        message="Crop leaf image analyzed successfully with XAI highlights",
        data=response_data,
    )


@router.get(
    "/history/{farm_id}",
    response_model=APIResponse[List[Dict[str, Any]]],
    summary="Get farm disease history",
    description="Retrieves historical crop disease diagnostic records for a specific farm.",
)
async def get_disease_history(
    farm_id: str,
    current_user: dict = Depends(get_current_user),
) -> APIResponse[List[Dict[str, Any]]]:
    """Get historical crop disease diagnostic records for a specific farm."""
    user_id = str(current_user["_id"])
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
                "affected_regions": doc.get("affected_regions", []),
                "highlighted_image_url": doc.get("highlighted_image_url"),
                "suitable_medicine": doc.get("suitable_medicine", {}),
                "treatment_steps": doc.get("treatment_steps", []),
                "preventive_measures": doc.get("preventive_measures", []),
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


@router.get(
    "/dashboard-summary/{farm_id}",
    response_model=APIResponse[Dict[str, Any]],
    summary="Get Farmer Dashboard Disease & AgriTwin Summary",
    description="Provides real-time auto-refresh dashboard metrics for a farm including latest disease report, health status, and AgriTwin digital twin state.",
)
async def get_dashboard_summary(
    farm_id: str,
    current_user: dict = Depends(get_current_user),
) -> APIResponse[Dict[str, Any]]:
    """Get latest disease report, farm health status, and AgriTwin sync for Farmer Dashboard."""
    user_id = str(current_user["_id"])
    farm = await FarmService.get_farm_by_id(farm_id, user_id)

    db = get_database()
    latest_doc = await db.disease_history.find_one(
        {"farm_id": farm_id, "user_id": user_id},
        sort=[("created_at", -1)]
    )

    latest_report = None
    if latest_doc:
        latest_report = {
            "id": str(latest_doc["_id"]),
            "disease_detected": latest_doc["disease_detected"],
            "severity_level": latest_doc["severity_level"],
            "confidence_score": latest_doc["confidence_score"],
            "explanation": latest_doc["explanation"],
            "affected_regions": latest_doc.get("affected_regions", []),
            "highlighted_image_url": latest_doc.get("highlighted_image_url"),
            "suitable_medicine": latest_doc.get("suitable_medicine", {}),
            "treatment_steps": latest_doc.get("treatment_steps", []),
            "preventive_measures": latest_doc.get("preventive_measures", []),
            "created_at": latest_doc["created_at"],
        }

    agritwin_sim = await agritwin_engine.simulate_farm_state(
        farm_name=farm.name,
        total_area=farm.total_area_acres,
        soil_type=farm.soil.soil_type,
        latest_disease=latest_report,
    )

    dashboard_data = {
        "farm_id": farm.id,
        "farm_name": farm.name,
        "health_status": farm.health_status or agritwin_sim.get("health_status", "OPTIMAL"),
        "soil_health_index": agritwin_sim.get("soil_health_index", 85),
        "latest_disease_report": latest_report,
        "agritwin_state": agritwin_sim,
        "last_refreshed_at": datetime.now(timezone.utc),
    }

    return APIResponse(
        success=True,
        message="Farmer dashboard summary auto-refreshed successfully",
        data=dashboard_data,
    )


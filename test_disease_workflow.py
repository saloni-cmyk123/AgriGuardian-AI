import asyncio
import base64
import json
from app.ai.disease_detector import disease_detector
from app.ai.agritwin_engine import agritwin_engine
from app.models.disease import DiseaseDiagnosisResponse, AffectedRegion, SuitableMedicine

async def test_ai_disease_workflow():
    print("==========================================")
    print("Testing AgriGuardian AI Disease Detection Workflow")
    print("==========================================")

    # 1. Test Disease Detection with symptoms input
    print("\n--- Test 1: Symptoms Diagnosis (Wheat Yellow Rust) ---")
    res1 = await disease_detector.diagnose(
        crop_name="Wheat",
        symptoms="Yellowing stripes along leaf veins"
    )
    print(f"Disease Detected: {res1['disease_detected']}")
    print(f"Confidence Score: {res1['confidence_score']}")
    print(f"Severity Level: {res1['severity_level']}")
    print(f"XAI Explanation: {res1['explanation']}")
    print(f"Affected Regions: {len(res1['affected_regions'])} regions identified")
    print(f"Chemical Medicine: {res1['suitable_medicine']['chemical']}")
    print(f"Organic Medicine: {res1['suitable_medicine']['organic']}")
    print(f"Treatment Steps: {res1['treatment_steps']}")
    print(f"Preventive Measures: {res1['preventive_measures']}")
    assert res1['disease_detected'] == "Wheat Yellow Rust (Puccinia striiformis)"
    assert res1['confidence_score'] > 0.8
    assert res1['highlighted_image_url'].startswith("data:image/")
    print("[PASS] Test 1 Passed!")

    # 2. Test Image Feature Analysis & XAI Heatmap generation
    print("\n--- Test 2: Image Feature Analysis & Heatmap Generation ---")
    # Synthetic image byte stream (1x1 PNG pixel base64)
    dummy_b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    img_bytes = base64.b64decode(dummy_b64)

    res2 = await disease_detector.diagnose(
        crop_name="Tomato",
        symptoms="Dark water-soaked lesions on leaves",
        image_bytes=img_bytes
    )
    print(f"Disease Detected: {res2['disease_detected']}")
    print(f"XAI Heatmap Data Length: {len(res2['highlighted_image_url'])} chars")
    assert "highlighted_image_url" in res2
    print("[PASS] Test 2 Passed!")

    # 3. Test AgriTwin Digital Twin synchronization
    print("\n--- Test 3: AgriTwin Digital Twin Synchronization ---")
    twin_res = await agritwin_engine.recalibrate_with_disease_report(
        farm_name="Green Valley Wheat Farm",
        total_area=15.5,
        soil_type="Alluvial Soil",
        disease_report=res1
    )
    print(f"Recalibrated Soil Health Index: {twin_res['soil_health_index']}")
    print(f"Recalibrated Health Status: {twin_res['health_status']}")
    print(f"Active Disease Alert: {twin_res['active_disease']}")
    assert twin_res['health_status'] in ["WARNING", "CRITICAL", "ALERT"]
    print("[PASS] Test 3 Passed!")

    print("\n==========================================")
    print("ALL AI DISEASE DETECTION & XAI WORKFLOW TESTS PASSED SUCCESSFULLY!")
    print("==========================================")

if __name__ == "__main__":
    asyncio.run(test_ai_disease_workflow())

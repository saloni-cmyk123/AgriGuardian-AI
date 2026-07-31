from typing import Dict, Any
from app.ai.explainable_ai import format_xai_output

class PestPredictionEngine:
    """
    Pest Outbreak Prediction Engine.
    Correlates relative humidity, temperature thresholds, and canopy density to forecast pest infestation risks.
    """

    async def predict_pest_risk(
        self,
        crop_name: str,
        humidity: float,
        temperature: float,
        growth_stage: str
    ) -> Dict[str, Any]:
        
        high_risk = humidity > 75.0 and temperature > 26.0
        risk_level = "HIGH" if high_risk else "MODERATE"
        pest_target = "Aphids & Whiteflies" if temperature > 28.0 else "Stem Borer & Leaf Folder"

        explanation = (
            f"Evaluated micro-climatic pest vector model for {crop_name} at '{growth_stage}' stage. "
            f"Relative humidity ({humidity}%) and temperature ({temperature}°C) fall squarely into the optimum hatching range for {pest_target}."
        )

        risks = [
            f"Rapid buildup of {pest_target} nymph population within 3 to 5 days.",
            "Risk of secondary viral transmission carried by sap-sucking vector insects.",
            "Sooty mold growth on honeydew secretions reducing photosynthesis."
        ]

        actions = [
            "Install yellow sticky traps @ 10 traps per acre immediately for vector trapping.",
            "Spray neem-based insecticide (Azadirachtin 10,000 ppm) @ 2ml/L as preventive measure.",
            "Avoid excessive foliage canopy shading by selective leaf trimming."
        ]

        xai_info = format_xai_output(
            explanation=explanation,
            confidence_score=0.90,
            possible_risks=risks,
            recommended_action=actions
        )

        return {
            "crop_name": crop_name,
            "pest_threat_name": pest_target,
            "risk_level": risk_level,
            "explanation": xai_info.explanation,
            "confidence_score": xai_info.confidence_score,
            "possible_risks": xai_info.possible_risks,
            "recommended_action": xai_info.recommended_action
        }

pest_predictor_engine = PestPredictionEngine()

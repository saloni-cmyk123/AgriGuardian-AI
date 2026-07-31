from typing import List
from app.models.common import XAIResponseModel

def format_xai_output(
    explanation: str,
    confidence_score: float,
    possible_risks: List[str],
    recommended_action: List[str]
) -> XAIResponseModel:
    """
    Standard helper function enforcing Explainable AI (XAI) output guarantees.
    Ensures confidence score is strictly bounded [0.0, 1.0].
    """
    bounded_score = max(0.0, min(1.0, confidence_score))
    return XAIResponseModel(
        explanation=explanation,
        confidence_score=round(bounded_score, 2),
        possible_risks=possible_risks,
        recommended_action=recommended_action
    )

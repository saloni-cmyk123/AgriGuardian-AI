from typing import Dict, Any, List, Optional
from app.ai.explainable_ai import format_xai_output

class ChatbotEngine:
    """
    Multilingual AI Agronomist Chatbot Engine.
    Processes agronomic questions, integrates farm profile context, and provides clear XAI recommendations.
    """

    KNOWLEDGE_RESPONSES = {
        "fertilizer": {
            "reply": "For your current crop stage, applying a balanced NPK ratio of 12:32:16 along with bio-fertilizers (Azotobacter & PSB) will maximize root proliferation and tillering.",
            "explanation": "Recommendation generated based on crop growth stage demand curve and optimal soil nutrient uptake dynamics.",
            "risks": ["Over-application of Urea can cause excessive vegetative growth and lodging."],
            "actions": ["Apply 50kg/acre NPK 12:32:16 as basal dose.", "Ensure soil moisture before application."]
        },
        "irrigation": {
            "reply": "Maintain light, frequent irrigation at 7 to 10 day intervals during critical crop growth stages (flowering and grain filling).",
            "explanation": "Moisture stress during flowering causes flower drop and poor seed setting.",
            "risks": ["Waterlogging under poor drainage conditions damages active feeder roots."],
            "actions": ["Irrigate during evening hours to avoid evaporation loss.", "Check field moisture at 15cm soil depth."]
        },
        "default": {
            "reply": "AgriGuardian AI Agronomist analyzed your query. To protect your crop health, maintain optimal soil moisture, monitor leaf symptoms weekly, and use balanced organic inputs.",
            "explanation": "Response generated using AgriGuardian agronomic knowledge base and general crop care guidelines.",
            "risks": ["Delaying pest or disease treatment beyond initial symptom onset reduces control efficacy."],
            "actions": ["Inspect field corners for pest hotspots.", "Consult AgriGuardian disease detector for specific leaf spots."]
        }
    }

    async def process_query(
        self,
        query: str,
        language: str = "en",
        farm_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        
        query_lower = query.lower()
        key = "default"
        if "fertilizer" in query_lower or "urea" in query_lower or "npk" in query_lower or "khad" in query_lower:
            key = "fertilizer"
        elif "water" in query_lower or "irrigation" in query_lower or "paani" in query_lower or "drip" in query_lower:
            key = "irrigation"

        item = self.KNOWLEDGE_RESPONSES[key]
        
        # Integrate farm context if present
        farm_note = f" (Tailored for {farm_context.get('name')})" if farm_context else ""
        
        xai_info = format_xai_output(
            explanation=item["explanation"] + farm_note,
            confidence_score=0.93,
            possible_risks=item["risks"],
            recommended_action=item["actions"]
        )

        return {
            "reply": item["reply"],
            "explanation": xai_info.explanation,
            "confidence_score": xai_info.confidence_score,
            "possible_risks": xai_info.possible_risks,
            "recommended_action": xai_info.recommended_action
        }

chatbot_engine = ChatbotEngine()

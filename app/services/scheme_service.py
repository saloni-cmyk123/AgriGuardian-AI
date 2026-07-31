from typing import List, Dict, Any
from app.models.scheme import GovernmentSchemeModel, SchemeMatchResult, SchemeRecommendationResponse
from app.ai.explainable_ai import format_xai_output

class SchemeService:
    SCHEMES_DATABASE: List[Dict[str, Any]] = [
        {
            "id": "pm_kisan_01",
            "scheme_name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
            "scheme_code": "PM-KISAN",
            "sponsoring_agency": "Central Government",
            "eligible_states": ["ALL"],
            "max_land_acres": 5.0,
            "benefit": "₹6,000 / year in 3 equal installments",
            "portal": "https://pmkisan.gov.in"
        },
        {
            "id": "pm_kby_02",
            "scheme_name": "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
            "scheme_code": "PMFBY",
            "sponsoring_agency": "Central & State Joint",
            "eligible_states": ["ALL"],
            "max_land_acres": 50.0,
            "benefit": "Comprehensive crop insurance coverage against natural disasters @ 1.5%-2% premium",
            "portal": "https://pmfby.gov.in"
        },
        {
            "id": "pm_ksy_03",
            "scheme_name": "Per Drop More Crop (Micro Irrigation Scheme)",
            "scheme_code": "PDMC",
            "sponsoring_agency": "Ministry of Agriculture",
            "eligible_states": ["ALL"],
            "max_land_acres": 12.5,
            "benefit": "55% subsidy on Drip and Sprinkler irrigation installation for small/marginal farmers",
            "portal": "https://pmksy.gov.in"
        }
    ]

    @staticmethod
    async def get_recommended_schemes(state: str, land_acres: float) -> SchemeRecommendationResponse:
        results: List[SchemeMatchResult] = []

        for s in SchemeService.SCHEMES_DATABASE:
            if s["max_land_acres"] and land_acres > s["max_land_acres"]:
                continue
            
            explanation = (
                f"Matched scheme '{s['scheme_name']}' because farmer's land holding ({land_acres} acres) "
                f"meets the maximum eligibility ceiling of {s['max_land_acres']} acres in state '{state}'."
            )

            xai = format_xai_output(
                explanation=explanation,
                confidence_score=0.96,
                possible_risks=["Application deadline approaches at end of season.", "Requires land ownership record verification."],
                recommended_action=[f"Apply online via {s['portal']}", "Keep Aadhaar and land record (Khasra/Khatauni) ready."]
            )

            results.append(
                SchemeMatchResult(
                    scheme_id=s["id"],
                    scheme_name=s["scheme_name"],
                    sponsoring_agency=s["sponsoring_agency"],
                    financial_benefit_amount=s["benefit"],
                    match_score=0.96,
                    official_portal_url=s["portal"],
                    explanation=xai.explanation,
                    confidence_score=xai.confidence_score,
                    possible_risks=xai.possible_risks,
                    recommended_action=xai.recommended_action
                )
            )

        return SchemeRecommendationResponse(
            total_eligible_schemes=len(results),
            recommended_schemes=results
        )

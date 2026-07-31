from typing import Any, List, Optional, Generic, TypeVar
from pydantic import BaseModel, Field, ConfigDict
from bson import ObjectId

T = TypeVar("T")

class PyObjectId(str):
    @classmethod
    def __get_pydantic_core_schema__(cls, _source_type, _handler):
        from pydantic_core import core_schema
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.chain_schema([
                    core_schema.str_schema(),
                    core_schema.no_info_plain_validator_function(cls.validate),
                ])
            ]),
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda x: str(x)
            ),
        )

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(ObjectId(v))

class XAIResponseModel(BaseModel):
    """
    Standard Explainable AI (XAI) output structure required across all AgriGuardian AI engines.
    """
    explanation: str = Field(..., description="Why this recommendation/prediction was generated")
    confidence_score: float = Field(..., ge=0.0, le=1.0, description="Model prediction confidence score")
    possible_risks: List[str] = Field(default_factory=list, description="Identified risk factors")
    recommended_action: List[str] = Field(default_factory=list, description="Recommended actionable steps")

class APIResponse(BaseModel, Generic[T]):
    success: bool = True
    message: str = "Operation completed successfully"
    data: Optional[T] = None

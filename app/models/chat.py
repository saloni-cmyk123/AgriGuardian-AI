from datetime import datetime, timezone
from typing import List, Optional
from pydantic import BaseModel, Field
from app.models.common import XAIResponseModel

class ChatMessageModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    user_id: str
    session_id: str
    sender: str = Field(..., example="user / assistant")
    message_text: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatQueryRequest(BaseModel):
    session_id: str = Field(default="default_session")
    query: str = Field(..., min_length=1)
    farm_id: Optional[str] = None
    language: str = Field(default="en", example="en / hi / pa / ta")

class ChatQueryResponse(XAIResponseModel):
    session_id: str
    reply: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

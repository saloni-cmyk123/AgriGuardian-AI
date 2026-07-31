from typing import List, Dict, Any
from fastapi import APIRouter, Depends, Query
from app.models.chat import ChatQueryRequest, ChatQueryResponse
from app.models.common import APIResponse
from app.services.chat_service import ChatService
from app.utils.security import get_current_user

router = APIRouter(prefix="/chatbot", tags=["AI Agronomist Chatbot"])

@router.post("/query", response_model=APIResponse[ChatQueryResponse])
async def query_ai_chatbot(
    request: ChatQueryRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Ask a question to the Multilingual AI Agronomist Chatbot.
    Returns response with Explainable AI (XAI) rationale, risks, and recommendations, and saves conversation to history.
    """
    user_id = current_user["_id"]
    chat_response = await ChatService.process_chat_message(user_id, request)
    return APIResponse(message="Query processed", data=chat_response)

@router.get("/history", response_model=APIResponse[List[Dict[str, Any]]])
async def get_chat_history(
    session_id: str = Query(default="default_session"),
    current_user: dict = Depends(get_current_user)
):
    """
    Retrieve conversation history for a specific chat session.
    """
    user_id = current_user["_id"]
    history = await ChatService.get_session_history(user_id, session_id)
    return APIResponse(data=history)

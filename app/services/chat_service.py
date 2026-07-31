from typing import List, Dict, Any, Optional
from app.database.mongodb import get_database
from app.models.chat import ChatMessageModel, ChatQueryRequest, ChatQueryResponse
from app.ai.chatbot_engine import chatbot_engine
from datetime import datetime, timezone

class ChatService:
    @staticmethod
    async def process_chat_message(user_id: str, request: ChatQueryRequest) -> ChatQueryResponse:
        db = get_database()
        now = datetime.now(timezone.utc)

        # 1. Save user query message to MongoDB
        user_msg = {
            "user_id": user_id,
            "session_id": request.session_id,
            "sender": "user",
            "message_text": request.query,
            "timestamp": now
        }
        await db.chat_history.insert_one(user_msg)

        # 2. Process query via Chatbot Engine
        ai_response = await chatbot_engine.process_query(
            query=request.query,
            language=request.language,
            farm_context={"id": request.farm_id} if request.farm_id else None
        )

        # 3. Save assistant reply to MongoDB
        assistant_msg = {
            "user_id": user_id,
            "session_id": request.session_id,
            "sender": "assistant",
            "message_text": ai_response["reply"],
            "explanation": ai_response["explanation"],
            "confidence_score": ai_response["confidence_score"],
            "possible_risks": ai_response["possible_risks"],
            "recommended_action": ai_response["recommended_action"],
            "timestamp": datetime.now(timezone.utc)
        }
        await db.chat_history.insert_one(assistant_msg)

        return ChatQueryResponse(
            session_id=request.session_id,
            reply=ai_response["reply"],
            explanation=ai_response["explanation"],
            confidence_score=ai_response["confidence_score"],
            possible_risks=ai_response["possible_risks"],
            recommended_action=ai_response["recommended_action"],
            timestamp=assistant_msg["timestamp"]
        )

    @staticmethod
    async def get_session_history(user_id: str, session_id: str) -> List[Dict[str, Any]]:
        db = get_database()
        cursor = db.chat_history.find(
            {"user_id": user_id, "session_id": session_id}
        ).sort("timestamp", 1)

        history = []
        async for doc in cursor:
            history.append({
                "id": str(doc["_id"]),
                "sender": doc["sender"],
                "message_text": doc["message_text"],
                "explanation": doc.get("explanation"),
                "confidence_score": doc.get("confidence_score"),
                "timestamp": doc["timestamp"]
            })
        return history

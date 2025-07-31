from fastapi import APIRouter, HTTPException
from ..models.chat import ChatResponse , ChatRequest
from ..services.openai_service import generate_response

router = APIRouter()

@router.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    return await generate_response(request)
    

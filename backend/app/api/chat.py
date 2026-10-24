from fastapi import APIRouter, Request
from backend.app.schemas.chat import ChatRequest, ChatResponse
from backend.app.security.rate_limiter import chat_limiter, get_client_ip
from backend.app.services.llm_provider import ask_assistant

router = APIRouter(prefix="/api/chat", tags=["AI Assistant"])

@router.post("", response_model=ChatResponse)
async def chat_with_aditya_ai(request: Request, payload: ChatRequest):
    client_ip = get_client_ip(request)
    
    # Enforce sliding-window rate limiting (25 requests/min per client IP)
    chat_limiter.assert_rate_limit(
        client_ip,
        error_message="Too many questions sent to Ask Aditya AI. Please wait 60 seconds before sending another message."
    )

    answer, sources, is_fallback, provider_used, model_used, fallback_reason = await ask_assistant(
        payload.message,
        payload.history or []
    )

    return ChatResponse(
        answer=answer,
        sources=sources,
        is_fallback=is_fallback,
        provider_used=provider_used,
        model_used=model_used,
        fallback_reason=fallback_reason
    )

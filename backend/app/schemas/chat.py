from typing import List, Optional
from pydantic import BaseModel, Field

class HistoryMessage(BaseModel):
    role: str = Field(
        ...,
        pattern="^(user|assistant)$",
        description="Only 'user' and 'assistant' roles are permitted. 'system' is strictly forbidden from client input."
    )
    content: str = Field(
        ...,
        min_length=1,
        max_length=1000,
        description="Message content strictly limited to 1000 characters."
    )

class ChatRequest(BaseModel):
    message: str = Field(
        ...,
        min_length=1,
        max_length=1000,
        description="User question about Aditya Gupta (1-1000 characters)."
    )
    history: Optional[List[HistoryMessage]] = Field(
        default=[],
        max_length=6,
        description="Recent conversation context capped at 6 messages (3 conversation rounds)."
    )

class ChatResponse(BaseModel):
    answer: str
    sources: List[str] = []
    is_fallback: bool = False
    provider_used: str = "portfolio-grounded-fallback"
    model_used: str = "rule-based-retrieval-engine"
    fallback_reason: Optional[str] = None

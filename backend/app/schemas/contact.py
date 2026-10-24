import re
from typing import Optional
from pydantic import BaseModel, Field, field_validator
from datetime import datetime, timezone

EMAIL_REGEX = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., min_length=5, max_length=255)
    subject: str = Field(..., min_length=3, max_length=150)
    message: str = Field(..., min_length=10, max_length=3000)

    @field_validator('name', 'subject')
    @classmethod
    def validate_single_line_headers(cls, v: str) -> str:
        clean = v.strip()
        if '\r' in clean or '\n' in clean:
            raise ValueError("Line breaks (CRLF) are not permitted in this field to protect against header injection.")
        return clean

    @field_validator('email')
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        clean_email = v.strip().lower()
        if '\r' in clean_email or '\n' in clean_email:
            raise ValueError("Line breaks are not permitted in email addresses.")
        if not re.match(EMAIL_REGEX, clean_email):
            raise ValueError("Invalid email address format. Please enter a valid email (e.g. user@domain.com).")
        return clean_email

    @field_validator('message')
    @classmethod
    def normalize_message(cls, v: str) -> str:
        return v.strip()

class ContactResponse(BaseModel):
    success: bool
    delivery_status: str = Field(..., description="'persisted', 'sent', 'unconfigured', or 'failed'")
    message: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    mailto_fallback: Optional[str] = None

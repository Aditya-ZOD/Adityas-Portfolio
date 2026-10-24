import re
from typing import Optional
from pydantic import BaseModel, Field, field_validator
from datetime import datetime, timezone

EMAIL_REGEX = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'

class ContactRequest(BaseModel):
    name: str = Field(..., max_length=100)
    email: str = Field(..., max_length=255)
    subject: str = Field(..., max_length=150)
    message: str = Field(..., max_length=3000)

    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        clean = v.strip() if isinstance(v, str) else ""
        if not clean:
            raise ValueError("Name is required and cannot be empty or whitespace-only.")
        if len(clean) < 2:
            raise ValueError("Name must be at least 2 characters long.")
        if '\r' in clean or '\n' in clean:
            raise ValueError("Line breaks (CRLF) are not permitted in name.")
        return clean

    @field_validator('subject')
    @classmethod
    def validate_subject(cls, v: str) -> str:
        clean = v.strip() if isinstance(v, str) else ""
        if not clean:
            raise ValueError("Subject is required and cannot be empty or whitespace-only.")
        if len(clean) < 3:
            raise ValueError("Subject must be at least 3 characters long.")
        if '\r' in clean or '\n' in clean:
            raise ValueError("Line breaks (CRLF) are not permitted in subject.")
        return clean

    @field_validator('email')
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        clean_email = v.strip().lower() if isinstance(v, str) else ""
        if not clean_email:
            raise ValueError("Email address is required and cannot be empty or whitespace-only.")
        if '\r' in clean_email or '\n' in clean_email or ' ' in clean_email or '..' in clean_email:
            raise ValueError("Invalid email address format.")
        parts = clean_email.split('@')
        if len(parts) != 2:
            raise ValueError("Invalid email address format.")
        user, domain = parts
        if not user or not domain or user.startswith('.') or user.endswith('.'):
            raise ValueError("Invalid email address format.")
        if not re.match(r'^[a-zA-Z0-9_.+-]+$', user):
            raise ValueError("Invalid characters in email local part.")
        if '.' not in domain or domain.startswith('.') or domain.endswith('.'):
            raise ValueError("Invalid email domain.")
        domain_parts = domain.split('.')
        if len(domain_parts) < 2:
            raise ValueError("Invalid email domain.")
        for label in domain_parts:
            if not label or not re.match(r'^[a-zA-Z0-9-]+$', label) or label.startswith('-') or label.endswith('-'):
                raise ValueError("Invalid label in email domain.")
        if len(domain_parts[-1]) < 2 or not domain_parts[-1].isalpha():
            raise ValueError("Invalid top-level domain in email address.")
        return clean_email


    @field_validator('message')
    @classmethod
    def validate_message(cls, v: str) -> str:
        clean = v.strip() if isinstance(v, str) else ""
        if not clean:
            raise ValueError("Message is required and cannot be empty or whitespace-only.")
        if len(clean) < 10:
            raise ValueError("Message must be at least 10 characters long.")
        return clean


class ContactResponse(BaseModel):
    success: bool
    delivery_status: str = Field(..., description="'persisted', 'sent', 'unconfigured', or 'failed'")
    message: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    mailto_fallback: Optional[str] = None
    message_id: Optional[str] = None

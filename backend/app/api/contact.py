import os
import secrets
from fastapi import APIRouter, Header, HTTPException, Request, Response, status
from backend.app.schemas.contact import ContactRequest, ContactResponse
from backend.app.security.rate_limiter import contact_limiter, get_client_ip
from backend.app.services.contact_service import deliver_contact_message, get_all_contact_messages

router = APIRouter(prefix="/api/contact", tags=["Contact"])

def verify_admin_credentials(
    x_admin_key: str | None = Header(None, alias="X-Admin-Key"),
    authorization: str | None = Header(None)
) -> None:
    """
    Enforces administrator authentication for private contact inbox endpoints.
    Anonymous visitors and unauthorized callers are strictly rejected with HTTP 401.
    """
    admin_secret = os.getenv("ADMIN_API_KEY", "").strip()
    if not admin_secret:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Administrator authentication required. Stored messages are not accessible publicly."
        )

    token = None
    if x_admin_key:
        token = x_admin_key.strip()
    elif authorization and authorization.lower().startswith("bearer "):
        token = authorization[7:].strip()

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Administrator authentication required. Please provide X-Admin-Key header."
        )

    if not secrets.compare_digest(token, admin_secret):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid administrator credentials."
        )

@router.get("/messages")
def get_contact_messages(
    x_admin_key: str | None = Header(None, alias="X-Admin-Key"),
    authorization: str | None = Header(None)
):
    """
    Secure administrator endpoint to inspect transmissions.
    Protected by ADMIN_API_KEY. Anonymous visitors receive HTTP 401 Unauthorized.
    """
    verify_admin_credentials(x_admin_key, authorization)
    messages = get_all_contact_messages()
    return {
        "count": len(messages),
        "messages": messages
    }

@router.post("", response_model=ContactResponse)
async def submit_contact_form(request: Request, payload: ContactRequest, response: Response):
    client_ip = get_client_ip(request)

    # Enforce rate limit (5 requests per 5 minutes per client IP)
    contact_limiter.assert_rate_limit(
        client_ip,
        error_message="Too many messages sent. Please wait a few minutes before submitting another message."
    )

    result = deliver_contact_message(payload, client_ip)
    if not result["success"]:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE

    return ContactResponse(**result)


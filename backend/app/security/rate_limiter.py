import time
from collections import defaultdict
from fastapi import Request, HTTPException, status

def get_client_ip(request: Request) -> str:
    """
    Extracts the client IP address from proxy headers (X-Forwarded-For, CF-Connecting-IP)
    or falls back to direct client host.
    """
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        # First IP in the comma-separated chain is the client IP
        return forwarded.split(",")[0].strip()

    cf_ip = request.headers.get("cf-connecting-ip")
    if cf_ip:
        return cf_ip.strip()

    real_ip = request.headers.get("x-real-ip")
    if real_ip:
        return real_ip.strip()

    if request.client and request.client.host:
        return request.client.host

    return "127.0.0.1"

class SlidingWindowRateLimiter:
    """
    Sliding window in-memory rate limiter.
    Limits requests to max_requests per window_seconds per client IP.
    """
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)

    def check(self, client_id: str) -> bool:
        now = time.time()
        window_start = now - self.window_seconds
        
        # Filter requests within the current window
        valid_requests = [req_time for req_time in self.requests[client_id] if req_time > window_start]
        self.requests[client_id] = valid_requests

        if len(valid_requests) >= self.max_requests:
            return False

        self.requests[client_id].append(now)
        return True

    def assert_rate_limit(self, client_id: str, error_message: str = "Rate limit exceeded. Please wait a moment."):
        if not self.check(client_id):
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=error_message
            )

    def clear(self):
        """Clears all tracked requests (useful for test resets)."""
        self.requests.clear()

# Pre-configured instances
chat_limiter = SlidingWindowRateLimiter(max_requests=25, window_seconds=60)      # 25 chat messages per minute
contact_limiter = SlidingWindowRateLimiter(max_requests=5, window_seconds=300)   # 5 contact messages per 5 minutes

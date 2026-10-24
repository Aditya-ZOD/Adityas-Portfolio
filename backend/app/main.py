import os
from pathlib import Path
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.app.api.chat import router as chat_router
from backend.app.api.contact import router as contact_router
from backend.app.knowledge.portfolio_data import PORTFOLIO_PROFILE, VERIFIED_PROJECTS, VERIFIED_SKILLS

def load_env_file():
    """Explicitly loads .env file from project root or backend directory if present without third-party dependencies."""
    base_dir = Path(__file__).resolve().parent
    search_paths = [
        base_dir.parent.parent / ".env",
        base_dir.parent / ".env",
        base_dir / ".env",
    ]
    for env_file in search_paths:
        if env_file.is_file():
            try:
                with open(env_file, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if not line or line.startswith("#"):
                            continue
                        if "=" in line:
                            k, v = line.split("=", 1)
                            k = k.strip()
                            v = v.strip().strip('"').strip("'")
                            if k and k not in os.environ:
                                os.environ[k] = v
                break
            except Exception:
                pass

load_env_file()

app = FastAPI(
    title="Aditya Gupta Portfolio API",
    description="Backend REST API providing Ask Aditya AI chat, grounded knowledge retrieval, and contact form handling.",
    version="1.0.0"
)

# Environment and CORS configuration
environment = os.getenv("ENVIRONMENT", "development").lower().strip()
cors_env = os.getenv("CORS_ALLOWED_ORIGINS", "").strip()

if environment == "production":
    # Production security: Only permit explicitly configured trusted origins
    origins = [origin.strip() for origin in cors_env.split(",") if origin.strip()]
else:
    # Development / Testing: Permit standard local development ports plus any custom origins
    default_dev_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    origins = list(default_dev_origins)
    if cors_env:
        for origin in cors_env.split(","):
            cleaned = origin.strip()
            if cleaned and cleaned not in origins:
                origins.append(cleaned)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(chat_router)
app.include_router(contact_router)

@app.get("/api/health", tags=["Health"])
def health_check():
    provider = os.getenv("LLM_PROVIDER", "local_fallback").lower().strip()
    contact_mode = os.getenv("CONTACT_DELIVERY_MODE", "database").lower().strip()
    
    if provider == "openai":
        provider_ready = bool(os.getenv("OPENAI_API_KEY"))
    elif provider == "gemini":
        provider_ready = bool(os.getenv("GEMINI_API_KEY"))
    elif provider == "ollama":
        provider_ready = True
    else:
        provider_ready = True  # local_fallback is always ready

    return {
        "status": "healthy",
        "service": "Aditya Gupta Portfolio Backend",
        "llm_provider": provider,
        "llm_provider_ready": provider_ready,
        "contact_delivery_mode": contact_mode,
        "engine": provider if provider_ready else "portfolio-grounded-fallback",
        "cors_origins_count": len(origins)
    }

@app.get("/api/profile", tags=["Portfolio Data"])
def get_profile():
    return PORTFOLIO_PROFILE

@app.get("/api/projects", tags=["Portfolio Data"])
def get_projects():
    return VERIFIED_PROJECTS

@app.get("/api/skills", tags=["Portfolio Data"])
def get_skills():
    return VERIFIED_SKILLS

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Safe error response preventing stack trace disclosure
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Please try again later."}
    )

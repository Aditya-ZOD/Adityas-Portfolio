# Aditya Gupta — Futuristic AI Personal Portfolio ("Aditya's Cosmos")

A hardened personal portfolio web application and AI assistant engineered for **Aditya Gupta** — BCA student at Thakur Shyamnarayan Degree College (graduating in 2028), AI/ML enthusiast, and software developer.

[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan.svg)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg)](https://threejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.13+-yellow.svg)](https://www.python.org/)
[![Tests](https://img.shields.io/badge/Pytest-24%20Passed-brightgreen.svg)]()

---

## 🌟 Highlights & Key Features

### 1. Futuristic AI Visual Identity
- **Obsidian & Electric Accents**: Deep near-black backgrounds (`#050811`, `#090e1f`), electric cyan accents (`#38bdf8`), cyber violet highlights (`#a855f7`), and matrix emerald badges.
- **Interactive 3D Hero Scene**: Custom neural particle constellation powered by Three.js with mouse reactivity, automatic pause when off-screen or tab is backgrounded, reduced complexity for mobile viewports, and static fallback for systems with `prefers-reduced-motion`.
- **Micro-Animations & Glassmorphism**: Built with Motion for React (`motion/react`) with spring dynamics, frosted glass panels, and subtle cyan glows.

### 2. Comprehensive Portfolio Sections
- **Sticky Navigation**: Active section spy, command palette trigger (`⌘K`), responsive mobile drawer, and accessible résumé viewer.
- **Command Palette (`Ctrl + K` / `Cmd + K`)**: Instant keyboard search across sections, projects (OmniPredict AI, NutriAI, Heart Disease Prediction, Retail POS), and quick actions (Copy Email, View GitHub, Open Assistant).
- **About Me**: Transparent narrative of Aditya's academic journey at Thakur Shyamnarayan Degree College (BCA '28), practical engineering principles (deterministic arithmetic, test-driven validation), and internship availability.
- **Categorized Technical Skills**: Interactive explorer spanning Programming, AI/ML, Data Science, Generative AI & LLMs, Web Development, and Tooling. Includes live search filter and links to verified projects.
- **Verified Projects & Deep Case Studies**:
  - **OmniPredict AI** (Featured): Unified collegiate exhibition predictive analytics platform with conversational AI Dataset Assistant and human-in-the-loop preview confirmation.
  - **NutriAI** (Featured): Full-stack nutrition platform with deterministic Python math, local Ollama integration (`llama3.2:3b`), and 11 automated pytest tests.
  - **Heart Disease Risk Prediction**: Supervised ML classification pipeline benchmarked in scikit-learn with GridSearchCV tuning and Flask UI.
  - **Intelligent Retail POS & Inventory**: Reactive point-of-sale terminal with FastAPI, React, and real-time inventory decrementing.
- **Academic Journey & Credentials Ledger**: Chronological timeline and transparent undergraduate credentials ledger (BCA 2025–2028 active; no unearned or fake placeholder certificates).
- **Hardened Contact Delivery**: Verified message delivery supporting SQLite database persistence (`messages.db`), configurable SMTP delivery, and unconfigured fallback mode with pre-filled `mailto:` links. Privacy-preserving logging redacts all emails and bodies from console output.
- **Secure Local Inbox Viewer**: Developer CLI tool (`npm run inbox` or `python backend/view_inbox.py`) reads SQLite transmissions directly and maintains a synchronized human-readable `INBOX.md`.

### 3. "Ask Aditya AI" Portfolio Assistant
- Floating chat launcher with glowing pulsing beacon.
- Grounded strictly in verified portfolio facts—zero fabricated credentials or exaggerated claims.
- Powered by a server-side FastAPI endpoint (`/api/chat`) supporting configurable external LLMs (OpenAI, Gemini, Ollama) and a resilient, zero-cost local portfolio-grounded fallback engine.
- Hardened input boundary: accepts only `user` and `assistant` roles, rejecting `system` prompt injections with HTTP 422. Enforces 1,000-character message caps and 6-message history limits.
- Accurate provider attribution: clearly denotes whether an answer originated from a live LLM or the local portfolio-grounded rule engine.
- Enhanced Markdown Renderer: native React element tree parsing headings (H1–H6), bold, italic, lists, inline code, fenced code blocks with language tags, and blockquotes with strict XSS neutralization.

---

## 🏗️ Architecture & Project Structure

```
Aditya's Cosmos/
├── index.html                   # HTML5 entry, Google Fonts, Open Graph SEO metadata
├── vite.config.ts               # Vite bundler, proxy to FastAPI backend, manual chunk splitting
├── tailwind.config.js           # Design tokens, custom colors, animations, glassmorphism
├── package.json                 # Frontend dependencies (React 19, Motion, Three.js, Lucide)
├── tsconfig.json                # TypeScript configuration
├── CONTENT_CHECKLIST.md         # Credibility audit log, verified facts & pending items
├── FINAL_VERIFICATION.md        # Complete audit report, test metrics, and deployment readiness
├── .env.example                 # Template for server secrets, delivery modes, and LLM options
├── src/
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Root component orchestrating layout & modals
│   ├── index.css                # CSS design system, modern scrollbars, glow utilities
│   ├── lib/
│   │   └── api.ts               # Environment-aware API URL resolver (VITE_API_URL / Vite proxy)
│   ├── types/
│   │   └── index.ts             # TypeScript definitions for projects, skills, profile, chat
│   ├── data/                    # Type-safe ground-truth data files
│   │   ├── profile.ts           # Aditya's headline, bio, contact details, objectives
│   │   ├── projects.ts          # OmniPredict AI, NutriAI, and other verified applications
│   │   ├── skills.ts            # Categorized skills with details & project links
│   │   ├── education.ts         # Thakur Shyamnarayan Degree College BCA program details
│   │   └── certificates.ts      # Transparent certification ledger (no placeholder entries)
│   ├── components/
│   │   ├── ui/                  # Button, Badge, Modal, CommandPalette, MarkdownRenderer
│   │   ├── layout/              # Navbar, Footer, ResumeModal (with async PDF check)
│   │   ├── hero/                # HeroSection, HeroVisual3D (Three.js WebGL)
│   │   ├── about/               # AboutSection
│   │   ├── skills/              # SkillsSection
│   │   ├── projects/            # ProjectsSection, ProjectModal
│   │   ├── journey/             # JourneySection
│   │   ├── contact/             # ContactSection (Validated form, delivery status, mailto fallback)
│   │   └── assistant/           # AskAdityaAI (Floating chat assistant with provider badges)
│   └── assets/                  # High-resolution portfolio illustrations
├── backend/
│   ├── requirements.txt         # FastAPI, Uvicorn, Pydantic, HTTPX, Pytest
│   ├── view_inbox.py            # Local CLI transmission inbox viewer (`npm run inbox`)
│   ├── tests/
│   │   └── test_api.py          # Pytest suite (24 automated unit & integration tests)
│   └── app/
│       ├── main.py              # FastAPI app, strict production CORS, .env loader, health check
│       ├── api/
│       │   ├── chat.py          # /api/chat endpoint with sliding-window rate limit & client IP resolution
│       │   └── contact.py       # /api/contact endpoint with delivery confirmation & secured admin inbox
│       ├── schemas/             # Pydantic v2 models (chat, contact, profile)
│       ├── services/            # SQLite contact service, retrieval & LLM provider dispatcher
│       ├── knowledge/           # Curated portfolio knowledge base for AI Assistant
│       └── security/            # SlidingWindowRateLimiter with proxy-aware IP extraction
└── public/
    ├── favicon.svg              # Futuristic vector brand icon
    └── robots.txt               # SEO bot instructions
```

---

## 🚀 Quickstart & Local Development

### 1. Prerequisites
- **Node.js**: v18+ (tested on v24)
- **Python**: v3.10+ (tested on v3.15)
- **Git**

### 2. Frontend Installation & Startup
```powershell
# Install npm dependencies (using package-lock.json):
npm install

# Start Vite dev server:
npm run dev
```
The frontend will be available at: **`http://localhost:5173/`**

### 3. Backend Startup
In a separate terminal:
```powershell
# Activate your virtual environment (if using .venv):
.\.venv\Scripts\Activate.ps1

# Start the FastAPI backend server with Uvicorn:
python -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```
The backend API and OpenAPI interactive documentation will be accessible at:
- **API Health**: `http://127.0.0.1:8000/api/health`
- **Interactive Swagger Docs**: `http://127.0.0.1:8000/docs`

### 4. Reading Contact Transmissions
```powershell
# Inspect contact messages received via the contact form:
npm run inbox
# or directly with python:
python backend/view_inbox.py
```

---

## 🧪 Testing & Verification

### Run Backend Integration Tests
Execute the 24-test automated suite verifying SQLite contact persistence, administrator authentication, CORS enforcement, header injection rejection, unconfigured mailto fallback, SMTP failure handling, chat role validation, prompt injection defense, Gemini/Ollama provider adapters, and health endpoints:
```powershell
python -m pytest backend/tests/test_api.py -v
```
All 24 tests pass with zero errors.

### Run Frontend Production Build & TypeScript Check
Verify that TypeScript compiles with zero errors and the production bundle builds cleanly:
```powershell
npm run build
```
Chunks are split cleanly under 500 kB (Three.js WebGL, Motion, React, and Icons).

### Run Linter
```powershell
npm run lint
```
Zero linting errors across 29 source files using `oxlint`.

---

## ⚙️ Environment Variables & Hardened Configuration

Copy `.env.example` to `.env`:
```powershell
Copy-Item .env.example .env
```

### Contact Delivery Modes (`CONTACT_DELIVERY_MODE`)
- `database` *(Default)*: Writes validated contact inquiries to SQLite database (`backend/app/data/messages.db`).
- `smtp`: Sends emails using `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASSWORD`.
- `unconfigured`: Returns HTTP 503 with a structured, pre-filled client mailto link.

### Administrator Authentication (`ADMIN_API_KEY`)
- Set a strong secret key (e.g. `openssl rand -hex 32`) in `.env`.
- Required to query `GET /api/contact/messages` via `X-Admin-Key` header or `Authorization: Bearer <key>`.
- Anonymous callers are strictly rejected with HTTP 401 Unauthorized.

### LLM Providers (`LLM_PROVIDER`)
- `local_fallback` *(Default)*: Factual rule-based retrieval engine grounded strictly in verified facts. Zero API key or external service needed.
- `openai`: Requires `OPENAI_API_KEY`. Defaults to `gpt-4o-mini`.
- `gemini`: Requires `GEMINI_API_KEY`. Defaults to `gemini-1.5-flash`.
- `ollama`: Connects to `OLLAMA_BASE_URL` (default `http://localhost:11434`). Defaults to `llama3.2:3b`.

### Production Deployment & CORS
- `ENVIRONMENT`: Set to `production` in live environments.
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed domains in production (e.g. `https://adityagupta.dev`). In production mode, localhost is automatically restricted.
- `VITE_API_URL`: Optional absolute backend URL for decoupled frontend deployment (e.g. `https://api.adityagupta.dev`).

---

## 🌐 Production Deployment Guide

### Option A: Unified Deployment (FastAPI serves Vite Static Build)
1. Build the frontend: `npm run build` (outputs to `dist/`).
2. Serve static files with FastAPI or place behind a reverse proxy (Nginx or Caddy) routing `/api` to port 8000 and `/` to `dist/`.
3. Set environment: `ENVIRONMENT=production`, `CORS_ALLOWED_ORIGINS=https://yourdomain.com`, `ADMIN_API_KEY=<strong_secret>`.

### Option B: Decoupled Deployment
- **Frontend (Vercel / Netlify / Cloudflare Pages)**:
  1. Build command: `npm run build`
  2. Output directory: `dist`
  3. Set environment variable: `VITE_API_URL=https://api.yourdomain.com`
- **Backend (Render / Railway / Fly.io / VPS)**:
  1. Start command: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
  2. Set environment variables:
     - `ENVIRONMENT=production`
     - `CORS_ALLOWED_ORIGINS=https://yourdomain.com`
     - `ADMIN_API_KEY=<strong_secret>`
     - `CONTACT_DELIVERY_MODE=database` (or `smtp`)
     - `LLM_PROVIDER=local_fallback` (or `openai`/`gemini`)

---

## 📬 Contact Aditya Gupta
- **Email**: [adityagupta1624111@gmail.com](mailto:adityagupta1624111@gmail.com)
- **LinkedIn**: [linkedin.com/in/aditya-gupta-aa3373284](https://www.linkedin.com/in/aditya-gupta-aa3373284/)
- **GitHub**: [github.com/Aditya-ZOD](https://github.com/Aditya-ZOD)

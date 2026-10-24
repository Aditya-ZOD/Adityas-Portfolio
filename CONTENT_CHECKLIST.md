# Content Checklist & Verification Guide — Aditya Gupta Portfolio

This document records the exact verification status of all portfolio details, projects, credentials, and assets. It provides step-by-step instructions for Aditya to update placeholders and customize content without modifying React component structures.

---

## 1. Verified Facts (Grounded in Production Code)

| Field | Status | Verified Value | Source / Evidence |
| :--- | :---: | :--- | :--- |
| **Full Name** | Verified | Aditya Gupta | System git config, college project poster |
| **Headline** | Verified | AI/ML Enthusiast \| Python \| Machine Learning \| Data Science \| Intelligent Automation | Master profile brief |
| **Education Degree** | Verified | Bachelor of Computer Applications (BCA) | Thakur Shyamnarayan Degree College records |
| **Institution** | Verified | Thakur Shyamnarayan Degree College (Kandivali, Mumbai) | Project exhibition poster & git metadata |
| **Expected Graduation** | Verified | 2028 | BCA program timeline |
| **Primary Email** | Verified | `adityagupta1624111@gmail.com` | Verified contact address |
| **GitHub Profile** | Verified | `https://github.com/Aditya-ZOD` | Verified git remote repository URLs |
| **LinkedIn Profile** | Verified | `https://www.linkedin.com/in/aditya-gupta-aa3373284/` | Verified profile URL |
| **Featured Project 1** | Verified | **OmniPredict AI** | Local repository `C:\Users\adity\Coding\AI ML Project\OmniPredictAI`, Team XSpark exhibition poster |
| **Featured Project 2** | Verified | **NutriAI** | Local repository `C:\Users\adity\Coding\AI ML Project\NutriAI`, 11 automated pytest tests |
| **Additional Project 3** | Verified | **Heart Disease Risk Prediction System** | Local repository `C:\Users\adity\Coding\AI ML Project\Heart Prediction Model` |
| **Additional Project 4** | Verified | **Intelligent Retail Billing & Inventory System** | Local repository `C:\Users\adity\Desktop\Retail Billing` |

---

## 2. Evidence-Based Credibility Audit Log

In accordance with strict portfolio credibility standards, unsupported or exaggerated marketing claims have been replaced across the frontend and backend with verified, evidence-based engineering descriptions:

| Original Phrasing | Updated Evidence-Based Phrasing | Reason / Context |
| :--- | :--- | :--- |
| "Enterprise-grade predictive analytics platform" | "Unified collegiate exhibition predictive analytics platform" | Reflects actual team exhibition project context at Thakur Shyamnarayan Degree College. |
| "Production-grade health engine" | "Completed full-stack nutrition tracking application" | Evidence-based description grounded in verified local repository code. |
| "Zero hallucination guarantee" | "Deterministic Python calculation engine to prevent arithmetic errors common in language models" | Accurately describes the hybrid architecture separating deterministic calculations from generative reasoning. |
| "100% precision & zero hallucination AI assistant" | "Grounded portfolio retrieval engine using verified facts and strict prompt isolation" | Accurately represents the server-side retrieval and prompt-templating design. |
| Unverified "100+ tests" | "11 automated pytest integration tests verifying calculation correctness, rate limiting, and database isolation" | Accurately reflects actual automated test count in NutriAI test suite. |

---

## 3. Contact Delivery Mechanism & Privacy Hardening

The contact pipeline (`/api/contact`) has been hardened to eliminate false successes:

- **Configurable Delivery Modes (`CONTACT_DELIVERY_MODE`)**:
  - `database` *(Default)*: Messages are safely inserted into SQLite (`backend/app/data/messages.db`) with generated row ID verification. HTTP 200 is returned **only after** database commitment.
  - `smtp`: Transmits directly to Aditya's inbox via configured SMTP server with TLS. Returns HTTP 200 on server confirmation, or HTTP 503 if unreachable.
  - `unconfigured`: Returns HTTP 503 with an honest message stating server delivery is unconfigured, accompanied by a structured, pre-filled `mailto:` link.
- **Privacy-Preserving Logging**:
  - Email addresses and message bodies are **strictly excluded** from server console logs.
  - Only message character lengths, hashed client identifiers, and internal row IDs are recorded for audit purposes.
- **Pre-filled Client Mailto Fallback**:
  - If a delivery attempt fails or the backend is in `unconfigured` mode, the user is presented with a direct "Open Email Client" button pre-populated with their subject and body text.

---

## 4. AI Assistant Hardening & Role Constraints

The "Ask Aditya AI" service (`/api/chat` and `backend/app/services/llm_provider.py`) has been audited and secured:

- **Strict Role Boundary**:
  - Client conversation history only accepts `role: "user"` or `role: "assistant"`.
  - Any request containing `role: "system"` is rejected with HTTP 422 Unprocessable Entity, preventing client prompt injection.
- **Request & History Caps**:
  - User messages are capped at 1,000 characters.
  - History is capped at 6 messages to protect token limits and prevent prompt flooding.
- **Delimiter Isolation**:
  - User input is isolated inside `<user_query>` XML tags.
  - Verified portfolio records are delimited inside `<verified_portfolio_facts>` tags.
- **Provider Transparency**:
  - Responses clearly indicate whether they were produced by a live LLM (`provider_used: "openai" | "gemini" | "ollama"`) or the rule-based fallback (`provider_used: "portfolio-grounded-fallback"`).
  - Rule-based fallbacks are never misrepresented as live neural networks.

---

## 5. Résumé & Contact Readiness

- **Asynchronous PDF Detection**:
  - `ResumeModal.tsx` performs an asynchronous `HEAD` request to `/Aditya_Gupta_Resume.pdf`.
  - When the PDF is present, the modal displays a "Download Official Résumé (PDF)" button.
  - When the PDF is not yet present, the modal shows an honest "Undergraduate Status (PDF Upload Pending)" alert with a one-click "Request Résumé via Email" pre-filled mailto button.
- **Recruiter Actions**:
  - "Copy Recruiter Contact Email" button with instant visual feedback.
  - Direct LinkedIn profile link.

---

## 6. Items Requiring Aditya's Personal Confirmation

To ensure complete accuracy, the following items should be reviewed and updated by Aditya as new milestones are reached:

- [ ] **Custom Résumé PDF**: Place your formatted PDF résumé at `public/Aditya_Gupta_Resume.pdf`.
- [ ] **Academic GPA / Percentage**: If you wish to display an official GPA or university examination rank, update `src/data/education.ts`.
- [ ] **Certification Credentials**: When course certificates (Coursera, DeepLearning.AI, Kaggle) are issued:
  1. Open `src/data/certificates.ts`.
  2. Fill in the `credentialUrl`, `issuer`, and `date`.
  3. Change `verified: false` to `verified: true`.
- [ ] **Production Domain & CORS**: When deploying to production, set `CORS_ALLOWED_ORIGINS` in your backend environment to your hosted frontend domain (e.g., `https://adityagupta.dev`).
- [ ] **Production LLM Key**: If you wish to use OpenAI or Gemini in production, add `OPENAI_API_KEY` or `GEMINI_API_KEY` to your hosting platform's environment variables.

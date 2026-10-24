from typing import List, Dict, Any, Tuple
import re
from backend.app.knowledge.portfolio_data import PORTFOLIO_PROFILE, VERIFIED_PROJECTS, VERIFIED_SKILLS

def normalize_text(text: str) -> str:
    return re.sub(r'[^a-zA-Z0-9\s]', ' ', text.lower())

def retrieve_portfolio_context(query: str) -> Tuple[str, List[str]]:
    """
    Retrieves grounded portfolio facts based on query keywords.
    Returns (formatted_context_str, list_of_source_identifiers).
    """
    normalized = normalize_text(query)
    tokens = set(normalized.split())

    sources = []
    context_blocks = []

    # 1. Profile & Identity Match
    profile_triggers = {"aditya", "gupta", "who", "bio", "about", "background", "introduce", "intro", "him", "he", "yourself"}
    if tokens & profile_triggers or not tokens:
        sources.append("Profile & Identity")
        context_blocks.append(
            f"Aditya Gupta is an AI/ML enthusiast and developer. "
            f"Headline: {PORTFOLIO_PROFILE['headline']}. "
            f"Location: {PORTFOLIO_PROFILE['location']}."
        )

    # 2. Education & College Match
    education_triggers = {"education", "college", "degree", "bca", "university", "graduate", "graduation", "thakur", "study", "school", "academics"}
    if tokens & education_triggers:
        edu = PORTFOLIO_PROFILE["education"]
        sources.append("Education & Academics")
        context_blocks.append(
            f"Education: Currently pursuing {edu['degree']} at {edu['institution']}. "
            f"Expected graduation: {edu['expected_graduation']}. Current status: {edu['current_status']}. "
            f"Core focus areas: {', '.join(edu['focus_areas'])}."
        )

    # 3. Contact & Social Match
    contact_triggers = {"contact", "email", "reach", "hire", "linkedin", "github", "connect", "message", "touch"}
    if tokens & contact_triggers:
        c = PORTFOLIO_PROFILE["contact"]
        sources.append("Contact Details")
        context_blocks.append(
            f"Contact Information: Email: {c['email']} | LinkedIn: {c['linkedin']} | GitHub: {c['github']}."
        )

    # 4. Objectives & Opportunities Match
    goal_triggers = {"internship", "job", "hiring", "opportunity", "opportunities", "role", "goals", "seeking", "career"}
    if tokens & goal_triggers:
        sources.append("Professional Objectives")
        objs = "; ".join(PORTFOLIO_PROFILE["objectives"])
        context_blocks.append(f"Professional Objectives: {objs}")

    # 5. Project Matching
    for proj in VERIFIED_PROJECTS:
        proj_keywords = set(normalize_text(proj["title"] + " " + proj["id"] + " " + proj["tagline"] + " " + " ".join(proj["tech_stack"])).split())
        
        # Check title direct matches
        title_match = any(word in normalized for word in proj["title"].lower().split())
        keyword_overlap = len(tokens & proj_keywords)

        if title_match or (tokens & {"project", "projects", "built", "portfolio", "work"} and keyword_overlap > 0) or (tokens & {"project", "projects"} and not sources):
            if proj["title"] not in sources:
                sources.append(proj["title"])
                features_summary = "; ".join(proj["verified_features"][:4])
                tech_summary = ", ".join(proj["tech_stack"])
                context_blocks.append(
                    f"Project: {proj['title']} ({proj['status']}).\n"
                    f"Tagline: {proj['tagline']}\n"
                    f"Summary: {proj['summary']}\n"
                    f"Problem: {proj['problem_statement']}\n"
                    f"Solution: {proj['solution']}\n"
                    f"Verified Features: {features_summary}\n"
                    f"Tech Stack: {tech_summary}\n"
                    f"GitHub: {proj['github_url']}"
                )

    # 6. Skill & Technology Matching
    tech_triggers = {"skill", "skills", "tech", "stack", "technology", "python", "fastapi", "flask", "react", "ml", "machine learning", "pandas", "numpy", "ollama", "sqlite", "tools"}
    if tokens & tech_triggers or ("what" in tokens and "use" in tokens):
        matched_categories = []
        for cat_name, skills in VERIFIED_SKILLS.items():
            cat_tokens = set(normalize_text(cat_name).split())
            if tokens & cat_tokens or any(s["name"].lower() in normalized for s in skills):
                matched_categories.append(f"{cat_name}: " + ", ".join([f"{s['name']} ({s['detail']})" for s in skills[:3]]))
        
        if matched_categories:
            sources.append("Technical Skills")
            context_blocks.append("Verified Technical Skills:\n" + "\n".join(matched_categories))
        elif not sources:
            sources.append("Technical Skills")
            all_skills = [s["name"] for cat in VERIFIED_SKILLS.values() for s in cat]
            context_blocks.append("Technical Skills: " + ", ".join(all_skills[:12]))

    # Default fallback context if general query
    if not context_blocks:
        sources.append("General Portfolio Overview")
        context_blocks.append(
            f"Aditya Gupta is an AI/ML enthusiast pursuing a BCA at Thakur Shyamnarayan Degree College (Graduating 2028). "
            f"He develops practical projects including OmniPredict AI (predictive analytics with AI dataset assistant) and NutriAI (FastAPI + local Ollama nutrition assistant with deterministic math). "
            f"Email: {PORTFOLIO_PROFILE['contact']['email']} | GitHub: {PORTFOLIO_PROFILE['contact']['github']}."
        )

    combined_context = "\n\n---\n\n".join(context_blocks)
    return combined_context, sources

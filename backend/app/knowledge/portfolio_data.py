"""
Curated, verified ground-truth portfolio knowledge base for Aditya Gupta.
Used for server-side semantic/keyword retrieval in Ask Aditya AI.
Contains strictly verified facts with zero hallucination.
"""

PORTFOLIO_PROFILE = {
    "name": "Aditya Gupta",
    "headline": "AI/ML Enthusiast | Python | Machine Learning | Data Science | Intelligent Automation",
    "location": "Mumbai, Maharashtra, India",
    "education": {
        "degree": "Bachelor of Computer Applications (BCA)",
        "institution": "Thakur Shyamnarayan Degree College",
        "expected_graduation": "2028",
        "current_status": "Undergraduate Student",
        "focus_areas": [
            "Data Structures & Algorithms",
            "Python Programming",
            "Machine Learning Fundamentals",
            "Database Management & Web Technologies"
        ]
    },
    "interests": [
        "Artificial Intelligence & Machine Learning",
        "Python Application Development",
        "Data Science & Statistical Analysis",
        "Generative AI & LLM Systems",
        "Intelligent Process Automation",
        "Applied Neural Networks"
    ],
    "objectives": [
        "Seeking AI/ML and Python developer internships",
        "Entry-level software engineering and data science opportunities",
        "Collaborating on real-world machine learning and automation projects",
        "Contributing to impactful open-source software"
    ],
    "contact": {
        "email": "adityagupta1624111@gmail.com",
        "linkedin": "https://www.linkedin.com/in/aditya-gupta-aa3373284/",
        "github": "https://github.com/Aditya-ZOD"
    }
}

VERIFIED_PROJECTS = [
    {
        "id": "omnipredict-ai",
        "title": "OmniPredict AI",
        "tagline": "Predict Smarter. Decide Better. Automate Everything.",
        "category": "AI & Machine Learning",
        "status": "Featured Project / Active Development",
        "team": "Team XSpark (Aditya Gupta, Archis Dharne, Neel Davane)",
        "institution": "Thakur Shyamnarayan Degree College (Exhibition Project)",
        "github_url": "https://github.com/Aditya-ZOD/OmniPredictAI",
        "summary": (
            "OmniPredict AI is a unified predictive analytics platform developed in Flask and Python. "
            "It streamlines data preparation, automated problem detection, machine learning model training, "
            "best-model selection, prediction reporting, and natural language dataset exploration."
        ),
        "problem_statement": (
            "Data workflows traditionally require fragmented tools for data cleaning, exploratory analysis, "
            "model training, and predictive inference. This fragmentation causes friction, data transfer delays, "
            "and steep barriers for analysts seeking fast, actionable predictions."
        ),
        "solution": (
            "An autonomous 5-step pipeline (Input -> AI Dataset Assistant -> Omni Copilot -> AI Engine -> Output) "
            "providing an end-to-end interface for dataset ingestion, automated preprocessing, best-model comparison, "
            "and conversational data querying with human-in-the-loop preview confirmations."
        ),
        "verified_features": [
            "CSV dataset ingestion with instant schema and statistical preview",
            "Automatic problem detection (classification vs. regression) and missing value preprocessing",
            "Automated machine learning model training and comparative metric evaluation",
            "Prediction history logging and downloadable reports",
            "AI Dataset Assistant enabling conversational queries on uploaded data with strict preview confirmation before changes",
            "Dark and light theme toggles with persisted user preference"
        ],
        "planned_roadmap": [
            "Cloud-native microservice deployment with containerization",
            "Advanced multimodal AI vision for image-based dataset extraction",
            "Automated time-series forecasting and real-time streaming anomaly detection"
        ],
        "tech_stack": [
            "Python",
            "Flask",
            "Scikit-learn",
            "Pandas",
            "NumPy",
            "OpenAI API",
            "HTML5/CSS3",
            "JavaScript"
        ]
    },
    {
        "id": "nutri-ai",
        "title": "NutriAI",
        "tagline": "Intelligence-Powered Full-Stack Nutrition Platform",
        "category": "Full-Stack AI Application",
        "status": "Completed Full-Stack Project",
        "team": "Solo Project by Aditya Gupta",
        "github_url": "https://github.com/Aditya-ZOD/NutriAI",
        "summary": (
            "NutriAI is a full-stack nutrition assistant application featuring a FastAPI backend, SQLite persistence with WAL mode, "
            "and private local LLM reasoning powered by Ollama. Designed to support Indian and global dietary patterns."
        ),
        "problem_statement": (
            "Most consumer diet apps either force rigid manual logging without context or rely on AI chatbots "
            "that perform inaccurate mathematical calculations for calorie budgets and macro goals."
        ),
        "solution": (
            "A Hybrid Architecture: deterministic Python arithmetic performs calorie and macro calculations to "
            "prevent language model calculation errors, while local Ollama LLMs handle context-aware dietary consultations, allergy filters, and personalized meal planning."
        ),
        "verified_features": [
            "Hybrid Architecture: deterministic Python arithmetic for calorie/macro sums to avoid model arithmetic errors",
            "Context-aware dietary consultations factoring age, height, weight, activity, goals, and allergen exclusions",
            "Food composition database containing 34+ staple Indian and global food items",
            "Meal & macro tracker across 4 daily meal periods with portion multipliers",
            "Water consumption logger with quick-add actions and visual hydration progress",
            "Weight analytics with interactive SVG trend chart",
            "Argon2id password encryption, bearer token session management, and sliding-window rate limiting",
            "Automated pytest integration suite verifying auth, meal calculations, and database isolation"
        ],
        "tech_stack": [
            "Python 3.13+",
            "FastAPI",
            "SQLite (WAL Mode)",
            "Pydantic v2",
            "Ollama (llama3.2:3b / qwen3:8b)",
            "Argon2id",
            "Vanilla JS",
            "CSS3 Design System",
            "Pytest"
        ]
    },
    {
        "id": "heart-disease-prediction",
        "title": "Heart Disease Risk Prediction System",
        "tagline": "Supervised Machine Learning Diagnostic Risk Assessment",
        "category": "Machine Learning & Healthcare",
        "status": "Completed Research & Practical ML Implementation",
        "team": "Aditya Gupta",
        "github_url": "https://github.com/Aditya-ZOD",
        "summary": (
            "A supervised machine learning classification pipeline designed to assess cardiovascular disease risk "
            "using patient clinical metrics such as blood pressure, cholesterol levels, resting ECG, and maximum heart rate."
        ),
        "problem_statement": (
            "Early detection of cardiovascular irregularities is critical for preventative medicine, yet requires synthesizing "
            "multiple correlated clinical biomarkers."
        ),
        "solution": (
            "Implemented end-to-end model benchmarking, hyperparameter tuning with scikit-learn, and an interactive Flask web UI "
            "backed by SQLite prediction auditing."
        ),
        "verified_features": [
            "Dataset exploration and clinical biomarker correlation analysis using Pandas and Matplotlib",
            "Comparative model benchmarking across Logistic Regression, Random Forest, and Ensemble Classifiers",
            "Hyperparameter optimization via GridSearchCV and RandomizedSearchCV",
            "Interactive web interface for clinical factor entry with immediate probability scoring",
            "SQLite database logging historical patient predictions for longitudinal auditing"
        ],
        "tech_stack": [
            "Python",
            "Scikit-learn",
            "Pandas",
            "NumPy",
            "Matplotlib",
            "Flask",
            "SQLite"
        ]
    },
    {
        "id": "retail-billing-inventory",
        "title": "Intelligent Retail Billing & Inventory System",
        "tagline": "Modern Full-Stack Point of Sale & Analytics Solution",
        "category": "Full-Stack Development",
        "status": "Completed Application Architecture",
        "team": "Aditya Gupta",
        "github_url": "https://github.com/Aditya-ZOD",
        "summary": (
            "A robust retail billing and inventory management software providing instant invoice calculation, product catalog management, "
            "low-stock alerts, and daily sales analytics."
        ),
        "problem_statement": (
            "Small and medium retail businesses frequently struggle with slow manual billing, stock discrepancies, and lack of real-time sales visibility."
        ),
        "solution": (
            "A reactive full-stack POS application that combines a FastAPI REST backend with a modern React frontend for lightning-fast barcode/SKU checkout."
        ),
        "verified_features": [
            "High-speed POS billing engine with instant tax and discount computation",
            "Real-time inventory decrement and low-stock notification triggers",
            "Comprehensive product catalog management with category filtering",
            "Invoice generation with downloadable receipt data",
            "Sales metrics visualization dashboard for tracking daily revenue"
        ],
        "tech_stack": [
            "Python",
            "FastAPI",
            "React",
            "TypeScript",
            "SQLite / PostgreSQL",
            "Tailwind CSS"
        ]
    }
]

VERIFIED_SKILLS = {
    "Programming": [
        {"name": "Python", "detail": "Primary language for AI/ML, backend APIs (FastAPI/Flask), data analysis, and automation scripts.", "verified": True},
        {"name": "C++", "detail": "Core understanding of object-oriented programming, data structures, and algorithmic logic.", "verified": True},
        {"name": "JavaScript / TypeScript", "detail": "Modern ES6+, TypeScript type safety, async DOM handling, and frontend architecture.", "verified": True},
        {"name": "SQL", "detail": "Relational schema design, queries, SQLite WAL mode, indexing, and transactional isolation.", "verified": True}
    ],
    "AI & Machine Learning": [
        {"name": "Machine Learning", "detail": "Supervised classification, regression, model benchmarking, validation, and metrics (Precision, Recall, ROC-AUC).", "verified": True},
        {"name": "Scikit-learn", "detail": "Pipeline preprocessing, StandardScaler, OneHotEncoder, Random Forest, Logistic Regression, GridSearchCV.", "verified": True},
        {"name": "Automated Problem Detection", "detail": "Implemented in OmniPredict AI for dynamic dataset inspection and target feature evaluation.", "verified": True},
        {"name": "Model Hub Architecture", "detail": "Model saving, loading, versioning, and inference orchestration in Python applications.", "verified": True}
    ],
    "Data Science & Analysis": [
        {"name": "Pandas", "detail": "DataFrame manipulation, grouping, aggregations, missing value imputation, and feature engineering.", "verified": True},
        {"name": "NumPy", "detail": "Vectorized computations, multi-dimensional array operations, and numerical linear algebra routines.", "verified": True},
        {"name": "Matplotlib / Seaborn", "detail": "Exploratory data visualization, distributions, correlation heatmaps, and trend charts.", "verified": True},
        {"name": "Feature Engineering", "detail": "Outlier detection, categorical encoding, feature scaling, and correlation filtering.", "verified": True}
    ],
    "Generative AI & NLP": [
        {"name": "Local LLM Integration", "detail": "Integrated Ollama (llama3.2:3b, qwen3:8b) for private, zero-cost, context-grounded consultations.", "verified": True},
        {"name": "OpenAI / Gemini API Integration", "detail": "Integrated LLMs for natural language dataset queries with structured preview confirmation.", "verified": True},
        {"name": "Hybrid Architectures", "detail": "Mitigating calculation errors by coupling deterministic Python arithmetic with LLM contextual reasoning.", "verified": True},
        {"name": "Prompt Engineering & Guardrails", "detail": "Strict system prompts, clinical boundary enforcement, and grounded factual retrieval.", "verified": True}
    ],
    "Web Development & Backend": [
        {"name": "FastAPI", "detail": "Modern asynchronous REST APIs, Pydantic v2 validation, CORS, bearer auth, and dependency injection.", "verified": True},
        {"name": "Flask", "detail": "Application routing, Jinja templating, WSGI deployment, and session management.", "verified": True},
        {"name": "React & Vite", "detail": "Component hierarchy, modern hooks, responsive layouts, motion dynamics, and performance optimization.", "verified": True},
        {"name": "Tailwind CSS", "detail": "Utility-first design systems, responsive breakpoints, dark themes, and glassmorphism styling.", "verified": True}
    ],
    "Tools & Platforms": [
        {"name": "Git & GitHub", "detail": "Version control, branching, repository management (Aditya-ZOD), and team collaboration.", "verified": True},
        {"name": "VS Code & Antigravity IDE", "detail": "Primary development environments with advanced linting, debugging, and AI workflows.", "verified": True},
        {"name": "Pytest", "detail": "Writing automated unit and integration tests (11 tests in NutriAI, custom test suites).", "verified": True},
        {"name": "Argon2 / Security Practices", "detail": "OWASP cryptographic password hashing, bearer session management, and sliding-window rate limiters.", "verified": True}
    ]
}

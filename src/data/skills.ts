import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    description: "Core languages utilized for machine learning, backend services, and algorithmic problem solving.",
    icon: "Code2",
    skills: [
      {
        name: "Python",
        detail: "Primary language for AI/ML pipelines, FastAPI/Flask backends, data wrangling with Pandas, and automated scripts.",
        verified: true,
        featuredProject: "NutriAI & OmniPredict AI",
        featuredProjectLink: "#projects"
      },
      {
        name: "C++",
        detail: "Strong foundations in object-oriented programming, data structures, pointer mechanics, and algorithmic efficiency.",
        verified: true
      },
      {
        name: "JavaScript & TypeScript",
        detail: "Building responsive, strongly typed frontend interfaces, async DOM interaction, and modern component systems.",
        verified: true,
        featuredProject: "Aditya's Cosmos & POS",
        featuredProjectLink: "#projects"
      },
      {
        name: "SQL",
        detail: "Relational database schema design, indexing, foreign key constraints, and transactional persistence in SQLite and PostgreSQL.",
        verified: true,
        featuredProject: "NutriAI (SQLite WAL)",
        featuredProjectLink: "#projects"
      }
    ]
  },
  {
    title: "AI & Machine Learning",
    description: "Practical predictive modeling, model benchmarking, and intelligent system architectures.",
    icon: "BrainCircuit",
    skills: [
      {
        name: "Supervised Learning",
        detail: "Classification, regression, cross-validation, and metrics evaluation (ROC-AUC, Precision, Recall, F1-Score).",
        verified: true,
        featuredProject: "Heart Disease Prediction",
        featuredProjectLink: "#projects"
      },
      {
        name: "Scikit-learn",
        detail: "Pipeline preprocessing, StandardScaler, OneHotEncoder, Random Forest, Logistic Regression, and hyperparameter tuning.",
        verified: true,
        featuredProject: "OmniPredict AI",
        featuredProjectLink: "#projects"
      },
      {
        name: "Automated Problem Detection",
        detail: "Dynamic dataset inspection, automatic target feature profiling, and automated model comparison.",
        verified: true,
        featuredProject: "OmniPredict AI",
        featuredProjectLink: "#projects"
      },
      {
        name: "Model Hub Architecture",
        detail: "Saving, serializing, versioning, and deploying machine learning models into live inference services.",
        verified: true,
        featuredProject: "OmniPredict AI",
        featuredProjectLink: "#projects"
      }
    ]
  },
  {
    title: "Data Science & Analysis",
    description: "Transforming raw heterogeneous data into clean features and actionable statistical insights.",
    icon: "BarChart3",
    skills: [
      {
        name: "Pandas",
        detail: "Data manipulation, group-by aggregations, missing value imputation, multi-index operations, and time-series indexing.",
        verified: true,
        featuredProject: "OmniPredict AI",
        featuredProjectLink: "#projects"
      },
      {
        name: "NumPy",
        detail: "High-performance vectorized computations, matrix operations, and numerical linear algebra routines.",
        verified: true,
        featuredProject: "NutriAI Arithmetic Engine",
        featuredProjectLink: "#projects"
      },
      {
        name: "Matplotlib & Seaborn",
        detail: "Exploratory data visualization, correlation heatmaps, feature distributions, and diagnostic evaluation plots.",
        verified: true,
        featuredProject: "Heart Disease Analysis",
        featuredProjectLink: "#projects"
      },
      {
        name: "Feature Engineering",
        detail: "Outlier filtering, categorical encoding, polynomial features, and correlation-based dimensionality reduction.",
        verified: true,
        featuredProject: "OmniPredict AI",
        featuredProjectLink: "#projects"
      }
    ]
  },
  {
    title: "Generative AI & LLM Systems",
    description: "Integrating and grounding large language models into robust production software.",
    icon: "Sparkles",
    skills: [
      {
        name: "Local LLM Integration (Ollama)",
        detail: "Running private, cost-free local models (llama3.2:3b, qwen3:8b) for contextual reasoning and advice without external API costs.",
        verified: true,
        featuredProject: "NutriAI",
        featuredProjectLink: "#projects"
      },
      {
        name: "Hybrid Architecture",
        detail: "Pairing deterministic Python arithmetic with LLM contextual reasoning to prevent numerical calculation errors.",
        verified: true,
        featuredProject: "NutriAI",
        featuredProjectLink: "#projects"
      },
      {
        name: "OpenAI & Gemini API Integration",
        detail: "Connecting server-side LLMs for dataset question answering with bounded samples and human-in-the-loop preview confirmation.",
        verified: true,
        featuredProject: "OmniPredict AI & Portfolio Assistant",
        featuredProjectLink: "#projects"
      },
      {
        name: "Prompt Engineering & Guardrails",
        detail: "Strict system prompt design, clinical boundary enforcement, structured JSON outputs, and grounded factual retrieval.",
        verified: true,
        featuredProject: "Ask Aditya AI",
        featuredProjectLink: "#ask-ai"
      }
    ]
  },
  {
    title: "Web Development & Backend",
    description: "Building modern, scalable, and responsive web applications with clean separation of concerns.",
    icon: "Layers",
    skills: [
      {
        name: "FastAPI",
        detail: "Modern asynchronous REST endpoints, Pydantic v2 data validation, CORS middleware, and dependency injection.",
        verified: true,
        featuredProject: "NutriAI & Portfolio Backend",
        featuredProjectLink: "#projects"
      },
      {
        name: "Flask",
        detail: "WSGI application development, Jinja templating, routing, file upload handling, and session state.",
        verified: true,
        featuredProject: "OmniPredict AI",
        featuredProjectLink: "#projects"
      },
      {
        name: "React & Vite",
        detail: "Component hierarchy, modern hooks, responsive layouts, motion dynamics, and production bundle optimization.",
        verified: true,
        featuredProject: "Aditya's Cosmos",
        featuredProjectLink: "#hero"
      },
      {
        name: "Tailwind CSS",
        detail: "Utility-first design systems, responsive breakpoints, dark themes, and glassmorphism styling.",
        verified: true,
        featuredProject: "Aditya's Cosmos",
        featuredProjectLink: "#hero"
      }
    ]
  },
  {
    title: "Tools & Engineering Practices",
    description: "Development workflows, version control, security standards, and automated testing.",
    icon: "Terminal",
    skills: [
      {
        name: "Git & GitHub",
        detail: "Version control, branching, repository management under github.com/Aditya-ZOD, and team collaboration.",
        verified: true
      },
      {
        name: "Pytest & Automated Testing",
        detail: "Unit and integration test suites, fixture mocking, regression testing, and assertion suites (11 tests in NutriAI).",
        verified: true,
        featuredProject: "NutriAI Test Suite",
        featuredProjectLink: "#projects"
      },
      {
        name: "Argon2 & Application Security",
        detail: "OWASP-recommended cryptographic password hashing, bearer session management, and sliding-window rate limiters.",
        verified: true,
        featuredProject: "NutriAI Security Engine",
        featuredProjectLink: "#projects"
      },
      {
        name: "VS Code & Antigravity IDE",
        detail: "Modern developer tooling, linting, debugging, virtual environments, and agentic pair programming.",
        verified: true
      }
    ]
  }
];

import type { ProjectData } from '../types';

export const projectsData: ProjectData[] = [
  {
    id: "omnipredict-ai",
    title: "OmniPredict AI",
    tagline: "Predict Smarter. Decide Better. Automate Everything.",
    category: "AI & Machine Learning",
    status: "Featured / Exhibition Project",
    featured: true,
    team: "Team XSpark (Aditya Gupta, Archis Dharne, Neel Davane)",
    institution: "Thakur Shyamnarayan Degree College",
    githubUrl: "https://github.com/Aditya-ZOD/OmniPredictAI",
    summary: "A unified predictive analytics platform bringing data, intelligence, prediction, and automation together in one ecosystem — helping users understand datasets, train ML models, generate predictions, and make smarter decisions faster.",
    problemStatement: "AI and data science workflows often require multiple disjoint tools for preparation, exploratory analysis, model training, prediction, and automation, making the entire journey complex and time-consuming.",
    solution: "OmniPredict AI introduces an autonomous 5-step pipeline (Input -> AI Dataset Assistant -> Omni Copilot -> AI Engine -> Output) that consolidates dataset ingestion, automatic problem detection, model training, and natural language dataset exploration with human-in-the-loop preview confirmations.",
    verifiedFeatures: [
      "Dataset ingestion with automatic column profiling and missing value detection",
      "Automatic classification vs. regression problem determination",
      "Automated ML model training, benchmarking, and best-model recommendation using scikit-learn",
      "AI Dataset Assistant enabling conversational queries with bounded preview and user confirmation before data writes",
      "Prediction history logging and downloadable analysis reports",
      "Dark and light theme toggling with persistent user preference storage"
    ],
    plannedRoadmap: [
      "Cloud-native microservice deployment with containerized worker nodes",
      "Advanced multimodal AI vision for tabular data extraction from documents",
      "Automated time-series forecasting engine with live streaming anomaly detection"
    ],
    techStack: [
      "Python",
      "Flask",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "OpenAI API",
      "HTML5/CSS3",
      "JavaScript"
    ],
    keyDecisions: [
      "Implemented human-in-the-loop preview confirmation for dataset assistant edits to prevent unintended dataset corruption.",
      "Used scikit-learn pipelines with unified scalers and encoders to eliminate data leakage between train and test splits.",
      "Engineered an autonomous 5-step pipeline architecture for clear separation of ingestion, analysis, and inference."
    ],
    challengesLearned: [
      "Handling mixed-type columns and non-standard missing values across heterogeneous CSV uploads.",
      "Managing LLM response formatting to reliably produce machine-parseable dataset modification instructions.",
      "Optimizing model training response times on commodity hardware during live college exhibition demos."
    ]
  },
  {
    id: "nutri-ai",
    title: "NutriAI",
    tagline: "Intelligence-Powered Full-Stack Nutrition Platform",
    category: "Full-Stack Development",
    status: "Completed Full-Stack Project",
    featured: true,
    team: "Solo Project by Aditya Gupta",
    githubUrl: "https://github.com/Aditya-ZOD/NutriAI",
    summary: "A full-stack nutrition assistant application featuring a FastAPI backend, secure SQLite persistence with WAL mode, and private local LLM reasoning powered by Ollama — designed to support Indian and global dietary patterns.",
    problemStatement: "Conventional diet applications often struggle with two distinct issues: rigid manual tracking that ignores user context, or AI wrappers that perform unreliable mathematical calculations for calorie budgets and macro goals.",
    solution: "Engineered a Hybrid Architecture: deterministic Python arithmetic performs calorie, macro, and hydration math to eliminate calculation errors common in language model generations, while local Ollama models (llama3.2:3b / qwen3:8b) provide context-aware dietary consultations and structured meal planning.",
    verifiedFeatures: [
      "Hybrid Architecture: deterministic Python arithmetic for calorie/macro math to avoid LLM calculation errors",
      "Context-aware dietary consultations factoring age, height, weight, activity, goals, and allergen exclusions",
      "Food composition database of 34+ staple Indian and global food items",
      "Meal & macro tracking across 4 daily meal periods with portion multipliers",
      "Hydration tracking with quick-add actions (+250ml glass, +500ml bottle) and daily target progress",
      "Interactive SVG weight progress trend chart",
      "Argon2id password hashing, cryptographic session tokens, and sliding-window rate limiting",
      "Automated pytest integration suite verifying auth, meal logic, and user data isolation"
    ],
    plannedRoadmap: [
      "Barcode scanning integration with open food databases",
      "Continuous glucose monitor (CGM) data import and glycemic response modeling",
      "Recipe builder with automatic nutritional breakdown estimation"
    ],
    techStack: [
      "Python 3.13+",
      "FastAPI",
      "SQLite (WAL Mode)",
      "Pydantic v2",
      "Ollama",
      "Argon2id",
      "Vanilla JS",
      "CSS3 Design System",
      "Pytest"
    ],
    keyDecisions: [
      "Decoupled numerical computation from LLM prompts to ensure dependable mathematical accuracy for calorie budgets.",
      "Adopted Argon2id password hashing and session tokens with expiration and HttpOnly security.",
      "Implemented graceful offline fallback so analytical dashboard queries remain operational even if Ollama is paused."
    ],
    challengesLearned: [
      "Architecting SQLite with Write-Ahead Logging (WAL) to support concurrent background writes without database lockups.",
      "Enforcing clinical safety boundaries: refusing crash diets below medical minimums and tagging estimates transparently.",
      "Writing an automated pytest integration suite covering database isolation and sliding-window rate limiting."
    ]
  },
  {
    id: "heart-disease-prediction",
    title: "Heart Disease Risk Prediction System",
    tagline: "Supervised Machine Learning Diagnostic Risk Assessment",
    category: "AI & Machine Learning",
    status: "Completed Practical ML Pipeline",
    featured: false,
    team: "Aditya Gupta",
    githubUrl: "https://github.com/Aditya-ZOD",
    summary: "An end-to-end supervised machine learning classification pipeline for cardiovascular risk assessment using clinical biomarkers like cholesterol, resting ECG, blood pressure, and maximum heart rate.",
    problemStatement: "Cardiovascular conditions remain a leading global health concern; clinical decision support tools are needed to help identify high-risk markers early and reproducibly.",
    solution: "Built a complete exploratory data analysis, feature engineering, and model benchmarking suite in scikit-learn, with an interactive Flask web UI and SQLite prediction auditing.",
    verifiedFeatures: [
      "Clinical biomarker distribution and correlation analysis using Pandas and Matplotlib",
      "Comparative benchmarking across Logistic Regression, Random Forest, and Ensemble Classifiers",
      "Hyperparameter optimization using GridSearchCV and cross-validation",
      "Interactive web interface for inputting patient clinical metrics with immediate probability scoring",
      "SQLite database storing historical predictions for auditability"
    ],
    plannedRoadmap: [
      "Integration of SHAP (SHapley Additive exPlanations) for local model interpretability",
      "Expanded multi-hospital dataset validation"
    ],
    techStack: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Flask",
      "SQLite"
    ],
    keyDecisions: [
      "Selected recall and ROC-AUC as primary optimization metrics over raw accuracy to minimize false negatives in medical screening.",
      "Standardized numeric features with StandardScaler inside a scikit-learn Pipeline to guarantee reproducible evaluation."
    ],
    challengesLearned: [
      "Interpreting feature importance scores and balancing model complexity against clinical explainability.",
      "Validating model predictions against outlier patient clinical biomarker values."
    ]
  },
  {
    id: "retail-billing-inventory",
    title: "Intelligent Retail Billing & Inventory System",
    tagline: "Modern Full-Stack Point of Sale & Analytics Solution",
    category: "Intelligent Automation",
    status: "Completed Full-Stack Architecture",
    featured: false,
    team: "Aditya Gupta",
    githubUrl: "https://github.com/Aditya-ZOD",
    summary: "A reactive full-stack retail management solution combining a high-performance FastAPI REST backend with a modern React frontend for lightning-fast checkout, inventory decrementing, and sales analytics.",
    problemStatement: "Small and medium retail establishments often suffer from slow manual ledger billing, stock discrepancies, and delayed revenue tracking.",
    solution: "Engineered an integrated billing terminal that performs instant tax and discount computations, synchronizes inventory stock in real-time, and provides visual revenue reporting.",
    verifiedFeatures: [
      "Fast POS checkout engine with automatic tax calculation and discount rules",
      "Real-time inventory deduction with configurable low-stock alert thresholds",
      "Structured product catalog management with category filtering and SKU lookup",
      "Printable receipt generation and downloadable invoice data",
      "Sales metrics dashboard tracking daily transactions and top-performing items"
    ],
    plannedRoadmap: [
      "Hardware barcode scanner driver integration via WebHID",
      "Multi-store inventory synchronization with cloud database replication"
    ],
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "SQLite / PostgreSQL",
      "Tailwind CSS"
    ],
    keyDecisions: [
      "Used FastAPI with Pydantic schemas for instant API validation and OpenAPI documentation.",
      "Adopted atomic database transactions during checkout to prevent inventory over-selling."
    ],
    challengesLearned: [
      "Structuring relational database schemas to efficiently handle line items, invoices, and stock updates.",
      "Designing responsive POS interface layouts optimized for keyboard-only and touch-screen operation."
    ]
  }
];

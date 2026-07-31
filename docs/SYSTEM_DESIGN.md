# System Design Architecture - AgriGuardian AI

---

## 🌐 1. High-Level Architecture

AgriGuardian AI is designed using **Clean Architecture** and **Domain-Driven Design (DDD)** principles to ensure scalability, fault isolation, and high performance.

```mermaid
graph TD
    User[Farmer / Agronomist / Admin] -->|Mobile / Web App| Gateway[Render Cloud Nginx / Gateway]
    Gateway -->|HTTPS / SSL| SecurityMiddleware[JWT Auth & SlowAPI Rate Limiter]
    SecurityMiddleware --> FastAPIApp[FastAPI Async Core Server]
    
    subgraph Core Services Layer
        FastAPIApp --> AuthService[Auth & User Service]
        FastAPIApp --> FarmService[Farm & Crop Service]
        FastAPIApp --> IntelligenceService[Weather & Market Service]
        FastAPIApp --> SchemeService[Government Scheme Engine]
    end

    subgraph AgriGuardian AI Intelligence Suite
        FastAPIApp --> XAIEngine[Explainable AI Engine]
        XAIEngine --> DiseaseDetector[Disease Classification Engine]
        XAIEngine --> AgriTwin[AgriTwin Digital Twin Simulator]
        XAIEngine --> YieldPredictor[Yield & Pest Predictor]
        XAIEngine --> ChatbotEngine[Multilingual Agronomist Chatbot]
        XAIEngine --> NationalIntel[National Crop Intelligence Engine]
    end

    AuthService --> MongoDB[(MongoDB Atlas Cluster)]
    FarmService --> MongoDB
    ChatbotEngine --> MongoDB
    IntelligenceService --> ExternalAPIs[Weather & Ag-Market External Feeds]
```

---

## 🎨 2. Frontend Architecture

The frontend (Web / Mobile PWA) follows a component-driven pattern with state management:

```mermaid
graph LR
    UI[UI Views / Web & Mobile] --> Components[Reusable UI Components]
    Components --> AuthContext[Auth State / JWT Context]
    Components --> APIService[Axios / Fetch API Client]
    APIService -->|JSON / Bearer Token| Backend[AgriGuardian Backend]
```

---

## ⚡ 3. Backend Architecture

The backend implements a 3-tier modular architecture separating Routing, Services, and Data Access:

```mermaid
graph TD
    Client -->|HTTP Request| Router[API Router / api/v1/]
    Router -->|Validate DTO| Middleware[Logging & Auth Middleware]
    Middleware -->|Inject Dependency| Controller[Route Handlers]
    Controller -->|Business Logic| Service[Service Layer]
    Service -->|AI Inference| AIEngine[AI Pipeline / XAI Formatter]
    Service -->|Database Operations| Motor[MongoDB Motor Async Client]
    Motor --> DB[(MongoDB Atlas)]
```

---

## 🗄️ 4. Database Schema (MongoDB Collections)

```mermaid
erDiagram
    USERS ||--o{ FARMS : owns
    FARMS ||--o{ CROPS : contains
    FARMS ||--o{ DISEASE_HISTORY : records
    USERS ||--o{ CHAT_HISTORY : engages

    USERS {
        ObjectId _id
        string full_name
        string email
        string hashed_password
        string role
        string state
        string district
    }

    FARMS {
        ObjectId _id
        string owner_id
        string name
        object location
        double total_area_acres
        object soil
    }

    CROPS {
        ObjectId _id
        string farm_id
        string crop_name
        string variety
        double area_allocated_acres
        string growth_stage
    }

    DISEASE_HISTORY {
        ObjectId _id
        string farm_id
        string disease_detected
        string severity_level
        double confidence_score
        string explanation
    }

    CHAT_HISTORY {
        ObjectId _id
        string user_id
        string session_id
        string sender
        string message_text
    }
```

---

## 🔐 5. Authentication Flow

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as Farmer / User
    participant App as Frontend App
    participant AuthAPI as Auth Controller
    participant Security as Security Service
    participant DB as MongoDB

    Farmer->>App: Input Email & Password
    App->>AuthAPI: POST /api/v1/auth/login
    AuthAPI->>DB: Query User by Email
    DB-->>AuthAPI: User Document & Hashed Password
    AuthAPI->>Security: Verify Password (Bcrypt)
    Security-->>AuthAPI: Valid Password
    AuthAPI->>Security: Generate JWT Token (Sub, Exp, Role)
    Security-->>AuthAPI: JWT Access Token
    AuthAPI-->>App: 200 OK (Token + User Object)
    App->>Farmer: Authenticated Dashboard Access
```

---

## 🤖 6. AI Workflow & Explainable AI (XAI) Pipeline

```mermaid
flowchart TD
    Input[Input Request: Crop Symptoms / Imagery / Weather] --> Process[Input Validation & Context Enrichment]
    Process --> AIEngine[AI Diagnostic / Prediction Engine]
    AIEngine --> ModelInference[Run Multi-factorial Algorithm]
    ModelInference --> XAIFormatter[Explainable AI XAI Standard Formatter]
    
    subgraph XAI Contract Guarantee
        XAIFormatter --> Exp["1. Explanation Rationale (Why)"]
        XAIFormatter --> Conf["2. Confidence Score (0.0 - 1.0)"]
        XAIFormatter --> Risk["3. Identified Possible Risks"]
        XAIFormatter --> Action["4. Recommended Actionable Steps"]
    end
    
    XAIContract[XAI Standard JSON Response] --> DBLog[Log History in MongoDB]
    XAIContract --> ClientResponse[Return Clean JSON to Client]
```

---

## 📂 7. Project Folder Structure

```
c:\Users\SHALONI\OneDrive\Documents\AgriGuardian-AI\
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── agritwin.py
│   │   │   ├── auth.py
│   │   │   ├── chatbot.py
│   │   │   ├── crops.py
│   │   │   ├── disease.py
│   │   │   ├── farms.py
│   │   │   ├── market.py
│   │   │   ├── national_intelligence.py
│   │   │   ├── predictions.py
│   │   │   ├── schemes.py
│   │   │   ├── users.py
│   │   │   └── weather.py
│   │   └── router.py
│   ├── ai/
│   │   ├── agritwin_engine.py
│   │   ├── chatbot_engine.py
│   │   ├── disease_detector.py
│   │   ├── explainable_ai.py
│   │   ├── national_intel.py
│   │   ├── pest_predictor.py
│   │   └── yield_predictor.py
│   ├── config/
│   │   └── settings.py
│   ├── database/
│   │   └── mongodb.py
│   ├── middleware/
│   │   ├── logging_middleware.py
│   │   └── rate_limiter.py
│   ├── models/
│   │   ├── chat.py
│   │   ├── common.py
│   │   ├── crop.py
│   │   ├── disease.py
│   │   ├── farm.py
│   │   ├── recommendation.py
│   │   ├── scheme.py
│   │   ├── user.py
│   │   └── weather.py
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── chat_service.py
│   │   ├── crop_service.py
│   │   ├── farm_service.py
│   │   ├── market_service.py
│   │   ├── scheme_service.py
│   │   ├── user_service.py
│   │   └── weather_service.py
│   └── utils/
│       ├── exceptions.py
│       ├── logger.py
│       └── security.py
├── docs/
│   └── SYSTEM_DESIGN.md
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── main.py
├── README.md
├── render.yaml
└── requirements.txt
```

---

## 🚀 8. Deployment Architecture

```mermaid
graph TD
    Git[Git Repository] -->|Push to main| Render[Render Web Service CI/CD]
    Render -->|Build Container| Docker[Slim Python 3.11 Docker Image]
    Docker -->|Launch| Instance[Uvicorn Async Worker Server]
    Instance -->|SSL Connection| MongoAtlas[(MongoDB Atlas Multi-Region Cluster)]
```

# AgriGuardian AI - Backend Service

An enterprise-grade, scalable, production-ready FastAPI & MongoDB backend for **AgriGuardian AI** — an AI-powered agricultural intelligence platform.

---

## 🌟 Features & AI Capabilities

- **JWT Authentication & User Management**: Secure role-based authorization (Farmer, Agronomist, Admin) with argon2/bcrypt password hashing.
- **Farm & Crop Management**: Geo-spatial location tracking, soil profile evaluation, and crop growth stage monitoring.
- **Crop Disease Detection Engine**: Leaf symptom and visual classification with Explainable AI (XAI) recommendations, organic remedies, and chemical treatments.
- **AgriTwin Digital Twin Engine**: Physics-based simulation of soil moisture decay, evapotranspiration, and 48-hour irrigation urgency.
- **National Crop Intelligence Engine**: Macro-regional agricultural analytics, satellite greenness (NDVI) monitoring, and trans-boundary pest warning systems.
- **Government Scheme Recommendation API**: Profile-based matching engine for central and state subsidy schemes.
- **Multilingual AI Agronomist Chatbot**: Conversational assistant with persistent chat session history.
- **Predictive AI Engine**: Multi-factorial crop yield forecasting and pest outbreak risk estimation models.

---

## 🏗️ Project Architecture

```
AgriGuardian-AI/
├── app/
│   ├── api/                  # API Controllers & Routers
│   │   └── routes/           # Endpoint handlers (auth, farms, disease, etc.)
│   ├── models/               # MongoDB & Pydantic v2 Schemas
│   ├── services/             # Core Business Logic Layer
│   ├── ai/                   # Modular AI Engines & XAI Formatter
│   ├── database/             # MongoDB Motor async client setup
│   ├── middleware/           # Logging & Rate Limiting Middlewares
│   ├── config/               # Settings & Environment configs
│   └── utils/                # Security, JWT, Logger & Exception utilities
├── docs/
│   └── SYSTEM_DESIGN.md      # Comprehensive Architecture & Hackathon Presentation
├── main.py                   # FastAPI Application Entrypoint
├── Dockerfile                # Multi-stage Docker build
├── docker-compose.yml        # Multi-container orchestration
├── render.yaml               # Render Deployment Blueprint
└── requirements.txt          # Production Python Dependencies
```

---

## 🚀 Quick Start

### Local Setup with Virtual Environment

1. **Clone & Setup Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Run Server**:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

3. **Access Interactive API Docs**:
   - Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
   - ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🐳 Docker Setup

Run the entire backend stack with local MongoDB using Docker Compose:

```bash
docker-compose up --build
```

---

## ☁️ Deployment on Render

This project is deployment-ready for [Render](https://render.com). Simply connect your repository and Render will automatically detect `render.yaml`.

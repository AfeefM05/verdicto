# Verdicto ⚖️🇮🇳 — AI Legal Platform

<p align="center"><strong>
AI-powered legal platform with case predictions, contract analysis, RAG assistant, document generation, and automated sorting — purpose-built for Indian law.
</strong></p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0.100+-009639?logo=fastapi&logoColor=white" />
  <img alt="Python" src="https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss&logoColor=white" />
  <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn/ui-Components-111?logo=radixui&logoColor=white" />
  <img alt="Vercel AI SDK" src="https://img.shields.io/badge/Vercel%20AI%20SDK-Gemini-000?logo=vercel&logoColor=white" />
</p>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and Python 3.10+
- Google API Key for Gemini Pro
- Internet connection for AI services and legal data scraping

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/verdicto.git
cd verdicto

# Backend Setup
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Frontend Setup  
cd ../frontend
npm install
```

### Environment Configuration

**Backend (`backend/.env`)**
```env
GOOGLE_API_KEY=your_google_gemini_api_key_here
PORT=7860
```

**Frontend (`frontend/.env.local`)**
```env
NEXT_PUBLIC_API_URL=http://localhost:7860
GOOGLE_API_KEY=your_google_gemini_api_key_here
```

### Running the Application

```bash
# Terminal 1: Start Backend
cd backend
uvicorn app:app --host 0.0.0.0 --port 7860

# Terminal 2: Start Frontend
cd frontend  
npm run dev
```

Access the application at 👉 `http://localhost:3000`

---

## ✨ Features Overview

| Feature | Description |
|---------|-------------|
| 🔮 **Case Predictions** | Outcome likelihood (0–100), timeline estimation, and factor breakdown tuned for Indian courts (IPC/CrPC, precedents, procedures). |
| 📄🛡️ **Smart Contract Analyzer** | PDF upload with OCR, clause-level risk analysis, regulatory compliance checks, and JSON-formatted insights. |
| 📚🧠 **Process-Aware RAG Assistant** | Graph + Vector retrieval for step-by-step legal guidance with government portal integration and multilingual support. |
| 📝 **Document Generation** | AI-powered creation of legal documents (NDAs, agreements) with Indian law compliance and quality validation. |
| 📂 **Intelligent Document Sorting** | Automatic classification and chronological organization of legal files with metadata extraction. |
| 🗓️ **Advanced Timeline Visualization** | Visual representation of case stages, delays, and expected ranges for complex legal matters. |

---

## 🏗️ Architecture & APIs

### Frontend (Next.js App)

**Tech Stack:** Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui  

**Key Routes:**
- `/dashboard` → Main dashboard with feature modules
- `/predictions` → Case outcome prediction interface  
- `/contracts` → Contract analysis and upload
- `/assistant` → RAG-based legal chatbot
- `/documents` → Document generation and management
- `/timeline` → Visual case timeline

**API Integration:**
- All external services proxied through Next.js API routes for privacy  
- Real-time chat interface with streaming responses  
- File upload handling with progress indicators  

---

### Backend (FastAPI Server)

**Tech Stack:** FastAPI + Python 3.10+ + FAISS + Google Gemini  

**Core Services:**

| Endpoint | Method | Purpose | Input/Output |
|----------|--------|---------|--------------|
| `/health` | GET | Health check and status | → Status + timestamp |
| `/predict` | POST | Case outcome prediction | `{"case": "text"}` → `{"probability", "timeline", "features"}` |
| `/analyze` | POST | Contract risk analysis | PDF upload → Risk score + clause analysis |
| `/assistant` | POST | Legal RAG chatbot | `{"query": "text"}` → Response + citations |
| `/generate` | POST | Document generation | Template data → Generated document |

**AI Pipeline:**
1. **Query Processing** → Gemini Pro for intent classification  
2. **Legal Data Scraping** → Indian Kanoon + government portals  
3. **Vector Search** → FAISS embeddings for similarity matching  
4. **Response Generation** → Structured JSON outputs with citations  

---

## 🗂️ Project Structure

```
verdicto/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable UI components  
│   │   ├── lib/             # Utilities and API clients
│   │   └── types/           # TypeScript type definitions
│   ├── public/              # Static assets
│   └── package.json
│
└── backend/                  # FastAPI backend services
    ├── app.py                # Main FastAPI application
    ├── predictor.py          # Case prediction logic
    ├── kanon_api.py          # Indian Kanoon scraper
    ├── vectorstore.py        # FAISS vector operations
    ├── contract_analyzer.py  # Contract analysis module
    ├── rag_assistant.py      # RAG chatbot implementation
    └── requirements.txt      # Python dependencies
```

---

## 🔧 Key Technologies & APIs

### AI & ML
- **Google Gemini Pro** — Primary LLM for analysis and generation  
- **FAISS** — Vector similarity search for legal precedents  
- **Sentence Transformers** — Text embeddings for semantic search  
- **Custom Legal NER** — Named entity recognition for Indian legal terms  

### Data Sources & Scraping
- **Indian Kanoon** — 3M+ legal cases and judgments  
- **e-Courts Portal** — Real-time case status and documents  
- **NALSA Portal** — Legal aid processes and forms  
- **Government APIs** — Consumer protection, RTI procedures  

### Frontend
- Next.js 14 + TypeScript  
- Tailwind CSS + shadcn/ui  
- React Hook Form + Zod for validation  

### Backend
- FastAPI + Pydantic + asyncio  
- BeautifulSoup4 + Scrapy for scraping  

---

## 🧠 How It Works

### 1. Case Prediction
```
User Input → Gemini Query Generation → Indian Kanoon Scraping → 
FAISS Vector Indexing → Similarity Matching → Outcome Analysis → 
JSON Response (probability, timeline, factors)
```

### 2. Contract Analysis
```
PDF Upload → OCR/Text Extraction → Contract Classification → 
Clause Identification → Risk Assessment → Regulatory Check → 
Detailed Report Generation
```

### 3. RAG Assistant
```
Query → Intent Classification → Graph Node Mapping → 
Dual Retrieval (Graph + Vector) → Context Synthesis → 
Response with Government Portal Links
```

### 4. Document Generation
```
Template Selection → User Data Collection → AI Content Generation → 
Legal Compliance Validation → Quality Assurance → Final Document
```

---

## 🌏 Indian Law Specialization

- **Frameworks**: Indian Contract Act 1872, Companies Act 2013, Consumer Protection Act 2019  
- **Courts**: Supreme Court, High Courts, District Courts hierarchy  
- **Languages**: Hindi, Tamil, Bengali, Gujarati + 8 regional languages  
- **Government Portals**: Direct links to official forms and procedures  

---

## 🧪 Development & Testing

### API Testing

```bash
# Health Check
curl -X GET "http://localhost:7860/health"

# Case Prediction
curl -X POST "http://localhost:7860/predict"   -H "Content-Type: application/json"   -d '{"case":"Property dispute between siblings; inheritance issue; need legal precedents"}'

# Contract Analysis  
curl -X POST "http://localhost:7860/analyze"   -F "file=@sample_contract.pdf"

# Legal Assistant Query
curl -X POST "http://localhost:7860/assistant"   -H "Content-Type: application/json"   -d '{"query":"How do I apply for legal aid in India?"}'
```

### Frontend Development
```bash
cd frontend
npm run dev          # Dev server
npm run build        # Production build  
npm run lint         # Lint code
npm run type-check   # TypeScript check
```

### Backend Development
```bash
cd backend
uvicorn app:app --reload      # Development server
python -m pytest tests/       # Run tests
python -m black .             # Format code
python -m isort .             # Sort imports
```

---

## 🔒 Security & Compliance

- **Data Privacy**: DPDP Act 2023 compliant with data localization  
- **API Security**: Rate limiting, input validation, error handling  
- **Disclaimers**: Clear warnings about AI limitations and legal advice  
- **Audit Logging**: Tracks AI decisions and user interactions  
- **Bias Monitoring**: Fairness across protected attributes  

---

## 🚀 Deployment

### Environment Variables

```bash
# Backend
GOOGLE_API_KEY=prod_api_key
PORT=7860
ENVIRONMENT=production
LOG_LEVEL=info

# Frontend  
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXTAUTH_SECRET=your_auth_secret
NEXT_PUBLIC_ENVIRONMENT=production
```

### Docker
```bash
# Build & run with Docker Compose
docker-compose up --build

# Build individual services
docker build -t verdicto-backend ./backend
docker build -t verdicto-frontend ./frontend
```

---

## 🆘 Troubleshooting

**Common Issues:**
- Empty predictions → Query too broad → Add more facts  
- 403/429 errors → Rate limited → Use retry logic  
- OCR failures → Poor PDF → Use higher resolution  
- Missing API responses → Check `.env` vars + internet connection  

**Performance Tips:**
- Use `fetch_cases_parallel` for faster retrieval  
- Persist FAISS index for repeated queries  
- Enable caching for common legal queries  
- Monitor rate limits + backoff  

---

## 📈 Roadmap

**Phase 1 (Current)**  
- ✅ Core AI features  
- ✅ Indian law integration  
- ✅ Process-aware RAG  

**Phase 2 (Next 6 months)**  
- 🔄 Multi-modal AI (voice + image)  
- 🔄 Mobile app  
- 🔄 Advanced document templates  
- 🔄 Real-time collaboration  

**Phase 3 (12+ months)**  
- 🔄 Blockchain smart contracts  
- 🔄 AR/VR legal training  
- 🔄 International expansion  
- 🔄 API marketplace  

---

## 📄 License & Legal

**Disclaimer:** This AI system provides general information only and does not constitute legal advice. Users should consult qualified lawyers for specific legal matters.  

**License:** MIT License — see LICENSE file  

**Data Sources:** All legal content sourced from publicly available government portals and legal databases with proper attribution.  

---

**Built with ❤️ for the Indian legal community**  

👉 [GitHub Repository](https://github.com/your-username/verdicto) | 📧 [support@verdicto.ai](mailto:support@verdicto.ai)

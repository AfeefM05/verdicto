# ⚖️ Case Prediction AI

Fast, simple API to predict legal case outcomes using Google Gemini + FAISS with data scraped from Indian Kanoon.

## 🚀 Quick Start
| Step | Command |
|---|---|
| 1) Create venv | `python -m venv .venv && .\.venv\Scripts\Activate.ps1` |
| 2) Install deps | `pip install -r requirements.txt` |
| 3) Set API Key | `$env:GOOGLE_API_KEY = "YOUR_KEY"` |
| 4) Run server | `uvicorn app:app --host 0.0.0.0 --port 7860` |

## 🔧 Requirements
| Item | Version/Notes |
|---|---|
| Python | 3.10+ |
| Internet | Needed for Gemini + scraping |
| Google API Key | `GOOGLE_API_KEY` (Gemini + embeddings) |

## 🔐 Environment
| Variable | Required | Example |
|---|---|---|
| `GOOGLE_API_KEY` | ✅ | `sk-xxxxx` |

## 📦 Project Files
- `app.py` — FastAPI app (`/predict`, `/health`)
- `predictor.py` — Query generation ➜ scraping ➜ FAISS ➜ JSON prediction
- `kanon_api.py` — Search + fetch case text from Indian Kanoon
- `vectorstore.py` — FAISS + Gemini embeddings

## 📡 API
| Method | Path | Body | Returns |
|---|---|---|---|
| GET | `/health` | - | Basic status + time |
| POST | `/predict` | `{ "case": "text" }` | `{ probability, timeline, feature_points[] }` |

Example:
```bash
curl -X POST "http://localhost:7860/predict" \
  -H "Content-Type: application/json" \
  -d '{"case":"Cheating in exam; impersonation; need IPC sections"}'
```

## 🧠 How It Works (super short)
1) Gemini creates a precise legal search query from your facts
2) Scrape related cases from Indian Kanoon
3) Build FAISS index with Gemini embeddings
4) Retrieve top matches and ask Gemini to return strict JSON

## 🧪 Tips
- If results seem weak: add more facts or try again
- 403/429 from site: slow down and retry later
- Treat output as assistive, not legal advice

## 🧩 Tune
- Change models in `predictor.py` and `vectorstore.py`
- Use `fetch_cases_parallel` for faster downloads
- Persist FAISS to disk if needed

## 🆘 Troubleshooting
- Missing key: set `$env:GOOGLE_API_KEY` before running
- Empty context: site changed or query too broad; refine input

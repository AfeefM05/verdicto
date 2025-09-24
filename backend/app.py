import os
import warnings

# Suppress noisy Pydantic v1/2 compatibility warnings from transitive deps (e.g., langsmith)
warnings.filterwarnings(
    "ignore",
    message=r'Field name ".*" shadows an attribute in parent "Operation";?',
    category=UserWarning,
    module=r"pydantic\._internal\._fields",
)

# Explicitly disable LangSmith/LangChain tracing to avoid extra startup imports/noise
os.environ.setdefault("LANGCHAIN_TRACING_V2", "false")
os.environ.setdefault("LANGSMITH_TRACING", "false")
os.environ.setdefault("LANGSMITH_API_KEY", "")

from fastapi import FastAPI
from pydantic import BaseModel
from predictor import predict_outcome
import datetime


app = FastAPI()

class CaseRequest(BaseModel):
    case: str

@app.post("/predict")
async def predict(case_request: CaseRequest):
    user_case = case_request.case
    result = predict_outcome(user_case)
    return {"prediction": result}

@app.get("/health")
async def health_check():
    """
    Basic health check endpoint.
    Returns status, server time, and optional components health.
    """
    # You can also add DB, vectorstore, or AI API checks here if needed
    status = {
        "status": "ok",
        "server_time": datetime.datetime.utcnow().isoformat() + "Z",
        "dependencies": {
            "google_genai_api": "ok" if True else "error",  # placeholder
            "vectorstore": "ok" if True else "error"
        }
    }
    return status


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=7860)

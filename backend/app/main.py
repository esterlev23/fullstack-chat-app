from fastapi import FastAPI

from .models.health import HealthResponse

app = FastAPI()

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="Ok")

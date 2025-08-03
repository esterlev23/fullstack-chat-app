from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models.health import HealthResponse
from .exception_handler import global_exception_handler
from .routers import chat


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(chat.router)

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status = "Ok.....!!")

app.add_exception_handler(Exception , global_exception_handler)

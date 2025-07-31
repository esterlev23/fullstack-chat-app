from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from openai import OpenAIError
from pydantic import ValidationError


async def global_exception_handler(request: Request, exc: Exception):
    if isinstance(exc, HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail},
        )
    elif isinstance(exc, OpenAIError):
        return JSONResponse(
            status_code=502,
            content={"detail": "OpenAI service failed"},
        )
    elif isinstance(exc, ValidationError):
        return JSONResponse(
            status_code=422,
            content={"detail": exc.errors()},
        )
    elif isinstance(exc, ValueError):
        return JSONResponse(
            status_code=400,
            content={"detail": "Invalid input"},
        )
    else:
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error"},
        )

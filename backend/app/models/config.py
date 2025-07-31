from pydantic import BaseModel

class ServerSettings(BaseModel):
    host: str
    port: int

class OpenAISettings(BaseModel):
    model: str
    temperature: float
    max_tokens: int
    api_key: str

class RequestSettings(BaseModel):
    timeout_seconds: int

class AppConfig(BaseModel):
    server: ServerSettings
    openai: OpenAISettings
    request: RequestSettings
    
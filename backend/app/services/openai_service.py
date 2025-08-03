# from openai import OpenAI
# from app.config import load_config
from ..models.chat import ChatRequest , ChatResponse


# app_config = load_config()
# client = OpenAI(api_key=app_config.openai.api_key)

# response = client.responses.create(
#     model=app_config.openai.model,
#     instructions="You are a coding assistant that talks like a pirate.",
#     input="How do I check if a Python object is an instance of a class?",
# )

async def generate_response(request: ChatRequest)-> ChatResponse:
    return ChatResponse(response="lllllll")

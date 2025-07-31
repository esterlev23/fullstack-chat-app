import os
import json
from pathlib import Path
from dotenv import load_dotenv
from .models.config import AppConfig

load_dotenv(dotenv_path=Path(__file__).parent.parent / ".env")

CONFIG_PATH = Path(__file__).parent.parent / "config.json"

def load_config() -> AppConfig:
    with open(CONFIG_PATH, encoding="utf-8") as f:
        raw = json.load(f)

    openai_api_key = os.getenv("OPENAI_API_KEY")
    if openai_api_key:
        raw["openai"]["api_key"] = openai_api_key

    return AppConfig(**raw)

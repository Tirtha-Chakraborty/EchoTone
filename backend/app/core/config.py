"""
Configuration and settings for the EchoTone backend.

For the MVP, we centralize environment-driven settings here so the rest of
the code can simply import `settings` instead of reading environment
variables directly.
"""

from functools import lru_cache
from typing import List

from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.

    In the next steps we will:
    - add OpenAI and Spotify credentials here,
    - and possibly tweak defaults for different environments.
    """

    # General
    app_name: str = "EchoTone API"
    environment: str = "dev"

    # CORS: which frontends are allowed to call this backend.
    # You can override this with BACKEND_CORS_ORIGINS in your .env file.
    backend_cors_origins: List[AnyHttpUrl] = []

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    """
    Return a cached Settings instance.

    Using `lru_cache` ensures we only parse environment variables once,
    while still giving us a simple function we can call from anywhere.
    """

    return Settings()


# Convenience, so most of the app can just do `from app.core.config import settings`.
settings = get_settings()


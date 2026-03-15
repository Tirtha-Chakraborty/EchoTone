"""
FastAPI application entrypoint for the EchoTone backend.

This is where we:
- create the FastAPI app instance,
- configure middleware (e.g. CORS),
- and include versioned API routers (like the playlist routes).
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1.routes_playlist import router as playlist_router


def create_app() -> FastAPI:
    """
    Application factory.

    Using a function makes it easier to test and to customize initialization
    later (e.g. startup events, dependency injection).
    """

    app = FastAPI(title=settings.app_name)

    # 1. Configure CORS so the Next.js frontend can call this backend from the browser.
    if settings.backend_cors_origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin) for origin in settings.backend_cors_origins],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    else:
        # During early development, it can be convenient to allow all origins.
        # We can tighten this later when we know the exact frontend URL.
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    # 2. Include versioned API routes.
    app.include_router(playlist_router, prefix="/api/v1", tags=["playlist"])

    # 3. (Optional) Simple health check.
    @app.get("/health", tags=["health"])
    async def health_check() -> dict:
        return {"status": "ok", "app": settings.app_name}

    return app


# ASGI entrypoint used by uvicorn (e.g. `uvicorn app.main:app --reload`).
app = create_app()


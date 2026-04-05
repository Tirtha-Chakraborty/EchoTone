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
    #
    # Browsers forbid allow_origins=["*"] together with allow_credentials=True (the
    # response is invalid). That combination surfaces in the frontend as fetch()
    # failing with "Failed to fetch", not a normal HTTP error.
    if settings.backend_cors_origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin) for origin in settings.backend_cors_origins],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    else:
        # Dev default: common Next.js dev URLs. No cookies needed for this API.
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://localhost:3001",
                "http://127.0.0.1:3001",
            ],
            allow_credentials=False,
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


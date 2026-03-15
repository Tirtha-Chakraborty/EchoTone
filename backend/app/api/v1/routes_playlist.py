"""
API routes for playlist generation.

Right now this router only exposes a stubbed `/generate-playlist` endpoint so
we can verify that the FastAPI wiring works end‑to‑end. In the next steps
we will replace the placeholder logic with real calls to the playlist service,
OpenAI, and Spotify.
"""

from fastapi import APIRouter


router = APIRouter()


@router.post("/generate-playlist")
async def generate_playlist_stub() -> dict:
    """
    Temporary endpoint just to confirm wiring.

    It returns a simple JSON payload so you can hit:
      POST /api/v1/generate-playlist
    and see that the FastAPI app, routing, and CORS are working.
    """

    return {
        "message": "EchoTone backend is wired up.",
        "note": "This is a stub. Real playlist generation will come next.",
    }


"""
API routes for playlist generation.

This module defines the `/generate-playlist` endpoint which, for now, returns
mocked data shaped as `PlaylistResponse`. This lets you:
- see the full contract in the Swagger UI,
- and build the frontend against a stable response format
before we hook in OpenAI and Spotify.
"""

from fastapi import APIRouter

from app.models.schemas import (
    TextToPlaylistRequest,
    PlaylistResponse,
    Track,
    MoodPoint,
)


router = APIRouter()


@router.post(
    "/generate-playlist",
    response_model=PlaylistResponse,
    summary="Generate a playlist from text (mocked)",
    description=(
        "Takes user text describing a mood/story and returns a mocked "
        "playlist response. Later this will be powered by OpenAI + Spotify."
    ),
)
async def generate_playlist_mock(payload: TextToPlaylistRequest) -> PlaylistResponse:
    """
    Mock implementation of the playlist generator.

    - Validates that the client sends a `TextToPlaylistRequest`.
    - Returns a `PlaylistResponse` with hard-coded example data so you
      can explore the schema at `/docs` and start wiring the frontend.
    """

    # In the real implementation, we will:
    # - call the LLM service with `payload.prompt` (or `payload.userInput`),
    # - call the Spotify service with the extracted attributes,
    # - and assemble a PlaylistResponse from live data.

    mock_tracks = [
        Track(
            title="Echoes of Dawn",
            artist="Aurora Fields",
            album="First Light",
            album_art_url="https://example.com/images/echoes-of-dawn.jpg",
            spotify_track_url="https://open.spotify.com/track/mock1",
        ),
        Track(
            title="Midnight Reflections",
            artist="Neon Rivers",
            album="City Lights",
            album_art_url="https://example.com/images/midnight-reflections.jpg",
            spotify_track_url="https://open.spotify.com/track/mock2",
        ),
    ]

    mock_mood_curve = [
        MoodPoint(label="lonely", position=0),
        MoodPoint(label="reflective", position=1),
        MoodPoint(label="hopeful", position=2),
    ]

    mock_vibe_images = [
        "https://example.com/wallpapers/soft-neon-skyline.jpg",
        "https://example.com/wallpapers/moody-bedroom-lights.jpg",
        "https://example.com/wallpapers/sunrise-over-city.jpg",
    ]

    response = PlaylistResponse(
        mood="melancholic but hopeful",
        genres=["indie", "ambient", "lofi"],
        energy_level=42,
        mood_curve=mock_mood_curve,
        reflection=(
            "Your words move from quiet isolation into a gently brightening space. "
            "This playlist mirrors that shift, starting introspective and gradually "
            "inviting more light and rhythm in."
        ),
        tracks=mock_tracks,
        spotify_playlist_url="https://open.spotify.com/playlist/mock-playlist",
        vibe_image_urls=mock_vibe_images,
    )

    return response



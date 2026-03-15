"""
Pydantic models (schemas) for the EchoTone backend.

These classes define the **API contract** between the frontend and backend:
- what the `/generate-playlist` endpoint expects as input,
- and what shape of data it returns as output.
"""

from typing import List, Optional

from pydantic import BaseModel, Field


class TextToPlaylistRequest(BaseModel):
    """
    Request body for `/generate-playlist`.

    The frontend will send the user-entered text in the `userInput` field.
    """

    userInput: str = Field(
        ...,
        description="Free-form text describing a mood, story, or feeling.",
        min_length=1,
        max_length=2000,
    )


class MoodPoint(BaseModel):
    """
    Single point in the emotional journey.

    Example: label='lonely', position=0; label='hopeful', position=2.
    The frontend can use `position` to order or plot these points.
    """

    label: str = Field(..., description="Short description of the mood, e.g. 'hopeful'.")
    position: int = Field(
        ...,
        description="Zero-based index in the mood progression (0, 1, 2, ...).",
        ge=0,
    )


class Track(BaseModel):
    """
    Representation of a single track returned in the playlist.
    """

    title: str = Field(..., description="Song title.")
    artist: str = Field(..., description="Primary artist name.")
    album: str = Field(..., description="Album name.")
    album_art_url: str = Field(
        ...,
        description="URL to the album artwork image.",
    )
    spotify_track_url: str = Field(
        ...,
        description="Direct URL to the track on Spotify.",
    )


class PlaylistResponse(BaseModel):
    """
    Full response returned by `/generate-playlist`.

    This bundles:
    - high-level attributes (mood, genres, energy),
    - a mood curve for visualization,
    - a reflective interpretation,
    - and the list of recommended tracks.
    """

    mood: str = Field(..., description="Overall mood distilled from the text.")
    genres: List[str] = Field(
        default_factory=list,
        description="List of genres inferred from the text (e.g. 'indie', 'ambient').",
    )
    energy_level: int = Field(
        ...,
        description="Energy level on a 0–100 scale.",
        ge=0,
        le=100,
    )
    mood_curve: List[MoodPoint] = Field(
        default_factory=list,
        description="Ordered list of mood points representing the emotional journey.",
    )
    reflection: str = Field(
        ...,
        description="Short reflective interpretation tying the playlist back to the user's text.",
    )
    tracks: List[Track] = Field(
        default_factory=list,
        description="List of recommended tracks (aim for 10 in the MVP).",
    )
    spotify_playlist_url: Optional[str] = Field(
        default=None,
        description=(
            "Spotify playlist link, if we choose to create a playlist; "
            "otherwise may be null."
        ),
    )

    vibe_image_urls: List[str] = Field(
        default_factory=list,
        description=(
            "Collection of downloadable image URLs that match the overall vibe "
            "of the playlist (used for wallpapers/backgrounds in the UI)."
        ),
    )


"""
API routes for playlist generation.

This module will eventually expose the `/generate-playlist` endpoint under a versioned
API prefix (e.g. `/api/v1/generate-playlist`) that:
- accepts user text as input (via a request model),
- delegates to a playlist service to orchestrate OpenAI and Spotify,
- and returns a structured playlist response for the frontend.
"""


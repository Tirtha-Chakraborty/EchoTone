/** Mirrors backend `PlaylistResponse` and nested models. */

export type MoodPoint = {
  label: string;
  position: number;
};

export type Track = {
  title: string;
  artist: string;
  album: string;
  album_art_url: string;
  spotify_track_url: string;
};

export type PlaylistResponse = {
  mood: string;
  genres: string[];
  energy_level: number;
  mood_curve: MoodPoint[];
  reflection: string;
  tracks: Track[];
  spotify_playlist_url: string | null;
  vibe_image_urls: string[];
};

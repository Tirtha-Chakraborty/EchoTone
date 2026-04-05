/**
 * URL for POST .../generate-playlist.
 *
 * - If `NEXT_PUBLIC_API_BASE_URL` is set, calls the backend directly (must match CORS).
 * - Otherwise uses a same-origin path proxied by Next.js (see `next.config.mjs`), which
 *   avoids CORS during local dev.
 */
export function getGeneratePlaylistUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
  if (fromEnv && fromEnv.length > 0) {
    return `${fromEnv}/api/v1/generate-playlist`;
  }
  return "/api/echotone/generate-playlist";
}

import type { Track } from "@/lib/types";

type Props = {
  tracks: Track[];
  spotifyPlaylistUrl: string | null;
};

export function PlaylistView({ tracks, spotifyPlaylistUrl }: Props) {
  return (
    <section
      aria-labelledby="playlist-heading"
      style={{
        padding: "1rem",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "0.5rem", marginBottom: "1rem" }}>
        <h2 id="playlist-heading" style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600 }}>
          Playlist
        </h2>
        {spotifyPlaylistUrl && (
          <a href={spotifyPlaylistUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem" }}>
            Open in Spotify
          </a>
        )}
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {tracks.map((track, index) => (
          <li
            key={`${track.spotify_track_url}-${index}`}
            style={{
              display: "grid",
              gridTemplateColumns: "64px 1fr",
              gap: "0.75rem",
              alignItems: "center",
              padding: "0.5rem 0",
              borderBottom: index < tracks.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={track.album_art_url}
              alt=""
              width={64}
              height={64}
              style={{
                borderRadius: 8,
                objectFit: "cover",
                background: "var(--border)",
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: "0.9375rem", lineHeight: 1.3 }}>{track.title}</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{track.artist}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.15rem" }}>{track.album}</div>
              <a
                href={track.spotify_track_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.8125rem", display: "inline-block", marginTop: "0.35rem" }}
              >
                Play on Spotify
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

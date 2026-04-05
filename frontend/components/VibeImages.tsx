type Props = {
  urls: string[];
};

/**
 * Wallpaper-style images that match the playlist vibe; each opens in a new tab
 * so the user can save the image (browser-dependent for cross-origin URLs).
 */
export function VibeImages({ urls }: Props) {
  if (urls.length === 0) return null;

  return (
    <section
      aria-labelledby="vibe-images-heading"
      style={{
        padding: "1rem",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <h2
        id="vibe-images-heading"
        style={{
          margin: "0 0 0.75rem",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        Vibe wallpapers
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {urls.map((url, i) => (
          <a
            key={`${url}-${i}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              border: "1px solid var(--border)",
              aspectRatio: "9 / 16",
              background: "var(--border)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </a>
        ))}
      </div>
      <p style={{ margin: "0.75rem 0 0", fontSize: "0.75rem", color: "var(--muted)" }}>
        Tap an image to open it in a new tab; use your browser to save if you like the vibe.
      </p>
    </section>
  );
}

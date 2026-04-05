"use client";

import { useCallback, useState, type FormEvent } from "react";
import { getGeneratePlaylistUrl } from "@/lib/api";
import type { PlaylistResponse } from "@/lib/types";
import { MoodGraph } from "@/components/MoodGraph";
import { PlaylistView } from "@/components/PlaylistView";
import { VibeImages } from "@/components/VibeImages";

export default function HomePage() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PlaylistResponse | null>(null);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const trimmed = userInput.trim();
      if (!trimmed) {
        setError("Describe how you feel — even a sentence helps.");
        return;
      }

      setLoading(true);
      setError(null);
      setResult(null);

      const url = getGeneratePlaylistUrl();
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userInput: trimmed }),
        });

        if (!res.ok) {
          const text = await res.text();
          const looksLikeHtml = /<html/i.test(text) || text.trim().startsWith("<!");
          const isProxyBackendDown =
            (res.status === 500 || res.status === 502) &&
            (looksLikeHtml || text.includes("Internal Server Error"));

          if (isProxyBackendDown) {
            throw new Error(
              "Could not reach the EchoTone API. Start the FastAPI server from the backend folder: " +
                "uvicorn app.main:app --reload (default http://127.0.0.1:8000), then try again."
            );
          }

          throw new Error(text?.slice(0, 500) || `Request failed (${res.status})`);
        }

        const data = (await res.json()) as PlaylistResponse;
        setResult(data);
      } catch (err) {
        let message = err instanceof Error ? err.message : "Something went wrong.";
        if (message === "Failed to fetch") {
          message =
            "Network error. If you use the default setup, start FastAPI on port 8000 " +
            "(uvicorn app.main:app --reload from the backend folder), or set NEXT_PUBLIC_API_BASE_URL in .env.local.";
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [userInput]
  );

  return (
    <main
      style={{
        maxWidth: "var(--max-width)",
        margin: "0 auto",
        padding: "1.25rem 1rem 2.5rem",
        minHeight: "100dvh",
      }}
    >
      <header style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        <h1 style={{ margin: "0 0 0.35rem", fontSize: "clamp(1.5rem, 5vw, 1.75rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
          EchoTone
        </h1>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9375rem" }}>
          Turn how you feel into music.
        </p>
      </header>

      <form onSubmit={onSubmit} style={{ marginBottom: "1.5rem" }}>
        <label htmlFor="user-input" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--muted)" }}>
          How are you feeling?
        </label>
        <textarea
          id="user-input"
          name="userInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          rows={4}
          placeholder="e.g. Quiet night, a little lonely but hopeful about tomorrow…"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
            fontSize: "1rem",
            resize: "vertical",
            minHeight: "6rem",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "0.75rem",
            width: "100%",
            padding: "0.85rem 1rem",
            borderRadius: "var(--radius)",
            border: "none",
            background: loading ? "var(--border)" : "linear-gradient(135deg, var(--accent-dim), var(--accent))",
            color: "#0c0e12",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating…" : "Generate playlist"}
        </button>
      </form>

      {error && (
        <p
          role="alert"
          style={{
            margin: "0 0 1rem",
            padding: "0.75rem 1rem",
            borderRadius: "var(--radius)",
            border: "1px solid rgba(248, 113, 113, 0.4)",
            background: "rgba(248, 113, 113, 0.08)",
            color: "var(--danger)",
            fontSize: "0.875rem",
          }}
        >
          {error}
        </p>
      )}

      {result && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <section
            style={{
              padding: "1rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Mood &amp; genres
            </p>
            <p style={{ margin: "0 0 0.35rem", fontSize: "1.125rem", fontWeight: 600 }}>{result.mood}</p>
            <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--muted)" }}>
              {result.genres.length > 0 ? result.genres.join(" · ") : "—"}
            </p>
          </section>

          <MoodGraph moodCurve={result.mood_curve} energyLevel={result.energy_level} />

          <section
            style={{
              padding: "1rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Reflection
            </h2>
            <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6 }}>{result.reflection}</p>
          </section>

          <PlaylistView tracks={result.tracks} spotifyPlaylistUrl={result.spotify_playlist_url} />

          <VibeImages urls={result.vibe_image_urls} />
        </div>
      )}
    </main>
  );
}

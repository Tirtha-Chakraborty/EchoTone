import type { MoodPoint } from "@/lib/types";

type Props = {
  moodCurve: MoodPoint[];
  energyLevel: number;
};

/**
 * Renders the emotional journey as a horizontal step flow (mobile-friendly).
 * Later we can swap this for SVG/Chart without changing the parent contract.
 */
export function MoodGraph({ moodCurve, energyLevel }: Props) {
  const sorted = [...moodCurve].sort((a, b) => a.position - b.position);

  return (
    <section
      aria-labelledby="mood-graph-heading"
      style={{
        padding: "1rem",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <h2
        id="mood-graph-heading"
        style={{
          margin: "0 0 0.75rem",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        Mood journey
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        {sorted.map((point, i) => (
          <span key={`${point.label}-${point.position}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            {i > 0 && (
              <span aria-hidden style={{ color: "var(--muted)", fontSize: "0.75rem" }}>
                →
              </span>
            )}
            <span
              style={{
                padding: "0.35rem 0.65rem",
                borderRadius: "999px",
                background: "rgba(110, 231, 183, 0.12)",
                border: "1px solid rgba(110, 231, 183, 0.35)",
                fontSize: "0.875rem",
              }}
            >
              {point.label}
            </span>
          </span>
        ))}
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem", fontSize: "0.8125rem", color: "var(--muted)" }}>
          <span>Energy</span>
          <span>{energyLevel}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={energyLevel}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            height: 8,
            borderRadius: 999,
            background: "var(--border)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${energyLevel}%`,
              borderRadius: 999,
              background: "linear-gradient(90deg, var(--accent-dim), var(--accent))",
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>
    </section>
  );
}

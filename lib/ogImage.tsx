import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/** Shared OG / Twitter image (1200×630). Latin-only for reliable rendering. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = `${site.name} — ${site.role}`;

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* accent glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(59,130,246,0.45), transparent 70%)",
          }}
        />
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #3b82f6, #22d3ee)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            Y
          </div>
          <div
            style={{
              color: "#a1a1aa",
              fontSize: 22,
              letterSpacing: 6,
            }}
          >
            PORTFOLIO
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#fafafa",
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            {site.wordmark}
          </div>
          <div style={{ color: "#22d3ee", fontSize: 36, fontWeight: 600 }}>
            {site.role}
          </div>
        </div>

        {/* bottom */}
        <div style={{ color: "#71717a", fontSize: 26 }}>
          Manufacturing × Software × AI
        </div>
      </div>
    ),
    { ...ogSize },
  );
}

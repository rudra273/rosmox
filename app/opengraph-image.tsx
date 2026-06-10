import { ImageResponse } from "next/og";

export const alt = "Rosmox — AI-native software studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph card — brand mark, wordmark, and the signal seam. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060709",
          padding: 72,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* receding grid floor */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 240,
            backgroundImage:
              "linear-gradient(rgba(102,163,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(102,163,255,0.10) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* horizon seam */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 240,
            height: 2,
            background:
              "linear-gradient(90deg, rgba(102,163,255,0) 0%, #66A3FF 35%, #8BD9FF 60%, rgba(139,217,255,0) 100%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#0F1115",
              border: "2px solid rgba(255,255,255,0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: "#66A3FF",
                boxShadow: "0 0 14px rgba(102,163,255,0.9)",
              }}
            />
          </div>
          <div style={{ color: "#F2F3F5", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
            Rosmox
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 120 }}>
          <div
            style={{
              color: "#F2F3F5",
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            Intelligence, engineered to ship.
          </div>
          <div style={{ color: "#A2A9B3", fontSize: 30, letterSpacing: -0.5 }}>
            AI SaaS · Agentic systems · Android · Web — one studio.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

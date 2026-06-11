import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Rosmox — AI-native software studio. Intelligence, engineered to ship.";

/** OG card in the "Ink & Index" identity: paper sheet, ruled lines,
 *  giant ink wordmark, orange signal band. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f4f1ea",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* top rule with index */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "28px 56px",
            borderBottom: "2px solid rgba(22,20,15,0.5)",
            color: "#5d5749",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 12, height: 12, background: "#ff4d00" }} />
            <span>Rosmox — AI software studio</span>
          </div>
          <span>Fig. 01</span>
        </div>

        {/* wordmark block */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 56px",
          }}
        >
          <div
            style={{
              fontSize: 188,
              fontWeight: 800,
              color: "#16140f",
              letterSpacing: -6,
              lineHeight: 0.95,
              textTransform: "uppercase",
            }}
          >
            Rosmox
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#44403a",
              marginTop: 18,
              display: "flex",
            }}
          >
            Intelligence, engineered to ship — AI SaaS, agents, Android, web.
          </div>
        </div>

        {/* orange signal band */}
        <div
          style={{
            height: 64,
            background: "#ff4d00",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 56px",
            color: "#16140f",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span>rosmox.com</span>
          <span>Est. 2025 — shipped on schedule</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

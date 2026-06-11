import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Rosmox — AI SaaS & intelligent systems. Turn frontier AI into product people trust.";

/** OG card in the "Deep Field" identity: space-dark, orbital rings,
 *  gradient signal. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#04050a",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 78% 30%, rgba(99,102,241,0.22), transparent 65%), radial-gradient(ellipse 40% 40% at 15% 80%, rgba(34,211,238,0.1), transparent 60%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 72px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* orbital rings */}
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 95,
            width: 440,
            height: 440,
            borderRadius: "50%",
            border: "1.5px solid rgba(129,140,248,0.4)",
            boxShadow: "0 0 80px -10px rgba(99,102,241,0.5), inset 0 0 60px -20px rgba(99,102,241,0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 45,
            width: 540,
            height: 540,
            borderRadius: "50%",
            border: "1px dashed rgba(103,232,249,0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 255,
            top: 290,
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #818cf8, #67e8f9)",
            boxShadow: "0 0 60px rgba(99,102,241,0.9)",
          }}
        />

        {/* brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #818cf8, #67e8f9)",
              boxShadow: "0 0 18px rgba(99,102,241,0.9)",
            }}
          />
          <span
            style={{
              color: "#eef0f7",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            Rosmox
          </span>
        </div>

        <div
          style={{
            color: "#eef0f7",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1.05,
            maxWidth: 700,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Turn frontier AI</span>
          <span>into product</span>
          <span
            style={{
              backgroundImage: "linear-gradient(120deg, #818cf8, #67e8f9)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            people trust.
          </span>
        </div>

        <div
          style={{
            marginTop: 34,
            color: "#a9b0c2",
            fontSize: 26,
            display: "flex",
          }}
        >
          AI SaaS · agentic systems · Android · web — rosmox.com
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon — the Rosmox brand mark: a dark tile with the signal seam + dot. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F1115",
          borderRadius: 14,
          border: "2px solid rgba(255,255,255,0.14)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: 3,
            transform: "translateY(-50%)",
            background:
              "linear-gradient(90deg, rgba(102,163,255,0) 0%, #66A3FF 35%, #8BD9FF 60%, rgba(139,217,255,0) 100%)",
          }}
        />
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#66A3FF",
            boxShadow: "0 0 12px rgba(102,163,255,0.9)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

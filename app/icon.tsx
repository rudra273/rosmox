import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Brand mark: dark tile, gradient orb core. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#04050a",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #818cf8, #67e8f9)",
            boxShadow: "0 0 10px rgba(99,102,241,0.9)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

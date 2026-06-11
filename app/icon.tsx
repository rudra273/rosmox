import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Brand mark: ink tile, paper R, orange index corner. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#16140f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            color: "#f4f1ea",
            fontSize: 22,
            fontWeight: 800,
            fontFamily: "Arial, sans-serif",
            lineHeight: 1,
          }}
        >
          R
        </div>
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 9,
            height: 9,
            background: "#ff4d00",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

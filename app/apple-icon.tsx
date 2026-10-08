import { ImageResponse } from "next/og";

/* iOS home-screen icon — same monogram as app/icon.svg */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#04060d",
        }}
      >
        <svg width="120" height="120" viewBox="6 4 20 24">
          <path
            d="M11 23.5V8.5h6.25a4.75 4.75 0 0 1 0 9.5H11"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.25 18l5.5 5.5"
            fill="none"
            stroke="#4da2ff"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

/* Default social-share card for every route (pages can override
   with their own opengraph-image). Echoes the hero: ink base,
   blue glow, headline, and the pipeline stages as chips — set in
   the brand face (Space Grotesk, via @fontsource; OG images
   need WOFF/TTF, not WOFF2). Prerendered at build time. */

const FONT_DIR = join(process.cwd(), "node_modules/@fontsource/space-grotesk/files");

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STAGES = ["INGEST", "TRAIN", "EVALUATE", "DEPLOY", "MONITOR"];

export default async function OpengraphImage() {
  const [semibold, bold] = await Promise.all([
    readFile(join(FONT_DIR, "space-grotesk-latin-600-normal.woff")),
    readFile(join(FONT_DIR, "space-grotesk-latin-700-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#04060d",
          backgroundImage:
            "radial-gradient(700px 520px at 92% 18%, rgba(77,162,255,0.22), transparent 70%)",
          color: "#ffffff",
          fontFamily: "Space Grotesk",
        }}
      >
        {/* wordmark */}
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
          <span>ROX</span>
          <span style={{ color: "#4da2ff" }}>MOS</span>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.02,
            }}
          >
            AI that ships,
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.02,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            not slideware.
          </div>
        </div>

        {/* pipeline chips */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {STAGES.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  borderRadius: 10,
                  border: `1.5px solid ${i === 3 ? "#4da2ff" : "rgba(255,255,255,0.16)"}`,
                  background: i === 3 ? "rgba(77,162,255,0.10)" : "rgba(10,15,30,0.8)",
                  fontSize: 20,
                  letterSpacing: 3,
                  color: i === 3 ? "#cfe4ff" : "rgba(255,255,255,0.7)",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    background: i === 3 ? "#82beff" : "rgba(255,255,255,0.25)",
                  }}
                />
                {s}
              </div>
              {i < STAGES.length - 1 && (
                <div style={{ width: 28, height: 2, background: "rgba(255,255,255,0.18)" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: semibold, weight: 600, style: "normal" },
        { name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}

"use client";

import { Fragment, type CSSProperties, type ReactElement } from "react";
import { m, type Variants } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";
import type { ServiceSlug } from "@/lib/services";

/* ──────────────────────────────────────────────────────────
   Service illustrations — one isometric line drawing per
   service, in the same blueprint language as the hero.

     AI      · a model stack: data flows in, signals propagate
               layer → layer, the top layer fires an answer
     Product · a browser slab with a handset standing in front
     Testing · a test-run board, rows checked off, a scanner sweeping
     SEO     · a search bar + ranking columns climbing to a lifted #1

   All geometry is projected from 3D with `iso()` so every edge
   is true isometric. Strokes draw in (pathLength) when the
   card opens and retract when it closes; each drawing has one
   small idle loop (CSS, svc-* in globals.css) that runs
   for as long as its card is open.
   ────────────────────────────────────────────────────────── */

type V3 = [number, number, number];
type Tone = "primary" | "glow" | "bright" | "dim" | "faint";

const TONE: Record<Tone, string> = {
  primary: "text-primary",
  glow: "text-glow/80",
  bright: "text-white/60",
  dim: "text-white/25",
  faint: "text-white/[0.13]",
};

/* fills used to occlude what sits behind a face */
const FACE = "#0a0f1c";
const FACE_BLUE = "rgba(77, 162, 255, 0.07)";

const COS30 = 0.866;

/** Isometric projector around screen origin (ox, oy), scaled by k */
function iso(ox: number, oy: number, k = 1) {
  const pt = ([x, y, z]: V3): [number, number] => [
    ox + (x - y) * COS30 * k,
    oy + ((x + y) * 0.5 - z) * k,
  ];
  const p = (v: V3) => {
    const [X, Y] = pt(v);
    return `${X.toFixed(1)} ${Y.toFixed(1)}`;
  };
  const poly = (pts: V3[]) => `M${pts.map(p).join(" L")} Z`;
  const line = (a: V3, b: V3) => `M${p(a)} L${p(b)}`;
  const chain = (pts: V3[]) => `M${pts.map(p).join(" L")}`;
  /** horizontal rectangle at height z */
  const quad = (x0: number, y0: number, x1: number, y1: number, z: number) =>
    poly([
      [x0, y0, z],
      [x1, y0, z],
      [x1, y1, z],
      [x0, y1, z],
    ]);
  /** vertical face facing +y (screen left-front) */
  const faceY = (x0: number, x1: number, y: number, z0: number, z1: number) =>
    poly([
      [x0, y, z0],
      [x1, y, z0],
      [x1, y, z1],
      [x0, y, z1],
    ]);
  /** vertical face facing +x (screen right-front) */
  const faceX = (x: number, y0: number, y1: number, z0: number, z1: number) =>
    poly([
      [x, y0, z0],
      [x, y1, z0],
      [x, y1, z1],
      [x, y0, z1],
    ]);
  /** the visible verticals + bottom edges of a raised box */
  const boxSides = (x0: number, y0: number, x1: number, y1: number, z0: number, z1: number) =>
    [
      line([x1, y0, z0], [x1, y0, z1]),
      line([x1, y1, z0], [x1, y1, z1]),
      line([x0, y1, z0], [x0, y1, z1]),
      chain([
        [x1, y0, z0],
        [x1, y1, z0],
        [x0, y1, z0],
      ]),
    ].join(" ");
  return { p, pt, poly, line, chain, quad, faceY, faceX, boxSides };
}

/* ── draw primitives ── */

const drawV: Variants = {
  hidden: { pathLength: 0, opacity: 0, transition: { duration: 0.35, ease: EASE_OUT } },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, ease: EASE_OUT, delay: 0.18 + i * 0.07 },
      opacity: { duration: 0.2, delay: 0.18 + i * 0.07 },
    },
  }),
};

const fadeV: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.25 } },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT, delay: 0.25 + i * 0.07 },
  }),
};

const popV: Variants = {
  hidden: { opacity: 0, scale: 0.4, transition: { duration: 0.25 } },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT, delay: 0.3 + i * 0.07 },
  }),
};

function Draw({
  d,
  i,
  tone = "dim",
  fill,
  dashed,
}: {
  d: string;
  i: number;
  tone?: Tone;
  fill?: string;
  dashed?: boolean;
}) {
  return (
    <m.path
      d={d}
      custom={i}
      variants={dashed ? fadeV : drawV}
      className={TONE[tone]}
      stroke="currentColor"
      fill={fill ?? "none"}
      strokeDasharray={dashed ? "3 5" : undefined}
    />
  );
}

function Dot({
  at,
  i,
  r = 2,
  tone = "dim",
}: {
  at: [number, number];
  i: number;
  r?: number;
  tone?: Tone;
}) {
  return (
    <m.circle
      cx={at[0]}
      cy={at[1]}
      r={r}
      custom={i}
      variants={popV}
      className={TONE[tone]}
      fill="currentColor"
      stroke="none"
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    />
  );
}

type ArtProps = { live: boolean };

/* ── shared shapes ── */

function circle([cx, cy]: [number, number], r: number) {
  return `M${(cx - r).toFixed(1)} ${cy.toFixed(1)} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`;
}

function sparkle([cx, cy]: [number, number], r: number) {
  const c = `${cx.toFixed(1)} ${cy.toFixed(1)}`;
  return `M${cx.toFixed(1)} ${(cy - r).toFixed(1)} Q${c} ${(cx + r).toFixed(1)} ${cy.toFixed(1)} Q${c} ${cx.toFixed(1)} ${(cy + r).toFixed(1)} Q${c} ${(cx - r).toFixed(1)} ${cy.toFixed(1)} Q${c} ${cx.toFixed(1)} ${(cy - r).toFixed(1)} Z`;
}

/* ── AI · model stack ─────────────────────────────────── */

/** One beat of the inference loop: a CSS class + its delay (ms) */
function beat(cls: string, live: boolean, d: number, extra?: CSSProperties) {
  return live
    ? { className: cls, style: { "--d": `${d}ms`, ...extra } as CSSProperties }
    : {};
}

/** CSS vars that carry a pulse from screen point a to b */
function travel(a: [number, number], b: [number, number]) {
  return { "--tx": `${(b[0] - a[0]).toFixed(1)}px`, "--ty": `${(b[1] - a[1]).toFixed(1)}px` } as CSSProperties;
}

/* the inference loop, ms into the 3.6s cycle (svc-ai-* in globals.css) */
const T_FEED = 0;
const T_L0 = 450;
const T_L1 = 1250;
const T_L2 = 2050;

/* scale from a shape's own centre */
const CENTRED = { transformBox: "fill-box", transformOrigin: "center" } as CSSProperties;

function AIArt({ live }: ArtProps) {
  const g = iso(160, 105, 1.2);
  const S = 48;
  const LV = [-34, 0, 34];
  const N = [-24, 0, 24];
  const MID: [number, number][] = [
    [-24, -24],
    [24, -24],
    [24, 24],
    [-24, 24],
  ];
  /* data lanes run in along the bottom plane from each side */
  const FEED: [number, number][] = [
    [-72, 0],
    [0, -72],
    [72, 0],
    [0, 72],
  ];
  const core0 = g.pt([0, 0, LV[0]]);
  const core2 = g.pt([0, 0, LV[2]]);

  return (
    <>
      {/* layers, bottom → top */}
      <Draw d={g.quad(-S, -S, S, S, LV[0])} i={0} tone="glow" />
      <Draw d={g.quad(-S, -S, S, S, LV[1])} i={1} tone="dim" />
      <Draw d={g.quad(-S, -S, S, S, LV[2])} i={2} tone="primary" fill={FACE_BLUE} />

      {/* layers light up in turn as the signal passes through */}
      {live &&
        LV.map((z, l) => (
          <path
            key={z}
            d={g.quad(-S, -S, S, S, z)}
            fill={FACE_BLUE}
            stroke="none"
            {...beat("svc-ai-glow", live, [T_L0, T_L1, T_L2][l])}
          />
        ))}

      {/* corner rails between layers */}
      {(
        [
          [S, -S],
          [S, S],
          [-S, S],
        ] as const
      ).map(([x, y]) => (
        <Draw key={`${x}${y}`} d={g.line([x, y, LV[0]], [x, y, LV[2]])} i={3} tone="faint" dashed />
      ))}

      {/* input lanes into the bottom core */}
      {FEED.map(([x, y]) => (
        <Draw key={`f${x}${y}`} d={g.line([x, y, LV[0]], [0, 0, LV[0]])} i={3} tone="faint" dashed />
      ))}

      {/* weights: bottom fans out to the mid layer, mid converges to the top */}
      {MID.map(([x, y], k) => (
        <g key={k}>
          <Draw d={g.line([0, 0, LV[0]], [x, y, LV[1]])} i={4} tone="dim" />
          <Draw d={g.line([x, y, LV[1]], [0, 0, LV[2]])} i={5} tone="bright" />
        </g>
      ))}

      {/* nodes — the mid targets and the top layer flash as the signal lands */}
      {LV.map((z, l) =>
        N.flatMap((x) =>
          N.map((y) => {
            const top = l === 2;
            const centre = x === 0 && y === 0;
            const target = l === 1 && x !== 0 && y !== 0;
            const dot = (
              <Dot
                at={g.pt([x, y, z])}
                i={6 + l}
                r={top && centre ? 3.2 : top ? 2.3 : 1.8}
                tone={top ? "primary" : l === 0 ? "glow" : "dim"}
              />
            );
            /* top layer ripples outward from the core */
            const d = top ? T_L2 + (Math.abs(x) + Math.abs(y)) * 6 : T_L1;
            return top || target ? (
              <g key={`${l}${x}${y}`} {...beat("svc-ai-node", live, d)}>
                {dot}
              </g>
            ) : (
              <g key={`${l}${x}${y}`}>{dot}</g>
            );
          }),
        ),
      )}

      {live && (
        <>
          {/* data packets slide in and merge at the bottom core */}
          {FEED.map(([x, y], k) => {
            const a = g.pt([x, y, LV[0]]);
            return (
              <g key={`p${k}`} {...beat("svc-ai-feed", live, T_FEED + k * 70, travel(a, core0))}>
                <path d={g.quad(x - 3, y - 3, x + 3, y + 3, LV[0])} className={TONE.glow} fill="currentColor" stroke="none" />
              </g>
            );
          })}

          {/* signal pulses: bottom core → mid nodes → top core */}
          {MID.map(([x, y], k) => {
            const mid = g.pt([x, y, LV[1]]);
            return (
              <Fragment key={`s${k}`}>
                <Pulse at={core0} {...beat("svc-ai-pulse", live, T_L0 + 120, travel(core0, mid))} />
                <Pulse at={mid} {...beat("svc-ai-pulse", live, T_L1 + 120, travel(mid, core2))} />
              </Fragment>
            );
          })}

          {/* the model fires: a ring spreads across the top layer… */}
          <g {...beat("svc-ai-fire", live, T_L2 + 80, CENTRED)}>
            <ellipse
              cx={core2[0]}
              cy={core2[1]}
              rx={1.2247 * 16 * 1.2}
              ry={0.7071 * 16 * 1.2}
              className={TONE.primary}
              stroke="currentColor"
            />
          </g>

          {/* …and an answer surfaces above it */}
          <g {...beat("svc-ai-out", live, T_L2 + 200, CENTRED)}>
            <path d={g.line([0, 0, LV[2] + 4], [0, 0, LV[2] + 15])} className={TONE.glow} stroke="currentColor" strokeDasharray="2 3" />
            <path
              d={sparkle(g.pt([0, 0, LV[2] + 24]), 6.5)}
              className={TONE.primary}
              fill="currentColor"
              stroke="none"
            />
          </g>
        </>
      )}
    </>
  );
}

/** A bright signal dot with a soft halo, travelling by --tx/--ty */
function Pulse({ at, className, style }: { at: [number, number]; className?: string; style?: CSSProperties }) {
  return (
    <g className={className} style={style}>
      <circle cx={at[0]} cy={at[1]} r={5} className={TONE.primary} fill="currentColor" stroke="none" opacity={0.25} />
      <circle cx={at[0]} cy={at[1]} r={2} fill="white" stroke="none" />
    </g>
  );
}

/* ── Browser slab — used by the Product drawing ────────── */

function BrowserSlab({ g }: { g: ReturnType<typeof iso> }) {
  const X = 72;
  const Y = 50;

  return (
    <>
      {/* slab */}
      <Draw d={g.boxSides(-X, -Y, X, Y, -10, 0)} i={0} tone="faint" />
      <Draw d={g.quad(-X, -Y, X, Y, 0)} i={0} tone="dim" fill={FACE} />

      {/* chrome: tab bar, traffic lights, address bar */}
      <Draw d={g.line([-X, -36, 0], [X, -36, 0])} i={1} tone="dim" />
      <Draw d={g.quad(-30, -46, 44, -40, 0)} i={2} tone="faint" />
      {[-64, -57, -50].map((x) => (
        <Dot key={x} at={g.pt([x, -43, 0])} i={2} r={1.7} tone="bright" />
      ))}

      {/* sidebar rows */}
      {[-26, -16, -6, 4, 14, 24].map((y, k) => (
        <Draw
          key={y}
          d={g.line([32, y, 0], [k === 0 ? 64 : 58, y, 0])}
          i={3}
          tone={k === 0 ? "bright" : "faint"}
        />
      ))}

      {/* content cards */}
      <Draw d={g.boxSides(-60, 8, -26, 40, 0, 7)} i={4} tone="faint" />
      <Draw d={g.quad(-60, 8, -26, 40, 7)} i={4} tone="glow" fill={FACE} />
      <Draw d={g.boxSides(-18, 8, 18, 40, 0, 7)} i={4} tone="faint" />
      <Draw d={g.quad(-18, 8, 18, 40, 7)} i={4} tone="glow" fill={FACE} />

      {/* raised hero block */}
      <Draw d={g.boxSides(-60, -28, 18, -4, 0, 16)} i={5} tone="dim" />
      <Draw d={g.quad(-60, -28, 18, -4, 16)} i={5} tone="primary" fill={FACE} />
      <Draw d={g.line([-52, -20, 16], [6, -20, 16])} i={6} tone="bright" />
      <Draw d={g.line([-52, -12, 16], [-14, -12, 16])} i={6} tone="dim" />
    </>
  );
}

/* ── Handset — used by the Product drawing ───────────── */

function Handset({
  g,
  x0,
  x1,
  y0,
  y1,
  h,
  i,
  front,
}: {
  g: ReturnType<typeof iso>;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  h: number;
  i: number;
  front: boolean;
}) {
  const screen: Tone = front ? "primary" : "dim";
  return (
    <>
      {/* body: right side, top edge, front face (painted back → front) */}
      <Draw d={g.faceX(x1, y0, y1, 0, h)} i={i} tone="faint" fill={FACE} />
      <Draw d={g.quad(x0, y0, x1, y1, h)} i={i} tone="faint" fill={FACE} />
      <Draw d={g.faceY(x0, x1, y1, 0, h)} i={i} tone={front ? "bright" : "dim"} fill={FACE} />
      {/* screen + earpiece */}
      <Draw
        d={g.faceY(x0 + 5, x1 - 5, y1, 9, h - 12)}
        i={i + 1}
        tone={screen}
        fill={front ? FACE_BLUE : undefined}
      />
      <Draw d={g.line([x0 + 18, y1, h - 6], [x1 - 18, y1, h - 6])} i={i + 1} tone="dim" />
      {/* UI: header bars + media card */}
      <Draw d={g.line([x0 + 11, y1, h - 22], [x1 - 15, y1, h - 22])} i={i + 2} tone={front ? "bright" : "dim"} />
      <Draw d={g.line([x0 + 11, y1, h - 30], [x1 - 24, y1, h - 30])} i={i + 2} tone="dim" />
      <Draw d={g.faceY(x0 + 11, x1 - 11, y1, 18, h - 42)} i={i + 2} tone={front ? "glow" : "faint"} />
    </>
  );
}

/* ── Product · browser slab + a handset in front ─────── */

function ProductArt({ live }: ArtProps) {
  const g = iso(150, 80, 1.15);
  return (
    <>
      <BrowserSlab g={g} />
      <g className={live ? "svc-float" : undefined}>
        <Handset g={g} x0={70} x1={114} y0={56} y1={62} h={80} i={6} front />
      </g>
    </>
  );
}

/* ── Testing · test-run board + sweeping scanner ─────── */

function TestingArt({ live }: ArtProps) {
  const g = iso(160, 100, 1.35);
  const X = 70;
  const Y = 48;
  const ROWS = [-30, -10, 10, 30];
  const BAR_END = [36, 20, 44, 28];
  const ACTIVE = 1;

  return (
    <>
      {/* board */}
      <Draw d={g.boxSides(-X, -Y, X, Y, -8, 0)} i={0} tone="faint" />
      <Draw d={g.quad(-X, -Y, X, Y, 0)} i={0} tone="dim" fill={FACE} />

      {/* test rows: checkbox tile, check, result bar, status dot */}
      {ROWS.map((y, k) => {
        const active = k === ACTIVE;
        return (
          <g key={y}>
            <Draw d={g.boxSides(-58, y - 6, -46, y + 6, 0, 3)} i={1 + k} tone="faint" />
            <Draw
              d={g.quad(-58, y - 6, -46, y + 6, 3)}
              i={1 + k}
              tone={active ? "primary" : "dim"}
              fill={active ? FACE_BLUE : FACE}
            />
            <Draw
              d={g.chain([
                [-55, y - 1, 3],
                [-52, y + 3, 3],
                [-49, y - 4, 3],
              ])}
              i={2 + k}
              tone={active ? "glow" : "bright"}
            />
            <Draw
              d={g.line([-38, y, 0], [BAR_END[k], y, 0])}
              i={2 + k}
              tone={active ? "bright" : "faint"}
            />
            <Dot at={g.pt([56, y, 0])} i={3 + k} r={2} tone={active ? "primary" : "glow"} />
          </g>
        );
      })}

      {/* scanner plane — sweeps along the rows while open */}
      <g className={live ? "svc-scan" : undefined}>
        <Draw d={g.faceX(-24, -Y, Y, 0, 14)} i={7} tone="glow" fill={FACE_BLUE} />
        <Draw d={g.line([-24, -Y, 14], [-24, Y, 14])} i={8} tone="primary" />
      </g>
    </>
  );
}

/* ── SEO · search bar + a climbing ranking chart ─────── */

function SeoArt({ live }: ArtProps) {
  const g = iso(160, 110, 1.2);
  const X = 64;
  const Y = 40;
  const lens = g.pt([-50, 27, 0]);

  /* rank columns, left → right (back → front), last one is #1 */
  const COLS: [number, number][] = [
    [-54, 10],
    [-26, 20],
    [2, 31],
    [30, 44],
  ];
  const W = 13;
  const D0 = -28;
  const D1 = -15;

  const column = (x0: number, h: number, k: number, top: boolean) => (
    <>
      <Draw d={g.faceX(x0 + W, D0, D1, 0, h)} i={3 + k} tone="faint" fill={FACE} />
      <Draw d={g.faceY(x0, x0 + W, D1, 0, h)} i={3 + k} tone={top ? "glow" : "dim"} fill={FACE} />
      <Draw
        d={g.quad(x0, D0, x0 + W, D1, h)}
        i={3 + k}
        tone={top ? "primary" : "dim"}
        fill={top ? FACE_BLUE : FACE}
      />
    </>
  );

  return (
    <>
      {/* page slab */}
      <Draw d={g.boxSides(-X, -Y, X, Y, -8, 0)} i={0} tone="faint" />
      <Draw d={g.quad(-X, -Y, X, Y, 0)} i={0} tone="dim" fill={FACE} />

      {/* search bar along the front edge */}
      <Draw d={g.boxSides(-56, 20, 44, 34, 0, 3)} i={1} tone="faint" />
      <Draw d={g.quad(-56, 20, 44, 34, 3)} i={1} tone="bright" fill={FACE} />
      <Draw d={circle([lens[0], lens[1] - 3.6], 3)} i={2} tone="glow" />
      <Draw d={g.line([-42, 27, 3], [18, 27, 3])} i={2} tone="dim" />

      {/* trend line through the column tops */}
      <Draw
        d={g.chain(COLS.map(([x, h]) => [x + W / 2, (D0 + D1) / 2, h + 6] as V3))}
        i={7}
        tone="glow"
        dashed
      />

      {/* columns — #1 lifts, sparkle marks the AI answer */}
      {COLS.map(([x, h], k) => {
        const top = k === COLS.length - 1;
        return top ? (
          <g key={x} className={live ? "svc-lift" : undefined}>
            {column(x, h, k, true)}
            <g className={live ? "svc-blink" : undefined}>
              <m.path
                d={sparkle(g.pt([x + W / 2, (D0 + D1) / 2, h + 16]), 7)}
                custom={8}
                variants={popV}
                className={TONE.primary}
                fill="currentColor"
                stroke="none"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            </g>
          </g>
        ) : (
          <g key={x}>{column(x, h, k, false)}</g>
        );
      })}
    </>
  );
}

const ART: Record<ServiceSlug, (p: ArtProps) => ReactElement> = {
  "artificial-intelligence": AIArt,
  "product-platform-development": ProductArt,
  "software-testing-qa": TestingArt,
  "seo-ai-search": SeoArt,
};

export default function ServiceGraphic({
  art,
  open,
  reduceMotion,
}: {
  art: ServiceSlug;
  open: boolean;
  reduceMotion: boolean;
}) {
  const Art = ART[art];
  return (
    <m.svg
      viewBox="0 0 320 210"
      className="h-full w-full"
      fill="none"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={reduceMotion ? "visible" : "hidden"}
      animate={reduceMotion || open ? "visible" : "hidden"}
      aria-hidden
    >
      <Art live={open && !reduceMotion} />
    </m.svg>
  );
}

"use client";

import { useEffect, useRef } from "react";

/* ──────────────────────────────────────────────────────────
   SignalField — hero option B's visual: a landscape of points
   rolling in from a glowing horizon.

   Canvas 2D, drawn by hand: a grid of points on the ground plane,
   rows spaced geometrically in depth and projected with a pinhole
   camera, so they crowd together towards the horizon. Three
   layered sine waves lift the surface and travel towards the
   viewer. Every ~second a signal runs down one column towards
   the viewer. With a mouse, the points under the cursor rise.

   Fills its parent. Loops only while on screen and the tab is
   visible; with reduced motion it draws one still frame.
   ────────────────────────────────────────────────────────── */

const Z_NEAR = 1; // nearest row, in camera heights
const Z_FAR = 12; // farthest row
const ROWS = 52;
const FAR_SPAN = 0.72; // share of the width the farthest row covers
const AMP = 0.38; // wave height, in camera heights
const SIGNAL_EVERY = 850; // ms between signals
const SIGNAL_MS = 2200; // horizon → viewer
const BUMP_R = 120; // px — cursor bump radius
const GLOW = "130, 190, 255";

type Signal = { col: number; born: number };

export default function SignalField() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!box || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let w = 0;
    let h = 0;
    let f = 0; // focal length, px
    let horizon = 0; // screen y of the vanishing line
    let cols = 0;
    let half = 0; // world half-width of the grid
    let dx = 0; // world column spacing
    const zs = new Float32Array(ROWS);
    let signals: Signal[] = [];
    let clock = 0;
    let lastSignal = 0;
    let raf = 0;
    let last = 0;
    let onScreen = true;

    /* cursor, relative to the canvas; strength eases in and out */
    let px = -1e4;
    let py = -1e4;
    let aim = 0;
    let pull = 0;

    for (let i = 0; i < ROWS; i++) zs[i] = Z_NEAR * Math.pow(Z_FAR / Z_NEAR, i / (ROWS - 1));

    const height = (x: number, z: number, t: number) =>
      AMP *
      (0.55 * Math.sin(x * 0.55 + t * 0.00035) +
        0.75 * Math.sin(z * 0.9 + t * 0.0011 + x * 0.25) +
        0.3 * Math.sin((x - z) * 0.4 - t * 0.0005));

    const draw = () => {
      const t = clock;
      ctx.clearRect(0, 0, w, h);

      /* signal heads, per column */
      signals = signals.filter((s) => t - s.born < SIGNAL_MS);
      const heads = new Map<number, number>();
      for (const s of signals) {
        const u = (t - s.born) / SIGNAL_MS;
        heads.set(s.col, Z_FAR - (Z_FAR - Z_NEAR) * u * u);
      }

      ctx.fillStyle = `rgb(${GLOW})`;
      const r2 = BUMP_R * BUMP_R * 2;
      for (let i = ROWS - 1; i >= 0; i--) {
        const z = zs[i];
        const near = 1 - (z - Z_NEAR) / (Z_FAR - Z_NEAR); // 1 near … 0 far
        const depth = 0.16 + 0.5 * near; // dimmer towards the horizon
        const reach = ((w / 2 + 40) * z) / f; // world half-width on screen at this depth
        const c0 = Math.max(0, Math.floor((half - reach) / dx));
        const c1 = Math.min(cols - 1, Math.ceil((half + reach) / dx));

        for (let c = c0; c <= c1; c++) {
          const x = c * dx - half;
          let y = height(x, z, t);
          const sx = w / 2 + (x * f) / z;
          let sy = horizon + ((1 - y) * f) / z;

          let lift = 0;
          if (pull > 0.01) {
            const ddx = sx - px;
            const ddy = sy - py;
            lift = pull * Math.exp(-(ddx * ddx + ddy * ddy) / r2);
            if (lift > 0.01) {
              y += lift * 0.45;
              sy = horizon + ((1 - y) * f) / z;
            }
          }

          /* a bright head with a fading trail behind it (towards the horizon) */
          let spark = 0;
          const head = heads.get(c);
          if (head !== undefined) {
            const d = z - head;
            spark = d < 0 ? Math.exp(-((d / 0.12) ** 2)) : Math.exp(-d / (0.6 + z * 0.12));
          }

          const crest = (y / AMP + 1) / 2; // ~0 trough … 1 crest
          const side = 1 - Math.pow(Math.abs(sx - w / 2) / (w / 2), 4);
          const a = side * (depth * (0.35 + 0.9 * crest * crest) + 0.6 * lift + 0.85 * spark);
          if (a < 0.02) continue;
          const size = 0.8 + 2 * near * near + 0.9 * crest + 1.4 * spark;
          ctx.globalAlpha = Math.min(1, a);
          ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(now - last, 50);
      last = now;
      clock += dt;
      pull += (aim - pull) * 0.06;
      if (clock - lastSignal > SIGNAL_EVERY && signals.length < 5) {
        const mid = cols / 2;
        signals.push({ col: Math.round(mid + (Math.random() - 0.5) * cols * 0.5), born: clock });
        lastSignal = clock;
      }
      draw();
    };

    const start = () => {
      if (raf || reduce || !onScreen || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const rect = box.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* nearest row lands just below the bottom edge, farthest at 10% */
      f = (h * 0.95) / (1 / Z_NEAR - 1 / Z_FAR);
      horizon = h * 0.1 - f / Z_FAR;
      half = ((w / 2) * Z_FAR * FAR_SPAN) / f;
      cols = Math.round(Math.min(240, Math.max(110, w / 6)));
      dx = (half * 2) / (cols - 1);
      signals = [];
      if (!raf) draw();
      canvas.style.opacity = "1";
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
      aim = py > -BUMP_R && py < h + BUMP_R && px > -BUMP_R && px < w + BUMP_R ? 1 : 0;
    };
    const onLeave = () => (aim = 0);
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(box);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(box);
    document.addEventListener("visibilitychange", onVisibility);
    if (fine && !reduce) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    if (reduce) clock = 4000; // a settled, mid-swell still
    resize();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={boxRef} aria-hidden className="pointer-events-none absolute inset-0">
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-1000 ease-out"
      />
    </div>
  );
}

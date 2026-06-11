"use client";

import { useEffect, useRef } from "react";

/** Density ramp — index 0 is empty space, last is the densest glyph. */
const RAMP = [" ", " ", ".", ":", "-", "=", "+", "*", "x", "#", "%", "@"];
const CELL = 16;

/**
 * The hero instrument: a live ASCII field rendered on a plain 2D canvas.
 * Layered travelling waves set each cell's density; the pointer carves a
 * bright ripple through the grid. No WebGL, no dependencies — one canvas,
 * a few thousand glyphs.
 *
 * Pauses when offscreen or when the tab is hidden. With reduced motion it
 * draws a single static frame and never animates.
 */
export default function AsciiField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    // manual clock (performance.now), pause-aware
    let elapsed = 0;
    let last = performance.now();

    // pointer in canvas px, eased toward the target each frame
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const styles = getComputedStyle(canvas);
    const ink = styles.getPropertyValue("color").trim() || "#16140f";
    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#ff4d00";
    const fontFamily = styles.fontFamily || "monospace";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL) + 1;
      rows = Math.ceil(height / CELL) + 1;
      ctx.font = `12px ${fontFamily}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
    };

    const field = (x: number, y: number, t: number) => {
      // three travelling waves, normalized to roughly 0..1
      const a = Math.sin(x * 0.32 + t * 0.9);
      const b = Math.cos(y * 0.27 - t * 0.7);
      const c = Math.sin((x + y) * 0.16 + t * 0.5);
      return (a * b + c + 2) / 4;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const px = gx * CELL + CELL / 2;
          const py = gy * CELL + CELL / 2;

          let v = field(gx, gy, t);

          // pointer ripple — a gaussian bump around the cursor
          const dx = px - pointer.x;
          const dy = py - pointer.y;
          const d2 = dx * dx + dy * dy;
          const bump = Math.exp(-d2 / 16000);
          v = Math.min(1, v + bump * 0.9);

          const idx = Math.min(RAMP.length - 1, Math.floor(v * RAMP.length));
          const char = RAMP[idx];
          if (char === " ") continue;

          if (v > 0.82) {
            ctx.fillStyle = accent;
            ctx.globalAlpha = 1;
          } else {
            ctx.fillStyle = ink;
            ctx.globalAlpha = 0.25 + v * 0.55;
          }
          ctx.fillText(char, px, py);
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      const now = performance.now();
      elapsed += (now - last) / 1000;
      last = now;

      // ease the pointer toward its target for a soft trailing ripple
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      draw(elapsed);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf || reduced) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    resize();
    if (reduced) {
      draw(1.4); // one considered static frame
    } else {
      start();
    }

    const onResize = () => {
      resize();
      if (reduced) draw(1.4);
    };
    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="ascii-field" aria-hidden="true" />;
}

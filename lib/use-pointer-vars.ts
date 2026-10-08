import { useEffect, type RefObject } from "react";

/* Tracks the pointer over `area` and writes its position — in px,
   relative to `target` — to --mx / --my on `target`, so CSS can draw
   a spotlight without a React render per move. Mouse and trackpad
   only; touch screens keep the CSS fallback position. */
export function usePointerVars(
  area: RefObject<HTMLElement | null>,
  target: RefObject<HTMLElement | null> = area,
) {
  useEffect(() => {
    const el = area.current;
    const out = target.current;
    if (!el || !out || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    const write = () => {
      raf = 0;
      out.style.setProperty("--mx", `${x}px`);
      out.style.setProperty("--my", `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      const r = out.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(write);
    };

    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [area, target]);
}

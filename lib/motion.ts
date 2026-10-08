import type { CSSProperties } from "react";

/* ──────────────────────────────────────────────────────────
   Motion tokens — the only easings, durations and springs the
   site uses. Mirrors --ease-* in app/globals.css.

   Three kinds of motion, nothing else:
     · reveal — content entering (EASE_OUT, DURATION.reveal)
     · ui     — menus, toggles, hover/press (SPRING or DURATION.base)
     · scrub  — scroll-linked, no easing of its own
   ────────────────────────────────────────────────────────── */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.45,
  reveal: 0.7,
} as const;

export const SPRING = {
  type: "spring",
  stiffness: 400,
  damping: 34,
  mass: 0.8,
} as const;

/** In-view trigger shared by every scroll reveal */
export const VIEWPORT = { once: true, margin: "-80px" } as const;

/** Stagger step between sibling reveals */
export const STAGGER = 0.06;

/** Delay for the CSS first-paint reveals (.reveal-rise, .line-mask) */
export const cssDelay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

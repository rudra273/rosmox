"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type Lenis from "lenis";

/* ──────────────────────────────────────────────────────────
   SmoothScroll — Lenis inertia smoothing for wheel/trackpad.

   Smoothing is an enhancement, so the library loads as its own
   chunk after hydration instead of sitting in the critical JS.
   Until it lands (or if it never does) scrolling is native.

   Lenis drives the native scroll position, so sticky sections
   and Framer's useScroll keep working untouched. Touch devices
   keep native scrolling (syncTouch off), reduced motion gets
   1:1 scrolling (respectReducedMotion, on by default), and
   in-page hash links stay native so Next.js owns them.
   allowNestedScroll lets a scrollable child (the contact
   textarea) take the wheel while it has room to move, then
   hands back to the page at its edges. data-lenis-prevent is
   only for areas that must never chain (e.g. the mobile menu):
   lenis.css gives it overscroll-behavior: contain.

   useLenis() returns the instance, or null before it loads.
   ────────────────────────────────────────────────────────── */

const OPTIONS = {
  lerp: 0.1,
  smoothWheel: true,
  syncTouch: false,
  stopInertiaOnNavigate: true,
  autoRaf: true,
  allowNestedScroll: true,
} as const;

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    let instance: Lenis | undefined;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      instance = new Lenis(OPTIONS);
      setLenis(instance);
    });
    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

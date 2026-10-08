"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "framer-motion";

import SmoothScroll from "@/components/SmoothScroll";

/* Root client providers.

   · LazyMotion — components use the slim `m` component, and Framer's
     feature bundle (lib/motion-features.ts) loads as its own chunk
     after hydration, keeping it out of the critical JS. `strict`
     throws in development if a full `motion` component slips in.
   · MotionConfig reducedMotion="user" — every Framer animation honours
     prefers-reduced-motion (transforms dropped, fades kept).
   · SmoothScroll — Lenis wheel/trackpad smoothing, also loaded after
     hydration (see components/SmoothScroll.tsx). */

const loadMotionFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>{children}</SmoothScroll>
      </MotionConfig>
    </LazyMotion>
  );
}

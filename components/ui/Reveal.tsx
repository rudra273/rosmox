"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";

import { DURATION, EASE_OUT, VIEWPORT } from "@/lib/motion";

/* ──────────────────────────────────────────────────────────
   Reveal — the one scroll-reveal primitive. Rises `y` px and
   fades in once, when it enters the viewport. Reduced motion
   is handled globally by <MotionConfig reducedMotion="user">.
   ────────────────────────────────────────────────────────── */

const TAGS = {
  div: m.div,
  p: m.p,
  h2: m.h2,
  h3: m.h3,
  li: m.li,
  span: m.span,
} as const;

export default function Reveal({
  as = "div",
  delay = 0,
  y = 18,
  className,
  children,
}: {
  as?: keyof typeof TAGS;
  delay?: number;
  y?: number;
  className?: string;
  children: ReactNode;
}) {
  const Tag = TAGS[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.reveal, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </Tag>
  );
}

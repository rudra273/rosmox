"use client";

import { Fragment } from "react";
import { m, type Variants } from "framer-motion";

import { EASE_OUT, VIEWPORT } from "@/lib/motion";

/* ──────────────────────────────────────────────────────────
   RevealText — masked word-by-word heading reveal.

   Each word sits in its own overflow-hidden mask and slides up
   into place, staggered, the first time the heading enters
   view. Words (not measured lines) keep it layout-proof at any
   width; the stagger reads as lines settling.

   Real spaces stay as text nodes between the masks, so the
   heading reads normally to screen readers and search engines.
   Reduced motion: MotionConfig drops the transform → instant.
   ────────────────────────────────────────────────────────── */

const TAGS = {
  h1: m.h1,
  h2: m.h2,
  h3: m.h3,
  p: m.p,
} as const;

const word: Variants = {
  hidden: { y: "108%" },
  visible: { y: "0%", transition: { duration: 0.95, ease: EASE_OUT } },
};

export default function RevealText({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  as?: keyof typeof TAGS;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const Tag = TAGS[as];
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          {/* padding/negative margin give descenders room inside the mask */}
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
            <m.span className="inline-block" variants={word}>
              {w}
            </m.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}

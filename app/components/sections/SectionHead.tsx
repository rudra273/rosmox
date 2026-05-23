"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SectionHeadProps {
  label: string;
  title: ReactNode;
  children?: ReactNode; // optional description paragraph
}

/**
 * Reusable section header with the draft1 `.head-reveal` entrance,
 * reimplemented with Framer Motion `whileInView` (replaces the
 * IntersectionObserver `.in` toggle). Mirrors the CSS:
 *   opacity 0 -> 1, translateY 16px -> 0, .8s ease, once.
 */
export default function SectionHead({ label, title, children }: SectionHeadProps) {
  return (
    <motion.div
      className="section-head"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="section-label">{label}</div>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </motion.div>
  );
}

"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useInView } from "motion/react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Wrapping element, defaults to div. */
  as?: ElementType;
  /** How much must be visible before triggering (0–1). */
  amount?: number;
  id?: string;
}

/**
 * Adds `.in` once the element scrolls into view. The CSS reveal primitives
 * (.rv, .rv-wipe, .rv-rule) inside it then play with their --d stagger.
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  amount = 0.15,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount,
    margin: "0px 0px -60px 0px",
  });

  return (
    <Tag ref={ref} id={id} className={`${className}${inView ? " in" : ""}`}>
      {children}
    </Tag>
  );
}

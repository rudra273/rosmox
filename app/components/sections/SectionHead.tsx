"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import type { ReactNode } from "react";

interface SectionHeadProps {
  label: string;
  /** mono index annotation, e.g. "01" */
  index?: string;
  title: ReactNode;
  children?: ReactNode; // optional description paragraph
}

/**
 * Section header with the seam motif: the hairline tick draws in, the label
 * fades, and the title rises from behind a mask when scrolled into view.
 */
export default function SectionHead({ label, index, title, children }: SectionHeadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3, margin: "0px 0px -60px 0px" });

  return (
    <div ref={ref} className={`section-head${inView ? " in" : ""}`}>
      <div className="section-label">
        <span className="seam-tick" aria-hidden="true" />
        {index && (
          <span className="index" aria-hidden="true">
            {index}
          </span>
        )}
        {label}
      </div>
      <h2>
        <span className="head-mask">
          <span>{title}</span>
        </span>
      </h2>
      {children && <p>{children}</p>}
    </div>
  );
}

"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees; 0 disables tilt and keeps only the cursor glow. */
  tilt?: number;
}

/**
 * Glass card with a cursor-tracked glow (radial highlight follows the
 * pointer via --mx/--my) and a subtle 3D tilt. Pointer-only — touch and
 * keyboard users get the resting state, which is fully styled.
 */
export default function GlowCard({ children, className = "", tilt = 3 }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt > 0) {
      const rx = ((y / rect.height) - 0.5) * -2 * tilt;
      const ry = ((x / rect.width) - 0.5) * 2 * tilt;
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      className={`glow-card ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="glow-spot" aria-hidden="true" />
      <div className="glow-inner">{children}</div>
    </div>
  );
}

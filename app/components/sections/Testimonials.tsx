"use client";

import { useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";

const testimonials = [
  {
    avatar: "AK",
    name: "Anya Kowal",
    role: "Co-founder, Halden Labs",
    quote:
      "Rosmox shipped our v1 in eight weeks, and it's still the cleanest codebase we own.",
  },
  {
    avatar: "RM",
    name: "Rahul Menon",
    role: "VP Operations, Sundra",
    quote:
      "They treated our agent infrastructure like a real product. Our support backlog is gone.",
  },
  {
    avatar: "EC",
    name: "Elena Costa",
    role: "Founder, Mirroir Studio",
    quote:
      "Design that holds up under load. Engineering that holds up under scale.",
  },
];

const total = testimonials.length;
const wrap = (index: number) => (index % total + total) % total;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  // Three circular slots: previous, active (center), next.
  const slots = [
    { offset: -1, index: wrap(active - 1) },
    { offset: 0, index: active },
    { offset: 1, index: wrap(active + 1) },
  ];

  const rotate = (step: number) => setActive((current) => wrap(current + step));

  // Swipe / drag to change testimonial, without changing the centered visuals.
  // Native listeners on document so pointer-capture on the buttons can't eat it.
  const cardsRef = useRef<HTMLDivElement>(null);
  const didSwipe = useRef(false);
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    let startX: number | null = null;

    const down = (e: PointerEvent) => {
      startX = e.clientX;
      didSwipe.current = false;
    };
    const up = (e: PointerEvent) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) < 40) return;
      didSwipe.current = true;
      setActive((c) => wrap(c + (dx < 0 ? 1 : -1)));
    };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <section id="words">
      <div className="container">
        <SectionHead
          label="From clients"
          title="Words from the people we've shipped with."
        />
        <div className="testimonials-shell">
          <div className="testimonials" aria-live="polite">
            <blockquote className="t-quote" key={testimonial.name}>
              <span className="t-mark t-mark-open">&ldquo;</span>
              <p className="t-quote-text">{testimonial.quote}</p>
              <span className="t-mark t-mark-close">&rdquo;</span>
            </blockquote>
            <div
              className="t-cards"
              role="tablist"
              aria-label="Choose a testimonial"
              ref={cardsRef}
              style={{ touchAction: "pan-y" }}
            >
              {slots.map(({ offset, index }) => {
                const item = testimonials[index];
                const isActive = offset === 0;
                return (
                  <button
                    key={offset}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={
                      isActive
                        ? "Show next testimonial"
                        : offset < 0
                        ? "Show previous testimonial"
                        : "Show next testimonial"
                    }
                    className={`t-profile${isActive ? " is-active" : ""}`}
                    onClick={() => {
                      if (didSwipe.current) {
                        didSwipe.current = false;
                        return;
                      }
                      rotate(isActive ? 1 : offset);
                    }}
                  >
                    <div className="t-avatar">{item.avatar}</div>
                    <div>
                      <div className="t-name">{item.name}</div>
                      <div className="t-role">{item.role}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

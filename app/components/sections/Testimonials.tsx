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

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];
  const stripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Native horizontal scroll: pick whichever card is nearest the center.
  const onScroll = () => {
    const strip = stripRef.current;
    if (!strip) return;
    const center = strip.scrollLeft + strip.clientWidth / 2;
    let nearest = 0;
    let min = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const mid = el.offsetLeft + el.clientWidth / 2;
      const dist = Math.abs(mid - center);
      if (dist < min) {
        min = dist;
        nearest = i;
      }
    });
    if (nearest !== active) setActive(nearest);
  };

  const select = (i: number) => {
    setActive(i);
    cardRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  // Center the first card on mount (horizontal only — don't scroll the page).
  useEffect(() => {
    const strip = stripRef.current;
    const first = cardRefs.current[0];
    if (!strip || !first) return;
    strip.scrollLeft =
      first.offsetLeft - strip.clientWidth / 2 + first.clientWidth / 2;
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
              ref={stripRef}
              onScroll={onScroll}
            >
              <span className="t-spacer" aria-hidden="true" />
              {testimonials.map((item, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className={`t-profile${isActive ? " is-active" : ""}`}
                    onClick={() => select(i)}
                  >
                    <div className="t-avatar">{item.avatar}</div>
                    <div>
                      <div className="t-name">{item.name}</div>
                      <div className="t-role">{item.role}</div>
                    </div>
                  </button>
                );
              })}
              <span className="t-spacer" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

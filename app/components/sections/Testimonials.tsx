"use client";

import { useState } from "react";
import SectionHead from "./SectionHead";

const testimonials = [
  {
    avatar: "AK",
    name: "Anya Kowal",
    role: "Co-founder, Halden Labs",
    quote:
      "Rosmox shipped our v1 in eight weeks, and it's still the cleanest codebase we own. The kind of team you write a retainer with, not a contract.",
  },
  {
    avatar: "RM",
    name: "Rahul Menon",
    role: "VP Operations, Sundra",
    quote:
      "They treated our agent infrastructure like a real product, not a demo. Three months in, our support backlog is gone.",
  },
  {
    avatar: "EC",
    name: "Elena Costa",
    role: "Founder, Mirroir Studio",
    quote:
      "Design that holds up under load. Engineering that holds up under scale. Rare to find both under one roof.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  const goPrev = () => {
    setActive((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const goNext = () => {
    setActive((current) => (current + 1) % testimonials.length);
  };

  return (
    <section id="words">
      <div className="container">
        <SectionHead
          label="From clients"
          title="Words from the people we've shipped with."
        />
        <div className="testimonials-shell">
          <div className="testimonials" aria-live="polite">
            <div className="t-card" key={testimonial.name}>
              <p className="quote">
                <span className="mark">&quot;</span>
                {testimonial.quote}
              </p>
              <div className="t-foot">
                <div className="t-avatar">{testimonial.avatar}</div>
                <div>
                  <div className="t-name">{testimonial.name}</div>
                  <div className="t-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-controls" aria-label="Testimonial controls">
            <button type="button" onClick={goPrev} aria-label="Previous testimonial">
              &lt;
            </button>
            <button type="button" onClick={goNext} aria-label="Next testimonial">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Reveal from "../Reveal";

const testimonials = [
  {
    initials: "AK",
    name: "Anya Kowal",
    role: "Co-founder, Halden Labs",
    quote:
      "Rosmox shipped our v1 in eight weeks, and it's still the cleanest codebase we own.",
  },
  {
    initials: "RM",
    name: "Rahul Menon",
    role: "VP Operations, Sundra",
    quote:
      "They treated our agent infrastructure like a real product. Our support backlog is gone.",
  },
  {
    initials: "EC",
    name: "Elena Costa",
    role: "Founder, Mirroir Studio",
    quote:
      "Design that holds up under load. Engineering that holds up under scale.",
  },
];

const total = testimonials.length;
const wrap = (index: number) => ((index % total) + total) % total;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section id="words" className="sec" aria-labelledby="words-title">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-index rv">Sec. 06 — On record</span>
          <h2 id="words-title" className="rv-wipe">
            Quoted,
            <br />
            <span className="accent">verbatim.</span>
          </h2>
        </Reveal>

        <Reveal className="quote-sheet rv">
          <div className="quote-stage" aria-live="polite">
            <span className="quote-mark display" aria-hidden="true">
              “
            </span>
            <blockquote key={t.name}>
              <p className="quote-text">{t.quote}</p>
              <footer className="quote-by">
                <span className="quote-initials mono" aria-hidden="true">
                  {t.initials}
                </span>
                <span>
                  <strong>{t.name}</strong>
                  <em className="mono">{t.role}</em>
                </span>
              </footer>
            </blockquote>
          </div>
          <div className="quote-controls">
            <span className="mono quote-count">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="quote-btn"
              aria-label="Previous testimonial"
              onClick={() => setActive((a) => wrap(a - 1))}
            >
              ←
            </button>
            <button
              type="button"
              className="quote-btn"
              aria-label="Next testimonial"
              onClick={() => setActive((a) => wrap(a + 1))}
            >
              →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

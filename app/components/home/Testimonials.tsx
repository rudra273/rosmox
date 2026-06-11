import type { CSSProperties } from "react";
import Reveal from "../Reveal";
import GlowCard from "../GlowCard";

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

export default function Testimonials() {
  return (
    <section id="words" className="sec" aria-labelledby="words-title">
      <div className="container">
        <Reveal className="sec-head">
          <p className="sec-chip mono rv">Signals</p>
          <h2 id="words-title" className="rv" style={{ "--d": "0.08s" } as CSSProperties}>
            What partners say <span className="grad-text">after launch.</span>
          </h2>
        </Reveal>

        <Reveal className="quotes-grid">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="rv-scale"
              style={{ "--d": `${i * 0.09}s` } as CSSProperties}
            >
              <GlowCard className="quote-card" tilt={2}>
                <span className="quote-glyph grad-text" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote>
                  <p>{t.quote}</p>
                  <footer>
                    <span className="quote-avatar mono" aria-hidden="true">
                      {t.initials}
                    </span>
                    <span>
                      <strong>{t.name}</strong>
                      <em>{t.role}</em>
                    </span>
                  </footer>
                </blockquote>
              </GlowCard>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import type { CSSProperties } from "react";
import Reveal from "../Reveal";

export default function CtaBand() {
  return (
    <section id="contact" className="sec on-ink cta-band" aria-labelledby="cta-title">
      <div className="container">
        <Reveal>
          <p className="mono cta-eyebrow rv">Last page of the manual</p>
          <h2 id="cta-title" className="visually-hidden">
            Start a project
          </h2>
          <Link href="/contact" className="cta-giant display rv-wipe">
            Start a<br />
            project <span className="cta-arrow">→</span>
          </Link>
          <div className="cta-under rv" style={{ "--d": "0.2s" } as CSSProperties}>
            <p>
              Tell us about the project. We respond within one business day.
            </p>
            <a href="mailto:hello@rosmox.com" className="footer-mail">
              hello@rosmox.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

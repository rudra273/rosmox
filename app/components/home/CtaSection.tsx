import Link from "next/link";
import Reveal from "../Reveal";

export default function CtaSection() {
  return (
    <section id="contact" className="sec" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta-panel rv-scale">
          <div className="cta-beam" aria-hidden="true" />
          <p className="sec-chip mono">Ready when you are</p>
          <h2 id="cta-title" className="display">
            Bring us your <span className="grad-text">hardest problem.</span>
          </h2>
          <p className="cta-sub">
            One conversation is enough to know if we&apos;re the right team.
            We reply within a business day.
          </p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-grad">
              Start a project <span className="arr">→</span>
            </Link>
            <a href="mailto:hello@rosmox.com" className="btn btn-glass">
              hello@rosmox.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

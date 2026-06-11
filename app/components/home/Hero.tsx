import Link from "next/link";
import AsciiField from "./AsciiField";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-topline mono">
          <span>
            <span className="hero-pulse" aria-hidden="true" />
            Rosmox — AI software company
          </span>
          <span aria-hidden="true">Fig. 01 — The work</span>
        </div>

        <h1 id="hero-title" className="hero-title display">
          <span className="hero-line">
            <span className="hero-line-inner">Intelligence,</span>
          </span>
          <span className="hero-line">
            <span className="hero-line-inner stroke">engineered</span>
          </span>
          <span className="hero-line">
            <span className="hero-line-inner">
              to ship<span className="hero-star">*</span>
            </span>
          </span>
        </h1>

        <div className="hero-deck">
          <p className="hero-lede">
            <span className="mono hero-foot" aria-hidden="true">
              *
            </span>
            We build AI SaaS products, agentic systems, Android apps, and web
            platforms — designed with intent, engineered for production, and
            shipped on schedule.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-solid">
              Start a project <span className="arr">→</span>
            </Link>
            <Link href="/products" className="btn btn-outline">
              See the products
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-instrument">
        <div className="container">
          <div className="hero-canvas-frame">
            <AsciiField />
            <span className="hero-canvas-tag mono" aria-hidden="true">
              Live signal — move your cursor
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <dl className="hero-meta">
          <div>
            <dt className="mono">Products shipped</dt>
            <dd className="display">05</dd>
          </div>
          <div>
            <dt className="mono">Disciplines, one company</dt>
            <dd className="display">04</dd>
          </div>
          <div>
            <dt className="mono">Systems in production</dt>
            <dd className="display">24/7</dd>
          </div>
          <div>
            <dt className="mono">Response time</dt>
            <dd className="display">&lt;1 day</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

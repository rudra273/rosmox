import Link from "next/link";
import HeroVisual from "./HeroVisual";

const trusted = ["Halden Labs", "North Atlas", "Verge & Co.", "Kindred Health"];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroVisual />

      {/* floating HUD readouts around the core */}
      <div className="hud" aria-hidden="true">
        <div className="hud-chip mono h1p">
          <i />agents · online
        </div>
        <div className="hud-chip mono h2p">
          <i />evals · passing
        </div>
        <div className="hud-chip mono h3p">
          <i />uptime · 99.98%
        </div>
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="sec-chip mono hero-chip">Rosmox — applied AI, in production</p>
          <h1 id="hero-title" className="display">
            Turn frontier AI into{" "}
            <span className="grad-text">product people trust.</span>
          </h1>
          <p className="hero-lede">
            We engineer AI SaaS platforms, autonomous agent systems, Android
            apps, and web products — secure, observable, and built to run in
            production from day one.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-grad">
              Start a project <span className="arr">→</span>
            </Link>
            <Link href="/products" className="btn btn-glass">
              Explore products
            </Link>
          </div>
          <div className="hero-trust">
            <span className="mono">Trusted by teams at</span>
            <ul>
              {trusted.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="hero-cue" aria-hidden="true">
        <span className="cue-line" />
        <span className="mono">Scroll</span>
      </div>
    </section>
  );
}

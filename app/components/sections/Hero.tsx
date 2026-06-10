import PrimaryBtn from "../ui/PrimaryBtn";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroVisual />
      <div className="container">
        <p className="hero-eyebrow">
          <span className="pulse" aria-hidden="true" />
          Rosmox — AI software studio
        </p>
        <h1 id="hero-title">
          <span className="mask">
            <span>Intelligence,</span>
          </span>
          <span className="mask">
            <span>
              <span className="serif">engineered</span> to ship.
            </span>
          </span>
        </h1>
        <p className="lede">
          We build AI SaaS products, agentic systems, Android apps, and web
          platforms — designed with intent, engineered for production, and
          shipped on schedule.
        </p>
        <div className="hero-actions">
          <PrimaryBtn href="/contact" variant="primary" arrow arrowSize={13}>
            Start a project
          </PrimaryBtn>
          <PrimaryBtn href="/products" variant="ghost">
            Explore our products
          </PrimaryBtn>
        </div>
        <div className="hero-meta">
          <div>
            <b>05</b> products shipped
          </div>
          <div>
            <b>04</b> disciplines, one studio
          </div>
          <div>
            <b>24/7</b> systems in production
          </div>
        </div>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="wire" />
        scroll
      </div>
    </section>
  );
}

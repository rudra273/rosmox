import PrimaryBtn from "../ui/PrimaryBtn";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1>
          <span>AI-native software,</span>
          <br />
          <span className="serif">shipped</span>
          <span> with intent.</span>
        </h1>
        <p className="lede">
          Rosmox is a small studio building production-grade SaaS, Android apps,
          web platforms, and autonomous agents. We design the surface, engineer
          the depth, and ship work that earns trust.
        </p>
        <div className="hero-actions">
          <PrimaryBtn href="/contact" variant="primary" arrow arrowSize={13}>
            Start a project
          </PrimaryBtn>
          <PrimaryBtn href="#products" variant="ghost">
            See our products
          </PrimaryBtn>
        </div>
      </div>
    </section>
  );
}

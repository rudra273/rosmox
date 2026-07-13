import type { CSSProperties } from "react";
import Link from "next/link";
import PrimaryBtn from "../ui/PrimaryBtn";
import HeroVisual from "./HeroVisual";

/** Word wrapped in a mask; --wi staggers the rise per word. */
function W({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <span className="w" style={{ "--wi": index } as CSSProperties}>
      <span>{children}</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroVisual />
      <div className="container">
        <p className="hero-eyebrow">
          <span className="pulse" aria-hidden="true" />
          Rosmox — AI software company
        </p>
        <h1 id="hero-title" aria-label="AI software, built for production.">
          <span aria-hidden="true">
            <W index={0}>AI</W> <W index={1}>software,</W> <W index={2}>built</W>{" "}
            <W index={3}>for</W>{" "}
            <W index={4}>
              <span className="serif">production.</span>
            </W>
          </span>
        </h1>
        <p className="lede">
          Rosmox builds AI products for Android and the web — on-device
          assistants, agentic systems, and the platforms behind them. Designed,
          engineered, and shipped by one team.
        </p>
        <div className="hero-actions">
          <PrimaryBtn href="/contact" variant="primary" arrow arrowSize={13}>
            Start a project
          </PrimaryBtn>
          <PrimaryBtn href="/products" variant="ghost">
            Explore our products
          </PrimaryBtn>
        </div>
        <Link href="/products" className="hero-index">
          In development — BhashaLens · OrbitAI · Vidyālaya · Storely ·
          Everything
        </Link>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="wire" />
        scroll
      </div>
    </section>
  );
}

import Link from "next/link";
import type { CSSProperties } from "react";
import Reveal from "../Reveal";
import GlowCard from "../GlowCard";
import { products } from "./productsData";

export default function ProductsShowcase() {
  return (
    <section id="products-home" className="sec" aria-labelledby="products-title">
      <div className="container">
        <Reveal className="sec-head showcase-head">
          <div>
            <p className="sec-chip mono rv">Product line</p>
            <h2 id="products-title" className="rv" style={{ "--d": "0.08s" } as CSSProperties}>
              Five products, <span className="grad-text">live and in orbit.</span>
            </h2>
            <p className="sec-sub rv" style={{ "--d": "0.16s" } as CSSProperties}>
              We run our own products in production — the same standards we
              bring to client systems.
            </p>
          </div>
          <Link
            href="/products"
            className="btn btn-glass rv showcase-all"
            style={{ "--d": "0.2s" } as CSSProperties}
          >
            View all <span className="arr">→</span>
          </Link>
        </Reveal>
      </div>

      <Reveal className="showcase-rail-wrap" amount={0.1}>
        <ul className="showcase-rail container">
          {products.map((p, i) => (
            <li
              key={p.name}
              className="rv-scale"
              style={{ "--d": `${i * 0.07}s`, "--hue": p.hue } as CSSProperties}
            >
              <GlowCard className="prod-card" tilt={2.5}>
                <div className="prod-orb" aria-hidden="true">
                  <span className="prod-glyph display">{p.glyph}</span>
                  <span className="prod-ring" />
                  <span className="prod-ring r2" />
                </div>
                <div className="prod-meta mono">
                  <span>{p.tag}</span>
                  <span>
                    {p.platform} · {p.year}
                  </span>
                </div>
                <h3 className="display">{p.name}</h3>
                <p className="prod-headline">{p.headline}</p>
                <p className="prod-desc">{p.desc}</p>
                <Link href={p.href} className="prod-link">
                  Explore {p.name} <span className="arr">→</span>
                </Link>
              </GlowCard>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

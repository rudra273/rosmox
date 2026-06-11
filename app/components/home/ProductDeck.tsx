import Link from "next/link";
import type { CSSProperties } from "react";
import Reveal from "../Reveal";
import { products } from "./productsData";

/**
 * The product deck: each card is position: sticky, so scrolling stacks them
 * like sheets on a desk — pure CSS, no scroll-jacking.
 */
export default function ProductDeck() {
  return (
    <section id="products-home" className="sec" aria-labelledby="products-title">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-index rv">Sec. 02 — Products</span>
          <h2 id="products-title" className="rv-wipe">
            Built here.
            <br />
            <span className="accent">Shipped for real.</span>
          </h2>
          <p className="sec-sub rv" style={{ "--d": "0.15s" } as CSSProperties}>
            Tools we made for real problems — then sharpened until they could
            stand on their own. Scroll: the deck stacks.
          </p>
        </Reveal>
      </div>

      <div className="container">
        <div className="deck">
          {products.map((p, i) => (
            <article
              className={`deck-card tone-${p.tone}`}
              style={{ "--i": i } as CSSProperties}
              key={p.name}
            >
              <div className="deck-head">
                <span className="deck-num mono">{p.num} / 05</span>
                <span className="deck-tag mono">{p.tag}</span>
                <span className="deck-year mono">
                  {p.platform} · {p.year}
                </span>
              </div>
              <div className="deck-body">
                <div className="deck-text">
                  <h3 className="display">{p.name}</h3>
                  <p className="deck-headline">{p.headline}</p>
                  <p className="deck-desc">{p.desc}</p>
                  <Link
                    href={p.href}
                    className={`btn ${p.tone === "ink" ? "btn-inverse" : "btn-outline"}`}
                  >
                    Open {p.name} <span className="arr">→</span>
                  </Link>
                </div>
                <div className="deck-visual">{p.diagram}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="deck-all">
          <Link href="/products" className="btn btn-solid">
            All products, one page <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import type { CSSProperties } from "react";
import Reveal from "../components/Reveal";
import { products } from "../components/home/productsData";
import { CrumbBar } from "../components/project/ProjectKit";

export default function ProductsPage() {
  return (
    <div className="catalogue">
      <CrumbBar backHref="/" backLabel="Home" right="Index — 5 entries" />

      <header className="catalogue-head">
        <div className="container">
          <p className="mono catalogue-eyebrow">The product index</p>
          <h1 className="display catalogue-title">
            Everything
            <br />
            <span className="catalogue-stroke">we&apos;ve built.</span>
          </h1>
          <p className="catalogue-sub">
            Tools we made for real problems — then sharpened until they could
            stand on their own. Every entry below is a working product.
          </p>
        </div>
      </header>

      <Reveal as="ul" className="catalogue-list container" amount={0.05}>
        {products.map((p, i) => (
          <li
            className="rv"
            style={{ "--d": `${i * 0.07}s` } as CSSProperties}
            key={p.name}
          >
            <Link href={p.href} className="cat-row">
              <span className="cat-num mono">{p.num}</span>
              <span className="cat-name display">{p.name}</span>
              <span className="cat-info">
                <span className="cat-headline">{p.headline}</span>
                <span className="cat-tags mono">
                  {p.tag} · {p.platform} · {p.year}
                </span>
              </span>
              <span className="cat-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </Reveal>

      <div className="container catalogue-foot">
        <p>Want one of these adapted for your team — or something new built the same way?</p>
        <Link href="/contact" className="btn btn-solid">
          Start a project <span className="arr">→</span>
        </Link>
      </div>
    </div>
  );
}

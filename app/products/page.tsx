import Link from "next/link";
import type { CSSProperties } from "react";
import Reveal from "../components/Reveal";
import GlowCard from "../components/GlowCard";
import { products } from "../components/home/productsData";
import { CrumbBar } from "../components/project/ProjectKit";

export default function ProductsPage() {
  return (
    <div className="plist">
      <CrumbBar backHref="/" backLabel="Home" right="5 products in orbit" />

      <header className="plist-head">
        <div className="container">
          <p className="sec-chip mono plist-chip">Product line</p>
          <h1 className="display plist-title">
            Software we run <span className="grad-text">ourselves.</span>
          </h1>
          <p className="plist-sub">
            Every product here started as a real problem and shipped as a real
            system. Pick one to see the full breakdown.
          </p>
        </div>
      </header>

      <Reveal as="ul" className="plist-grid container" amount={0.05}>
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
              <h2 className="display plist-name">{p.name}</h2>
              <p className="prod-headline">{p.headline}</p>
              <p className="prod-desc">{p.desc}</p>
              <Link href={p.href} className="prod-link">
                Explore {p.name} <span className="arr">→</span>
              </Link>
            </GlowCard>
          </li>
        ))}
      </Reveal>

      <div className="container plist-foot">
        <p>
          Want one of these adapted for your team — or something new built to
          the same standard?
        </p>
        <Link href="/contact" className="btn btn-grad">
          Start a project <span className="arr">→</span>
        </Link>
      </div>
    </div>
  );
}

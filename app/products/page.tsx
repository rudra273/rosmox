"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { products } from "../components/sections/productsData";
import ArrowIcon from "../components/ui/ArrowIcon";

export default function ProductsPage() {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const barRef = useRef<HTMLOListElement>(null);

  // Keep the active pill centered in the horizontal mobile bar without
  // affecting the page's vertical scroll. Compute scrollLeft relative to the
  // bar (offsetParent-independent) so the last pill can fully reveal.
  useEffect(() => {
    const bar = barRef.current;
    const pill = pillRefs.current[active];
    if (!bar || !pill) return;
    const barRect = bar.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    const delta =
      pillRect.left - barRect.left - bar.clientWidth / 2 + pillRect.width / 2;
    bar.scrollTo({ left: bar.scrollLeft + delta, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.index ?? 0
            );
            setActive(index);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="products-page">
      <header className="products-page-head">
        <Link href="/" className="back-link project-back">
          <span className="back-arrow">←</span> Home
        </Link>
        <div className="section-label">Our products</div>
        <h1 className="products-page-title">
          Everything we&apos;ve built, in one place.
        </h1>
        <p className="products-page-sub">
          Tools we made for real problems — then sharpened until they could
          stand on their own. Scroll to explore, or jump from the list.
        </p>
      </header>

      <div className="products-explorer">
        {/* Left: sticky index (does not scroll with the page) */}
        <nav className="products-index" aria-label="Product list">
          <ol ref={barRef}>
            {products.map((p, i) => (
              <li key={p.name}>
                <button
                  type="button"
                  ref={(el) => {
                    pillRefs.current[i] = el;
                  }}
                  className={`products-index-item${i === active ? " is-active" : ""}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => scrollTo(i)}
                >
                  <span className="products-index-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="products-index-name">{p.name}</span>
                  <span className={`products-index-dot ${p.markColor}`} />
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* Right: stacked scroll sections */}
        <div className="products-detail">
          {products.map((p, i) => (
            <section
              key={p.name}
              data-index={i}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className="products-slide"
            >
              <div className="products-detail-inner">
                <div className="products-detail-preview live">{p.mock}</div>
                <div className="products-detail-body">
                  <span className="product-tag">{p.tag}</span>
                  <h2 className="products-detail-name">{p.name}</h2>
                  <p className="products-detail-headline">{p.headline}</p>
                  <p className="products-detail-desc">{p.desc}</p>
                  <Link href={p.href} className="project-btn project-btn-primary">
                    Explore {p.name}
                    <ArrowIcon size={13} />
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

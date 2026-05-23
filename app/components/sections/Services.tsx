"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useInView } from "motion/react";
import SectionHead from "./SectionHead";

/* ---- icons (verbatim from draft1, stroke-width 1.6) ---- */
function IconSaaS() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}
function IconAndroid() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}
function IconWeb() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}
function IconAgents() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

/* ---- mini visualisations ---- */
function MiniSaaS() {
  return (
    <div className="service-mini mini-saas">
      {Array.from({ length: 7 }).map((_, i) => (
        <div className="b" key={i} />
      ))}
    </div>
  );
}
function MiniAndroid() {
  return (
    <div className="service-mini mini-android">
      <div className="phone">
        <div className="row" />
        <div className="row" />
        <div className="row" />
        <div className="row" />
      </div>
    </div>
  );
}
function MiniWeb() {
  return (
    <div className="service-mini mini-web">
      <div className="browser">
        <div className="content" />
        <div className="cursor">
          <svg viewBox="0 0 12 12">
            <path d="M2 1l4 9 1.5-3.5L11 5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
function MiniAgents() {
  return (
    <div className="service-mini mini-agents">
      <svg viewBox="0 0 200 64" preserveAspectRatio="none">
        <path className="edge" d="M 20 32 L 80 16 L 140 32 L 180 48" />
        <path className="edge" d="M 20 32 L 80 48 L 140 32 L 180 16" />
        <circle className="node-c" cx="20" cy="32" r="3.5" />
        <circle className="node-c" cx="80" cy="16" r="3.5" />
        <circle className="node-c" cx="80" cy="48" r="3.5" />
        <circle className="node-c" cx="140" cy="32" r="3.5" />
        <circle className="node-c" cx="180" cy="48" r="3.5" />
        <circle className="node-c" cx="180" cy="16" r="3.5" />
        <circle
          className="pulse-dot p1"
          r="2.5"
          style={{ offsetPath: "path('M 20 32 L 80 16 L 140 32 L 180 48')" } as CSSProperties}
        />
        <circle
          className="pulse-dot p2"
          r="2.5"
          style={{ offsetPath: "path('M 20 32 L 80 48 L 140 32 L 180 16')" } as CSSProperties}
        />
      </svg>
    </div>
  );
}

interface ServiceData {
  tag: string;
  icon: ReactNode;
  title: string;
  desc: string;
  mini: ReactNode;
}

const services: ServiceData[] = [
  {
    tag: "01",
    icon: <IconSaaS />,
    title: "AI SaaS products",
    desc: "Multi-tenant platforms with reasoning at the core — billing, auth, observability, the lot.",
    mini: <MiniSaaS />,
  },
  {
    tag: "02",
    icon: <IconAndroid />,
    title: "Android apps",
    desc: "Native Kotlin + Compose builds, Play Store-ready, with offline-first patterns where it matters.",
    mini: <MiniAndroid />,
  },
  {
    tag: "03",
    icon: <IconWeb />,
    title: "Web platforms",
    desc: "Marketing sites that convert, dashboards that perform, and storefronts that scale.",
    mini: <MiniWeb />,
  },
  {
    tag: "04",
    icon: <IconAgents />,
    title: "AI agents",
    desc: "Tool-using agents wired to your stack — research, ops, support — with guardrails and traces.",
    mini: <MiniAgents />,
  },
];

/** A single service card. Tracks cursor for the radial-glow (--mx/--my). */
function ServiceCard({ data }: { data: ServiceData }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <div className="service" onMouseMove={onMove}>
      <div>
        <div className="service-icon">{data.icon}</div>
        <h3>{data.title}</h3>
        <p>{data.desc}</p>
        {data.mini}
      </div>
      <div className="service-tag">{data.tag}</div>
    </div>
  );
}

export default function Services() {
  // desktop grid "deal-in": add `in` class when scrolled into view
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.15, margin: "0px 0px -60px 0px" });

  // mobile snap-scroll active dot
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / services.length;
    setActiveDot(Math.round(el.scrollLeft / cardWidth));
  };

  return (
    <section id="services">
      <div className="container">
        <SectionHead label="What we do" title="Four disciplines, one studio.">
          We don&apos;t sub-contract. Strategy, design, and engineering happen
          under the same roof — which is why the work feels coherent end-to-end.
        </SectionHead>

        <div className="services-wrap">
          {/* DESKTOP grid */}
          <div ref={gridRef} className={`services-grid${gridInView ? " in" : ""}`}>
            {services.map((s) => (
              <ServiceCard key={s.tag} data={s} />
            ))}
          </div>

          {/* MOBILE snap-scroll */}
          <div className="services-scroll-wrap">
            <div className="services-scroll" ref={scrollRef} onScroll={onScroll}>
              {services.map((s) => (
                <ServiceCard key={s.tag} data={s} />
              ))}
            </div>
            <div className="scroll-dots">
              {services.map((_, i) => (
                <span key={i} className={`dot${i === activeDot ? " active" : ""}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

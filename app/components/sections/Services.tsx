"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "motion/react";
import SectionHead from "./SectionHead";

/* ---- ambient mini visualisations, one per discipline ---- */
function MiniSaaS() {
  return (
    <div className="service-mini mini-saas" aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <div className="b" key={i} />
      ))}
    </div>
  );
}
function MiniAndroid() {
  return (
    <div className="service-mini mini-android" aria-hidden="true">
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
    <div className="service-mini mini-web" aria-hidden="true">
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
    <div className="service-mini mini-agents" aria-hidden="true">
      <svg viewBox="0 0 200 88" preserveAspectRatio="none">
        <path className="edge" d="M 20 44 L 80 22 L 140 44 L 180 66" />
        <path className="edge" d="M 20 44 L 80 66 L 140 44 L 180 22" />
        <circle className="node-c" cx="20" cy="44" r="3.5" />
        <circle className="node-c" cx="80" cy="22" r="3.5" />
        <circle className="node-c" cx="80" cy="66" r="3.5" />
        <circle className="node-c" cx="140" cy="44" r="3.5" />
        <circle className="node-c" cx="180" cy="66" r="3.5" />
        <circle className="node-c" cx="180" cy="22" r="3.5" />
        <circle
          className="pulse-dot p1"
          r="2.5"
          style={{ offsetPath: "path('M 20 44 L 80 22 L 140 44 L 180 66')" } as CSSProperties}
        />
        <circle
          className="pulse-dot p2"
          r="2.5"
          style={{ offsetPath: "path('M 20 44 L 80 66 L 140 44 L 180 22')" } as CSSProperties}
        />
      </svg>
    </div>
  );
}

interface ServiceData {
  num: string;
  kicker: string;
  title: string;
  desc: string;
  mini: ReactNode;
}

const services: ServiceData[] = [
  {
    num: "01",
    kicker: "Reasoning at the core",
    title: "AI SaaS products",
    desc: "Multi-tenant platforms with AI built into the product itself — auth, billing, observability, and the model layer engineered as one system, not a chatbot bolted on.",
    mini: <MiniSaaS />,
  },
  {
    num: "02",
    kicker: "Tools that act",
    title: "Agentic AI systems",
    desc: "Tool-using agents wired into your stack — research, operations, support — with guardrails, evals, and traces, so you can see exactly what they did and why.",
    mini: <MiniAgents />,
  },
  {
    num: "03",
    kicker: "Native, offline-first",
    title: "Android apps",
    desc: "Kotlin and Jetpack Compose builds that feel native because they are — Play Store-ready, offline-first where it matters, including on-device AI.",
    mini: <MiniAndroid />,
  },
  {
    num: "04",
    kicker: "Fast and findable",
    title: "Web platforms",
    desc: "Marketing sites that convert, dashboards that perform, storefronts that scale — semantic, accessible, and quick on real-world connections.",
    mini: <MiniWeb />,
  },
];

export default function Services() {
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.1, margin: "0px 0px -60px 0px" });

  return (
    <section id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHead
          label="What we do"
          index="01"
          title={
            <span id="services-title">
              Four disciplines. <span className="serif">One studio.</span>
            </span>
          }
        >
          Strategy, design, and engineering under the same roof — no
          sub-contracting, no hand-off gaps. That&apos;s why the work feels
          coherent end-to-end.
        </SectionHead>

        <div ref={listRef} className={`service-rows${inView ? " in" : ""}`}>
          {services.map((s) => (
            <article className="service-row" key={s.num}>
              <div className="service-num">/{s.num}</div>
              <div className="service-title">
                <h3>{s.title}</h3>
                <div className="service-kicker">{s.kicker}</div>
              </div>
              <p className="service-desc">{s.desc}</p>
              <div className="service-mini-shell">{s.mini}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

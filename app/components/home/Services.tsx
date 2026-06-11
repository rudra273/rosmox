"use client";

import { useState, type CSSProperties } from "react";
import Reveal from "../Reveal";

interface Service {
  num: string;
  title: string;
  kicker: string;
  desc: string;
  deliverables: string[];
}

const services: Service[] = [
  {
    num: "01",
    title: "AI SaaS products",
    kicker: "Reasoning at the core",
    desc: "Multi-tenant platforms with AI built into the product itself — auth, billing, observability, and the model layer engineered as one system, not a chatbot bolted on.",
    deliverables: ["Multi-tenant core", "Model layer", "Billing & auth", "Observability"],
  },
  {
    num: "02",
    title: "Agentic AI systems",
    kicker: "Tools that act",
    desc: "Tool-using agents wired into your stack — research, operations, support — with guardrails, evals, and traces, so you can see exactly what they did and why.",
    deliverables: ["Tool-using agents", "Guardrails & evals", "Full traces", "Stack integration"],
  },
  {
    num: "03",
    title: "Android apps",
    kicker: "Native, offline-first",
    desc: "Kotlin and Jetpack Compose builds that feel native because they are — Play Store-ready, offline-first where it matters, including on-device AI.",
    deliverables: ["Kotlin + Compose", "On-device AI", "Offline-first", "Play Store release"],
  },
  {
    num: "04",
    title: "Web platforms",
    kicker: "Fast and findable",
    desc: "Marketing sites that convert, dashboards that perform, storefronts that scale — semantic, accessible, and quick on real-world connections.",
    deliverables: ["Marketing sites", "Dashboards", "Storefronts", "SEO & Core Web Vitals"],
  },
];

export default function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="sec" aria-labelledby="services-title">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-index rv">Sec. 01 — Services</span>
          <h2 id="services-title" className="rv-wipe">
            Four disciplines.
            <br />
            <span className="accent">One company.</span>
          </h2>
          <p className="sec-sub rv" style={{ "--d": "0.15s" } as CSSProperties}>
            Strategy, design, and engineering under the same roof — no
            sub-contracting, no hand-off gaps. That&apos;s why the work feels
            coherent end-to-end.
          </p>
        </Reveal>

        <Reveal className="svc-ledger">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <article
                className={`svc-row rv${isOpen ? " open" : ""}`}
                style={{ "--d": `${i * 0.08}s` } as CSSProperties}
                key={s.num}
              >
                <h3 className="svc-h">
                  <button
                    type="button"
                    className="svc-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`svc-panel-${s.num}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="svc-num mono">/{s.num}</span>
                    <span className="svc-title display">{s.title}</span>
                    <span className="svc-kicker mono">{s.kicker}</span>
                    <span className="svc-glyph" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>
                </h3>
                {/* collapsed state animates via grid-template-rows; inner
                    visibility removes it from the a11y tree when closed */}
                <div className="svc-panel" id={`svc-panel-${s.num}`}>
                  <div className="svc-panel-inner">
                    <p className="svc-desc">{s.desc}</p>
                    <ul className="svc-chips">
                      {s.deliverables.map((d) => (
                        <li className="mono" key={d}>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

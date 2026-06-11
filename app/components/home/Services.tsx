import type { CSSProperties } from "react";
import Reveal from "../Reveal";
import GlowCard from "../GlowCard";

const services = [
  {
    title: "AI SaaS platforms",
    desc: "Complete products with intelligence at the core — multi-tenant architecture, model orchestration, billing, and analytics engineered as one coherent system.",
    tags: ["Model layer", "Multi-tenant", "Billing", "Analytics"],
    size: "lg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="8" rx="2" />
        <rect x="3" y="13" width="8" height="8" rx="2" />
        <path d="M17 13v8M13 17h8" />
      </svg>
    ),
  },
  {
    title: "Agentic systems",
    desc: "Autonomous agents that plan, call tools, and act inside your stack — with guardrails, evaluations, and complete traces of every decision.",
    tags: ["Tool use", "Guardrails", "Evals", "Traces"],
    size: "sm",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="5" r="2.2" />
        <circle cx="5" cy="19" r="2.2" />
        <circle cx="19" cy="19" r="2.2" />
        <path d="M10.8 6.8 6 17m7.2-10.2L18 17M7.2 19h9.6" />
      </svg>
    ),
  },
  {
    title: "Android engineering",
    desc: "Native Kotlin and Jetpack Compose apps with on-device AI — private, offline-capable, and Play Store ready.",
    tags: ["Kotlin", "Compose", "On-device AI"],
    size: "sm",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M11 18.5h2" />
      </svg>
    ),
  },
  {
    title: "Web platforms",
    desc: "High-performance marketing sites, dashboards, and storefronts — accessible, search-ready, and fast on real-world connections.",
    tags: ["Next.js", "Core Web Vitals", "SEO", "A11y"],
    size: "lg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.8 2.6 4 5.5 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.5-4-9s1.2-6.4 4-9z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="sec" aria-labelledby="services-title">
      <div className="container">
        <Reveal className="sec-head">
          <p className="sec-chip mono rv">Capabilities</p>
          <h2 id="services-title" className="rv" style={{ "--d": "0.08s" } as CSSProperties}>
            Four ways we put AI <span className="grad-text">to work.</span>
          </h2>
          <p className="sec-sub rv" style={{ "--d": "0.16s" } as CSSProperties}>
            One team across strategy, design, and engineering — so the model
            layer, the product, and the infrastructure are built to fit each
            other.
          </p>
        </Reveal>

        <Reveal className="bento">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`bento-cell ${s.size} rv-scale`}
              style={{ "--d": `${i * 0.08}s` } as CSSProperties}
            >
              <GlowCard className="svc-card">
                <span className="svc-icon" aria-hidden="true">
                  {s.icon}
                </span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="svc-tags">
                  {s.tags.map((t) => (
                    <li className="mono" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

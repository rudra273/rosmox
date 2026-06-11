"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView, animate } from "motion/react";
import Reveal from "../Reveal";

const stats = [
  { count: 100, unit: "%", label: "On-time delivery" },
  { count: 5, unit: "", label: "Products in production" },
  { count: 90, unit: "+", label: "Lighthouse & SEO scores" },
  { count: 24, unit: "/7", label: "Systems running" },
];

const pillars = [
  {
    title: "Intelligence inside the system",
    desc: "Not a chatbot bolted on the side — reasoning, retrieval, and automation wired directly into your stack and workflows.",
  },
  {
    title: "Engineering you can audit",
    desc: "Clean, typed, observable code. Every agent action traced, every release benchmarked against real production load.",
  },
  {
    title: "Found, fast, on schedule",
    desc: "Semantic markup, strong Core Web Vitals, and structured data from day one — delivered when we said it would be.",
  },
];

/** Count-up figure — cubic ease-out over 1.4s, fires once in view. */
function CountUp({ to, unit }: { to: number; unit?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.215, 0.61, 0.355, 1],
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span className="stat-figure display" ref={ref}>
      {value}
      {unit && <span className="stat-unit grad-text">{unit}</span>}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="why" className="sec" aria-labelledby="why-title">
      <div className="container">
        <Reveal className="sec-head">
          <p className="sec-chip mono rv">Why Rosmox</p>
          <h2 id="why-title" className="rv" style={{ "--d": "0.08s" } as CSSProperties}>
            Built for teams that <span className="grad-text">measure twice.</span>
          </h2>
        </Reveal>

        <Reveal className="stats-panel">
          {stats.map((s, i) => (
            <div
              className="stat rv"
              style={{ "--d": `${i * 0.08}s` } as CSSProperties}
              key={s.label}
            >
              <CountUp to={s.count} unit={s.unit} />
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="pillars">
          {pillars.map((p, i) => (
            <div
              className="pillar rv"
              style={{ "--d": `${i * 0.1}s` } as CSSProperties}
              key={p.title}
            >
              <span className="pillar-beam" aria-hidden="true" />
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

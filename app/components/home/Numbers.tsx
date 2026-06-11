"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView, animate } from "motion/react";
import Reveal from "../Reveal";

interface Stat {
  count: number;
  unit?: string;
  label: string;
}

const stats: Stat[] = [
  { count: 100, unit: "%", label: "On-time delivery" },
  { count: 100, unit: "%", label: "Code quality focus" },
  { count: 90, unit: "+", label: "Lighthouse / SEO scores" },
  { count: 24, unit: "/7", label: "AI systems that run" },
];

const pillars = [
  {
    title: "AI built into your systems",
    desc: "We don't just add a chatbot. We integrate reasoning, agents, and automation directly into your existing stack and workflows.",
  },
  {
    title: "High performance & clean code",
    desc: "Fast load times, smooth interactions, and a maintainable codebase. We benchmark against shipped software, not mockups.",
  },
  {
    title: "SEO & on-time delivery",
    desc: "Search-ready from day one — semantic markup, fast Core Web Vitals, and structured metadata. Shipped on schedule, every time.",
  },
];

/** Count-up number — cubic ease-out over 1.4s, fires once in view. */
function CountUp({ to, unit }: { to: number; unit?: string }) {
  const ref = useRef<HTMLDivElement>(null);
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
    <div className="num-figure display" ref={ref}>
      {value}
      {unit && <span className="num-unit">{unit}</span>}
    </div>
  );
}

export default function Numbers() {
  return (
    <section id="why" className="sec" aria-labelledby="why-title">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-index rv">Sec. 05 — Why Rosmox</span>
          <h2 id="why-title" className="rv-wipe">
            For teams who care
            <br />
            <span className="accent">about the details.</span>
          </h2>
        </Reveal>

        <Reveal className="num-grid">
          {stats.map((s, i) => (
            <div
              className="num-cell rv"
              style={{ "--d": `${i * 0.08}s` } as CSSProperties}
              key={s.label}
            >
              <CountUp to={s.count} unit={s.unit} />
              <div className="num-label mono">{s.label}</div>
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
              <span className="pillar-mark" aria-hidden="true" />
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

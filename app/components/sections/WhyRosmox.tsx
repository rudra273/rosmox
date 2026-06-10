"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";
import SectionHead from "./SectionHead";

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

/** Count-up number — replaces draft1's requestAnimationFrame tick.
 *  cubic ease-out over 1.4s, fires once when scrolled into view. */
function CountUp({ to, unit }: { to: number; unit?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.215, 0.61, 0.355, 1], // cubic ease-out (matches 1 - (1-p)^3)
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <div className="num" ref={ref}>
      {value}
      {unit && <span className="unit">{unit}</span>}
    </div>
  );
}

export default function WhyRosmox() {
  return (
    <section id="why">
      <div className="container">
        <SectionHead
          label="Why Rosmox"
          index="06"
          title={
            <>
              Built for teams who care <span className="serif">about the details.</span>
            </>
          }
        />
        <div className="why-wrap">
          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <CountUp to={s.count} unit={s.unit} />
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="pillars">
            {pillars.map((p) => (
              <div className="pillar" key={p.title}>
                <h3>
                  <span className="swatch" aria-hidden="true" /> {p.title}
                </h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

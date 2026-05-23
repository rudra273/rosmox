"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import SectionHead from "./SectionHead";

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "A working session to map the problem, constraints, and the shape of a great outcome.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Wireframes, then high-fidelity. A clickable prototype before we touch production code.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Weekly Loom updates, a shared Linear board, and a staging URL from week one.",
  },
  {
    num: "04",
    title: "Ship",
    desc: "Launch, monitor, iterate. We stay on for 30 days post-ship to make sure it lands.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -60px 0px" });

  return (
    <section id="process">
      <div className="container">
        <SectionHead label="How we work" title="Small team. Tight loops. Visible work." />

        <div ref={ref} className={`process${inView ? " in" : ""}`}>
          {/* must remain first child for the CSS nth-child stagger to line up */}
          <div className="process-line" />
          {steps.map((s) => (
            <div className="step" key={s.num}>
              <div className="step-num">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

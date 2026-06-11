import type { CSSProperties } from "react";
import Reveal from "../Reveal";

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
  return (
    <section id="process" className="sec on-ink" aria-labelledby="process-title">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-index rv">Sec. 04 — Method</span>
          <h2 id="process-title" className="rv-wipe">
            Small team. Tight loops.
            <br />
            <span className="accent-bright">Visible work.</span>
          </h2>
        </Reveal>

        <Reveal className="steps">
          {steps.map((s, i) => (
            <div
              className="step rv"
              style={{ "--d": `${i * 0.1}s` } as CSSProperties}
              key={s.num}
            >
              <div className="step-num display">{s.num}</div>
              <h3 className="display">{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

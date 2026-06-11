import type { CSSProperties } from "react";
import Reveal from "../Reveal";

const steps = [
  {
    num: "01",
    title: "Map",
    desc: "A working session to define the problem, the constraints, and what a great outcome looks like in production.",
  },
  {
    num: "02",
    title: "Prototype",
    desc: "Wireframes to high fidelity, fast. You click through a real prototype before any production code exists.",
  },
  {
    num: "03",
    title: "Engineer",
    desc: "Weekly demos, a shared board, and a staging URL from week one — you watch the system come alive.",
  },
  {
    num: "04",
    title: "Launch & run",
    desc: "Ship, monitor, iterate. We stay on for 30 days after launch to make sure it holds in the real world.",
  },
];

export default function Process() {
  return (
    <section id="process" className="sec" aria-labelledby="process-title">
      <div className="container">
        <Reveal className="sec-head">
          <p className="sec-chip mono rv">How we ship</p>
          <h2 id="process-title" className="rv" style={{ "--d": "0.08s" } as CSSProperties}>
            A tight loop, <span className="grad-text">end to end.</span>
          </h2>
        </Reveal>

        <Reveal className="timeline">
          <span className="timeline-beam rv-line" aria-hidden="true" />
          {steps.map((s, i) => (
            <div
              className="tl-step rv"
              style={{ "--d": `${0.15 + i * 0.12}s` } as CSSProperties}
              key={s.num}
            >
              <span className="tl-node" aria-hidden="true">
                <span className="mono">{s.num}</span>
              </span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

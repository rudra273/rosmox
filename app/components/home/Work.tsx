import type { CSSProperties } from "react";
import Reveal from "../Reveal";

const items = [
  { name: "Halden Labs", role: "Analytics dashboard", stack: "React · D3", year: "2025", live: true },
  { name: "North Atlas", role: "Marketing site", stack: "Next.js", year: "2025", live: true },
  { name: "Verge & Co.", role: "Developer portal", stack: "Docs · API", year: "2024", live: true },
  { name: "Sundra", role: "Android app", stack: "Kotlin", year: "2024", live: false },
  { name: "Kindred Health", role: "Patient portal", stack: "Web · Auth", year: "2025", live: true },
  { name: "Mirroir Studio", role: "Portfolio site", stack: "Web", year: "2024", live: false },
];

export default function Work() {
  return (
    <section id="work" className="sec" aria-labelledby="work-title">
      <div className="container">
        <Reveal className="sec-head">
          <p className="sec-chip mono rv">Track record</p>
          <h2 id="work-title" className="rv" style={{ "--d": "0.08s" } as CSSProperties}>
            Systems we&apos;ve shipped <span className="grad-text">for others.</span>
          </h2>
          <p className="sec-sub rv" style={{ "--d": "0.16s" } as CSSProperties}>
            Founders, ops teams, and agencies — most engagements run 6–12
            weeks from kickoff to launch.
          </p>
        </Reveal>

        <Reveal as="ul" className="work-list">
          {items.map((item, i) => (
            <li
              className="work-row rv"
              style={{ "--d": `${i * 0.06}s` } as CSSProperties}
              key={item.name}
            >
              <span className="work-status" aria-hidden="true" data-live={item.live} />
              <span className="work-name">{item.name}</span>
              <span className="work-role">{item.role}</span>
              <span className="work-stack mono">{item.stack}</span>
              <span className="work-year mono">{item.year}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

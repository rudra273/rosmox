import type { CSSProperties } from "react";
import Reveal from "../Reveal";

interface WorkItem {
  name: string;
  role: string;
  year: string;
  live: boolean;
}

const items: WorkItem[] = [
  { name: "Halden Labs", role: "Analytics dashboard · React · D3", year: "2025", live: true },
  { name: "North Atlas", role: "Marketing site", year: "2025", live: true },
  { name: "Verge & Co.", role: "Developer portal", year: "2024", live: true },
  { name: "Sundra", role: "Android app", year: "2024", live: false },
  { name: "Kindred Health", role: "Patient portal", year: "2025", live: true },
  { name: "Mirroir Studio", role: "Portfolio site", year: "2024", live: false },
];

export default function Work() {
  return (
    <section id="work" className="sec" aria-labelledby="work-title">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-index rv">Sec. 03 — Client work</span>
          <h2 id="work-title" className="rv-wipe">
            The ledger
            <br />
            <span className="accent">of shipped things.</span>
          </h2>
          <p className="sec-sub rv" style={{ "--d": "0.15s" } as CSSProperties}>
            A small sample. We work with founders, ops teams, and agencies —
            usually in 6–12 week engagements.
          </p>
        </Reveal>

        <Reveal as="ul" className="work-ledger">
          {items.map((item, i) => (
            <li
              className="work-row rv"
              style={{ "--d": `${i * 0.07}s` } as CSSProperties}
              key={item.name}
            >
              <span className="work-num mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="work-name display">{item.name}</span>
              <span className="work-role">{item.role}</span>
              <span className="work-year mono">{item.year}</span>
              <span className={`work-live mono${item.live ? " is-live" : ""}`}>
                {item.live ? "● Live" : "○ Internal"}
              </span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

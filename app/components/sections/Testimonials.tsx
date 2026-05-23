import SectionHead from "./SectionHead";

const testimonials = [
  {
    avatar: "AK",
    name: "Anya Kowal",
    role: "Co-founder, Halden Labs",
    quote:
      "Rosmox shipped our v1 in eight weeks, and it's still the cleanest codebase we own. The kind of team you write a retainer with, not a contract.",
  },
  {
    avatar: "RM",
    name: "Rahul Menon",
    role: "VP Operations, Sundra",
    quote:
      "They treated our agent infrastructure like a real product, not a demo. Three months in, our support backlog is gone.",
  },
  {
    avatar: "EC",
    name: "Elena Costa",
    role: "Founder, Mirroir Studio",
    quote:
      "Design that holds up under load. Engineering that holds up under scale. Rare to find both under one roof.",
  },
];

export default function Testimonials() {
  return (
    <section id="words">
      <div className="container">
        <SectionHead
          label="From clients"
          title="Words from the people we've shipped with."
        />
        <div className="testimonials">
          {testimonials.map((t) => (
            <div className="t-card" key={t.name}>
              <p className="quote">
                <span className="mark">&quot;</span>
                {t.quote}
              </p>
              <div className="t-foot">
                <div className="t-avatar">{t.avatar}</div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

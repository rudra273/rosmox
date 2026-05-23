const columns = [
  {
    title: "Studio",
    links: [
      { href: "#services", label: "Services" },
      { href: "#work", label: "Work" },
      { href: "#process", label: "Process" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "#", label: "Pulse" },
      { href: "#", label: "Forge" },
      { href: "#", label: "Relay" },
      { href: "#", label: "Lens" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
    ],
  },
];

const socials = [
  { href: "#", label: "X", aria: "X / Twitter" },
  { href: "#", label: "LinkedIn", aria: "LinkedIn" },
  { href: "#", label: "GitHub", aria: "GitHub" },
  { href: "#", label: "Dribbble", aria: "Dribbble" },
];

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#" className="brand">
              <span className="brand-dot" />
              <span>Rosmox</span>
            </a>
            <p>
              An AI-native software studio. We design, build, and ship the work
              that earns trust.
            </p>
          </div>
          {columns.map((col) => (
            <div className="foot-col" key={col.title}>
              <h5>{col.title}</h5>
              {col.links.map((l, i) => (
                <a key={`${l.label}-${i}`} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>© 2026 Rosmox Studio. All rights reserved.</span>
          <div className="socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.aria}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

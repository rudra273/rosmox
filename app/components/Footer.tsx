import Link from "next/link";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/#services", label: "Services" },
      { href: "/#work", label: "Work" },
      { href: "/#process", label: "Process" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "/projects/bhashalens", label: "BhashaLens" },
      { href: "/projects/orbitai", label: "OrbitAI" },
      { href: "/projects/vidyalaya", label: "Vidyālaya" },
      { href: "/projects/storely", label: "Storely" },
      { href: "/projects/everything", label: "Everything" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/projects/vidyalaya/privacy-policy", label: "Vidyālaya privacy" },
      { href: "/projects/storely/privacy-policy", label: "Storely privacy" },
      { href: "/projects/everything/privacy-policy", label: "Everything privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-beam" aria-hidden="true" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="Rosmox — home">
              <span className="brand-orb" aria-hidden="true" />
              Rosmox
            </Link>
            <p>
              An AI company. We build AI SaaS products, agentic systems,
              Android apps, and web platforms — engineered for production.
            </p>
            <a href="mailto:hello@rosmox.com" className="footer-mail">
              hello@rosmox.com
            </a>
          </div>
          {columns.map((col) => (
            <nav className="footer-col" key={col.title} aria-label={col.title}>
              <h2 className="mono">{col.title}</h2>
              {col.links.map((l) => (
                <Link key={`${col.title}-${l.label}`} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Rosmox. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="mailto:hello@rosmox.com">Email</a>
            <Link href="/contact">Start a project</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

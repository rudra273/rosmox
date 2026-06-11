import Link from "next/link";

const columns = [
  {
    title: "Studio",
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
      <div className="footer-mark" aria-hidden="true">
        <div className="display">Rosmox</div>
      </div>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="wordmark" aria-label="Rosmox — home">
            Rosmox<sup>®</sup>
          </Link>
          <p>
            An AI-native software studio. We design, build, and ship AI SaaS,
            agentic systems, Android apps, and web platforms.
          </p>
          <a href="mailto:hello@rosmox.com" className="footer-mail">
            hello@rosmox.com
          </a>
        </div>
        {columns.map((col) => (
          <nav className="footer-col" key={col.title} aria-label={col.title}>
            <h2>{col.title}</h2>
            {col.links.map((l) => (
              <Link key={`${col.title}-${l.label}`} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© {new Date().getFullYear()} Rosmox. All rights reserved.</span>
          <span>Designed &amp; engineered in-house</span>
          <Link href="/contact">Start a project →</Link>
        </div>
      </div>
    </footer>
  );
}

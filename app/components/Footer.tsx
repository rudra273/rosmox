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
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="brand" aria-label="Rosmox — home">
              <span className="brand-mark" aria-hidden="true" />
              <span>Rosmox</span>
            </Link>
            <p>
              An AI-native software studio. We design, build, and ship AI SaaS,
              agentic systems, Android apps, and web platforms.
            </p>
            <a href="mailto:hello@rosmox.com" className="foot-mail">
              hello@rosmox.com
            </a>
          </div>
          {columns.map((col) => (
            <nav className="foot-col" key={col.title} aria-label={col.title}>
              <h2>{col.title}</h2>
              {col.links.map((l) => (
                <Link key={`${col.title}-${l.label}`} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Rosmox. All rights reserved.</span>
          <div className="socials">
            <a href="mailto:hello@rosmox.com">Email</a>
            <Link href="/contact">Start a project</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

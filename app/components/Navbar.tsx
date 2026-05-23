import ArrowIcon from "./ui/ArrowIcon";

const links = [
  { href: "#services", label: "Services" },
  { href: "#products", label: "Products" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
];

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#" className="brand">
          <span className="brand-dot" />
          <span>Rosmox</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav-cta">
          Book a call
          <ArrowIcon size={12} />
        </a>
      </div>
    </header>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer" id="footer" style={{ marginTop: 'auto' }}>
      <div className="footer-grid">
        <div className="footer-column footer-brand-col">
          <span className="footer-brand">ROSMOX</span>
          <p className="footer-tagline">We build software that ships.</p>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Quick Links</h4>
          <Link href="/#services" className="footer-link">Services</Link>
          <Link href="/#products" className="footer-link">Products</Link>
          <Link href="/contact" className="footer-link">Contact</Link>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Connect</h4>
          <a href="#" className="footer-link">GitHub</a>
          <a href="#" className="footer-link">Twitter / X</a>
          <a href="#" className="footer-link">LinkedIn</a>
          <a href="mailto:hello@rosmox.com" className="footer-link">Email</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 ROSMOX. All rights reserved.</span>
      </div>
    </footer>
  );
}

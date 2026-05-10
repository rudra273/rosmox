"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      document.querySelector(".nav-pill")?.classList.toggle("nav-scrolled", y > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="nav-pill" id="main-nav">
      <Link href="/" className="nav-logo">ROSMOX</Link>
      <div className="nav-divider" />
      <div className="nav-links">
        {pathname === "/" ? (
          <>
            <a href="#services" className="nav-link">Services</a>
            <a href="#products" className="nav-link">Products</a>
          </>
        ) : (
          <>
            <Link href="/#services" className="nav-link">Services</Link>
            <Link href="/#products" className="nav-link">Products</Link>
          </>
        )}
        <Link 
          href="/contact" 
          className="nav-link" 
          style={pathname === "/contact" ? { color: "var(--text-primary)" } : {}}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

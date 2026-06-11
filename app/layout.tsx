import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jmono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jmono",
  display: "swap",
});

const SITE_URL = "https://rosmox.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rosmox — AI SaaS & intelligent systems",
    template: "%s — Rosmox",
  },
  description:
    "Rosmox is an AI company building AI SaaS products, agentic systems, Android apps, and web platforms — production-grade intelligence you can trust.",
  keywords: [
    "AI company",
    "AI SaaS development",
    "agentic AI systems",
    "AI agents",
    "Android app development",
    "web platform development",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Rosmox",
    title: "Rosmox — AI SaaS & intelligent systems",
    description:
      "AI SaaS products, agentic systems, Android apps, and web platforms — production-grade intelligence you can trust.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosmox — AI SaaS & intelligent systems",
    description:
      "AI SaaS products, agentic systems, Android apps, and web platforms — production-grade intelligence you can trust.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rosmox",
  url: SITE_URL,
  email: "hello@rosmox.com",
  description:
    "AI company building AI SaaS products, agentic systems, Android apps, and web platforms.",
  knowsAbout: [
    "Artificial intelligence",
    "AI agents",
    "SaaS development",
    "Android development",
    "Web development",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rosmox",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${grotesk.variable} ${inter.variable} ${jmono.variable}`}>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <div className="atmos" aria-hidden="true" />
        <div className="starlines" aria-hidden="true" />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}

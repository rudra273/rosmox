import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = "https://rosmox.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rosmox — AI-native software studio",
    template: "%s — Rosmox",
  },
  description:
    "Rosmox is an AI-native software studio. We build AI SaaS products, agentic AI systems, Android apps, and web platforms for ambitious teams.",
  keywords: [
    "AI software studio",
    "agentic AI development",
    "AI SaaS development",
    "Android app development",
    "web development agency",
    "AI agents",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Rosmox",
    title: "Rosmox — AI-native software studio",
    description:
      "We build AI SaaS products, agentic AI systems, Android apps, and web platforms for ambitious teams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosmox — AI-native software studio",
    description:
      "We build AI SaaS products, agentic AI systems, Android apps, and web platforms for ambitious teams.",
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
    "AI-native software studio building AI SaaS products, agentic AI systems, Android apps, and web platforms.",
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
      <body
        className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <div className="atmos" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
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

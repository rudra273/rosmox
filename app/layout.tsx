import type { Metadata } from "next";
import { Anton, Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
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
        className={`${anton.variable} ${archivo.variable} ${spaceMono.variable}`}
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
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

import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import NeuralBackground from "./components/NeuralBackground";
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

export const metadata: Metadata = {
  title: "Rosmox — AI-native software, shipped.",
  description:
    "Rosmox is an AI-native software studio building SaaS products, Android apps, web platforms, and AI agents for ambitious teams.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      >
        <NeuralBackground />
        <div className="atmos" />
        <div className="grain" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

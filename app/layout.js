import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://rosmox.com"),
  title: {
    default: "ROSMOX — Product Studio",
    template: "%s | ROSMOX",
  },
  description:
    "ROSMOX is a product studio that designs and builds production-grade apps and digital products.",
  applicationName: "ROSMOX",
  keywords: [
    "ROSMOX",
    "product studio",
    "app development",
    "website development",
    "Vidyalaya",
    "software studio",
  ],
  openGraph: {
    title: "ROSMOX — Product Studio",
    description:
      "We design and build production-grade apps and digital products.",
    url: "https://rosmox.com",
    siteName: "ROSMOX",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROSMOX — Product Studio",
    description:
      "We design and build production-grade apps and digital products.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}

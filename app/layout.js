import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://rosmox.com"),
  title: {
    default: "Rosmox",
    template: "%s | Rosmox",
  },
  description:
    "Rosmox builds focused apps and websites, showcases shipped products, and accepts new freelance projects.",
  applicationName: "Rosmox",
  keywords: [
    "Rosmox",
    "freelance developer",
    "app development",
    "website development",
    "Vidyalaya",
  ],
  openGraph: {
    title: "Rosmox",
    description:
      "A product studio site for Rosmox apps, launches, and client work.",
    url: "https://rosmox.com",
    siteName: "Rosmox",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosmox",
    description:
      "A product studio site for Rosmox apps, launches, and client work.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#efe8da] text-slate-900 antialiased">{children}</body>
    </html>
  );
}

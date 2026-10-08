import type { Metadata } from "next";

import AboutPage from "@/components/AboutPage";

/* About — /about (content: lib/about.ts). The homepage About blocks
   link to its sections: /about#quality, #data-care, … and #team */

const DESCRIPTION =
  "Meet ROSMOX, your partner in AI and digital transformation. Discover our team and our approach to quality, data care, transparency, and ongoing support.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About ROSMOX", description: DESCRIPTION },
};

export default function Page() {
  return <AboutPage />;
}

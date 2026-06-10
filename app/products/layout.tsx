import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Rosmox products: BhashaLens Indic OCR, OrbitAI on-device assistant, Vidyālaya offline textbooks, Storely inventory & billing, and Everything privacy utility.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Rosmox products",
    description:
      "BhashaLens, OrbitAI, Vidyālaya, Storely, and Everything — software we build for ourselves, refined until it stands on its own.",
    url: "/products",
  },
};

export default function ProductsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

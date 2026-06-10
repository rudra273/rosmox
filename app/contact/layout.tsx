import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell Rosmox about your project — AI SaaS, agentic systems, Android apps, or web platforms. We respond within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a project with Rosmox",
    description:
      "Tell us about your project — AI SaaS, agentic systems, Android apps, or web platforms. We respond within one business day.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

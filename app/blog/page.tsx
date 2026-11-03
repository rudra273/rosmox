import type { Metadata } from "next";

import BlogIndex from "@/components/BlogIndex";

/* Blog index — /blog (content: lib/blog.ts). */

const DESCRIPTION =
  "Industry perspectives and operational insights from ROSMOX on retail, commerce, connected platforms, and practical AI.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    title: "Insights & Perspectives — ROSMOX",
    description: DESCRIPTION,
  },
};

export default function Page() {
  return <BlogIndex />;
}

import type { MetadataRoute } from "next";

const SITE_URL = "https://rosmox.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0 },
    { path: "/products", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/projects/bhashalens", priority: 0.8 },
    { path: "/projects/orbitai", priority: 0.8 },
    { path: "/projects/vidyalaya", priority: 0.8 },
    { path: "/projects/storely", priority: 0.8 },
    { path: "/projects/everything", priority: 0.8 },
    { path: "/projects/vidyalaya/privacy-policy", priority: 0.3 },
    { path: "/projects/storely/privacy-policy", priority: 0.3 },
    { path: "/projects/everything/privacy-policy", priority: 0.3 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));
}

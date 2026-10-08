import type { MetadataRoute } from "next";

import { PRODUCTS } from "@/lib/products";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    ...SERVICES.map((s) => ({
      url: `${SITE.url}${s.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${SITE.url}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/products/vidyakalp/delete-account`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...PRODUCTS.filter((p) => p.privacyPolicyPath).map((p) => ({
      url: `${SITE.url}${p.privacyPolicyPath}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}

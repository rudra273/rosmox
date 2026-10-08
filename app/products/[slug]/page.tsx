import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetail from "@/components/ProductDetail";
import { PRODUCTS, getProduct } from "@/lib/products";

/* ──────────────────────────────────────────────────────────
   Product detail route — /products/[slug]

   Server component: resolves the slug, sets per-product metadata,
   and prerenders one static page per product. The animated body
   lives in the ProductDetail client component. Navbar/Footer
   come from app/layout.tsx.
   ────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  const path = `/products/${product.slug}`;
  return {
    title: product.name, // "%s — ROSMOX" template comes from the root layout
    description: product.tagline,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: product.name,
      description: product.tagline,
      ...(product.image.endsWith(".webp") && {
        images: [{ url: product.image, alt: product.imageAlt ?? product.name }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.tagline,
      ...(product.image.endsWith(".webp") && { images: [product.image] }),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}

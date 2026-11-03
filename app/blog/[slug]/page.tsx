import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostDetail from "@/components/BlogPostDetail";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";
import { SITE } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   Blog post route — /blog/[slug]

   Server component: resolves the slug, sets metadata + Article
   JSON-LD, and prerenders one static page per post.
   ────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article not found" };
  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.desc,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: post.title,
      description: post.desc,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.desc,
    datePublished: post.publishedAt,
    url: `${SITE.url}/blog/${post.slug}`,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostDetail post={post} />
    </>
  );
}

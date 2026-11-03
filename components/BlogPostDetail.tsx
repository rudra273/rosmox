import Link from "next/link";

import { IconArrowRight } from "@/components/icons";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog";
import { cssDelay, STAGGER } from "@/lib/motion";
import { PRODUCTS } from "@/lib/products";
import { SERVICES } from "@/lib/services";
import { PRIMARY_CTA } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   BlogPostDetail — body of /blog/[slug].

     1. Hero (dark)       — breadcrumb, category, title, executive lead,
                            and jump-links to each section
     2. Editorial (light) — executive overview + numbered sections
     3. Related (dark)    — subtle consultancy-style capability links & CTA
   ────────────────────────────────────────────────────────── */

export default function BlogPostDetail({ post }: { post: BlogPost }) {
  const relatedServices = post.relatedServices
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is (typeof SERVICES)[number] => !!s);

  const relatedProducts = post.relatedProducts
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is (typeof PRODUCTS)[number] => !!p);

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);

  return (
    <>
      {/* ── 1. Hero ── */}
      <section data-theme="dark" className="relative overflow-clip bg-ink">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-12%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
        </div>

        <div className="container-page relative pb-20 pt-32 md:pb-28 md:pt-40">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="reveal-rise mb-8 flex flex-wrap items-center gap-2 font-mono text-label text-white/50"
          >
            <Link href="/blog" className="transition-colors hover:text-white">
              BLOG
            </Link>
            <span aria-hidden>/</span>
            <span className="text-glow">{post.n}</span>
            <span aria-hidden>·</span>
            <span>{post.category}</span>
          </nav>

          {/* Title */}
          <h1 className="max-w-4xl font-display text-display font-semibold text-white">
            <span className="line-mask">
              <span className="line" style={cssDelay(80)}>
                {post.title}
              </span>
            </span>
          </h1>

          {/* Executive lead */}
          <p
            className="reveal-rise mt-6 max-w-3xl text-lead text-white/70"
            style={cssDelay(200)}
          >
            {post.lead}
          </p>

          {/* Meta bar */}
          <div
            className="reveal-rise mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 font-mono text-label text-white/50"
            style={cssDelay(260)}
          >
            <span>PUBLISHED {post.publishedLabel.toUpperCase()}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime.toUpperCase()}</span>
            <span aria-hidden>·</span>
            <span className="text-white/70">ROSMOX INDUSTRY PERSPECTIVE</span>
          </div>

          {/* Section jump links */}
          <nav
            aria-label="In this article"
            className="reveal-rise mt-10"
            style={cssDelay(320)}
          >
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {post.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex h-full flex-col justify-between gap-3 rounded-md border border-white/10 bg-white/[0.03] p-4 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <span className="font-mono text-label text-glow">
                      {s.n}
                    </span>
                    <span className="text-sm font-medium leading-snug text-white/85 group-hover:text-white">
                      {s.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ── 2. Article Body (light editorial surface) ── */}
      <section data-theme="light" className="section-y bg-paper text-ink">
        <div className="container-page">
          {/* Executive overview */}
          <div className="grid gap-8 pb-12 lg:grid-cols-12 lg:gap-10 lg:pb-16">
            <Reveal className="lg:col-span-4">
              <Eyebrow tone="light">Overview</Eyebrow>
              <p className="mt-4 font-mono text-label text-ink/55">
                THE OPERATIONAL SHIFT
              </p>
            </Reveal>

            <div className="space-y-5 lg:col-span-8">
              {post.intro.map((para, i) => (
                <Reveal
                  as="p"
                  key={i}
                  delay={i * STAGGER}
                  className={
                    i === 0
                      ? "font-display text-xl font-medium leading-snug text-ink md:text-2xl"
                      : "max-w-3xl text-[0.9375rem] leading-relaxed text-ink/70 md:text-base"
                  }
                >
                  {para}
                </Reveal>
              ))}
            </div>
          </div>

          {/* Numbered sections */}
          <div className="border-t border-ink/10">
            {post.sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="grid scroll-mt-24 gap-8 border-b border-ink/10 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16"
              >
                <Reveal className="lg:col-span-4">
                  <span className="font-mono text-label text-primary-ink">
                    SECTION {section.n}
                  </span>
                  <h2 className="mt-4 font-display text-h3 font-semibold text-ink">
                    {section.title}
                  </h2>
                </Reveal>

                <div className="lg:col-span-8">
                  {section.lead && (
                    <Reveal
                      as="p"
                      delay={0.05}
                      className="font-display text-xl font-medium leading-snug text-ink md:text-2xl"
                    >
                      {section.lead}
                    </Reveal>
                  )}

                  {section.paragraphs.map((para, i) => (
                    <Reveal
                      as="p"
                      key={i}
                      delay={0.1 + i * STAGGER}
                      className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-ink/70 md:text-base"
                    >
                      {para}
                    </Reveal>
                  ))}

                  {section.points && section.points.length > 0 && (
                    <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                      {section.points.map((pt, i) => (
                        <Reveal
                          as="li"
                          key={pt.title}
                          delay={0.12 + i * STAGGER}
                          className="rounded-md border border-ink/10 bg-paper-2/70 p-6"
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              aria-hidden
                              className="h-1.5 w-1.5 shrink-0 bg-primary-ink"
                            />
                            <h3 className="font-display text-base font-semibold text-ink md:text-lg">
                              {pt.title}
                            </h3>
                          </div>
                          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/70">
                            {pt.desc}
                          </p>
                        </Reveal>
                      ))}
                    </ul>
                  )}

                  {section.closing && (
                    <Reveal
                      as="p"
                      delay={0.2}
                      className="mt-8 border-l-2 border-primary-ink pl-5 font-display text-lg font-medium leading-snug text-ink/90"
                    >
                      {section.closing}
                    </Reveal>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Related Capabilities & CTA (dark) ── */}
      <section
        data-theme="dark"
        className="section-y relative overflow-clip border-t border-white/10 bg-ink text-white"
      >
        <div className="container-page">
          <Reveal>
            <Eyebrow>Related Capabilities</Eyebrow>
          </Reveal>
          <RevealText
            text="Where we help businesses put these ideas to work."
            className="mt-5 max-w-3xl font-display text-h2 font-semibold"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {relatedServices.map((svc, i) => (
              <Reveal
                key={svc.slug}
                delay={i * STAGGER}
                className="flex flex-col justify-between rounded-md border border-white/10 bg-elevated/70 p-6"
              >
                <div>
                  <span className="font-mono text-label text-glow">
                    SERVICE · {svc.n}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-white">
                    {svc.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {svc.desc}
                  </p>
                </div>
                <Link
                  href={svc.href}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-glow"
                >
                  Explore service
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            ))}

            {relatedProducts.map((prod, i) => (
              <Reveal
                key={prod.slug}
                delay={(relatedServices.length + i) * STAGGER}
                className="flex flex-col justify-between rounded-md border border-white/10 bg-elevated/70 p-6"
              >
                <div>
                  <span className="font-mono text-label text-glow">
                    PRODUCT · {prod.tag}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-white">
                    {prod.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {prod.tagline}
                  </p>
                </div>
                <Link
                  href={`/products/${prod.slug}`}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-glow"
                >
                  Explore {prod.name}
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            ))}
          </div>

          {otherPosts.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-14">
              <Reveal>
                <Eyebrow>More Perspectives</Eyebrow>
              </Reveal>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {otherPosts.map((other, i) => (
                  <Reveal
                    key={other.slug}
                    delay={i * STAGGER}
                    className="flex flex-col justify-between rounded-md border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 hover:border-white/20"
                  >
                    <div>
                      <span className="font-mono text-label text-glow">
                        {other.n} · {other.category}
                      </span>
                      <h3 className="mt-3 font-display text-xl font-semibold text-white">
                        <Link
                          href={`/blog/${other.slug}`}
                          className="transition-colors duration-200 hover:text-glow"
                        >
                          {other.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/60">
                        {other.desc}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${other.slug}`}
                      className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-glow"
                    >
                      Read article
                      <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-10">
            <Button href="/blog" variant="secondary">
              All articles
            </Button>
            <Button href={PRIMARY_CTA.href} size="lg" arrow="right">
              {PRIMARY_CTA.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

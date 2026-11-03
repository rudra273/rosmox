import Link from "next/link";

import { IconArrowRight } from "@/components/icons";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import { BLOG_POSTS } from "@/lib/blog";
import { cssDelay, STAGGER } from "@/lib/motion";
import { PRIMARY_CTA } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   BlogIndex — body of /blog.

     1. Hero (dark)      — headline, intro + featured perspective
     2. Articles (light) — index of industry perspectives & section jump-ins
     3. CTA (dark)       — discuss your business goals
   ────────────────────────────────────────────────────────── */

export default function BlogIndex() {
  const featured = BLOG_POSTS[0];

  return (
    <>
      {/* ── 1. Hero + Featured Article ── */}
      <section data-theme="dark" className="relative overflow-clip bg-ink">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-12%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
        </div>

        <div className="container-page relative pb-20 pt-32 md:pb-28 md:pt-40">
          <Eyebrow className="reveal-rise">Insights & Perspectives</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-display font-semibold text-white">
            <span className="line-mask">
              <span className="line" style={cssDelay(80)}>
                Perspectives on industries, operations, and digital business.
              </span>
            </span>
          </h1>
          <p
            className="reveal-rise mt-6 max-w-2xl text-lead text-white/60"
            style={cssDelay(220)}
          >
            How modern businesses simplify daily operations, connect their workflows, and put practical technology to work across retail, commerce, and services.
          </p>

          {featured && (
            <div
              className="reveal-lift mt-14 rounded-lg border border-white/10 bg-elevated/70 p-7 md:mt-16 md:p-12"
              style={cssDelay(320)}
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-label text-white/55">
                <span className="text-glow">{featured.n}</span>
                <span aria-hidden>·</span>
                <span>{featured.category}</span>
                <span aria-hidden>·</span>
                <span>{featured.publishedLabel.toUpperCase()}</span>
                <span aria-hidden>·</span>
                <span>{featured.readingTime.toUpperCase()}</span>
              </div>

              <h2 className="mt-5 max-w-4xl font-display text-h2 font-semibold text-white">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="transition-colors duration-200 hover:text-glow"
                >
                  {featured.title}
                </Link>
              </h2>

              <p className="mt-5 max-w-3xl text-lead text-white/70">
                {featured.lead}
              </p>

              <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-white/55 md:text-base">
                {featured.desc}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-7">
                <Button href={`/blog/${featured.slug}`} arrow="right">
                  Read article
                </Button>
                <div className="flex flex-wrap gap-2">
                  {featured.sections.map((sec) => (
                    <Link
                      key={sec.id}
                      href={`/blog/${featured.slug}#${sec.id}`}
                      className="rounded-sm border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-label text-white/60 transition-colors duration-200 hover:border-white/25 hover:text-white"
                    >
                      {sec.n} · {sec.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 2. All Perspectives / Key Themes (light) ── */}
      <section data-theme="light" className="section-y bg-paper text-ink">
        <div className="container-page">
          <Reveal>
            <Eyebrow tone="light">All Articles</Eyebrow>
          </Reveal>
          <RevealText
            text="Industry insights and operational guides."
            className="mt-5 max-w-3xl font-display text-h2 font-semibold"
          />

          <div className="mt-14 border-t border-ink/10">
            {BLOG_POSTS.map((post, idx) => (
              <article
                key={post.slug}
                className="grid gap-8 border-b border-ink/10 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16"
              >
                <Reveal className="lg:col-span-4" delay={idx * STAGGER}>
                  <div className="flex items-center gap-3 font-mono text-label text-ink/55">
                    <span className="text-primary-ink">{post.n}</span>
                    <span aria-hidden>·</span>
                    <span>{post.publishedLabel}</span>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <p className="mt-3 font-mono text-label text-ink/60">
                    {post.category}
                  </p>
                </Reveal>

                <div className="lg:col-span-8">
                  <Reveal delay={0.05}>
                    <h3 className="font-display text-h3 font-semibold text-ink">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition-colors duration-200 hover:text-primary-ink"
                      >
                        {post.title}
                      </Link>
                    </h3>
                  </Reveal>
                  <Reveal
                    as="p"
                    delay={0.1}
                    className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink/65 md:text-base"
                  >
                    {post.desc}
                  </Reveal>

                  <Reveal delay={0.15} className="mt-6">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-primary-ink"
                    >
                      Read full perspective
                      <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CTA (dark) ── */}
      <section
        data-theme="dark"
        className="section-y relative overflow-clip border-t border-white/10 bg-ink text-white"
      >
        <div className="container-page">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <Eyebrow>Work with us</Eyebrow>
              </Reveal>
              <RevealText
                text="Looking to simplify how your business operates?"
                className="mt-5 max-w-2xl font-display text-h2 font-semibold"
              />
              <Reveal
                as="p"
                delay={0.1}
                className="mt-4 max-w-xl text-lead text-white/60"
              >
                Tell us about your operations, workflows, or product goals. We’ll discuss where connected systems and practical AI can help.
              </Reveal>
            </div>
            <Reveal delay={0.15} className="lg:col-span-4 lg:flex lg:justify-end">
              <Button href={PRIMARY_CTA.href} size="lg" arrow="right">
                {PRIMARY_CTA.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

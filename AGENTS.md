<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ROSMOX website — project notes

- Commands: `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`. README.md has the structure and design-system notes.
- Design tokens only (`app/globals.css`): colours, `rounded-sm|md|lg`, `text-display…text-label`, `container-page`, `section-y`. No hand-picked px values.
- Motion: animate `transform`/`opacity` only; easings and durations come from `lib/motion.ts`.
- Framer: import `m`, never `motion` (ESLint blocks it). `<LazyMotion>` in `components/Providers.tsx` loads the features after hydration, so anything visible on first paint animates with the CSS reveals (`.line-mask`, `.reveal-rise`, `.reveal-fade`, `.reveal-lift` + `cssDelay`).
- Content lives in `lib/*.ts` (services, products, work, site). Don't invent stats, testimonials or client claims — real content only.
- Every `<section>` sets `data-theme="dark" | "light"` (the navbar reads it). Links are root-relative (`/#work`).

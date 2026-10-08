"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  m,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { IconArrowUpRight, IconChevronDown } from "@/components/icons";
import { useLenis } from "@/components/SmoothScroll";
import Logo from "@/components/ui/Logo";
import { DURATION, EASE_OUT, SPRING } from "@/lib/motion";
import { SERVICES } from "@/lib/services";
import { NAV_CTA, NAV_LINKS, PRIMARY_CTA, SITE } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   Navbar — three floating "islands" sharing one style:
     logo (left) · link bar (centre, desktop) · CTA / burger (right)

   · Theme-aware: reads data-theme of the section under the bar
     and switches between a dark and a light glass treatment.
   · Hides on scroll down, returns on scroll up.
   · Scrollspy: the active section gets a sliding pill.
   · Services expands the centre bar into a menu —
     click, hover (with close delay) or keyboard; links are
     `inert` while closed so they never steal Tab focus.
   ────────────────────────────────────────────────────────── */

type Theme = "dark" | "light";

const HIDE_AFTER = 120; // px of scroll before the bar may hide
const CLOSE_DELAY = 160; // ms — hover-intent grace period

/* Theme of the surface at (x, y), skipping the header itself */
function themeAt(x: number, y: number): Theme {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest("[data-site-header]")) continue;
    const t = el.closest<HTMLElement>("[data-theme]")?.dataset.theme;
    if (t === "light" || t === "dark") return t;
  }
  return "dark";
}

/* id of the topmost <section> at (x, y) */
function sectionAt(x: number, y: number): string | null {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest("[data-site-header]")) continue;
    const s = el.closest<HTMLElement>("section[id]");
    if (s) return s.id;
  }
  return null;
}

function useSurface(pathname: string) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const x = window.innerWidth / 2;
      setTheme(themeAt(x, 36));
      setActive(
        pathname === "/"
          ? sectionAt(x, window.innerHeight * 0.45)
          : pathname.startsWith("/contact")
            ? "contact"
            : pathname.startsWith("/products")
            ? "products"
            : pathname.startsWith("/services")
              ? "services"
              : pathname.startsWith("/solutions")
                ? "solutions"
                : pathname.startsWith("/blog")
                  ? "blog"
                  : null,
      );
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return { theme, active };
}

/* Below lg the logo and burger sit on one shared island, so
   their own island surface is stripped there */
const MOBILE_BARE =
  "max-lg:border-transparent max-lg:bg-transparent max-lg:shadow-none max-lg:backdrop-filter-none";

/* shared island surface */
function islandClass(theme: Theme) {
  return [
    "border backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,color,box-shadow] duration-300",
    theme === "dark"
      ? "border-white/[0.08] bg-[rgb(16_19_28/0.66)] text-white"
      : "border-ink/[0.07] bg-white/75 text-ink shadow-[0_10px_30px_-14px_rgba(4,6,13,0.22)]",
  ].join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme: surfaceTheme, active } = useSurface(pathname);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [hidden, setHidden] = useState(false);

  const servicesBtn = useRef<HTMLButtonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  const theme = surfaceTheme;

  /* ── hide on scroll down, reveal on scroll up ── */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (y < HIDE_AFTER) {
      setHidden(false);
      return;
    }
    if (Math.abs(y - prev) < 4) return; // ignore sub-pixel jitter
    setHidden(y > prev);
  });
  const isHidden = hidden && !servicesOpen && !mobileOpen;

  /* ── services menu: hover intent + keyboard + outside click ── */
  const cancelClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(
      () => setServicesOpen(false),
      CLOSE_DELAY,
    );
  }, [cancelClose]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        servicesBtn.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [servicesOpen]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  /* ── menus close on route change; the mobile accordion resets
     whenever the overlay closes (state adjusted during render,
     not in an effect, so there's no extra commit) ── */
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
  }
  if (!mobileOpen && mobileServices) setMobileServices(false);

  /* ── mobile overlay: lock scroll, Escape ── */
  const lenis = useLenis();
  useEffect(() => {
    if (!mobileOpen) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, lenis]);

  const linkClass = (isActive: boolean) =>
    [
      "relative flex h-9 items-center gap-1 whitespace-nowrap rounded-sm px-3.5 text-sm font-medium transition-colors duration-200",
      theme === "dark"
        ? isActive
          ? "text-white"
          : "text-white/70 hover:bg-white/[0.06] hover:text-white"
        : isActive
          ? "text-ink"
          : "text-ink/65 hover:bg-ink/[0.05] hover:text-ink",
    ].join(" ");

  const divider = theme === "dark" ? "border-white/10" : "border-ink/10";
  const muted =
    theme === "dark"
      ? "text-white/65 hover:text-white"
      : "text-ink/65 hover:text-ink";

  const activePill = (
    <m.span
      layoutId="nav-active"
      transition={SPRING}
      aria-hidden
      className={`absolute inset-0 -z-10 rounded-sm ${
        theme === "dark" ? "bg-white/10" : "bg-ink/[0.07]"
      }`}
    />
  );

  return (
    <>
      <m.header
        data-site-header
        initial={false}
        animate={{ y: isHidden ? -88 : 0 }}
        transition={{ duration: DURATION.slow, ease: EASE_OUT }}
        onFocusCapture={() => setHidden(false)}
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
      >
        <div className="flex items-start justify-between px-3 pt-3 md:px-4 md:pt-4">
          {/* ── Logo island — same shell and link treatment as the centre bar ── */}
          <div className={`pointer-events-auto relative flex h-12 items-center rounded-md px-1.5 ${islandClass(theme)} ${MOBILE_BARE}`}>
            <Link
              href="/"
              aria-label={`${SITE.name} home`}
              onClick={() => setMobileOpen(false)}
              className={linkClass(false)}
            >
              <Logo tone={theme} className="text-[1.0625rem]" />
            </Link>
          </div>

          {/* ── Centre link bar (desktop) ── */}
          <nav
            aria-label="Primary"
            className="pointer-events-none absolute inset-x-0 top-4 hidden justify-center lg:flex"
          >
            <m.div
              ref={barRef}
              initial={false}
              animate={{ height: servicesOpen ? "auto" : 48 }}
              transition={{ duration: DURATION.slow, ease: EASE_OUT }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className={`pointer-events-auto overflow-hidden rounded-md px-1.5 py-1.25 ${islandClass(theme)}`}
            >
              <ul className="isolate flex items-center justify-evenly gap-0.5">
                <li>
                  <button
                    ref={servicesBtn}
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls="nav-services-menu"
                    onMouseEnter={() => {
                      cancelClose();
                      setServicesOpen(true);
                    }}
                    onClick={() => setServicesOpen((v) => !v)}
                    className={linkClass(active === "services" || servicesOpen)}
                  >
                    {(active === "services" || servicesOpen) && activePill}
                    Services
                    <IconChevronDown
                      className={`h-3.5 w-3.5 opacity-60 transition-transform duration-300 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </li>
                {NAV_LINKS.map((link) => {
                  const id = link.href.split("#")[1] ?? link.href.slice(1);
                  const isActive = !servicesOpen && active === id;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onMouseEnter={() => setServicesOpen(false)}
                        onFocus={() => setServicesOpen(false)}
                        aria-current={isActive ? "true" : undefined}
                        className={linkClass(isActive)}
                      >
                        {isActive && activePill}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Services menu — always mounted (for height measuring),
                  inert while closed. Its fixed width sets the bar's
                  width; the link row centres within it. */}
              <div
                id="nav-services-menu"
                inert={!servicesOpen}
                className="grid w-[40rem] grid-cols-2 gap-1 pt-1.5"
              >
                {SERVICES.map((g, i) => {
                  const muted = theme === "dark" ? "text-white/55" : "text-ink/60";
                  // the whole group lights up together — every link in it
                  // opens the same service page
                  const groupHover =
                    theme === "dark"
                      ? "hover:bg-white/[0.06] focus-within:bg-white/[0.06]"
                      : "hover:bg-ink/[0.05] focus-within:bg-ink/[0.05]";
                  const textHover =
                    theme === "dark"
                      ? "group-hover/svc:text-white group-focus-within/svc:text-white"
                      : "group-hover/svc:text-ink group-focus-within/svc:text-ink";
                  return (
                    <m.div
                      key={g.slug}
                      initial={false}
                      animate={{
                        opacity: servicesOpen ? 1 : 0,
                        y: servicesOpen ? 0 : 6,
                      }}
                      transition={{
                        duration: DURATION.slow,
                        ease: EASE_OUT,
                        delay: servicesOpen ? 0.05 + i * 0.035 : 0,
                      }}
                      className={`group/svc flex flex-col gap-0.5 rounded-sm p-1.5 transition-colors duration-200 ${groupHover}`}
                    >
                      <Link
                        href={g.href}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm font-medium"
                      >
                        {g.title}
                        <IconArrowUpRight
                          aria-hidden
                          className={`h-3.5 w-3.5 transition-transform duration-200 group-hover/svc:-translate-y-px group-hover/svc:translate-x-px ${
                            theme === "dark" ? "text-glow" : "text-primary-ink"
                          }`}
                        />
                      </Link>
                      <ul className="flex flex-col">
                        {/* sub-services all open their service's page */}
                        {g.deliverables.map((d) => (
                          <li key={d.title}>
                            <Link
                              href={g.href}
                              onClick={() => setServicesOpen(false)}
                              className={`block rounded-sm px-2 py-1 text-[0.8125rem] transition-colors duration-200 ${muted} ${textHover}`}
                            >
                              {d.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  );
                })}
              </div>
            </m.div>
          </nav>

          {/* ── CTA island (desktop) — matches the centre bar, lights up on #contact ── */}
          <div
            className={`pointer-events-auto hidden h-12 items-center rounded-md px-1.5 lg:flex ${islandClass(theme)}`}
          >
            <Link
              href={NAV_CTA.href}
              aria-current={active === "contact" ? "true" : undefined}
              className={`group/cta isolate ${linkClass(active === "contact")}`}
            >
              {active === "contact" && (
                <m.span
                  layoutId="nav-cta-active"
                  transition={SPRING}
                  aria-hidden
                  className={`absolute inset-0 -z-10 rounded-sm ${
                    theme === "dark" ? "bg-white/10" : "bg-ink/[0.07]"
                  }`}
                />
              )}
              {NAV_CTA.label}
              <IconArrowUpRight
                className={`h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:-translate-y-px group-hover/cta:translate-x-px ${
                  theme === "dark" ? "text-glow" : "text-primary-ink"
                }`}
              />
            </Link>
          </div>

          {/* ── Burger island (mobile) ── */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className={`pointer-events-auto relative flex h-12 w-12 items-center justify-center rounded-md lg:hidden ${islandClass(theme)} ${MOBILE_BARE}`}
          >
            <span className="relative block h-3 w-5">
              <m.span
                className="absolute left-0 top-1/2 h-[1.5px] w-5 rounded-full bg-current"
                initial={false}
                animate={mobileOpen ? { y: 0, rotate: 45 } : { y: -3.5, rotate: 0 }}
                transition={{ duration: DURATION.slow, ease: EASE_OUT }}
              />
              <m.span
                className="absolute left-0 top-1/2 h-[1.5px] w-5 rounded-full bg-current"
                initial={false}
                animate={mobileOpen ? { y: 0, rotate: -45 } : { y: 3.5, rotate: 0 }}
                transition={{ duration: DURATION.slow, ease: EASE_OUT }}
              />
            </span>
          </button>

          {/* ── Mobile island — one shell behind the logo and burger that
              grows into the menu, like the desktop Services menu ── */}
          <m.div
            initial={false}
            animate={{ height: mobileOpen ? "auto" : 48 }}
            transition={{ duration: DURATION.slow, ease: EASE_OUT }}
            className={`pointer-events-auto absolute inset-x-3 top-3 -z-10 overflow-hidden rounded-md md:inset-x-4 md:top-4 lg:hidden ${islandClass(theme)}`}
          >
            <nav
              id="mobile-menu"
              aria-label="Mobile"
              inert={!mobileOpen}
              data-lenis-prevent
              className="flex h-[calc(100dvh-1.5rem)] flex-col overflow-y-auto px-3 pb-3 pt-14 md:h-[calc(100dvh-2rem)]"
            >
              {/* Services accordion */}
              <MobileItem index={0} open={mobileOpen}>
                <button
                  type="button"
                  onClick={() => setMobileServices((v) => !v)}
                  aria-expanded={mobileServices}
                  aria-controls="mobile-services"
                  className={`flex w-full items-center justify-between border-b py-3 text-base font-medium ${divider}`}
                >
                  Services
                  <IconChevronDown
                    className={`h-4 w-4 opacity-60 transition-transform duration-300 ${
                      mobileServices ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </MobileItem>

              <div
                id="mobile-services"
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  mobileServices ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden" inert={!mobileServices}>
                  <ul className={`flex flex-col gap-1 border-b py-2 ${divider}`}>
                    {SERVICES.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={s.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block py-1.5 text-sm transition-colors ${muted}`}
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {NAV_LINKS.map((link, i) => (
                <MobileItem key={link.href} index={i + 1} open={mobileOpen}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block border-b py-3 text-base font-medium ${divider}`}
                  >
                    {link.label}
                  </Link>
                </MobileItem>
              ))}

              {/* CTA sits at the bottom of the full-height island */}
              <MobileItem index={NAV_LINKS.length + 1} open={mobileOpen} className="mt-auto">
                <div className="flex flex-col gap-3 pt-8">
                  <Link
                    href={PRIMARY_CTA.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex h-11 items-center justify-center rounded-sm bg-primary text-sm font-semibold text-ink transition-colors active:scale-[0.98]"
                  >
                    {PRIMARY_CTA.label}
                  </Link>
                  <a
                    href={`mailto:${SITE.email}`}
                    className={`link-underline mx-auto text-sm ${muted}`}
                  >
                    {SITE.email}
                  </a>
                </div>
              </MobileItem>
            </nav>
          </m.div>
        </div>
      </m.header>

      {/* ── Mobile: tap outside the menu to close it ── */}
      {mobileOpen && (
        <div
          aria-hidden
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 lg:hidden"
        />
      )}
    </>
  );
}

/* Mobile menu item — same fade + rise as the desktop Services menu */
function MobileItem({
  index,
  open,
  className,
  children,
}: {
  index: number;
  open: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <m.div
      initial={false}
      className={className}
      animate={{ opacity: open ? 1 : 0, y: open ? 0 : 6 }}
      transition={{
        duration: DURATION.slow,
        ease: EASE_OUT,
        delay: open ? 0.05 + index * 0.035 : 0,
      }}
    >
      {children}
    </m.div>
  );
}

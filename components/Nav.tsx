"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CTA_LABEL, NAV_LINKS } from "@/lib/site";
import { ButtonLink } from "@/components/Button";

/**
 * Fixed nav. On pages with a full-bleed dark hero (`overlay`), it starts
 * transparent with light text and gains a sand surface once scrolled.
 * Everywhere else it's a solid sand surface from the start.
 */
export function Nav({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      // Light focus trap: the menu is the only interactive surface while open.
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    // The menu and its close button only exist below md — if the viewport
    // crosses the breakpoint while open, close so body scroll never strands.
    const mq = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => mq.matches && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const light = overlay && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        light
          ? "bg-transparent text-sand-on-night"
          : open
            ? // No backdrop blur while the menu is open: backdrop-filter makes
              // the header the containing block for the fixed menu panel,
              // which would collapse the panel to the header's own height.
              "bg-sand text-ink"
            : "bg-sand/90 text-ink backdrop-blur-md"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-clay focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bone"
      >
        Skip to content
      </a>
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="font-display text-lg font-extrabold tracking-tight"
        >
          Hunter Espaniola
          <span className="sr-only">, home</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-opacity hover:opacity-70 ${
                pathname === l.href ? "underline underline-offset-8" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/portal"
            className="inline-flex h-11 items-center justify-center rounded-full border border-current/30 px-6 text-sm font-medium transition-opacity hover:opacity-70"
          >
            Client portal
          </Link>
          <ButtonLink href="/book" size="md">
            {CTA_LABEL}
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ButtonLink href="/book" size="md">
            {CTA_LABEL}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="fixed inset-0 top-16 z-40 flex flex-col bg-sand px-6 pb-10 pt-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={reduce ? {} : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-3xl font-extrabold tracking-tight text-ink"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={reduce ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * NAV_LINKS.length, duration: 0.35 }}
              >
                <Link
                  href="/portal"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-full border border-ink/30 px-6 text-sm font-semibold text-ink"
                >
                  Client portal
                </Link>
              </motion.div>
            </div>
            <div className="mt-auto">
              <ButtonLink
                href="/book"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {CTA_LABEL}
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

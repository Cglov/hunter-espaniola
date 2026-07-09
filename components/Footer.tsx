import Link from "next/link";
import { CTA_LABEL, NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-night text-sand-on-night">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-extrabold tracking-tight">
              Hunter Espaniola
            </p>
            <p className="mt-2 text-sm text-sand-on-night/70">
              {SITE.tagline}. Serving {SITE.serviceArea}.
            </p>
            <p className="mt-4 text-eyebrow text-sand-on-night/65">
              FAA Part 107 Certified Remote Pilot
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm hover:text-bone hover:underline underline-offset-4"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="text-sm font-semibold text-bone hover:underline underline-offset-4"
            >
              {CTA_LABEL}
            </Link>
            <Link
              href="/portal"
              className="text-sm text-sand-on-night/70 hover:text-bone hover:underline underline-offset-4"
            >
              Client portal
            </Link>
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
              className="hover:text-bone hover:underline underline-offset-4"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="hover:text-bone hover:underline underline-offset-4"
            >
              {SITE.email}
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bone hover:underline underline-offset-4"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-sand-on-night/15 pt-6 text-xs text-sand-on-night/65 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} Hunter Espaniola. All rights
            reserved.
          </p>
          <p>Aerial &amp; ground real estate media, Southern Utah.</p>
        </div>
      </div>
    </footer>
  );
}

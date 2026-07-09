import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CalEmbed } from "@/components/book/CalEmbed";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a 15-minute intro call with Hunter Espaniola. Aerial and ground real estate media for St. George and Southern Utah listings, starting at $500 per property.",
};

const HOLD_STEPS = ["Pick a time", "$10 hold", "Refunded after the call"];

const REASSURANCES = [
  "FAA Part 107 certified",
  "Southern Utah based",
  "No obligation after the call",
];

const linkClass =
  "font-medium text-clay underline decoration-clay/30 underline-offset-4 hover:text-clay-deep hover:decoration-clay-deep";

export default function BookPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-16">
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
          <Reveal>
            <h1 className="text-display text-5xl sm:text-6xl md:text-7xl">
              Book a call.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-soft">
              Fifteen minutes on the phone. We talk through the listing, the
              timing, and the light. You leave with a plan.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 sm:mt-14">
            <section
              aria-labelledby="hold-heading"
              className="overflow-hidden rounded-2xl border border-ink/10 bg-bone"
            >
              <div className="border-b border-ink/10 px-5 py-6 sm:px-8 sm:py-7">
                <h2 id="hold-heading" className="sr-only">
                  How booking works
                </h2>
                <ol className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
                  {HOLD_STEPS.map((label, i) => (
                    <li key={label} className="flex items-center gap-3">
                      <span
                        className="font-display text-sm font-extrabold text-clay"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium text-ink">{label}</span>
                      {i < HOLD_STEPS.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="hidden text-ink-faint sm:ml-1 sm:inline"
                        >
                          &rarr;
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
                  A fully refundable $10 hold reserves your time and comes
                  back to you right after we talk. It just keeps the calendar
                  honest.
                </p>
              </div>
              <CalEmbed />
            </section>
          </Reveal>

          <Reveal delay={0.15} className="mt-8">
            <p className="text-sm text-ink-soft">
              Rather talk first? Email{" "}
              <a href={`mailto:${SITE.email}`} className={linkClass}>
                {SITE.email}
              </a>{" "}
              or call{" "}
              <a
                href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
                className={linkClass}
              >
                {SITE.phone}
              </a>
              .
            </p>
          </Reveal>
        </div>

        <section
          aria-label="Good to know"
          className="border-t border-ink/10 bg-sand-deep"
        >
          <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-5 py-5 sm:px-8">
            {REASSURANCES.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-3 text-eyebrow text-ink-soft"
              >
                {i > 0 && (
                  <span aria-hidden="true" className="text-ink-faint">
                    &middot;
                  </span>
                )}
                {item}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

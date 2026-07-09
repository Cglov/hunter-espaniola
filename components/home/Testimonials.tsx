import { Reveal } from "@/components/Reveal";

/**
 * Launches with clearly-labeled sample quotes — the dashed chip must stay
 * until real client quotes replace these. TODO(hunter): collect two or three
 * real quotes with names and permission to publish, then remove the chip.
 */
export function Testimonials() {
  return (
    <section className="bg-sand py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="sr-only">What clients say</h2>

        <Reveal>
          <p className="inline-flex items-center rounded-full border border-dashed border-ink/35 bg-bone px-4 py-1.5 text-xs font-semibold text-ink-soft">
            Sample quote. Real client words coming soon.
          </p>

          <figure className="mt-10 max-w-3xl">
            <blockquote className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              &ldquo;Buyers kept bringing up the film at showings. It set the
              tone before they ever reached the driveway.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-ink-soft">
              Listing agent, St. George · sample quote
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="mt-14 max-w-xl md:ml-auto md:text-right">
            <blockquote className="text-xl font-medium leading-relaxed text-ink sm:text-2xl">
              &ldquo;In and out in an afternoon, and the footage looked like it
              came from a much bigger production.&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-ink-soft">
              Homeowner, Kayenta · sample quote
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

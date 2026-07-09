import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    title: "Book",
    body: "A fifteen-minute call covers the address, the timeline, and what the listing needs. That's the whole booking process.",
  },
  {
    title: "Film",
    body: "One visit, scheduled around the best light on your lot. I handle airspace clearance and the weather call.",
  },
  {
    title: "Deliver",
    body: "An edited film and stills, delivered fast and sized for MLS, web, and Instagram, ready to post as they land.",
  },
] as const;

/**
 * Book → Film → Deliver as an airy horizontal flow over hairline rules.
 * Deliberately not three cards.
 */
export function HowItWorks() {
  return (
    <section className="bg-sand py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-display text-4xl sm:text-5xl md:text-6xl">
            Booking is the easy part.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            No production circus. Three steps between a phone call and a
            finished film.
          </p>
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.1}
              className="border-t border-ink/20 pt-6"
            >
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-extrabold tracking-wide text-ink-faint"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 max-w-xs leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

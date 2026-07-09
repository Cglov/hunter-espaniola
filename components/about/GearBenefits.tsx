import { Reveal } from "@/components/Reveal";

/**
 * The DJI Mini 4 Pro translated into buyer outcomes — a divided
 * editorial list, deliberately not a spec sheet and not cards.
 */
const BENEFITS = [
  {
    capability: "Obstacle sensing in every direction",
    outcome:
      "I can fly tight, confident lines close to rooflines, pergolas, and red rock without ever putting the property at risk. Those close passes are what make a film feel expensive.",
  },
  {
    capability: "4K at 60 frames, 10-bit HDR",
    outcome:
      "Footage that holds up on a 75-inch TV in a buyer's living room and in a paused Instagram frame on their phone. Desert light swings from hard sun to deep shadow, and HDR keeps both.",
  },
  {
    capability: "48-megapixel stills",
    outcome:
      "Print-grade photos from the same flight: the MLS hero shot, the brochure spread, a framed print for the seller at closing. One session covers film and stills.",
  },
  {
    capability: "A small, quiet airframe",
    outcome:
      "The drone weighs less than a can of soda and sounds like a distant fan. Sellers stay relaxed, neighbors barely notice, and the shoot never turns into an event on the street.",
  },
] as const;

export function GearBenefits() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
      <Reveal className="max-w-2xl">
        <h2 className="text-display text-4xl sm:text-5xl">
          The gear, translated.
        </h2>
        <p className="mt-5 text-lg text-ink-soft">
          I fly a DJI Mini 4 Pro. Specs do not sell houses, so here is what
          each one actually does for your listing.
        </p>
      </Reveal>
      <ul className="mt-10 border-t border-ink/10 md:mt-14">
        {BENEFITS.map((b, i) => (
          <Reveal
            key={b.capability}
            as="li"
            delay={i * 0.05}
            className="grid gap-2 border-b border-ink/10 py-7 md:grid-cols-12 md:gap-8 md:py-9"
          >
            <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl md:col-span-5 lg:col-span-4">
              {b.capability}
            </h3>
            <p className="leading-relaxed text-ink-soft md:col-span-7 lg:col-span-8 lg:max-w-3xl">
              {b.outcome}
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

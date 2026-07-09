import { ButtonLink } from "@/components/Button";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

/** The big-number pricing moment. Always "starting at" — never a flat price. */
export function PricingTeaser() {
  return (
    <section className="border-y border-ink/10 bg-sand-deep py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 md:grid-cols-12 md:items-end md:gap-8">
        <Reveal className="md:col-span-7">
          <h2 className="text-display text-5xl sm:text-7xl lg:text-8xl">
            Starting at{" "}
            <span className="text-clay">{SITE.startingPrice}</span>
            <span className="mt-2 block">per property.</span>
          </h2>
        </Reveal>

        <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
          <p className="text-lg leading-relaxed text-ink-soft">
            Every shoot is scoped to the listing. Twilight sets, vertical cuts
            for social, and full aerial coverage are there when the property
            calls for them.
          </p>
          <ButtonLink href="/services" variant="ghost" className="mt-8">
            Services &amp; Pricing
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

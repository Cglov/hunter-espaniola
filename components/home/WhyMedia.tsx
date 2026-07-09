import Image from "next/image";
import { Reveal } from "@/components/Reveal";

/**
 * The value-prop editorial moment: a big-type argument for filming a listing,
 * paired with a behind-the-scenes still. Statement, not a card grid.
 */
export function WhyMedia() {
  return (
    <section className="bg-sand py-20 sm:py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-eyebrow text-clay">Why film your listing</p>
          <h2 className="text-display mt-5 max-w-4xl text-4xl sm:text-6xl lg:text-7xl">
            Buyers decide in seconds.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:items-end md:gap-8">
          <Reveal className="order-last md:order-first md:col-span-5" delay={0.1}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
              <Image
                src="/images/about-bts.jpg"
                alt="Hunter checking the frame on his drone controller during a listing shoot in the Southern Utah desert"
                fill
                sizes="(min-width: 768px) 40vw, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal
            className="space-y-6 text-lg leading-relaxed text-ink-soft md:col-span-6 md:col-start-8"
            delay={0.15}
          >
            <p>
              Almost every buyer meets your listing on a phone, scrolling fast.
              Flat photos read like every other listing in the feed. A short
              film holds attention long enough for the property to make its
              case.
            </p>
            <p>
              <span className="font-semibold text-ink">
                And in Southern Utah, the setting is half the sale.
              </span>{" "}
              Aerial footage shows the lot, the views, and how the house sits
              against the red rock, context no ground-level photo can carry.
              You are not selling walls. You are selling where the walls are.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

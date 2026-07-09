import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { CTA_LABEL } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

/** Full-bleed twilight band — the page's dark contrast moment before the footer. */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-night text-sand-on-night">
      <Image
        src="/images/fly-w6-twilight.jpg"
        alt="Desert-modern home glowing at twilight beneath Southern Utah red-rock cliffs"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/50 to-night/25"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-44">
        <Reveal>
          <h2 className="text-display max-w-2xl text-5xl text-bone sm:text-6xl md:text-7xl">
            Ready when your listing is.
          </h2>
          <p className="mt-5 max-w-md text-lg text-sand-on-night/90">
            A fifteen-minute call gets you on the calendar. Filming takes one
            visit.
          </p>
          <div className="mt-10">
            <ButtonLink href="/book" size="lg">
              {CTA_LABEL}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

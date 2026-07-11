import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { CTA_LABEL, SITE } from "@/lib/site";
import { CredentialPlaque } from "@/components/about/CredentialPlaque";
import { GearBenefits } from "@/components/about/GearBenefits";

export const metadata: Metadata = {
  title: "About",
  description:
    "Apex Visuals is an FAA Part 107 certified drone pilot from St. George, Utah, filming real estate across Washington County: luxury estates, standard listings, and land. Packages starting at $500.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-16">
        {/* ── Opening: editorial split — story + portrait ─────────────── */}
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 md:pb-24 md:pt-20">
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <Reveal className="md:col-span-7 lg:col-span-6">
              <h1 className="text-display text-5xl sm:text-6xl lg:text-7xl">
                I grew up with these views. Now I film them for a living.
              </h1>
              {/* TODO(hunter): verify personal story details — hometown, years
                  of content creation, and how you moved into real estate media. */}
              <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-ink-soft">
                <p>
                  St. George is home. I have spent my whole life around these
                  cliffs and mesas, and around the light that makes this corner
                  of Utah look unreal at seven in the evening. When I put a
                  drone over a property here, I already know where the shot is.
                </p>
                <p>
                  Before real estate, I spent years making short-form content,
                  the kind where you win or lose a viewer in the first two
                  seconds. That is where I learned pacing, hooks, and editing,
                  and it is why my property films do not feel like raw drone
                  footage set to music. They are built to hold attention.
                </p>
                <p>
                  I moved into real estate media because I kept seeing good
                  listings here, homes on land people dream about, hit the
                  market with phone photos. Properties in Southern Utah deserve
                  better, and the agents selling them deserve media that
                  matches the price point.
                </p>
              </div>
            </Reveal>
            <Reveal
              as="div"
              delay={0.15}
              className="md:col-span-5 lg:col-start-8"
            >
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/about-portrait.jpg"
                    alt="Apex Visuals standing in the Southern Utah desert at golden hour, red rock behind him"
                    fill
                    priority
                    sizes="(min-width: 1024px) 480px, (min-width: 768px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-ink-soft">
                  Apex Visuals. Remote pilot, St. George, Utah.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ── FAA Part 107 credential plaque (night band) ─────────────── */}
        <CredentialPlaque />

        {/* ── Gear → buyer benefits, divided list ─────────────────────── */}
        <GearBenefits />

        {/* ── Small behind-the-scenes moment ──────────────────────────── */}
        <section className="border-y border-ink/10 bg-sand-deep">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
            <Reveal>
              <figure className="mx-auto max-w-4xl">
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/about-bts.jpg"
                    alt="Hunter's hands on the drone controller during a property shoot, desert landscape in the background"
                    fill
                    sizes="(min-width: 960px) 896px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                  Pre-flight checks on a morning shoot in Ivins. The whole kit
                  fits in one backpack. No crew, no trailer, nothing for a
                  seller to worry about.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal className="max-w-2xl">
            <h2 className="text-display text-4xl sm:text-5xl">
              Have a listing coming up?
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              Tell me about the property and your timeline, and I will tell you
              exactly what I would fly. Film and stills packages starting at{" "}
              {SITE.startingPrice}.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/book" size="lg">
                {CTA_LABEL}
              </ButtonLink>
              <ButtonLink href="/work" size="lg" variant="ghost">
                See the work
              </ButtonLink>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Faq, type FaqItem } from "@/components/services/Faq";
import { CTA_LABEL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "One core package, Listing Film + Stills starting at $500 per property, plus a short list of add-ons. Aerial and ground real estate media for St. George, Washington County, and surrounding Southern Utah.",
};

// TODO(hunter): confirm draft package inclusions before launch.
// Only "starting at $500 per property" is client-confirmed.
const PACKAGE_INCLUSIONS = [
  "Aerial and ground coverage in one visit",
  "An edited 60 to 90 second listing film",
  "20 to 30 edited stills",
  "Files sized for MLS, web, and Instagram",
  "Fast turnaround, timed to your listing date",
];

// TODO(hunter): confirm what actually moves the quote.
const PRICE_FACTORS = [
  {
    label: "Property size",
    detail: "Larger homes and lots take more flight and edit time.",
  },
  {
    label: "Luxury staging",
    detail: "Twilight windows, detail passes, and extra setups.",
  },
  {
    label: "Travel",
    detail: "A small fee applies beyond the core St. George area.",
  },
];

// TODO(hunter): confirm add-on list. No prices published until confirmed —
// every add-on is quoted on the call.
const ADD_ONS = [
  {
    name: "Twilight shoot",
    detail:
      "The house lit up against a dusk sky. The single best upgrade for a luxury exterior.",
  },
  {
    name: "Vertical social cuts",
    detail: "Two to three reels cut from the same footage, framed for phones.",
  },
  {
    name: "Agent walkthrough on camera",
    detail:
      "You on camera, walking the property. Buyers meet the agent before the showing.",
  },
  {
    name: "Raw footage archive",
    detail: "Every usable clip from the shoot, delivered and yours to keep.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Are you FAA certified?",
    answer:
      "Yes. I hold an FAA Part 107 Remote Pilot certificate, the federal license required to fly drones commercially. Airspace checks and any needed authorizations happen before every flight.",
  },
  {
    question: "What does the $500 starting package include?",
    answer:
      "A typical shoot covers aerial and ground footage in one visit, an edited 60 to 90 second listing film, 20 to 30 edited stills, and files sized for MLS, web, and Instagram. The exact scope and the exact price get confirmed on the call.",
  },
  {
    // TODO(hunter): confirm turnaround time before launch.
    question: "How fast is delivery?",
    answer:
      "Most listings are delivered within two to three business days of the shoot. If yours goes live sooner, tell me the date on the call and we plan backwards from it.",
  },
  {
    question: "Do I need to prep the home?",
    answer:
      "The same prep you'd do for any photo day: staged, decluttered, lights on, cars out of the driveway. I send a short checklist before every shoot so nothing gets missed.",
  },
  {
    question: "Can you shoot occupied homes?",
    answer:
      "Yes, most of the homes I shoot are lived in. We schedule a window that works for the owners, and I move through the property efficiently so no one has to clear out for long.",
  },
  {
    question: "Do you do vertical cuts for Instagram and TikTok?",
    answer:
      "Yes, as an add-on. I cut two to three vertical reels from the same footage, framed for phones, so the listing works as hard on social as it does on the MLS.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-16">
        {/* ── Heading ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <Reveal>
            <p className="text-eyebrow text-ink-soft">Services &amp; Pricing</p>
            <h1 className="text-display mt-4 max-w-4xl text-5xl text-ink sm:text-6xl md:text-7xl">
              Straightforward pricing for Southern Utah listings.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              One core package, a short list of add-ons, and a fifteen-minute
              call to scope your exact property. You&apos;ll know your number
              before the shoot is booked.
            </p>
          </Reveal>
        </section>

        {/* ── The anchor package ──────────────────────────────────────── */}
        <section
          className="bg-night text-sand-on-night"
          aria-labelledby="package-heading"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h2
                    id="package-heading"
                    className="text-display text-4xl text-bone sm:text-5xl"
                  >
                    Listing Film + Stills
                  </h2>
                  <p className="mt-5 flex flex-wrap items-baseline gap-x-3">
                    <span className="text-eyebrow text-sand-on-night/70">
                      starting at
                    </span>
                    <span className="text-display text-5xl text-bone sm:text-6xl">
                      {SITE.startingPrice}
                    </span>
                    <span className="text-sand-on-night/70">per property</span>
                  </p>
                  <p className="mt-6 max-w-lg text-sand-on-night/85">
                    One visit covers the property inside and out. You get a
                    film that makes buyers stop scrolling, and a stills set
                    that carries the listing everywhere else: MLS, brochure,
                    social.
                  </p>

                  <h3 className="text-eyebrow mt-10 text-sand-on-night/70">
                    What a typical shoot includes
                  </h3>
                  <ul className="mt-3">
                    {PACKAGE_INCLUSIONS.map((item) => (
                      <li
                        key={item}
                        className="border-t border-sand-on-night/15 py-3 text-sand-on-night/90 last:border-b"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 inline-block rounded-2xl border border-sand-on-night/25 px-4 py-3 text-sm text-sand-on-night/80">
                    Package details are being finalized. Every shoot is scoped
                    on the call.
                  </p>
                </div>

                <div className="flex flex-col gap-10">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src="/images/work-01.jpg"
                      alt="Desert-modern home glowing at twilight beneath red rock cliffs near St. George"
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-eyebrow text-sand-on-night/70">
                      What moves the price
                    </h3>
                    <ul className="mt-3">
                      {PRICE_FACTORS.map((factor) => (
                        <li
                          key={factor.label}
                          className="border-t border-sand-on-night/15 py-3 last:border-b"
                        >
                          <span className="font-semibold text-sand-on-night">
                            {factor.label}
                          </span>
                          <span className="text-sand-on-night/70">
                            {" "}
                            · {factor.detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Add-ons ─────────────────────────────────────────────────── */}
        <section
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
          aria-labelledby="addons-heading"
        >
          <Reveal>
            <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
              <div>
                <h2
                  id="addons-heading"
                  className="text-display text-3xl text-ink sm:text-4xl"
                >
                  Add-ons
                </h2>
                <p className="mt-4 max-w-sm text-ink-soft">
                  For listings that call for more. No menu pricing. Each one
                  is quoted on the call, based on the property.
                </p>
              </div>

              <ul>
                {ADD_ONS.map((addOn) => (
                  <li
                    key={addOn.name}
                    className="flex flex-col gap-2 border-t border-ink/10 py-5 last:border-b sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                        {addOn.name}
                      </h3>
                      <p className="mt-1 max-w-md text-sm text-ink-soft">
                        {addOn.detail}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-medium text-ink-soft">
                      Quoted on the call
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* ── Service area ────────────────────────────────────────────── */}
        {/* TODO(hunter): confirm travel radius — Cedar City, Kanab, and
            Mesquite are listed as "often possible" pending confirmation. */}
        <section
          className="relative overflow-hidden"
          aria-labelledby="area-heading"
        >
          <Image
            src="/images/work-05.jpg"
            alt="Aerial view over a Southern Utah property surrounded by red rock terrain"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/60 to-night/25"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
            <Reveal>
              <p className="text-eyebrow text-sand-on-night/80">Service area</p>
              <h2
                id="area-heading"
                className="text-display mt-4 max-w-3xl text-4xl text-bone sm:text-5xl"
              >
                {SITE.serviceArea}.
              </h2>
              <p className="mt-5 max-w-xl text-sand-on-night/90">
                Cedar City, Kanab, and Mesquite are often within reach too.
                Mention the address on the call and I&apos;ll confirm.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
          aria-labelledby="faq-heading"
        >
          <Reveal>
            <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
              <div>
                <h2
                  id="faq-heading"
                  className="text-display text-3xl text-ink sm:text-4xl"
                >
                  Questions agents ask
                </h2>
                <p className="mt-4 max-w-sm text-ink-soft">
                  If yours isn&apos;t here, it takes one call to answer it.
                </p>
              </div>
              <Faq items={FAQ_ITEMS} />
            </div>
          </Reveal>
        </section>

        {/* ── Closing CTA ─────────────────────────────────────────────── */}
        <section className="border-t border-ink/10 bg-sand-deep">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <Reveal>
              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-display max-w-2xl text-4xl text-ink sm:text-5xl">
                    One call. One clear number.
                  </h2>
                  <p className="mt-4 max-w-lg text-ink-soft">
                    We&apos;ll walk through the property, the timeline, and the
                    deliverables. The call costs nothing. A $10 hold reserves
                    the slot and is fully refundable.
                  </p>
                </div>
                <ButtonLink href="/book" size="lg" className="md:shrink-0">
                  {CTA_LABEL}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

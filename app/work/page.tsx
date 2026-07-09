import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { CTA_LABEL } from "@/lib/site";
import { WorkGrid } from "@/components/work/WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Recent real estate film and photo shoots across St. George, Ivins, and Washington County: luxury estates, standard listings, and land. Aerial and ground media by Hunter Espaniola.",
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-16">
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20">
          <Reveal>
            <p className="text-eyebrow text-ink-soft">Selected work</p>
            <h1 className="text-display mt-4 max-w-4xl text-5xl sm:text-6xl md:text-7xl">
              Shot to sell the property.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-soft">
              Recent shoots across St. George, Ivins, and greater Washington
              County: estates, everyday listings, and raw land. Three are
              broken down as full case studies so you can see exactly what a
              shoot delivers.
            </p>
          </Reveal>

          <div className="mt-12 sm:mt-16">
            <WorkGrid />
          </div>
        </section>

        <section className="border-t border-ink/10 bg-sand-deep">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-16">
            <div>
              <h2 className="text-display text-3xl sm:text-4xl">
                Have a listing coming up?
              </h2>
              <p className="mt-3 text-ink-soft">
                Film and stills packages starting at $500 per property.
              </p>
            </div>
            <ButtonLink href="/book" size="lg" className="self-start sm:self-auto">
              {CTA_LABEL}
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

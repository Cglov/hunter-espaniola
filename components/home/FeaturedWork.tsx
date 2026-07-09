import Image from "next/image";
import Link from "next/link";
import { PROJECTS, type Project } from "@/lib/projects";
import { Reveal } from "@/components/Reveal";

/**
 * Curated home grid: six featured projects on a varied 12-column layout.
 * The lead cover is 16:9 and spans wide; cells marked `stretch` drop their
 * aspect ratio on md+ and fill the row height set by their neighbor, so
 * every row lands on a different crop instead of a uniform card wall.
 */
const CELLS = [
  {
    cell: "md:col-span-8",
    frame: "aspect-video",
    sizes: "(min-width: 768px) 64vw, calc(100vw - 40px)",
  },
  {
    cell: "md:col-span-4",
    frame: "aspect-[4/3] md:aspect-auto md:h-full",
    sizes: "(min-width: 768px) 32vw, calc(100vw - 40px)",
  },
  {
    cell: "md:col-span-7",
    frame: "aspect-[4/3]",
    sizes: "(min-width: 768px) 56vw, calc(100vw - 40px)",
  },
  {
    cell: "md:col-span-5",
    frame: "aspect-[4/3] md:aspect-auto md:h-full",
    sizes: "(min-width: 768px) 40vw, calc(100vw - 40px)",
  },
  {
    cell: "md:col-span-5",
    frame: "aspect-[4/3]",
    sizes: "(min-width: 768px) 40vw, calc(100vw - 40px)",
  },
  {
    cell: "md:col-span-7",
    frame: "aspect-[4/3] md:aspect-auto md:h-full",
    sizes: "(min-width: 768px) 56vw, calc(100vw - 40px)",
  },
] as const;

function altFor(p: Project): string {
  return p.category === "Land & Aerial"
    ? `Aerial view of ${p.title}, a parcel and its surrounding terrain in ${p.location}`
    : `Exterior of ${p.title}, a home in ${p.location}`;
}

export function FeaturedWork() {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, CELLS.length);

  return (
    <section className="bg-sand-deep py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-display text-4xl sm:text-5xl">Selected work</h2>
          <p className="text-sm text-ink-soft">
            Recent shoots across Washington County
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {featured.map((p, i) => {
            const { cell, frame, sizes } = CELLS[i];
            return (
              <Reveal key={p.slug} className={cell} delay={(i % 2) * 0.08}>
                <Link
                  href={p.caseStudy ? `/work/${p.slug}` : "/work"}
                  className="group block h-full"
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl ${frame}`}
                  >
                    <Image
                      src={p.image}
                      alt={altFor(p)}
                      fill
                      sizes={sizes}
                      className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-night/75 via-night/20 to-transparent p-5 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                      <p className="font-display text-lg font-bold tracking-tight text-bone">
                        {p.title}
                      </p>
                      <p className="mt-0.5 text-sm text-sand-on-night/85">
                        {p.location} · {p.category}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/work"
            className="text-sm font-semibold text-ink underline underline-offset-4 transition-colors hover:text-clay"
          >
            All work →
          </Link>
        </div>
      </div>
    </section>
  );
}

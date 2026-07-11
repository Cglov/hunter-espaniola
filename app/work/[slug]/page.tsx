import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { CTA_LABEL } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";
import { CaseClip } from "@/components/work/CaseClip";
import { clipTitle, stillAlt } from "@/components/work/media";

type Props = { params: Promise<{ slug: string }> };

const CASE_STUDIES = PROJECTS.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project?.caseStudy) return { title: "Work" };
  return {
    title: project.title,
    description: `Case study: a ${project.category.toLowerCase()} shoot in ${project.location}. Aerial film and stills by Apex Visuals, Southern Utah.`,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project?.caseStudy) notFound();

  const study = project.caseStudy;
  const index = CASE_STUDIES.findIndex((p) => p.slug === project.slug);
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];

  return (
    <>
      <Nav />
      <main id="main" className="pt-16">
        {/* ── Title ─────────────────────────────────────────────────── */}
        <header className="mx-auto max-w-7xl px-5 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-16">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> All work
          </Link>
          <p className="text-eyebrow mt-8 text-ink-soft">
            {project.category} · {project.location}
          </p>
          <h1 className="text-display mt-3 max-w-4xl text-5xl sm:text-6xl md:text-7xl">
            {project.title}
          </h1>
        </header>

        {/* ── Cover, full bleed ─────────────────────────────────────── */}
        <div className="relative h-[52svh] min-h-[360px] w-full sm:h-[68svh]">
          <Image
            src={project.image}
            alt={stillAlt(project.image, project.title, project.location)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* ── The shoot ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <p className="max-w-3xl border-l-2 border-clay pl-6 text-lg leading-relaxed text-ink sm:pl-8 sm:text-2xl sm:leading-relaxed">
              {study.intro}
            </p>
          </Reveal>

          {study.stats && study.stats.length > 0 && (
            <dl
              aria-label="Shoot details"
              className="mt-14 grid grid-cols-1 divide-y divide-ink/10 border-y border-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            >
              {study.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline justify-between gap-4 py-4 sm:block sm:px-8 sm:py-6 sm:first:pl-0 sm:last:pr-0"
                >
                  <dt className="text-eyebrow text-ink-soft">{stat.label}</dt>
                  <dd className="font-display text-lg font-bold tracking-tight sm:mt-2 sm:text-2xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        {/* ── From the film ─────────────────────────────────────────── */}
        {study.clips && study.clips.length > 0 && (
          <section className="bg-night text-sand-on-night">
            <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
              <Reveal>
                <h2 className="text-display text-3xl text-bone sm:text-5xl">
                  From the film
                </h2>
                <p className="mt-4 max-w-xl text-sand-on-night/70">
                  Muted clips, straight from the delivered cut. The full film
                  runs with sound and pacing built for MLS, YouTube, and
                  Instagram.
                </p>
              </Reveal>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {study.clips.map((clip, i) => (
                  <Reveal
                    key={clip}
                    delay={(i % 2) * 0.08}
                    className={i === 0 ? "sm:col-span-2" : ""}
                  >
                    <CaseClip src={clip} title={clipTitle(clip)} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── The stills ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="text-display text-3xl sm:text-5xl">The stills</h2>
            <p className="mt-4 max-w-xl text-ink-soft">
              A sample from the delivered set, sized for the MLS, print, and
              social without re-cropping.
            </p>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {study.stills.map((still, i) => {
              const wide = (i + 1) % 3 === 0;
              return (
                <Reveal
                  as="li"
                  key={still}
                  delay={(i % 2) * 0.08}
                  className={wide ? "sm:col-span-2" : ""}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl ${
                      wide ? "aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={still}
                      alt={stillAlt(still, project.title, project.location)}
                      fill
                      sizes={
                        wide
                          ? "(min-width: 1280px) 1216px, 100vw"
                          : "(min-width: 1280px) 608px, (min-width: 640px) 50vw, 100vw"
                      }
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </section>

        {/* ── Next case study ───────────────────────────────────────── */}
        <Link
          href={`/work/${next.slug}`}
          className="group block border-y border-ink/10 bg-sand-deep"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-12 sm:px-8 sm:py-16">
            <div>
              <p className="text-eyebrow text-ink-soft">Next case study</p>
              <p className="mt-3 font-display text-3xl font-extrabold tracking-tight underline-offset-8 group-hover:underline sm:text-5xl">
                {next.title}
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                {next.location} · {next.category}
              </p>
            </div>
            <div className="hidden shrink-0 items-center gap-6 md:flex">
              <div className="relative aspect-[4/3] w-44 overflow-hidden rounded-2xl">
                <Image
                  src={next.image}
                  alt=""
                  fill
                  sizes="176px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
              <span
                aria-hidden="true"
                className="text-3xl transition-transform duration-300 group-hover:translate-x-2"
              >
                →
              </span>
            </div>
          </div>
        </Link>

        {/* ── Closing ───────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <h2 className="text-display text-4xl sm:text-5xl">
              Every shoot starts with a call.
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Tell me about the property and the timeline. I&apos;ll scope the
              film, the stills, and the turnaround. Packages start at $500.
            </p>
            <ButtonLink href="/book" size="lg" className="mt-8">
              {CTA_LABEL}
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

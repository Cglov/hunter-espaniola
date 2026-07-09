"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CATEGORIES,
  PROJECTS,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";
import { stillAlt } from "@/components/work/media";

type Filter = "All" | ProjectCategory;

const FILTERS: Filter[] = ["All", ...CATEGORIES];

/** Covers that are 16:9 (the fly-through house) span both columns. */
const WIDE_COVERS = new Set(["/images/fly-w3-greatroom.jpg"]);

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();

  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter shoots by category"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => {
          const active = f === filter;
          const count =
            f === "All"
              ? PROJECTS.length
              : PROJECTS.filter((p) => p.category === f).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "border-ink bg-ink text-bone"
                  : "border-ink/25 text-ink hover:border-ink"
              }`}
            >
              {f}
              <span
                className={`ml-1.5 text-xs tabular-nums ${
                  active ? "text-bone/60" : "text-ink-soft"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "shoot" : "shoots"}
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => {
            const wide = WIDE_COVERS.has(project.image);
            return (
              <motion.li
                key={project.slug}
                layout={!reduce}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={wide ? "sm:col-span-2" : ""}
              >
                <ProjectCard project={project} wide={wide} priority={i === 0} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function ProjectCard({
  project,
  wide,
  priority = false,
}: {
  project: Project;
  wide: boolean;
  priority?: boolean;
}) {
  const card = (
    <>
      <div
        className={`relative overflow-hidden rounded-2xl ${
          wide ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={project.image}
          alt={stillAlt(project.image, project.title, project.location)}
          fill
          priority={priority}
          sizes={
            wide
              ? "(min-width: 1280px) 1216px, 100vw"
              : "(min-width: 1280px) 608px, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {project.caseStudy && (
          <span className="absolute left-4 top-4 rounded-full bg-bone/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
            Case study
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            {project.title}
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {project.location} · {project.category}
          </p>
        </div>
        {project.caseStudy && (
          <span
            aria-hidden="true"
            className="shrink-0 text-lg transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        )}
      </div>
    </>
  );

  if (project.caseStudy) {
    return (
      <Link
        href={`/work/${project.slug}`}
        className="group block rounded-2xl"
        aria-label={`${project.title}: read the case study`}
      >
        {card}
      </Link>
    );
  }
  return <div>{card}</div>;
}

"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Accessible single-open accordion: real <button>s with aria-expanded /
 * aria-controls, chevron rotation, and a motion height animation that
 * collapses to a plain fade under prefers-reduced-motion.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const reduce = useReducedMotion();

  return (
    <div className="border-y border-ink/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const buttonId = `${baseId}-faq-button-${i}`;
        const panelId = `${baseId}-faq-panel-${i}`;

        return (
          <div
            key={item.question}
            className={i > 0 ? "border-t border-ink/10" : undefined}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                // Panel node only exists while open — never point at a missing id.
                aria-controls={isOpen ? panelId : undefined}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
                  {item.question}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 text-ink-soft transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M3 5.5 8 10.5l5-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={
                    reduce
                      ? { opacity: 1 }
                      : { height: "auto", opacity: 1 }
                  }
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-ink-soft">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

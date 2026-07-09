import { TRUST_ITEMS } from "@/lib/site";

/** Credential strip directly below the hero — trust signals, not decoration. */
export function TrustBar() {
  return (
    <section aria-label="Credentials" className="border-y border-ink/10 bg-sand-deep">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-3 px-5 py-5 sm:px-8 md:flex md:items-center md:justify-between md:py-4">
        {TRUST_ITEMS.map((item) => (
          <li
            key={item}
            className="text-eyebrow text-ink-soft md:flex-1 md:text-center first:md:text-left last:md:text-right"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

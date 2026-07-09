import { Reveal } from "@/components/Reveal";

/**
 * FAA Part 107 rendered as a credential plaque on a night band.
 * One plain-language paragraph for clients — a trust signal with
 * visual weight, not a regulation lecture.
 */
export function CredentialPlaque() {
  return (
    <section className="bg-night text-sand-on-night">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <Reveal>
          <div className="rounded-2xl border border-sand-on-night/25 bg-night-soft/40 p-7 sm:p-10 md:p-14">
            <div className="grid gap-8 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-5">
                <p className="text-eyebrow text-sand-on-night/60">
                  Federal Aviation Administration
                </p>
                <h2 className="text-display mt-3 text-5xl text-bone sm:text-6xl">
                  Part 107
                  <span className="sr-only">, certified remote pilot</span>
                </h2>
                <p className="mt-3 text-sm font-medium text-sand-on-night/70">
                  Certified Remote Pilot, Small Unmanned Aircraft Systems
                </p>
              </div>
              <div className="md:col-span-7">
                {/* TODO(hunter): confirm insurance coverage and wording before launch. */}
                <p className="text-base leading-relaxed text-sand-on-night/90 sm:text-lg">
                  Every shoot I fly is a legal commercial operation. I hold an
                  FAA Part 107 Remote Pilot Certificate, I carry insurance, and
                  I check and clear the airspace before every takeoff. That
                  matters more than it sounds: when an uncertified hobbyist
                  films a listing as a favor, the liability quietly lands on
                  the agent and the brokerage. When I fly it, responsibility
                  for the flight sits where it should: with the pilot.
                </p>
              </div>
            </div>
            <ul className="mt-8 grid gap-3 border-t border-sand-on-night/15 pt-6 sm:grid-cols-3 sm:gap-6 md:mt-10">
              {[
                "Certified for commercial drone work",
                "Airspace cleared before every flight",
                "Liability stays with the pilot",
              ].map((item) => (
                <li key={item} className="text-eyebrow text-sand-on-night/60">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

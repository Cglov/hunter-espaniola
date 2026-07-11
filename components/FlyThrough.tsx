"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CTA_LABEL, FLIGHT_WAYPOINTS } from "@/lib/site";
import { ButtonLink } from "@/components/Button";

const LAST = FLIGHT_WAYPOINTS.length - 1;
const FALLBACK_FLIGHT_MS = 1100;

/** 32px inline preview of the first still — paints before the network does. */
// Pre-encoded opening frame — regenerate from fly-w1-approach.jpg if the
// approach still ever changes (sharp: resize 2048, webp q70). See MEDIA.md.
const W1_STATIC = "/images/fly-w1-approach-2048.webp";

const BLUR_W1 =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQABLAEsAAD/4QCARXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAAEsAAAAAQAAASwAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAACCgAwAEAAAAAQAAABIAAAAA/8AAEQgAEgAgAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABAQEBAQECAQECAsICAgLDwsLCwsPEw8PDw8PExYTExMTExMWFhYWFhYWFhsbGxsbGx8fHx8fIyMjIyMjIyMjI//bAEMBBQYGCQgJDwgIDyUZFBklJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJf/dAAQAAv/aAAwDAQACEQMRAD8A6aTxb4guvLu9Hm3wkkD5kdWZeoyc8YrUg+JXiC4vGW20uGeGMZkMY3Nn+6u1jknGRXzzoUlxYXEfiCzniRwMPEwZfMDYzt6/T0Nd5p99ouueIfLuJDZyoSbfylSH923OGYkDp/WvDi6lFWhNs9uXJUd5wSPVz8Ur6Kby20JmONxUE7sf7u3NZM/7QKWsjwf2THG6ZBWRmyD9NorhbyLwno1/5trcxF5jjdbs8krNnoXdggP0/CuP8QXWkCF7WNQrplgz5aTDdNzZ2+33fqa3eN5bLe5zxwqneysf/9D590WWVdTtArEfN6+hBr0O2RHs4d4B+V+v415xo3/ITtP9/wDwr0m0/wCPOH/df+tfOYn4z6PDbMv33yW0apwPtnQcfwLXnGlM0+oSCcl8MuN3Pr616RqP+oj/AOvz/wBkWvNtE/5CEn+8P61lS2ZtV3R//9k=";

/**
 * Per-leg drone choreography. The camera chases the drone, so each leg's
 * keyframes sketch the maneuver you're watching: sink toward the deck, lead
 * ahead through the glass, bank into the kitchen turn, thread the hallway,
 * then climb away backwards as dusk falls. Times align with the clip's
 * throttle-up / settle playback ramp.
 */
const FLIGHT_PATHS: Record<
  number,
  {
    x: number[];
    y: number[];
    scale: number[];
    bank: number[];
    pitch: number;
    dur: number;
  }
> = {
  1: { x: [0, 6, 0], y: [0, 26, 8], scale: [1, 0.98, 1], bank: [0, -5, 0], pitch: 18, dur: 2.8 },
  2: { x: [0, -8, 0], y: [0, 10, 4], scale: [1, 0.9, 0.97], bank: [0, 3, 0], pitch: 20, dur: 5.4 },
  3: { x: [0, -34, 0], y: [0, 8, 2], scale: [1, 0.96, 1], bank: [0, -10, 0], pitch: 16, dur: 5.4 },
  4: { x: [0, 32, 0], y: [0, 6, 2], scale: [1, 0.95, 1], bank: [0, 10, 0], pitch: 16, dur: 5.8 },
  5: { x: [0, 30, 0], y: [0, -10, 0], scale: [1, 0.92, 1], bank: [0, 16, 0], pitch: 14, dur: 8.5 },
};

// Per-clip playback multipliers that equalize perceived flight speed across
// legs. Motion measured as mean optical frame difference; leg 3 (great room
// to kitchen) is the reference feel, so each clip plays at
// (leg-3 motion / its own motion). The FLIGHT_PATHS durs above approximate
// each leg's resulting wall-clock time so the drone choreography keeps pace.
const CLIP_RATE: Record<number, number> = {
  1: 1.9, // slow aerial descent, nearly doubled
  2: 1, // the frame metric over-reads this close glass pass; native speed feels right
  3: 1, // the reference leg
  4: 0.9,
  5: 1.2, // long finale, tightened
};
const PATH_TIMES = [0, 0.45, 1];

/** Prop-wash shimmer discs, positioned over the sprite's four rotors. */
const PROP_DISCS = [
  { x: 26, y: 30, w: 30, sy: 0.28 },
  { x: 74, y: 30, w: 30, sy: 0.28 },
  { x: 13, y: 60, w: 38, sy: 0.3 },
  { x: 87, y: 60, w: 38, sy: 0.3 },
];

/** Floating glass info panels, one per destination. Keep this copy free of dashes. */
const GLASS_PANELS: Record<
  number,
  { eyebrow: string; title: string; body: string; pos: string }
> = {
  1: {
    eyebrow: "The scroll problem",
    title: "Struggling to get bookings?",
    body: "Noon phone photos make this pool look like every other pool. Golden hour light like this is what turns a scroll into a showing.",
    pos: "md:left-auto md:right-[6%] md:top-[24%]",
  },
  2: {
    eyebrow: "One continuous take",
    title: "A tour that feels alive",
    body: "You just flew off the deck and through the glass without a cut. A photo carousel cannot make buyers feel a house the way that one move does.",
    pos: "md:left-[6%] md:right-auto md:top-[26%]",
  },
  3: {
    eyebrow: "The skimmed listing",
    title: "Nobody reads the blurb",
    body: "You wrote 'gourmet kitchen' and buyers skimmed right past it. Four seconds over this island with the canyon behind it says more than any description.",
    pos: "md:left-auto md:right-[7%] md:top-[22%]",
  },
  4: {
    eyebrow: "Meet your pilot",
    title: "Apex Visuals",
    body: "FAA certified and based in Southern Utah, so I know this light and this rock. I fly tight interior lines most pilots will not attempt, like this pass over the bed.",
    pos: "md:left-[7%] md:right-auto md:top-[24%]",
  },
  5: {
    eyebrow: "Shoots start at $500",
    title: "Ready to make magic?",
    body: "Twilight is when a house starts selling itself. Hit Book a Call and let's put this light on your next listing.",
    pos: "md:left-auto md:right-[6%] md:top-[18%]",
  },
};

/**
 * The interactive hero: a 3rd-person drone hovering over a Southern Utah
 * listing. Each click plays one pre-rendered clip that flies to the next
 * waypoint. Clip N ends on the exact frame waypoint N's still starts on,
 * so holding the still after each flight is seamless and self-healing.
 *
 * Fallbacks: a missing/failed clip degrades to a crossfade between waypoint
 * stills — the experience never breaks. prefers-reduced-motion quiets the
 * ambient loops (hover bob, plaque float, hint pulse) but user-initiated
 * flights always play in full.
 */
export function FlyThrough() {
  const [wp, setWp] = useState(0);
  const [flying, setFlying] = useState(false);
  const [started, setStarted] = useState(false);
  const [activeClip, setActiveClip] = useState<number | null>(null);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const brokenRef = useRef<Set<number>>(new Set());
  const rafRef = useRef(0);
  const watchdogRef = useRef(0);
  const payoffRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Preload the next leg's clip whenever we settle at a waypoint. The
  // opening still is a ~330KB static WebP preloaded from the document head,
  // so the first clip can start buffering almost immediately without
  // starving the LCP paint.
  useEffect(() => {
    const upgrade = () => {
      const next = videoRefs.current[wp + 1];
      if (next && next.preload !== "auto") {
        next.preload = "auto";
        next.load();
      }
    };
    const idle = window.setTimeout(upgrade, wp === 0 ? 300 : 0);
    return () => {
      window.clearTimeout(idle);
      cancelAnimationFrame(rafRef.current);
    };
  }, [wp]);

  // Unmount safety net for every timer/frame the flight machinery owns.
  useEffect(
    () => () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(watchdogRef.current);
    },
    [],
  );

  const finishFlight = useCallback((target: number) => {
    cancelAnimationFrame(rafRef.current);
    window.clearTimeout(watchdogRef.current);
    setWp(target);
    setFlying(false);
    // Keep the ended video's last frame up briefly; the identical still sits
    // underneath, so dropping the clip a beat later is invisible. Guarded so
    // a quick next flight is never hidden by this stale timer.
    setTimeout(() => {
      setActiveClip((current) => (current === target ? null : current));
    }, 400);
  }, []);

  const advance = useCallback(() => {
    if (flying || wp >= LAST) return;
    const target = wp + 1;
    setDir("fwd");
    setStarted(true);
    setFlying(true);

    const video = videoRefs.current[target];
    // Flights always fly — the footage is the product and every flight is
    // user-initiated. prefers-reduced-motion calms the ambient loops only
    // (hover bob, plaque float, hint pulse), never the flight itself.
    const useVideo = video && !brokenRef.current.has(target);

    if (!useVideo) {
      setTimeout(() => finishFlight(target), FALLBACK_FLIGHT_MS);
      return;
    }

    const abort = () => {
      video.pause();
      brokenRef.current.add(target);
      finishFlight(target);
    };

    video.currentTime = 0;
    setActiveClip(target);

    // Throttle-up / settle: ramp playbackRate across the clip, scaled by the
    // per-clip rate that equalizes perceived speed across legs.
    const rate = CLIP_RATE[target] ?? 1;
    const ramp = () => {
      if (!video.duration) {
        rafRef.current = requestAnimationFrame(ramp);
        return;
      }
      const p = Math.min(video.currentTime / video.duration, 1);
      video.playbackRate = rate * (0.65 + 0.5 * Math.sin(Math.PI * p));
      if (p < 1) rafRef.current = requestAnimationFrame(ramp);
    };

    video.onended = () => finishFlight(target);
    video.onerror = abort;
    video
      .play()
      .then(() => {
        // Watchdog: if the clip stalls, errors silently, or the browser
        // pauses it (tab switch), convert the flight into the still-crossfade
        // fallback instead of wedging the hero forever.
        const maxMs = video.duration
          ? (video.duration / (0.6 * rate)) * 1000 + 2500
          : 12000;
        window.clearTimeout(watchdogRef.current);
        watchdogRef.current = window.setTimeout(abort, maxMs);
        rafRef.current = requestAnimationFrame(ramp);
      })
      .catch(() => {
        setActiveClip(null);
        abort();
      });
  }, [flying, wp, finishFlight]);

  // Fly back one leg. Clips only render forward, so reverse legs always use
  // the still crossfade (which is also why they feel like a quick hop back).
  const goBack = useCallback(() => {
    if (flying || !started || wp === 0) return;
    const target = wp - 1;
    setDir("back");
    setFlying(true);
    setActiveClip(null);
    cancelAnimationFrame(rafRef.current);
    window.clearTimeout(watchdogRef.current);
    setTimeout(() => {
      setWp(target);
      setFlying(false);
    }, FALLBACK_FLIGHT_MS);
  }, [flying, started, wp]);

  // Arrow keys and the space bar pilot the drone while the hero owns the
  // screen: → or space flies on (or takes off), ← retraces a leg. ↑/↓ stay
  // untouched so the page still scrolls normally, and the handler stands
  // down once the hero scrolls away.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const spaceKey = e.key === " " || e.code === "Space";
      const fwdKey = e.key === "ArrowRight" || spaceKey;
      const backKey = e.key === "ArrowLeft";
      if (!fwdKey && !backKey) return;
      if (e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable)
      )
        return;
      if (spaceKey) {
        // Space returns to scrolling once there is nothing left to fly, and
        // keeps native activation on focused controls (skip, replay, CTAs —
        // and the flight surface itself, whose click handler flies anyway).
        if (wp >= LAST) return;
        if (t?.closest("button, a, [role='button']")) return;
      }
      const hero = sectionRef.current;
      if (!hero) return;
      if (hero.getBoundingClientRect().bottom < window.innerHeight * 0.45)
        return;
      e.preventDefault();
      if (fwdKey) advance();
      else goBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, goBack, wp]);

  // Keyboard users lose their place when the click-catcher unmounts on
  // landing — hand focus to the payoff block so Tab reaches the CTA next.
  useEffect(() => {
    if (wp === LAST) payoffRef.current?.focus();
  }, [wp]);

  const replay = useCallback(() => {
    setWp(0);
    setStarted(false);
    setActiveClip(null);
  }, []);

  const skip = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [reduce]);

  const landed = wp === LAST;
  const waypoint = FLIGHT_WAYPOINTS[wp];
  // The leg we're flying (or about to fly) — drives the path choreography.
  // Reverse legs mirror the path that brought us here: x and bank flip, the
  // nose lifts instead of dropping, and the whole move fits the crossfade.
  const fwdPath = FLIGHT_PATHS[Math.min(wp + 1, LAST)];
  const backBase = FLIGHT_PATHS[Math.max(wp, 1)];
  const activePath =
    dir === "back"
      ? {
          x: backBase.x.map((v) => -v),
          y: backBase.y.map((v) => -v * 0.5),
          scale: [...backBase.scale].reverse(),
          bank: backBase.bank.map((v) => -v),
          pitch: -backBase.pitch * 0.7,
          dur: FALLBACK_FLIGHT_MS / 1000 + 0.15,
        }
      : fwdPath;
  // A flight with no clip playing is the still-crossfade path (all reverse
  // legs, plus forward legs whose clip is missing or broken).
  const fallbackFlying = flying && activeClip === null;

  return (
    <section
      ref={sectionRef}
      className="relative h-svh min-h-[560px] w-full overflow-hidden bg-night text-sand-on-night"
      aria-label="Interactive drone flight through a Southern Utah listing"
    >
      {/* One stable page h1 — the visual titles below swap during the flight. */}
      <h1 className="sr-only">
        Apex Visuals, real estate drone media in Southern Utah. Fly the
        drone through a listing.
      </h1>
      {/* ── Stills: previous + current + next stay mounted, so both flight
          directions land on an already-decoded frame. DOM order puts the
          higher waypoint on top: forward fades the next still in over the
          current one; reverse fades the current one out to uncover the
          previous. ─────────────────────────────────────────────────────── */}
      {FLIGHT_WAYPOINTS.map((w, i) =>
        i >= wp - 1 && i <= wp + 1 ? (
          <Image
            key={w.id}
            src={i === 0 ? W1_STATIC : w.still}
            alt={i === wp ? `${w.label} of a luxury Southern Utah listing` : ""}
            fill
            priority={i === 0}
            // The opening frame skips the optimizer entirely: it ships as a
            // pre-encoded 2048w WebP served straight off the CDN/disk, so the
            // very first visitor gets it at full speed (no on-demand resize).
            unoptimized={i === 0}
            placeholder={i === 0 ? "blur" : "empty"}
            blurDataURL={i === 0 ? BLUR_W1 : undefined}
            sizes="100vw"
            className={`object-cover transition-opacity duration-700 ${
              (i === wp && !(fallbackFlying && dir === "back")) ||
              (fallbackFlying && i === wp + (dir === "fwd" ? 1 : -1))
                ? "opacity-100"
                : "opacity-0"
            } ${fallbackFlying && i === wp ? "scale-105 blur-[2px]" : ""}`}
            style={{ transitionProperty: "opacity, transform, filter" }}
          />
        ) : null,
      )}

      {/* ── Flight clips (clip i arrives AT waypoint i) ─────────────── */}
      {FLIGHT_WAYPOINTS.map((w, i) =>
        w.clip ? (
          <video
            key={w.id}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={w.clip}
            muted
            playsInline
            preload={i === 1 ? "auto" : "none"}
            onError={() => brokenRef.current.add(i)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              activeClip === i ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />
        ) : null,
      )}

      {/* ── Scrims ───────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-night/75 via-night/10 to-night/45" />

      {/* ── Full-area flight control ─────────────────────────────────── */}
      {!landed && (
        <button
          type="button"
          onClick={advance}
          aria-disabled={flying}
          aria-label={`Fly the drone to ${FLIGHT_WAYPOINTS[wp + 1]?.label ?? "the next room"} (stop ${wp + 2} of ${FLIGHT_WAYPOINTS.length})`}
          className="absolute inset-0 z-30 h-full w-full cursor-pointer aria-disabled:cursor-wait focus-visible:outline-4 focus-visible:[outline-offset:-8px]"
        />
      )}

      {/* ── The drone, 3rd person ────────────────────────────────────── */}
      {/* Outer wrapper owns stage position: hovers higher behind the intro
          title, centers during flight, and returns-to-home (up and away)
          once the payoff lands so it never sits on the closing text. */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[52%] z-40 w-36 -translate-x-1/2 sm:w-44 md:w-56"
        animate={
          landed
            ? { y: -560, scale: 0.55, opacity: 0 }
            : started
              ? { y: 0, opacity: 1 }
              : { y: -72, opacity: 1 }
        }
        transition={
          landed
            ? { duration: 1.4, ease: [0.5, 0, 0.9, 0.4], delay: 0.1 }
            : { type: "spring", stiffness: 90, damping: 16 }
        }
        aria-hidden="true"
      >
        {/* Path layer: leg-specific drift while flying, gentle hover bob at rest. */}
        <motion.div
          style={{ perspective: 600 }}
          animate={
            flying
              ? {
                  x: activePath.x,
                  y: activePath.y,
                  scale: activePath.scale,
                }
              : reduce
                ? { x: 0, scale: 1, y: 0 }
                : { x: 0, scale: 1, y: [0, -7, 0] }
          }
          transition={
            flying
              ? { duration: activePath.dur, ease: "easeInOut", times: PATH_TIMES }
              : reduce
                ? { type: "spring", stiffness: 110, damping: 14 }
                : {
                    x: { type: "spring", stiffness: 110, damping: 14 },
                    scale: { type: "spring", stiffness: 110, damping: 14 },
                    y: { duration: 3.4, repeat: Infinity, ease: "easeInOut" },
                  }
          }
        >
          {/* Rotation rig: pitch into the move, bank through the turn. */}
          <motion.div
            className="relative"
            animate={
              flying
                ? { rotateX: activePath.pitch, rotateZ: activePath.bank }
                : { rotateX: 0, rotateZ: 0 }
            }
            transition={
              flying
                ? {
                    rotateX: { type: "spring", stiffness: 160, damping: 17 },
                    rotateZ: {
                      duration: activePath.dur,
                      ease: "easeInOut",
                      times: PATH_TIMES,
                    },
                  }
                : { type: "spring", stiffness: 120, damping: 11 }
            }
          >
            <img
              src="/images/drone.png"
              alt=""
              draggable={false}
              className="w-full drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)]"
            />
            {/* Spinning prop wash over each rotor. */}
            {PROP_DISCS.map((p, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.w}%`,
                  aspectRatio: "1",
                  transform: `translate(-50%, -50%) scaleY(${p.sy})`,
                }}
              >
                <div
                  className="size-full rounded-full blur-[2px] animate-prop-spin"
                  style={{
                    animationDuration: flying ? "0.08s" : "0.14s",
                    background:
                      "conic-gradient(rgba(255,255,255,0) 0deg, rgba(235,235,240,0.5) 22deg, rgba(255,255,255,0) 48deg, rgba(255,255,255,0) 180deg, rgba(235,235,240,0.38) 202deg, rgba(255,255,255,0) 228deg)",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Floating glass info panels, one per destination ─────────── */}
      <AnimatePresence>
        {started && !flying && wp >= 1 && GLASS_PANELS[wp] && (
          <motion.div
            key={`panel-${wp}`}
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.25 } }}
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 18,
              delay: 0.35,
            }}
            className={`pointer-events-none absolute left-1/2 top-[13%] z-40 w-[min(20rem,86vw)] -translate-x-1/2 md:w-80 md:translate-x-0 ${GLASS_PANELS[wp].pos}`}
          >
            <motion.div
              animate={reduce ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-2xl border border-white/30 bg-night/20 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/40"
              />
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                {GLASS_PANELS[wp].eyebrow}
              </p>
              <p className="mt-1.5 font-display text-xl font-extrabold tracking-tight text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
                {GLASS_PANELS[wp].title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.55)]">
                {GLASS_PANELS[wp].body}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Opening title ───────────────────────────────────────────── */}
      <AnimatePresence>
        {!started && (
          <motion.div
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-x-0 bottom-[16%] z-40 px-5 text-center"
          >
            <p className="text-display mx-auto max-w-4xl text-[13vw] text-bone sm:text-7xl md:text-8xl">
              Fly the drone.
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm text-sand-on-night/90 sm:text-base">
              You&apos;re the pilot. This is a Southern Utah listing the way
              buyers should see it.
            </p>
            <motion.p
              animate={reduce ? {} : { opacity: [1, 0.45, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="text-eyebrow mt-6 text-bone"
            >
              <span className="pointer-coarse:hidden">
                Click, space, or → to take off
              </span>
              <span className="hidden pointer-coarse:inline">
                Tap anywhere to take off
              </span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Waypoint chip + progress ─────────────────────────────────── */}
      {started && !landed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-40 flex flex-col items-center gap-4 px-5">
          <AnimatePresence mode="wait">
            {!flying && (
              <motion.p
                key={waypoint.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-full bg-night/55 px-4 py-1.5 text-sm font-medium text-bone backdrop-blur-sm"
              >
                {String(wp + 1).padStart(2, "0")} / 0{FLIGHT_WAYPOINTS.length}{" "}
                · {waypoint.label} ·{" "}
                <span className="text-sand-on-night/80">
                  <span className="pointer-coarse:hidden">
                    click, space, or → to fly on · ← goes back
                  </span>
                  <span className="hidden pointer-coarse:inline">
                    tap to keep flying
                  </span>
                </span>
              </motion.p>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-2" aria-hidden="true">
            {FLIGHT_WAYPOINTS.map((w, i) => (
              <span
                key={w.id}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= wp ? "w-6 bg-bone" : "w-1.5 bg-bone/35"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Landing payoff ───────────────────────────────────────────── */}
      <AnimatePresence>
        {landed && (
          <motion.div
            ref={payoffRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 bottom-[10%] z-40 px-5 text-center outline-none"
          >
            <p className="text-eyebrow text-sand-on-night/80">
              Apex Visuals · Real Estate Media, Southern Utah
            </p>
            <p className="text-display mx-auto mt-3 max-w-3xl text-4xl text-bone sm:text-6xl md:text-7xl">
              Your listing deserves this view.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/book" size="lg">
                {CTA_LABEL}
              </ButtonLink>
              <ButtonLink href="/work" size="lg" variant="night">
                See the work
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={replay}
              className="mt-6 text-sm text-sand-on-night/70 underline-offset-4 hover:text-bone hover:underline"
            >
              ↺ Replay the flight
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Skip ─────────────────────────────────────────────────────── */}
      {!landed && (
        <button
          type="button"
          onClick={skip}
          className="absolute right-4 top-20 z-40 min-h-11 rounded-full bg-night/45 px-4 py-2.5 text-xs font-semibold text-sand-on-night/90 backdrop-blur-sm transition-colors hover:text-bone sm:bottom-8 sm:right-8 sm:top-auto"
        >
          Skip the flight ↓
        </button>
      )}
    </section>
  );
}

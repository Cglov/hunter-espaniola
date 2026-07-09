"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A muted looping clip for case-study pages (rendered on the night band).
 * Plays only while in the viewport, honors prefers-reduced-motion, and gives
 * the user an explicit pause/play control (WCAG 2.2.2) — which also keeps
 * three 1080p clips from streaming simultaneously on page load.
 */
export function CaseClip({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  // "auto" = no user intent yet (play in view unless reduced motion).
  const [intent, setIntent] = useState<"auto" | "playing" | "paused">("auto");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true; // React SSR quirk — guarantee muted before any play()
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const shouldPlay =
      inView && (intent === "playing" || (intent === "auto" && !reduce));
    if (shouldPlay) {
      video.play().catch(() => {
        // Autoplay blocked — the first frame stands in as a still.
      });
    } else {
      video.pause();
    }
  }, [inView, intent]);

  return (
    <figure className="m-0">
      <div className="relative overflow-hidden rounded-2xl">
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          aria-label={`${title}, a muted clip from the property film`}
          className="aspect-video w-full object-cover"
        />
        <button
          type="button"
          onClick={() => setIntent(isPlaying ? "paused" : "playing")}
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-night/60 text-bone backdrop-blur-sm transition-colors hover:bg-night/85"
        >
          {isPlaying ? (
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path
                d="M4.5 2.5h2.5v11H4.5zM9 2.5h2.5v11H9z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M4.5 2.5v11l9-5.5z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
      <figcaption className="mt-3 text-sm text-sand-on-night/70">
        {title}
      </figcaption>
    </figure>
  );
}

/**
 * Single source of truth for site-wide constants.
 * Anything marked TODO(hunter) needs confirmation before launch — see MEDIA.md.
 */

export const CTA_LABEL = "Book a Call"; // the ONE label. Never alternate.

export const SITE = {
  name: "Apex Visuals",
  tagline: "Real Estate Media, Southern Utah",
  serviceArea: "St. George, Washington County & surrounding Southern Utah", // TODO(hunter): confirm radius
  phone: "(435) 555-0142", // TODO(hunter): real number
  email: "hello@apexvisuals.com", // TODO(hunter): real email
  instagram: "https://instagram.com/apexvisuals", // TODO(hunter): real handle
  startingPrice: "$500",
};

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services & Pricing" },
  { href: "/about", label: "About" },
] as const;

export const TRUST_ITEMS = [
  "FAA Part 107 Certified",
  "DJI Mini 4 Pro · 4K/60 HDR",
  "Southern Utah, near Zion",
  "Years of content creation", // TODO(hunter): exact number of years
] as const;

/** The interactive hero flight path. Clip N flies FROM waypoint N-1 TO waypoint N. */
export const FLIGHT_WAYPOINTS = [
  {
    id: "approach",
    label: "The approach",
    still: "/images/fly-w1-approach.jpg",
    clip: null,
  },
  {
    id: "pool",
    label: "Poolside",
    still: "/images/fly-w2-pool.jpg",
    clip: "/video/fly-c1-pool.mp4",
  },
  {
    id: "greatroom",
    label: "The great room",
    still: "/images/fly-w3-greatroom.jpg",
    clip: "/video/fly-c2-greatroom.mp4",
  },
  {
    id: "kitchen",
    label: "The kitchen",
    still: "/images/fly-w4-kitchen.jpg",
    clip: "/video/fly-c3-kitchen.mp4",
  },
  {
    id: "suite",
    label: "The primary suite",
    still: "/images/fly-w5-suite.jpg",
    clip: "/video/fly-c4-suite.mp4",
  },
  {
    id: "twilight",
    label: "Twilight",
    still: "/images/fly-w6-twilight.jpg",
    clip: "/video/fly-c5-twilight.mp4",
  },
] as const;

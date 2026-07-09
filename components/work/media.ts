/**
 * Alt text + clip labels derived from placeholder media paths.
 * The current shoots are AI-generated placeholders with semantic filenames;
 * TODO(hunter): replace with per-listing alt copy when real media lands.
 */

export function stillAlt(src: string, title: string, location: string): string {
  const subject = `${title}, ${location}`;
  if (src.includes("approach")) {
    return `Aerial approach over the desert toward ${subject}`;
  }
  if (src.includes("pool")) return `Pool terrace at ${subject}`;
  if (src.includes("greatroom")) return `Great room interior at ${subject}`;
  if (src.includes("kitchen")) return `Kitchen interior at ${subject}`;
  if (src.includes("suite")) return `Primary suite at ${subject}`;
  if (src.includes("twilight")) return `Twilight exterior of ${subject}`;
  if (/work-0[5-8]/.test(src)) return `Aerial view of ${subject}`;
  return `Twilight exterior of ${subject}`;
}

export function clipTitle(src: string): string {
  if (src.includes("pool")) return "Poolside pass";
  if (src.includes("greatroom")) return "Through the great room";
  if (src.includes("kitchen")) return "Into the kitchen";
  if (src.includes("suite")) return "The primary suite";
  if (src.includes("twilight")) return "Twilight pullback";
  return "From the film";
}

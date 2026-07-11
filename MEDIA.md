# MEDIA.md — Asset manifest

Every image and video slot on the site, its exact path, dimensions, and status.
**All current photography/video is AI-generated (Higgsfield) placeholder content**
depicting fictional properties. Before launch, replace with real shoots using the
same filenames and aspect ratios — everything swaps in cleanly with no code changes.

## The fly-through hero (interactive, home page)

Six waypoint stills of ONE house + five video clips that chain between them.
**Chaining rule: clip N's first frame = waypoint N-1's still; its last frame =
waypoint N's still.** If you re-shoot this with real footage, cut one continuous
flight into five segments and export the six boundary frames as the stills.

| File | Size | Content |
|---|---|---|
| `/public/images/fly-w1-approach.jpg` | 2752×1536 (16:9) | High aerial, golden hour, estate + red rock |
| `/public/images/fly-w2-pool.jpg` | 2752×1536 | Low over pool deck facing the glass wall |
| `/public/images/fly-w3-greatroom.jpg` | 1920×1080 | Great room at golden hour — the exact last frame of `fly-c2`, so the leg-2 landing never pops |
| `/public/images/fly-w4-kitchen.jpg` | 2752×1536 | Kitchen, travertine island |
| `/public/images/fly-w5-suite.jpg` | 2752×1536 | Primary suite, picture window |
| `/public/images/fly-w6-twilight.jpg` | 2752×1536 | Twilight aerial pullback |
| `/public/video/fly-c1-pool.mp4` | 1920×1080, 5s, muted | W1 → W2 descent |
| `/public/video/fly-c2-greatroom.mp4` | 1920×1080, 5s | W2 → W3 across the pool, through the open glass doors, one continuous golden-hour exposure |
| `/public/video/fly-c3-kitchen.mp4` | 1920×1080, 5s | W3 → W4 interior glide |
| `/public/video/fly-c4-suite.mp4` | 1920×1080, 5s | W4 → W5 hallway to suite |
| `/public/video/fly-c5-twilight.mp4` | 1920×1080, 10s | W5 → W6 out the suite window, canyon landscape sweep, turn back to the twilight house wide |

Paths are wired in `lib/site.ts` (`FLIGHT_WAYPOINTS`). A missing/broken clip
degrades automatically to a still-crossfade — the hero never breaks.

`fly-w1-approach-2048.webp` is a pre-encoded derivative of the approach still
(sharp: resize 2048, webp quality 70, ~330KB). The hero serves it directly —
no image optimizer on the critical first paint — so regenerate it whenever
`fly-w1-approach.jpg` changes. Clips are x264 CRF 25, preset medium,
faststart, no audio.

**Possible upgrade:** 9:16 portrait renders of the clips (Higgsfield `reframe`)
for a tighter mobile crop. Current mobile behavior center-crops the 16:9 clips.

## Drone sprite

| File | Size | Content |
|---|---|---|
| `/public/images/drone.png` | 1200×805, alpha | Mini-4-Pro-style drone from behind, transparent bg |

## Portfolio grid (`lib/projects.ts`)

| File | Size | Content |
|---|---|---|
| `/public/images/work-01..04.jpg` | 2400×1792 (4:3) | Twilight desert-modern exteriors |
| `/public/images/work-05..08.jpg` | 2400×1792 (4:3) | Aerial property/land shots |

Projects, titles, and locations in `lib/projects.ts` are **fictional** — replace
with real listings (title, location, category, cover image) as shoots happen.

## About page

| File | Size | Content |
|---|---|---|
| `/public/images/about-portrait.jpg` | 1856×2304 (4:5) | AI placeholder portrait — **replace with a real photo of Hunter** |
| `/public/images/about-bts.jpg` | 2528×1696 (3:2) | Behind-the-scenes controller shot — replace with a real BTS frame |

## Open items to confirm with Hunter (also flagged `TODO(hunter)` in code)

- Real phone, email, Instagram → `lib/site.ts` (`SITE`)
- Exact years of content creation → `lib/site.ts` (`TRUST_ITEMS`)
- Service-area radius → `lib/site.ts` (`SITE.serviceArea`)
- $500 package exact inclusions + turnaround → `app/services/page.tsx`
- Cal.com: create the `intro-call` event type, install the Stripe app on it with
  a $10 charge, refund manually after each call → `components/book/CalEmbed.tsx`
  (`calLink` currently `apex-visuals/intro-call`)
- Real testimonials → home Testimonials section (currently visibly sample-labeled)
- Domain: metadata assumes `apexvisuals.com` → `app/layout.tsx`

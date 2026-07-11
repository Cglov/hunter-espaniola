# Apex Visuals — Real Estate Media, Southern Utah

Premium marketing site for a Southern Utah real-estate drone videographer.
Next.js 16 (App Router) · Tailwind CSS v4 · TypeScript · motion.

## The hero

The home page opens with an interactive **"Fly the drone"** experience: a
3rd-person drone over a desert-modern estate; each click flies one pre-rendered
leg to the next waypoint (pool → great room → kitchen → suite → twilight),
ending on the booking payoff. Clips chain frame-exactly (each clip ends on the
still the next begins on) — see `components/FlyThrough.tsx` and
`FLIGHT_WAYPOINTS` in `lib/site.ts`. A missing or stalled clip degrades to a
still crossfade automatically; a reduced-motion preference quiets the ambient
loops (hover bob, panel float) while user-initiated flights still play.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerender)
```

`node scripts/shots.mjs` regenerates full-page screenshots (needs `npm run
start` on :3000); `scripts/fly.mjs` walks the hero flight end-to-end.

## Before launch — the operator checklist

1. **Cal.com** — create the `intro-call` event type (15 min), install the
   Stripe app on it with a **$10 charge**, refund manually after each call.
   The embed points at `apex-visuals/intro-call`
   (`components/book/CalEmbed.tsx`).
2. **Contact details** — real phone/email/Instagram in `lib/site.ts`.
3. **Copy confirmations** — everything marked `TODO(hunter)` (grep for it):
   years of experience, service radius, $500 package inclusions, turnaround.
4. **Media** — all photography/video is AI-generated placeholder content of
   fictional properties. `MEDIA.md` documents every slot, size, and the
   fly-through chaining rule for replacing it with real footage.
5. **Testimonials** — sample-labeled until real quotes exist
   (`components/home/Testimonials.tsx`).
6. **Domain** — metadata assumes `apexvisuals.com` (`app/layout.tsx`).
7. **Client portal** — `/portal` (client dashboard), `/portal/admin` (Hunter's
   upload page), backed by Supabase project `hunter-espaniola-portal`
   (`vdabjotsffgdpceymjzs`): email/password auth, a `profiles` +
   `deliveries` schema, and a private `deliveries` storage bucket with
   row-level security so clients only ever see their own files. Set
   `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel
   (values in `.env.example` / `.env.local`). Two seeded test accounts —
   `hunter@apexvisuals.com` (admin) and
   `democlient@apexvisuals.com` — **change or delete both before
   launch**. Make Hunter's real account the admin with:
   `update public.profiles set is_admin = true where email = '<his email>';`
   The free Supabase tier caps single uploads at 50 MB — plenty for 1080p
   deliverables, but upgrade the project to Pro before delivering multi-GB
   4K masters. After picking a production domain, set Supabase Auth's
   "Site URL" to it so password-reset emails link to the live site instead
   of localhost.

Deploy target: Vercel (static prerender, no server state).

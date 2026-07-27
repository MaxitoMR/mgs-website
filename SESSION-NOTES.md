# MGS Website — working notes

_Living record of the significant work, decisions, and gotchas. All changes below are committed and pushed to `origin/master`._

**Prod:** https://mgs-website-nu.vercel.app (domain: mgssupplyandservices.com)
**Deploy loop every change:** edit → `npx tsc --noEmit` → commit → `npx vercel --prod --yes` → `git push`.
**Image convention:** new photos are compressed with `sharp` (≈2000px wide, JPEG q82–84, mozjpeg) into `public/images/` before committing — masters are large, so never commit raw camera files. `ffmpeg` (installed via winget, `Gyan.FFmpeg`) is used for video transcodes.

---

## Design system / voice

- **Tone:** authoritative, engineering-grade, aimed at facility managers & procurement, keyword-rich for SEO/AI search (OSHA, EPA-registered, AORN, Joint Commission, HAZWOPER, ATP testing, HIPAA, ISSA, insured/bonded, "documented QA standard"). This replaced an earlier folksy "owner voice." Applied across every homepage section, About, Leadership, all 25 service pages, metadata, FAQ/gallery/services intros.
- **`.mgs-card`** (in `globals.css`): the site-wide elevated card — white, Radix `rgray-4` hairline border, resting shadow, hover lift. Use it for any content card on a light section. `shadow-premium`/`-lg` were also enriched (layered contact + ambient + hairline ring).
- **Dark "spine":** the homepage intentionally runs a continuous dark stretch — Hero → Services (`#111111`) → Why MGS → Crew band — then white takes the credible middle (Trust, Client Portal), a dark App moment, and a warm close. Dark = cinematic/brand; white = clean/trust. Don't scatter light/dark section-by-section; keep the spine intact.
- **Rounded-corner gotcha (important):** sections with `borderTopLeftRadius` reveal whatever is *behind* them (the page body `#FBFBFE`, or the `CtaBanner`'s `backdrop` prop). When you change a section's/neighbor's background, the curved corner can expose a mismatched sliver. Fixes seen this session: `CtaBanner` got a `backdrop` prop (pass the color of the section above it — `#F4F4F5`, `#1a252f`, etc.); Why-MGS's corner was removed once Services went dark (it was showing a white arch).
- **Scroll-aware chrome:** `ScrollNavProvider` (single rAF scroll listener) drives the header + floating CTAs hide/show. Header/CTA/scroll-top sit at `z-[900]`/`z-[998]` — above page content (hero is `z-50`), below the mobile drawer (`z-1000/1001`). Do **not** reintroduce `overflow-x:hidden` + `height:100%` on html/body in `globals.css` — it makes `<body>` the scroller and freezes `window.scrollY` (kills all scroll behavior). It's `overflow-x: clip` with no height clamp on purpose.

## Homepage (`src/app/(marketing)/page.tsx`) — section order
Hero → ServicesGrid (dark bento "What we do") → WhyChooseUs → CrewBand → TrustBadges → ClientPortalCta → AppPromo → ClosingCta (team photo + green "Request a site assessment" split) → ContactSection. Hero folds the 4 stats in (the standalone StatsOverlap bar was removed). ServicesGrid is a wide bento mosaic (first service = big featured tile), unique accent color + alternating big-tile side per sector.

## Employee training portal — `/staff-portal`
- Rebuilt from a fake login into a **training video library** (`training-hub.tsx`), **passcode-gated (5602)**, noindexed, nav labeled "Employee Training."
- Four videos live in the **Supabase `training` bucket** on project **`ejivobojvlxrngsdcjjk`** (the mgs-manager/newsletter project — the one whose service key we have): `protective-equipment`, `bloodborne-pathogens`, `terminal-cleaning-or`, `terminal-cleaning-or-es`. Served via native `<video>` from the public bucket.
- **Upload constraint:** that Supabase project caps uploads at **50 MB (free-tier hard limit)**. Masters were ~170 MB `.m4v`; transcoded to 720p and squeezed under 50 MB. To add more videos: compress under 50 MB, or move to Supabase Pro / the hero-videos project (higher cap). Masters remain in the owner's OneDrive.
- Passcode is **client-side only** (visible in JS) — casual gating, not hard security. Offer signed URLs + server check if real protection is ever needed.

## Leadership — `/leadership`
CEO **Gisella Islas** feature (portrait + bio + pull quote) + operating-principles row. Bio is grounded/accurate but **generic** — swap in real facts (tenure, background, a real quote) when available. Has `Person` + `BreadcrumbList` JSON-LD.

## SEO / structured data
- Every **service page** rewritten (unique `description` = meta + `longDescription` = body). Category copy + services/gallery/FAQ intros retoned.
- JSON-LD: `LocalBusiness` (home), `FAQPage` (FAQ), enriched `Service` + `BreadcrumbList` (each service page), `Person` + `BreadcrumbList` (leadership). Component: `src/components/seo/json-ld.tsx`.

## Other facts
- **Phone:** canonical call number is **(281) 829-5357** (`COMPANY.phone.primary/display`). 5358 is stored as `secondary`, not shown. (Bug fixed: site was dialing 5358 everywhere except the desktop top bar.)
- **Newsletter admin:** gated `/newsletter/subscribers` + `GET /api/newsletter-subscribers`, env `NEWSLETTER_ADMIN_KEY` = `mgs-news-e2e8dbbc95b8091582ba` (Vercel Prod+Dev). Signups write to mgs-manager Supabase `newsletter_subscribers`.
- **Newsletter signup** has honeypot (`company_url`) + min-time (2s) spam gates; silently drops spam.
- **Application** position dropdown: Floor Tech, Supervisor, Day Maid, Janitor.
- **Photos placed** from the on-site shoot: homepage crew band (`mgs-crew.jpg`) + team closing (`mgs-team.jpg`); Surgery Centers (HEPA vac + auto-scrubber floor); Sports & Rehab (SciFit); Clinics (rotary floor scrub); About (Katy home base). Service galleries render each photo as an **alternating feature row** (image + caption, sides flip) — handles any count/aspect without cropping.
- **Logo:** a new droplet logo was trialed then reverted — header/footer use the original `/attached_assets/MGS LOGOOOOOOO_1750105578653.png`. Unused `public/mgs-logo.png` remains.

## Accessibility (WCAG 2.1 AA) — audited & fixed, with one accepted exception

Audited with **axe-core** (Chrome headless, wcag2a/2aa/21a/21aa + best-practice) across 18 routes × desktop + mobile. Went from **8 violation types / 412 contrast nodes → 0**.

> **Current state: `color-contrast` is a known, accepted failure.** The full-strength brand green was restored by product decision after the pass (see "Brand color decision" below), which re-introduces ~35 contrast nodes per page. **Everything else from this pass still holds and must not regress** — form labeling, keyboard operability, landmarks, focus, reduced motion, and all non-green text contrast. When re-running the harness, `color-contrast` is the *only* expected violation type; anything else is a real regression.

### Brand color decision (supersedes the contrast fix)
The green lives behind four tokens in `globals.css` — the "brand color seam". Everything reads from there, so the palette moves by editing one block.

- `#69AF23` behind white text is **2.71:1**, failing AA for normal text *and* the 3:1 large-text threshold. There is no "keep it for headings" exemption — this was decided with the numbers on the table, choosing brand fidelity over the contrast criterion.
- **To restore AA:** set `--color-brand-green-deep` and `-text` to `#457617`, `-deep-hover` to `#4E811A`, and the accent-text tokens to `#116D96` / `#9A5600` / `#55700F`. Then flip the nav overlays in `header.tsx` from white tints back to black (a white overlay *lightens* the green to `#58842e` and drops white text to 4.41:1), and `page-header.tsx` subtext from `white/80` to `white/90` (white/80 is only 4.15 on the deep green). Mirror the same hexes in the three hardcoded maps: `categoryMeta` (header), `categoryTextColors` (services), `deepColor` (services-grid).
- **Verify accent colors against `#F4F4F5`, not white.** The off-white section backgrounds shave ~0.2 off every ratio — enough that white-only math (4.69) shipped values that still failed (4.26). This trap cost a full extra round; don't repeat it.
- **Forms:** every control now has a real `htmlFor`/`id` pair (placeholders were standing in as labels — 10 `<select>`s and the date input had *no* accessible name at all), plus `aria-required`, `aria-invalid`, `aria-describedby` → `role="alert"` errors, `autoComplete`, and `fieldset`/`legend` for the services checkbox group. Error text is `red-600`; `red-500` is only 3.76:1.
- **Keyboard:** the mega menu and Portals dropdown were hover-only — they now toggle on click/Enter with `aria-expanded` and close on Escape. The before/after gallery slider was pointer-only and is now a real `role="slider"` (arrows / Shift+arrows / Home / End).
- **Landmarks:** added a skip link + `<main id="main-content">`; the header is wrapped in `<header>` (the sticky green nav stays a *sibling* — wrapping it would break `position: sticky`, see the note in `header.tsx`), the mobile row is `<nav aria-label="Mobile">` rather than a second banner, and the floating CTAs are `role="complementary"`.
- **Reduced motion:** `globals.css` honors `prefers-reduced-motion` (collapses durations to ~0 rather than removing animations, so anything that animates *into* view still ends up visible). Verified: 0 elements stranded at `opacity: 0`.
- **Focus:** `:focus-visible` ring (green + white halo, inverted on dark) — there was no visible focus indicator anywhere before.

**Re-running the audit:** `npx next build && npx next start -p 3111`, then drive axe-core via `puppeteer-core` against the system Chrome (no Playwright/Puppeteer in this repo; install into a scratch dir, not `package.json`). Scan pristine pages *and* submit each form empty to catch validation-error states — axe never sees those otherwise. Emulate `prefers-reduced-motion` with a **staged** scroll; an instant jump to the bottom skips IntersectionObserver and produces false "stranded content" hits in both modes.

## Local SEO — `/katy`

First local landing page (`src/app/(marketing)/katy/page.tsx`). Targets the home-market query rather than the generic greater-Houston framing the rest of the site uses.

- **The award opens the page**, not the footer — a third-party local ranking is the strongest proof available for a local-intent visitor. All award facts come from the `AWARD` constant, so nothing drifts.
- **Angle:** "we're actually based here, crews stage from 10th Street" — positioned against Houston-based competitors who dispatch from inside the Loop. Response time, same-day supervisor walks, 2 a.m. emergencies.
- Named neighborhoods (Cinco Ranch, Katy Mills, Energy Corridor, Fulshear …) because local intent is how people actually search.
- **JSON-LD:** `Service` + `BreadcrumbList` + `FAQPage`. Deliberately **not** a second `LocalBusiness` — the home page already declares that entity, and duplicating it under a different URL splits the organization into two nodes. The business appears as the Service's `provider` instead.
- Linked sitewide from the footer Resources column (local pages rank on internal linking as much as content) and added to `sitemap.ts` at 0.9.

**If more city pages follow** (Sugar Land, Cypress …): copy the structure but *write genuinely different copy*. Near-duplicate city pages with the town name swapped are doorway pages under Google's spam policy and can be demoted. Each needs real local specifics — actual neighborhoods, actual sites worked, honest response-time claims.

## Open follow-ups (from the "what would you change" review)
1. **Social proof** — testimonials are hidden (placeholder quotes); no client logos/case studies/capability-statement PDF. Needs real content from owner. Biggest conversion gap.
2. **Local service-area pages** — `/katy` is **built** (see above). Sugar Land / Cypress / Fulshear not yet; read the doorway-page warning first.
3. **Hero video** autoplays 5 Supabase MP4s — heavy on mobile; consider poster + one Cloudflare-Stream clip.
4. ~~**Axe/WCAG pass** not run site-wide~~ — **done** across 18 routes, with `color-contrast` since re-accepted as a known failure (see the Accessibility section). Still open: manual screen-reader passes (NVDA/VoiceOver) and `/newsletter/subscribers`.
5. Substantiate the **99.8% QA** and **100+ facilities** claims, or soften.
6. Leadership bio + training-video set may need real specifics.

## Untracked local assets
~194 MB of loose images/exports under `public/images/` etc. are intentionally **left untracked** (unused by the build) to keep the repo lean.

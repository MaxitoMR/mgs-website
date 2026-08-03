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
Hero → ServicesGrid (dark bento "What we do") → WhyChooseUs → CrewBand → TrustBadges → ClientPortalCta → AppPromo → AppInTheField → ClosingCta (team photo + green "Request a site assessment" split) → ContactSection. Hero folds the 4 stats in (the standalone StatsOverlap bar was removed). ServicesGrid is a wide bento mosaic (first service = big featured tile), unique accent color + alternating big-tile side per sector.

## `AppInTheField` — the app's proof band (added 2026-08-03)

Sits directly under `AppPromo` and is deliberately paired with it: **AppPromo shows the product** (a clean screenshot in a phone frame), **AppInTheField shows it being used**. Two photographs from the on-site shoot — a supervisor walking an office floor with the assigned crew member, then the phone handed over mid-inspection with the employee signing the acknowledgment. A screenshot can be staged; the handoff can't, which is the whole reason these images earn a section instead of going to `/gallery`.

- **The angle is the acknowledgment loop, not the feature list.** AppPromo already lists eight features. This band makes one operational claim — the inspection is scored on the floor and isn't filed until the person who did the work has read and signed it — which is also the concrete backing for "Verified, Not Assumed" in `WhyChooseUs`.
- **Every claim was checked against the app's own strings** in `mgs-manager/src/lib/i18n/{en,es}.ts`. Specifically: `employeeAckHelp` opens with *"Opcional."*, and `signedHint` is *"Reconocimiento capturado. Se registrará con marca de tiempo."* So the copy says the supervisor **can** hand the phone over and that the signature is timestamped — **do not upgrade "optional" to "every inspection,"** because the app doesn't enforce it. The bilingual claim rests on `SupportedLanguage = 'en' | 'es'` with both dictionaries fully populated.
- **Crops are load-bearing.** Both source frames are 3:2 in a shared-height row, so `objectPosition` does the work: the handoff shot is anchored at `44% 38%` — high, to trade the out-of-focus shoulder along the bottom for a screen that fills the frame once the column narrows. Anchoring it centered shrinks the screen to roughly half its size, which defeats the point of the photo. The walk shot sits at `50% 42%` to hold both people through the tablet breakpoint.
- Images: `public/images/app-inspection-walk.jpg` and `app-signature-capture.jpg`, downscaled from ~10000px originals to 2400px @78 (~750 KB each) and committed, since the site references them.
- `next.config.ts` gained `images.qualities: [75, 82, 84, 100]` — Next 16 drops any `quality` prop not declared there, which is what the three console warnings on `mgs-crew.jpg` / `portal-dashboard.png` / `mgs-team.jpg` were. Add to that list before using a new quality value.

## Employee training portal — `/staff-portal`
- Rebuilt from a fake login into a **training video library** (`training-hub.tsx`), **passcode-gated (5602)**, noindexed, nav labeled "Employee Training."
- Four videos live in the **Supabase `training` bucket** on project **`ejivobojvlxrngsdcjjk`** (the mgs-manager/newsletter project — the one whose service key we have): `protective-equipment`, `bloodborne-pathogens`, `terminal-cleaning-or`, `terminal-cleaning-or-es`. Served via native `<video>` from the public bucket.
- **Upload constraint:** that Supabase project caps uploads at **50 MB (free-tier hard limit)**. Masters were ~170 MB `.m4v`; transcoded to 720p and squeezed under 50 MB. To add more videos: compress under 50 MB, or move to Supabase Pro / the hero-videos project (higher cap). Masters remain in the owner's OneDrive.
- Passcode is **client-side only** (visible in JS) — casual gating, not hard security. Offer signed URLs + server check if real protection is ever needed.

## About — `/about` (absorbed `/leadership`, 2026-07-27)

One page now carries the company story, the award, the people, and the operating principles. Section order and backgrounds:

1. **Who We Are** — white
2. **Recognition** (award plaque) — `#F4F4F5`
3. **The Team** — white, `id="leadership"`
4. **The principles behind the work** — `#F4F4F5`
5. `WhyChooseUs` — `#111111`, then `CtaBanner backdrop="#111111"`

- **`/leadership` is retired** with a permanent **308 → `/about#leadership`** in `next.config.ts`. It was an indexed URL, so it redirects rather than 404s; the fragment lands visitors on the team section they were after. Nav entries removed from `mobile-nav.tsx` and the sitemap; the footer link became "Our Team" → `/about#leadership`.
- **The CEO hero block was removed** (portrait + bio + pull quote). Gisella now appears in the team row like everyone else. Her `Person` JSON-LD survives on `/about`, pointing at `team-05.jpg`. The old bio and the "We don't ask clients to take our word for it" pull quote are gone — recover them from git history (`7a90bc5^`) if they're ever wanted back.
- `public/images/gisella-islas.jpg` is now **unreferenced** — kept on disk, safe to delete.
- **The team array is gated:** the section renders only when every member has both a name and a role. These are identifiable people and a guessed name against a real face misrepresents someone; the gate makes that impossible rather than merely unlikely. Names/roles come from the owner — never infer them from a photo.
- **Portraits are pre-aligned, not CSS-cropped.** `scripts/portraits/` crops each master to 4:5 on a **common eye line** with a **normalised head size**. The masters are 2:3 frames shot at different distances — eye lines varied 30–42% of frame height and head sizes by a third — and no single `object-position` can reconcile a small head with a large one. Because the output ratio matches the card exactly, the component needs no `object-position` at all. Full method, tuning knobs, and how to add a person: `scripts/portraits/README.md`. Cropping in also *cut* the payload (876 KB for six, down from ~1.6 MB).

## SEO / structured data
- Every **service page** rewritten (unique `description` = meta + `longDescription` = body). Category copy + services/gallery/FAQ intros retoned.
- JSON-LD: `LocalBusiness` (home), `FAQPage` (FAQ + `/katy`), enriched `Service` + `BreadcrumbList` (each service page), `Person` + `BreadcrumbList` (About), `Service` + `BreadcrumbList` (`/katy`). Component: `src/components/seo/json-ld.tsx`.

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

## The BusinessRate award — how it's framed

All copy comes from the `AWARD` constant in `constants.ts`, so the homepage strip, About, `/katy`, and the JSON-LD can't drift.

- **Lead with the substance, not the rank.** `headline` is "Top-3 rated janitorial service in Katy"; `claim` carries "Ranked #3 …" immediately underneath. "Ranked #3" as the *headline* invites "so who are #1 and #2?" and breaks the moment the position moves — while the underlying fact (Katy clients rated the work highly on Google) stays true. Nothing is softened: the exact rank is always adjacent, and the JSON-LD keeps the precise phrasing because machines want the literal fact.
- **The plaque photo is on `/about` only.** Its dominant elements are BusinessRate's logo, gold shield, and a purple "MOMENTUM" bar — at display size it advertises the awarding body more than MGS, and on mobile the MGS name is the smallest legible text. As a photographed artifact on About it reads as authentic; as a lead visual it hands away the best position. `/katy` leads typographically instead.
- **Placement is deliberate and modest:** homepage trust strip (set apart from the six self-asserted badges), `/about`, `/katy`. Not the hero. Facility managers and procurement buy on compliance and references; an oversized directory badge cheapens the engineering-grade tone.
- **It is specific but not yet *checkable*.** There's no link to the Google Business Profile reviews, so a skeptical reader can't verify it — which weakens the "third-party proof" argument that justifies featuring it at all. See follow-up #7.
- **Shelf life:** stamped June 2026, will read stale by roughly mid-2027. Refresh with a newer ranking or drop the month and keep the standing claim.

## Local SEO — `/katy`

First local landing page (`src/app/(marketing)/katy/page.tsx`). Targets the home-market query rather than the generic greater-Houston framing the rest of the site uses.

- **The award opens the page**, not the footer — a third-party local ranking is the strongest proof available for a local-intent visitor. All award facts come from the `AWARD` constant, so nothing drifts.
- **Angle:** "we're actually based here, crews stage from 10th Street" — positioned against Houston-based competitors who dispatch from inside the Loop. Response time, same-day supervisor walks, 2 a.m. emergencies.
- Named neighborhoods (Cinco Ranch, Katy Mills, Energy Corridor, Fulshear …) because local intent is how people actually search.
- **JSON-LD:** `Service` + `BreadcrumbList` + `FAQPage`. Deliberately **not** a second `LocalBusiness` — the home page already declares that entity, and duplicating it under a different URL splits the organization into two nodes. The business appears as the Service's `provider` instead.
- Linked sitewide from the footer Resources column (local pages rank on internal linking as much as content) and added to `sitemap.ts` at 0.9.

**Katy is the only city page — decided 2026-07-27.** No Sugar Land / Cypress / Fulshear variants. This is the right call: Katy is the one market where the page is *true* (headquarters, warehouse, crews, and a local ranking all actually here), so it isn't a template. Cloning it for towns MGS only drives to would produce near-duplicate doorway pages under Google's spam policy, which risks demoting this one too. If a second city ever earns a page, it needs its own genuine specifics — real sites worked, honest response times — not a find-and-replace.

## Open follow-ups (from the "what would you change" review)
1. **Social proof** — testimonials are hidden (placeholder quotes); no client logos/case studies/capability-statement PDF. Needs real content from owner. Biggest conversion gap.
2. ~~**Local service-area pages**~~ — `/katy` is built and is **the only one**; other cities were considered and declined (see above). Closed.
3. **Hero video** autoplays 5 Supabase MP4s — heavy on mobile; consider poster + one Cloudflare-Stream clip.
4. ~~**Axe/WCAG pass** not run site-wide~~ — **done** across 18 routes, with `color-contrast` since re-accepted as a known failure (see the Accessibility section). Still open: manual screen-reader passes (NVDA/VoiceOver) and `/newsletter/subscribers`.
5. Substantiate the **99.8% QA** and **100+ facilities** claims, or soften.
6. **Training-video set** may need real specifics. (The leadership half of this is closed — the generic CEO bio was removed with the `/about` consolidation, and the team section now carries real named people.)
7. **Google Business Profile reviews link** — the single highest-value small addition. Add the GBP review URL to `AWARD` and link the award from it; that turns the ranking from a specific *assertion* into a *verifiable* one, which is the entire reason it earns space next to the self-asserted trust badges. Get it from Google Maps → the business → Reviews → Share. Two-minute change.
8. **Review velocity** — the award is a lagging indicator of Google review volume/rating, and that same signal drives the local map pack where janitorial leads actually originate. A systematic post-service review request compounds; a plaque does not. Bigger lever than anything else currently open.

## Untracked local assets
~194 MB of loose images/exports under `public/images/` etc. are intentionally **left untracked** (unused by the build) to keep the repo lean.

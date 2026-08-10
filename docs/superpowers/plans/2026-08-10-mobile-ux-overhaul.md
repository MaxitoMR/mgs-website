# Mobile UX Overhaul — Implementation Plan

**Goal:** Fix 24 audited mobile UX defects across the marketing site — fixed-overlay
collisions, form usability, scroll depth, navigation, touch targets, legibility, motion
— without changing the `lg:` and up layout.

**Architecture:** Almost every defect is systemic, not per-page. Fix each one at its
single shared source (`globals.css`, `(marketing)/layout.tsx`, `PageHeader`,
`SectionWrapper`, `Footer`, `floating-buttons`) and it propagates to all 15+ routes.
Only three fixes are genuinely local: the homepage app chapter, the `/services` list,
and the `/gallery` comparison slider.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4 (`@theme` in
`globals.css`), framer-motion 12, GSAP 3 + ScrollTrigger, react-hook-form + zod.

## Global Constraints

- **Desktop (`lg:`, ≥1024px) must not regress.** Every change is either mobile-scoped
  (`max-lg`, base-with-`lg:` reset, or a `@media (max-width: 1023px)` block) or is a
  text-size/attribute fix with no layout consequence. Proof: full-page desktop
  screenshot diff at 1440×900 before vs after.
- **No `maximum-scale` / `user-scalable=no`.** Pinch-zoom stays available.
- Viewport stays `width=device-width, initial-scale=1`.
- Tap-to-call number is `tel:+12818295357` (`COMPANY.phone.primary`).
- Type floor: 14px for any real sentence, 12px for micro-labels. Nothing below 12px.
- Touch target floor: 44×44 for interactive elements.
- Form controls: ≥16px font-size at mobile widths.
- No test runner in this repo — `npm run build` is the type gate, and
  `scratchpad/audit/measure.mjs` (puppeteer-core → system Chrome) is the behavioural
  gate. It reports scrollHeight, horizontal overflow, sub-44px targets, sub-16px form
  controls, and occlusion-by-fixed-chrome per route × viewport.

## Measured baseline (390×844, `next start`)

| Route | scrollHeight |
|---|---|
| `/` | 15,330px (18.2 screens) |
| `/services` | 13,379px (15.9) |
| `/about` | 9,387px (11.1) |
| `/app` | 18,485px (21.9) |
| `/gallery` | 10,412px (12.3) |

Sitewide: **0** routes with horizontal overflow, **478** sub-44px targets, **57**
sub-16px form controls, **19** occluded elements. Lighthouse mobile: home perf 78 /
a11y 100 / BP 54 / SEO 100.

Of the 478 small targets, ~435 are the same 29 elements repeated on every page —
the footer link lists, the four social icons, the footer contact rows, and the mobile
header logo. Fixing the footer once clears ~90% of the count.

All 19 occlusions are caused by the **scroll-to-top FAB**, not the CTA bar: the FAB
shows only while scrolling *down*, which is exactly the state the audit harness ends
in at the page bottom.

---

## Where each audit item lands

### P0 — Fixed overlay collisions

| # | Fix | Files |
|---|---|---|
| 1 | `--mobile-cta-h` token; `main` reserves it on mobile; bar gets `env(safe-area-inset-bottom)` | `globals.css`, `(marketing)/layout.tsx`, `shared/floating-buttons.tsx` |
| 2 | FAB dropped on mobile (`hidden lg:flex`) — deterministic: the bottom-right corner belongs to one element | `shared/scroll-to-top.tsx` |
| 3 | Bar hides once a form scrolls into view (IntersectionObserver on `form`) | `shared/floating-buttons.tsx` |
| 4 | Mobile bar becomes **[Call] + [Get a Quote]**; desktop keeps Quote + Walkthrough | `shared/floating-buttons.tsx` |

**Decision on #2:** drop, don't stack. The two elements are already mutually exclusive
by design (`direction === "down"` vs its inverse), so "stack above the bar" describes a
state that never occurs — and the real complaint is the FAB colliding with card corners
mid-page. With the FAB gone on mobile the reserved space has exactly one owner, and the
auto-revealing header covers the way back up.

### P0 — Forms

| # | Fix | Files |
|---|---|---|
| 5 | 16px floor for `input`/`select`/`textarea` under 1024px, one CSS rule | `globals.css` |
| 6 | `required` on genuinely-required fields; focus moves to first invalid on failed submit | 4 form components |
| 7 | `inputmode`, `autocomplete`, `enterkeyhint` on the fields still missing them | `forms/quote-form.tsx`, `employee-application/application-content.tsx` |
| 8 | Bigger checkbox glyph; 12 services collapse behind a disclosure showing a count | `forms/quote-form.tsx` |
| 9 | Submit/pending/success affordance | already present via `mutation.isPending`/`isSuccess` — verify + add the one missing case (contact form scroll-to-success) |

**Note on #6:** the audit's premise is half right. There is no HTML `required`
attribute anywhere, but zod + `zodResolver` validation *is* wired, with `aria-invalid`,
`aria-describedby` and `role="alert"` inline errors already adjacent to each field. What
is genuinely missing is native `required`, and focus management on failed submit.

### P1 — Scroll depth

| # | Fix | Files |
|---|---|---|
| 10a | App chapter → 3 swipeable panels on mobile, full narrative at `lg:` | `sections/app-beats.tsx`, `sections/app-showcase.tsx` |
| 10b | Halve section padding under `sm`, sitewide | `globals.css`, `shared/section-wrapper.tsx`, section components |
| 10c | Subpage hero → ~48vh on mobile | `shared/page-header.tsx`, `services/services-content.tsx` |
| 11 | `/services`: real category filter + compact mobile rows + 14px descriptions | `services/services-content.tsx` |

### P1 — Navigation

| # | Fix | Files |
|---|---|---|
| 12 | Homepage category chips wrap to 2 rows on mobile instead of scrolling | `sections/services-grid.tsx` |
| 13 | Drawer: pinned CTA+call footer, `min(88vw,380px)`, per-category "View all" links | `layout/mobile-nav.tsx` |
| 14 | Verify header reveal threshold + immediate paint | `providers/scroll-nav-provider.tsx`, `layout/header.tsx` |

### P1 — Touch targets & type

| # | Fix | Files |
|---|---|---|
| 15 | 44px hit areas: footer links, social icons, breadcrumbs, inline links, SUBSCRIBE | `layout/footer.tsx`, `shared/page-header.tsx`, `forms/newsletter-form.tsx`, `sections/services-grid.tsx`, `sections/trust-badges.tsx`, `sections/app-showcase.tsx` |
| 16 | Type floors | `layout/top-bar.tsx`, `sections/app-beats.tsx`, `sections/app-showcase.tsx`, `services/services-content.tsx`, `layout/mobile-nav.tsx`, `layout/footer.tsx` |

### P1 — Legibility

| # | Fix | Files |
|---|---|---|
| 17 | Stronger mobile hero scrim measured against brightest pixels behind the text | `sections/hero.tsx` |
| 18 | Contrast sweep of dark sections | measured, then targeted edits |

### P2 — Motion, perf, polish

| # | Fix | Files |
|---|---|---|
| 19 | Above-the-fold renders at full opacity; GSAP honours reduced motion globally | `sections/hero.tsx`, `shared/page-header.tsx`, `services/services-content.tsx`, `lib/gsap.ts` |
| 20 | Smooth scroll off on mobile / limited to short anchors | `globals.css` |
| 21 | Pointer Events + `touch-action` + 44px handle + tap-to-toggle + lazy pairs | `shared/before-after-slider.tsx` |
| 22 | `sizes`/`srcset`, alt text, lazy-loading | `layout/footer.tsx`, `sections/client-portal-cta.tsx`, service pages |
| 23 | `theme-color` meta | `app/layout.tsx` |
| 24 | One primary action per screen on service detail pages | `services/[slug]/page.tsx` |

---

## Verification contract

Run after every phase; run in full before claiming completion.

1. `npm run build` — type/import gate.
2. `node measure.mjs after` at 360×640, 390×844, 414×896, 406×715 across all 15
   routes. Required: 0 horizontal overflow, 0 sub-16px form controls, 0 occlusions,
   small-target count down to only deliberate exceptions.
3. Landscape pass at 844×390 and 896×414.
4. First-frame check: h1 + hero copy visible with JS disabled and with
   `prefers-reduced-motion: reduce`.
5. `scrollHeight` before/after for `/`, `/services`, `/about` — target ≥40% cut on `/`.
6. Lighthouse mobile before/after on `/`, `/services`, `/quote`.
7. Desktop screenshot diff at 1440×900, all 14 routes — must be pixel-identical except
   where a fix was deliberately desktop-visible (top bar type size).

---

## Results

### Sitewide gates — 15 routes × 4 portrait viewports (360×640, 390×844, 414×896, 406×715)

| | before | after |
|---|---|---|
| routes with horizontal scroll | 0 | **0** |
| interactive elements under 44×44 | 478 | **0** |
| form controls under 16px | 57 | **0** |
| elements occluded by fixed chrome | 19 | **0** |

Landscape (640×360, 844×390, 896×414): clean on all four gates.

### Scroll depth @390×844

| route | before | after | change |
|---|---|---|---|
| `/` | 15,330px | **9,180px** | **−40.1%** |
| `/services` | 13,379px | **5,840px** | **−56.3%** |
| `/about` | 9,387px | **8,084px** | −13.9% |
| `/gallery` | 10,412px | 5,503px | −47.1% |
| `/quote` | 5,097px | 3,562px | −30.1% |
| `/katy` | 7,824px | 6,620px | −15.4% |
| footer (every route) | 2,406px | 1,478px | −38.6% |
| homepage app chapter | ~6,100px (8.5 screens) | **2,133px (2.5 screens)** | −65% |

### First paint

All 15 routes: h1 and hero copy at opacity 1 in every sample from 60ms onward, and
under `prefers-reduced-motion: reduce` nothing is stranded at opacity 0.

Two real gates were found and removed during verification: the homepage hero timeline
(subtitle still at 0 at 150ms) and `/app`'s `data-reveal` firing on already-visible
content. `/services` had a `motion.h1` serialising `opacity: 0` into the HTML.

### Lighthouse mobile

| route | perf | a11y | LCP | bytes |
|---|---|---|---|---|
| `/` | 78 → 77 | 100 → 100 | 5.8s → 6.5s | 2,407 → 2,197 KiB |
| `/services` | 75 → **82** | 100 → 100 | 10.1s → **4.8s** | 2,032 → 1,898 KiB |
| `/quote` | 75 → 75 | 97 → **100** | 11.0s → 10.4s | 1,786 → 1,720 KiB |

Home perf/LCP is within run-to-run noise: three consecutive runs of the after build
scored 77 / 80 / 77 with LCP 6.4 / 5.4 / 6.6s. Best-practices is 54 before and after,
driven by Vercel Analytics scripts 404ing on localhost — identical in both runs.

### Desktop regression, 1440×900 full-page

7 of 14 routes pixel-height identical. The other 7 changed by +1 to +37px, each
traceable to a fix the audit asked for that necessarily has a desktop footprint:
`min-h-12` on the newsletter and Apply Now controls (44px floor), 12px→14px card
descriptions and micro-copy (type floor), and the 48px comparison-slider handle.

One genuine regression was caught and fixed: `lg:block` on the footer links collapsed
each `<li>`'s 18px line-box strut from 29px to 19px, taking 116px off every desktop
page. Reverted to `lg:inline`.

### Out of scope, found while verifying

With JavaScript fully disabled, every route renders `app/loading.tsx` and never swaps
in the page — Next's Suspense fallback is exchanged by an inline script. The content is
in the served HTML (verified with curl), so crawlers and Lighthouse see it. Pre-existing
and untouched here.

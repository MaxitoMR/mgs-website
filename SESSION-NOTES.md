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
Hero → ServicesGrid (dark bento "What we do") → WhyChooseUs → CrewBand → TrustBadges → ClientPortalCta → AppShowcase → ClosingCta (team photo + green "Request a site assessment" split) → ContactSection. Hero folds the 4 stats in (the standalone StatsOverlap bar was removed). ServicesGrid is a wide bento mosaic (first service = big featured tile), unique accent color + alternating big-tile side per sector.

## `AppShowcase` — the app chapter, one continuous field (2026-08-03)

Replaces the old `AppPromo` (#191919) + `AppInTheField` (#111111) pair, both deleted. The seam between them was the problem: two backgrounds read as two separate pitches about the same product, and it left the field photographs arriving as an unexplained fragment — the *last* beat of an inspection with nothing establishing what led to it.

Now one section, one color, no dividers, no internal background steps. The homepage neighbors are both light (`ClientPortalCta` `#f0f5e8` above, `ClosingCta` below), so the whole block reads as scrolling into a dark room, hearing one argument, and scrolling out. A single faint grid texture spans the entire field — shared texture is part of what stops the beats reading as separate sections.

**Six beats:** the claim ("Field operations, instrumented.") → the product (phone + feature list + App Store) → **the turn** → the walk (full-bleed photo) → the handoff (photo + the acknowledgment argument) → the terms (three facts).

- **Beat 3 is the hinge, don't delete it.** "Any contractor can show you a screenshot. This is the part that's harder to stage." It names what a screenshot *can't* prove, which is the only thing that earns the photographs that follow. Without that line the field images read as decoration.
- **MOTION CONTRACT — the important part.** Every element is fully visible in the DOM as authored. Animation applies *only* inside `gsap.matchMedia()` on the no-preference branch, and *only* via `gsap.from()`. Nothing is parked at `opacity-0` in a className. A `from()` tween that never runs is invisible to nobody; a class of `opacity-0` waiting on a tween that never runs is a blank section. `hero.tsx` uses the opposite pattern and goes blank whenever its timeline doesn't advance (any rAF-throttled context — a background tab — reproduces it). Verified: the SSR HTML for this section contains zero `opacity:0`. **Do not copy the hero's pattern here.** (`ClientPortalCta` has the same framer-motion `initial={{opacity:0}}` fragility — two occurrences in SSR — if it ever needs fixing.)
- **Parallax is differential.** Each masked frame holds an image at `scale(1.14)` drifting ±4.5% against scroll, so pictures feel set into the page rather than pasted on. The scale is the headroom the drift eats — reduce one and you must reduce the other or the crop shows its edges.
- **Claims checked against the app's own strings** in `mgs-manager/src/lib/i18n/{en,es}.ts`: `employeeAckHelp` opens with *"Opcional."* and `signedHint` is *"Reconocimiento capturado. Se registrará con marca de tiempo."* So the copy says the supervisor **can** hand the phone over and that the signature is timestamped — **do not upgrade "optional" to "every inspection,"** the app doesn't enforce it. The bilingual claim rests on `SupportedLanguage = 'en' | 'es'` with both dictionaries fully populated.
- **Beats 1 and 2 are ONE grid row, and the layout took three passes to get there.** Copy column (`col-span-7`, `max-w-xl`) carries eyebrow → headline → intro → 2-col feature grid → role badges → App Store CTA; the phone is `col-span-5` + `justify-end`, hard against the container's right edge. What failed, so nobody re-tries it:
  - *Phone left, copy right* — broke the left margin the headline establishes, and capping the copy's width left a dead strip off the right edge.
  - *Headline in its own block above a phone row* — left a ~380px copy column facing a ~590px phone: vertically lopsided, with ~700px of dead centre.
  - *Phone centred in its column* — floats mid-row and leaves the container's right edge empty. `justify-end` is load-bearing.
  Folding everything into one tall left column makes both halves roughly equal height, so the gap between them reads as breathing room rather than a hole.
- **Source order matters more than `order` here.** The copy column must come first in the markup, not just visually via `order-first`. The headline lives inside it, so an `order` swap makes mobile lead with a phone and no context above it. That bug shipped briefly during this work — don't reintroduce it.
- **Crops are load-bearing.** The handoff shot is anchored `44% 38%` — high, trading the out-of-focus shoulder along the bottom for a screen that fills the frame. Centred, the phone shrinks to roughly half that size and the photo loses its point. The walk shot sits at `50% 42%` to hold both people through the tablet breakpoint.
- Images: `public/images/app-inspection-walk.jpg` and `app-signature-capture.jpg`, downscaled from ~10000px originals to 2400px @78 (~750 KB each) and committed, since the site references them.
- `next.config.ts` gained `images.qualities: [75, 82, 84, 100]` — Next 16 drops any `quality` prop not declared there, which is what the three console warnings on `mgs-crew.jpg` / `portal-dashboard.png` / `mgs-team.jpg` were. Add to that list before using a new quality value.
- ~~**Known gap:** the in-frame phone screenshot (`active-shift.png`)…~~ **Half-closed 2026-08-05.** `active-shift.png` is gone; the chapter now shows the inspection flow itself (see the capture section below). The *theme* half of the gap remains: every capture we have is the app's **light** theme, while the phone in the photographed handoff shot is in **dark**. A dark-theme capture of an *inspection* screen would close it — the app clearly supports it (`employee-home-dark.webp` is dark), we just don't have that specific screen. Note that `active-shift.png` is still on disk at `public/images/app-screenshots/` but is no longer referenced anywhere; safe to delete.

## App captures + `/app` — the real screens land (2026-08-05)

16 captures of the MGS Management App (11 screenshots, 5 screen recordings, all 1206×2622 from an iPhone 16 Pro) came in and are now on two surfaces.

- **Originals are NOT in the repo.** They live in Dropbox at `ROLE IMAGE:VIDEO/{admin,supervisor,employee} role image:video/`, named by the shot list (`B-01`, `C-02A`…). `scripts/build-app-captures.mjs` derives everything committed. Add a capture there and re-run it; do not hand-optimize files into `public/`. `CAPTURE_SOURCE=…` overrides the path, and a missing source is skipped with a warning rather than failing, so the not-yet-captured shots can be dropped in later without editing the script.
- **Stills → WebP q85** at native size, in `public/images/app-screenshots/`. Not the repo's usual JPEG q82-84: these are UI, and JPEG rings around small text. B-01 goes 527 KB → 77 KB; 11 stills total ~880 KB.
- **Clips → H.264 MP4** at 884×1920 in `public/videos/`, via macOS's built-in **`avconvert`** (no ffmpeg on this Mac, and none needed — it re-encodes *and* trims with `--start`/`--duration`). It strips privacy-sensitive source metadata by default; we deliberately do not pass `--disableMetadataFilter`. All five are fast-start (`moov` before `mdat`), so they stream rather than requiring a full download.
- **Poster frames: don't point `qlmanage` at a video.** It returns QuickLook's *representative* frame, chosen from somewhere mid-file — for C-01 that was the failed end-state, i.e. a poster giving away the score drop the clip exists to show. `buildPoster()` cuts a 0.2s stub at the target timestamp first and thumbnails *that*. Keep the two-step.
- **C-01 is trimmed to 14s→32.8s.** Its first ~15 seconds are navigation (dashboard, setup, three sections of passing items). The trim opens on an intact **80** so the drop to **78** is legible rather than assumed.
- **C-02A and C-02B are not two takes of one shot.** B is the geofence refusal ("You are 2642.4 km away…"), A is the schedule refusal ("Too early… wait 24 more minute(s)"). Two different enforcement mechanisms — both ship, as a pair.

**Homepage (`AppShowcase`)** gained three things: the phone in beat 2 is now `inspection-failed-item` (the stale `active-shift.png` is unreferenced); a **new refusal beat sits between the turn and the photographs**, carrying the `submit-blocked` clip; and the three closing facts finally have evidence under them — the signed summary stands under facts 1 and 2, the EN/ES pair under fact 3. Then a link to `/app` and the disclosure line.

Why the refusal beat goes *before* the photos: the turn claims this part is harder to stage, and a competitor **can** stage a photograph of someone holding a phone. What they can't stage is the app declining the work. Software claim → software answer → then widen to the people. Moving it after the photos undoes that.

**`/app` (`app-tour.tsx`)** is the complete tour — every capture, once each. Organised **by what the app does, not by role**, and that's deliberate: role sections were the obvious structure and the wrong one, because we have no client-role captures (B-03/C-03 weren't shot) and a role-partitioned page opens a visibly empty fourth bay. Grouping by the work and tagging each capture with its role keeps the four-role architecture legible without promising a screenshot we don't have.

- Shares `PhoneFrame` (`shared/phone-frame.tsx`) with AppShowcase — extracted from the inline bezel so the two surfaces can't drift. `shared/app-capture.tsx` owns still-vs-clip and loop-vs-click.
- Clips: `preload="none"` everywhere, IntersectionObserver plays only on entry, `prefers-reduced-motion: reduce` falls back to poster + controls. Nothing downloads until scrolled to.
- **The phone holds the container's outer edge** in `TourRow` (`justify-start` / `justify-end`), never centred in its column — the same imbalance AppShowcase took three revisions to fix.
- The hero's fanned trio needs `lg:scale-[0.82] lg:origin-right`: its natural width (three tucked 200px frames plus the bounding box the rotations add) is ~520px against a ~440px column, and unchecked it bleeds back over the paragraph.
- Verify layout with `--force-prefers-reduced-motion` in headless Chrome. Without it the reveal stagger is caught mid-flight and everything reads as dim or missing — that's a screenshot artifact, not a bug.

**Still missing from the shot list:** B-03 and C-03 (client portal — the app's Client role has no captures at all), B-04 (deficiency still; C-04 covers the ground), B-13 (admin schedule, 3440×1440 — would be the only landscape asset and the natural full-width beat between *The shift* and *The record*; needs the web build pointed at demo).

## The horizontal run — `app-sequence.tsx` (2026-08-06)

The homepage product beat is no longer a static phone beside a feature list. **The device is stationary and the claims travel sideways:** the section holds, and scrolling down carries five panels across it — the checklist → the failure → **the refusal (the C-05 clip, playing in the frame)** → the handoff → the shift. The standalone refusal beat and the B-06 evidence frame were removed, since the run covers both.

Turned sideways deliberately. Vertically the claims competed with the page's own scroll — a column moving the same direction as everything above and below it reads as "more page", not as a held moment. Across, the page stops, the argument runs, the page resumes.

- **No ScrollTrigger `pin`.** The hold is a tall spacer (`h-[420vh]`) with a `sticky top-0 h-screen` viewport inside it; GSAP only scrubs the track's `x`. GSAP's pin rewrites layout — wraps the element, hard-sets heights, needs refreshing whenever anything above it changes size, which here means every photograph that decodes late.
- **The device sits outside the track and never translates**; only its screen changes. Five panels each carrying their own device would read as five products. Verified: the frame's `x` is identical at every sampled scroll position, desktop and mobile.
- **`overflow-hidden` on the track window is fine** — it's a descendant of the sticky element, not an ancestor. Ancestor overflow is what breaks sticky (see the `overflow-x-clip` note on the section wrapper).
- **The sideways motion must not leak into page scroll.** Measured `document.scrollWidth === innerWidth` and zero overflowing elements at 1440 and 390.
- The tall spacer *is* the scroll budget. Shorten it and the run feels rushed; lengthen it and the page feels stuck.

Four things bit during the build. All four are cheap to reintroduce, so they're written down.

- **`overflow-hidden` on the section silently kills `position: sticky` in every descendant.** The section wrapper carried it; the device simply scrolled away and the whole premise looked broken. It's `overflow-x-clip` now — same horizontal containment, no scroll container. The two parallax frames keep their own `overflow-hidden`, so nothing escapes.
- **Derive the active claim from scroll position; do not accumulate it from enter/leave events.** The first version put a ScrollTrigger on each claim and switched on `onToggle`. During a fast scroll several toggle inside one frame and the last to fire wins regardless of where the viewport landed. Now a single trigger's `onUpdate` asks "which claim's centre is nearest the viewport centre" every frame. It cannot desynchronise.
- **`gsap.set()` does not stop a running tween.** Clearing the outgoing screens with `set(opacity:0)` looked right and failed scrolling *up*, because the previous screen's fade-in was still animating and overwrote the set on its next tick — measured `2:55 4:96`, two live layers. `gsap.killTweensOf(el)` first, then set.
- **Never let two of these screens be visible at once.** They're all white inspection UIs with near-identical furniture, so any blend is a double exposure — a 78 printed through an 80 — which reads as a rendering fault, not a transition. Exactly one layer is alive: outgoing cleared instantly, only the incoming tweened, rising from the phone's own white background. Verify by sampling opacities immediately after a fast scroll; anything other than one layer >2% is the bug back.

**`PhoneFrame` no longer draws a notch.** It used to paint a black pill across the top, which suited a flat mockup. Every capture is a real iPhone 16 Pro screenshot, so the Dynamic Island and the 9:41 status bar are already in the image — the drawn one stacked a second fake notch on the real one.

## Video encoding — ffmpeg is now required (2026-08-06)

`brew install ffmpeg`. The clip half of `build-app-captures.mjs` no longer uses `avconvert`; don't put it back.

The captures are screen recordings, which are variable-frame-rate, and avconvert carried that timing straight through — `ffmpeg -v error -i out.mp4 -f null -` reported *"Application provided invalid, non monotonically increasing dts"*, with `r_frame_rate=60/1` against 113 frames over 8.2s. `-r 30 -vsync cfr` rebuilds the timestamps. The script now runs that null-muxer decode on every clip and throws if it isn't silent, because container-level checks (H.264 High 4.0, yuv420p, `moov` before `mdat`, HTTP 206 on ranges) all passed on the malformed files and proved nothing.

Side benefit, and it's large: **13.4 MB → 3.5 MB** across five clips including posters. C-01 alone went 7,125 KB → 1,221 KB.

**Debugging caution — don't repeat this.** Chrome defers media loading in a hidden tab: `readyState` stays 0 and `networkState` stays 2 indefinitely, which looks exactly like a corrupt file. The browser-automation tab is *always* `visibilityState: "hidden"`, so **video playback cannot be verified through it** and any timeout measured there means nothing. Check `document.visibilityState` before concluding anything about media. Playback has to be confirmed by a human in a real window.

## Testing mobile — `--window-size` is a trap (2026-08-06)

**`chrome --headless --window-size=390,…` does not give you a 390px layout.** Headless clamps the layout viewport at roughly 500px and then simply *crops* the screenshot to the width you asked for. The result looks like catastrophic horizontal overflow — body copy sliced mid-word — on every page of the site, including ones nobody has touched in months. It is entirely an artifact.

The tell: capture `/terms` at 390 and at 500 and compare line breaks. They were **identical**, which is impossible if the layout had actually reflowed. Under real emulation the same page reports `scrollWidth: 390`, `overflowCount: 0` — no overflow anywhere.

Use CDP instead. Launch with `--remote-debugging-port`, connect with Node's global `WebSocket`, and call `Emulation.setDeviceMetricsOverride {width, height, deviceScaleFactor: 2, mobile: true}`. That changes the layout viewport for real, and `Runtime.evaluate` in the same session gives scripted scrolling plus measurement — which the extension can't do either, since `window.scrollTo` is inert there (wheel events work, programmatic scrolling doesn't).

### What the run needed for mobile

- **The device is sized per breakpoint.** At 196px the frame measured 401px — 47% of a 390×844 screen. The `sequence` size is 168px below `sm` (~41%), leaving room for the claim beneath it.
- Below `lg` the layout stacks: device on top, the track running underneath it. Above `lg` they sit side by side.

Verified at 1440×900 and 390×844: the device's x never moves, the track travels its full width, exactly one screen layer is live at every sample, and the lit screen index advances with progress.

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
- **Route loader** (`src/app/loading.tsx`) is the logo over a thin green sweep — **not a spinner**. It was a `border-4 ... rounded-none animate-spin` div, i.e. a rotating *square*. Every other loading state on the site is a lucide `Loader2` inside a button; a full-screen spinner competing with those looks like a different product. The rail is deliberately narrower than the mark — wider overhangs it and reads as a misalignment. Uses the existing `animate-shimmer` keyframe, so under `prefers-reduced-motion` it lands on its final frame and rests as a plain grey line; nothing depends on a tween running to be visible.
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

## Rollback — copy pass (2026-08-11)

Live before the copy pass: **`mgs-website-hk9beeygj`** (commit `e6a2830`, the
type-scale build). Two independent ways back, fastest first.

**1. Promote the previous deployment — seconds, no rebuild.** Restores exactly
the bytes that were serving before, without touching git:

```bash
npx vercel rollback https://mgs-website-hk9beeygj-maxiawsom-5752s-projects.vercel.app \
  --scope maxiawsom-5752s-projects
npx vercel rollback status --scope maxiawsom-5752s-projects   # confirm it landed
```

**2. Revert the commit — slower, keeps git and production in agreement.**

```bash
git revert --no-edit 0facf71      # the copy pass
git push origin master            # the Git integration redeploys on push
```

Use 1 to stop the bleeding, then 2 so `master` does not keep shipping copy that
was rolled back. Reverting alone leaves the bad deployment in the history as
the newest; promoting alone leaves `master` ahead of production.

Note the Git integration deploys on every push to `master`, so `git push`
followed by `npx vercel --prod` produces two production deployments of the same
commit. Harmless, but it is why the deployment list has pairs.

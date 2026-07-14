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

## Open follow-ups (from the "what would you change" review)
1. **Social proof** — testimonials are hidden (placeholder quotes); no client logos/case studies/capability-statement PDF. Needs real content from owner. Biggest conversion gap.
2. **Local service-area pages** (Katy / Sugar Land / Cypress …) for local SEO — not built.
3. **Hero video** autoplays 5 Supabase MP4s — heavy on mobile; consider poster + one Cloudflare-Stream clip.
4. **Axe/WCAG pass** not run site-wide (light-gray body text may fail AA contrast in places).
5. Substantiate the **99.8% QA** and **100+ facilities** claims, or soften.
6. Leadership bio + training-video set may need real specifics.

## Untracked local assets
~194 MB of loose images/exports under `public/images/` etc. are intentionally **left untracked** (unused by the build) to keep the repo lean.

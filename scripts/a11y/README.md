# Accessibility audit harness

Two scripts that check the site against WCAG 2.1 AA. They drive the **system
Chrome** through `puppeteer-core`, so nothing heavyweight is added to the app's
`package.json` — the deps live in a scratch folder you create on demand.

## Running

```bash
# 1. Build and serve the real production output (not `next dev`)
npx next build
npx next start -p 3111

# 2. In a scratch dir anywhere outside the repo:
npm init -y
npm install puppeteer-core@23 @axe-core/puppeteer axe-core

# 3. Point the scripts at the running server
BASE_URL=http://localhost:3111 node /path/to/scripts/a11y/audit.mjs
BASE_URL=http://localhost:3111 node /path/to/scripts/a11y/verify.mjs
```

`audit.mjs` honours a `PATHS` env var (comma-separated) to override the default
route list. Update `CHROME` at the top of each file if Chrome lives elsewhere.

## What each covers

**`audit.mjs`** — axe-core (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`,
`best-practice`) over every public route at desktop (1440) and mobile (390).
Writes `results.json` + `summary.json` and prints violations grouped by rule,
worst impact first.

**`verify.mjs`** — the things axe cannot reach on a freshly loaded page:

1. **Validation error states.** Submits each form empty, then re-scans. Errors
   only exist after a failed submit, so a plain page scan never sees them.
2. **`prefers-reduced-motion`.** Emulates the setting and asserts no text is
   stranded at `opacity: 0`.
3. **Keyboard.** Skip link is the first tab stop, `#main-content` exists, and
   the mega menu opens on Enter / closes on Escape.

## Two traps that produce false failures

Both of these bit us; the scripts already work around them.

- **Scroll in stages, never jump to the bottom.** `scrollTo(0, scrollHeight)`
  skips IntersectionObserver for everything passed over, so `whileInView`
  reveals never fire and mid-page content reads as stranded — in *normal*
  motion too. Always sanity-check a reduced-motion result against the
  normal-motion baseline before believing it.
- **Read ARIA state after React commits.** Checking `aria-expanded`
  synchronously after `.click()` returns the pre-render value and always looks
  like a failure. Drive the real interaction (`focus` + `keyboard.press`) and
  await a tick.

## Gotcha this codebase keeps re-learning

Verify colors against **`#F4F4F5`** (the darkest light section background), not
pure white. The off-white section backgrounds shave ~0.2 off every ratio —
enough that a white-only calculation ships values that still fail. See the
token block at the top of `src/app/globals.css`.

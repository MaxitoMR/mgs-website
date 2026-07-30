# MGS Website

Public marketing site. **Next.js** (App Router) + TypeScript + Tailwind.
Repo also carries backend/infra scaffolding (`backend/`, `infra/`,
`observability/`, `docker-compose.yml`, `pgbouncer.ini`) — the Next app is `src/`.

## Commands

```bash
npm run dev     # next dev
npm run build   # next build — the gate before pushing
npm run lint    # next lint
npm start       # next start (prod server)
```

There is no test runner. `npm run build` is what catches breakage.

## Key docs already in the repo

- `MGS-DESIGN-SPECIFICATION.md` — the design system this site is being aligned to.
  Read it before changing visual styling; recent work is a deliberate migration
  toward it, not ad-hoc restyling.
- `INFRASTRUCTURE.md` — infra/deployment notes.
- `SESSION-NOTES.md` — running notes from prior work sessions.

## Images

`public/images/` is **partially tracked on purpose**. Images referenced by source
are committed; a large set of unreferenced originals (~180 MB) is intentionally
left untracked to keep git history sane.

If you add an image the site references, commit it — otherwise a fresh clone
renders a broken page. If you're just parking source material, leave it untracked.

Before assuming an image is missing, check whether it's untracked locally rather
than absent from the design.

## Conventions

- Tailwind for styling; `tailwind-merge` for conditional class composition.
- GSAP (`@gsap/react`) for animation, `embla-carousel-react` for carousels.
- Forms use `react-hook-form`; data fetching uses `@tanstack/react-query`.
- Follow the surrounding file's patterns — the codebase is consistent.
- Run `npm run build` before committing; a type or import error only surfaces there.

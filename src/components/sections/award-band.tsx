import Link from "next/link";
import { Trophy } from "lucide-react";
import { AWARD } from "@/lib/constants";

/**
 * The Katy award, as a slim band immediately above the closing CTA.
 *
 * WHY IT MOVED. It used to sit inside the clearances section, between that
 * section's header and its card grid. Two things were wrong with that. It is a
 * reputation claim in a run of compliance claims — a different species of
 * argument from insurance, background checks and EPA/OSHA. And because it was
 * the only item on that screen a reader could verify independently, it had been
 * given a full-width strip with an accent bar, which made it the loudest
 * element in a section it did not belong to.
 *
 * WHY HERE. Third-party recognition is a closing argument, not an opening one:
 * it works best on someone who has already read what the company does and is
 * deciding whether to make contact. Directly above the closing CTA is where
 * that decision happens.
 *
 * NOT RESTYLED. Same `.mgs-card` surface, same accent bar, same Trophy mark,
 * same type rungs, same `t-measure` cap on the claim line, and the same
 * touch-target treatment on the link. The only changes are the ones the new
 * slot requires: it is its own `<section>` with the page's standard container
 * and horizontal padding, and it carries its own vertical rhythm now that it is
 * not inheriting the clearances section's spacing.
 *
 * The ground is `--color-paper`, the page default, so the band reads as a pause
 * between the dark app chapter above and the closing CTA below rather than as
 * another panel competing with either.
 *
 * No entry animation, deliberately. It used to carry `.tb-header` and
 * `opacity-0`, revealed by the clearances section's GSAP timeline. That trigger
 * does not exist here, and a class of `opacity-0` waiting on a tween that never
 * runs is an invisible band — the same failure mode documented in
 * `app-showcase.tsx`. The resting state is the authored DOM.
 */
export function AwardBand() {
  return (
    <section className="w-full bg-paper py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* The accent bar is an inline style, NOT `border-l-4`: .mgs-card sets
            a `border` shorthand in unlayered CSS, which beats Tailwind's
            @layer utilities and silently flattens the left border away. */}
        <div
          className="mgs-card flex flex-col gap-3 rounded-sm p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
          style={{ borderLeft: "4px solid var(--color-brand-green-deep)" }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center"
            style={{ background: "rgba(105, 175, 35, 0.1)", borderRadius: "0.5rem" }}
          >
            <Trophy className="h-5 w-5 text-brand-green-text" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-gray-900">
              {AWARD.headline}
            </h2>
            {/* `t-measure` because this sits in a `flex-1` cell: without it the
                line ran the full width of the card — 910px, which at 14px is
                130 characters, nearly twice the comfortable maximum. */}
            <p
              className="t-measure mt-1.5 text-sm text-gray-600"
              style={{ fontWeight: 300, lineHeight: 1.65 }}
            >
              {AWARD.claim} · {AWARD.attribution}
            </p>
          </div>
          {/* Block-level padded target on touch — it was a 20px-tall text run
              at the end of a paragraph, which is the hardest kind of link to
              hit accurately. Inline again at `lg:`. */}
          <Link
            href="/about"
            className="-mx-2 inline-flex min-h-11 shrink-0 items-center px-2 text-sm font-medium text-brand-green-text underline underline-offset-4 hover:text-brand-green-deep lg:mx-0 lg:min-h-0 lg:px-0"
          >
            See the award
          </Link>
        </div>
      </div>
    </section>
  );
}

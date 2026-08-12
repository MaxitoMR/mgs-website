import Link from "next/link";
import { Trophy } from "lucide-react";
import { AWARD } from "@/lib/constants";

/**
 * The Katy award, as a quiet centered credential immediately above the closing
 * CTA.
 *
 * WHY HERE. Third-party recognition is a closing argument, not an opening one:
 * it works best on someone who has already read what the company does and is
 * deciding whether to make contact. Directly above the closing CTA is where
 * that decision happens. (It used to sit inside the clearances section, where a
 * reputation claim sat among compliance claims — insurance, background checks,
 * EPA/OSHA — and, as the only independently verifiable item on that screen, was
 * also the loudest thing in a section it did not belong to.)
 *
 * WHY IT IS NO LONGER A CARD. It was a full-width `.mgs-card` strip: a
 * `max-w-7xl` row with the trophy and copy in a `flex-1` cell on the left and
 * "See the award" pinned to the right edge. Because the copy carried
 * `t-measure` — correctly, or it would have set a 130-character line — the text
 * stopped around half the card and the link sat roughly 600px away across an
 * empty white field, with the attribution breaking mid-date ("June / 2026") to
 * make it. A container whose contents cannot fill it reads as a layout error
 * however good the type inside is, and the fix is not a wider measure but a
 * container the size of its contents.
 *
 * Centering solves it structurally rather than cosmetically: with the copy set
 * centered inside a `max-w-2xl` column, the measure IS the container, so there
 * is no edge left over to look empty, and the link sits under the claim it
 * belongs to instead of across a gap from it. Dropping the card surface and the
 * accent bar also lets the band do its other job — reading as a pause on the
 * page's own paper between the dark app chapter above and the closing CTA
 * below, rather than as a third panel competing with both.
 *
 * THREE LINES, THREE JOBS, so they are three elements rather than one run:
 * the substance (`headline`), the exact position that makes it credible
 * (`claim`), and the issuer and basis a skeptic checks (`attribution`, set a
 * rung down). Previously `claim` and `attribution` were concatenated into a
 * single sentence with a middot, which is what produced the two-line ragged
 * block.
 *
 * No entry animation, deliberately. It used to carry `.tb-header` and
 * `opacity-0`, revealed by the clearances section's GSAP timeline. That trigger
 * does not exist here, and a class of `opacity-0` waiting on a tween that never
 * runs is an invisible band — the same failure mode documented in
 * `app-showcase.tsx`. The resting state is the authored DOM.
 */
export function AwardBand() {
  return (
    <section
      className="w-full bg-paper"
      style={{
        paddingTop: "clamp(3rem, 7vw, 5.5rem)",
        paddingBottom: "clamp(3rem, 7vw, 5.5rem)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div
            className="flex h-14 w-14 items-center justify-center"
            style={{ background: "rgba(105, 175, 35, 0.1)", borderRadius: "0.75rem" }}
          >
            <Trophy className="h-6 w-6 text-brand-green-text" aria-hidden="true" />
          </div>

          <h2 className="t-h3 mt-6 font-gothic text-gray-900">
            {AWARD.headline}
          </h2>

          <p className="t-body mt-3 text-gray-600">{AWARD.claim}</p>

          {/* The issuer, the date and the basis — the checkable part, set at
              caption weight so it supports the claim without repeating its
              emphasis. */}
          <p className="t-caption mt-1.5 text-gray-500">{AWARD.attribution}</p>

          {/* Padded block target: it was a 20px-tall text run at the end of a
              paragraph, which is the hardest kind of link to hit accurately. */}
          <Link
            href="/about"
            className="mt-6 inline-flex min-h-11 items-center px-2 text-sm font-medium text-brand-green-text underline underline-offset-4 transition-colors hover:text-brand-green-deep"
          >
            See the award
          </Link>
        </div>
      </div>
    </section>
  );
}

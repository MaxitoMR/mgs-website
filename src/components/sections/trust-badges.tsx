"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Shield, Microscope, Clock, Award, ShieldCheck, UserCheck, Trophy } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { AWARD } from "@/lib/constants";

/**
 * The page's single trust section.
 *
 * It used to be three. The hero stat bar, a "Why facilities standardize on us"
 * card grid, and this badge list all made the same four claims — compliant,
 * verified, experienced, available around the clock — in three formats within
 * one scroll. This section absorbed the card grid; the hero stat bar stays as
 * the numeric version and is not repeated here.
 *
 * What was dropped in the merge, and why:
 *   · "A Measured Track Record" — restated the hero's "100+ Facilities" stat.
 *   · "OSHA Compliant" and "EPA-Registered Products" — both are the substance
 *     of "Compliant by Design", which names them explicitly.
 *   · "24/7 Emergency Response" — duplicated "Response, Around the Clock".
 *
 * Six badges, two clean rows of three. The first three are what we do; the
 * last three are what we hold. Adding a seventh orphans a row.
 */
const certifications = [
  {
    icon: Shield,
    label: "Compliant by Design",
    description:
      "Every product carries EPA registration; every crew operates to OSHA standards. In regulated environments — surgical suites, laboratories, food-adjacent spaces — compliance is documented, not assumed.",
  },
  {
    icon: Microscope,
    label: "Verified, Not Assumed",
    description:
      "ATP bioluminescence testing confirms a surface is clean at the microbial level, not merely to the eye. A failed reading triggers re-cleaning before sign-off.",
  },
  {
    icon: Clock,
    label: "Response, Around the Clock",
    description:
      "A line staffed 24/7 for spill, flood, and biohazard events. Facility risk does not observe business hours, and neither does our response.",
  },
  {
    icon: Award,
    label: "ISSA Member",
    description:
      "Member of the ISSA, the worldwide cleaning-industry association that defines professional standards.",
  },
  {
    icon: ShieldCheck,
    label: "Fully Insured & Bonded",
    description:
      "General liability coverage and bonding on every engagement. If an incident occurs on site, you are covered.",
  },
  {
    icon: UserCheck,
    label: "Background-Checked Staff",
    description:
      "Every employee clears a criminal background check before their first shift. Without exception.",
  },
];

export function TrustBadges() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".tb-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );

      // Cards stagger
      gsap.fromTo(
        ".tb-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".tb-grid",
            start: "top 95%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "#f5f5f5",
        paddingTop: "clamp(2rem, 8vw, 8rem)",
        paddingBottom: "clamp(2rem, 8vw, 8rem)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Header — the positioning copy from the absorbed card grid, which
            said why any of this matters ("we assign a dedicated crew…"). The
            old heading here, "The standard every crew is held to", named the
            same idea with none of the reasoning, so the stronger one stayed. */}
        <div className="mb-8 grid grid-cols-1 gap-5 lg:mb-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="tb-header eyebrow mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green-text opacity-0">
              Why MGS
            </p>
            <h2
              className="tb-header font-gothic text-gray-900 opacity-0"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Why facilities{" "}
              <span className="text-brand-green-text">standardize on us.</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p
              className="tb-header text-base text-gray-600 opacity-0"
              style={{ fontWeight: 300, lineHeight: 1.7 }}
            >
              Most contractors staff by availability. We assign a dedicated crew
              to each site, accountable to the same documented protocol on every
              visit — so performance stays consistent, and consistency stays
              verifiable.
            </p>
          </div>
        </div>

        {/* Third-party recognition — deliberately OUTSIDE the grid below.
            Those six cards are all claims we make about ourselves; this is
            the one item a reader can verify independently, so it gets its
            own strip rather than becoming a seventh look-alike card (which
            would also orphan a row in the 3-across grid). Kept small: the
            audience here buys on compliance and references, not badges. */}
        {/* tb-header, not tb-card: this sits ABOVE the grid, and the card
            animation is triggered by .tb-grid entering the viewport — it
            would already be on screen by then. Both classes are covered by
            the reduced-motion and mobile opacity fallbacks in globals.css. */}
        {/* The accent bar is an inline style, NOT `border-l-4`: .mgs-card sets
            a `border` shorthand in unlayered CSS, which beats Tailwind's
            @layer utilities and silently flattens the left border away. */}
        <div
          className="tb-header mgs-card mb-5 flex flex-col gap-3 rounded-sm p-4 opacity-0 sm:mb-8 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
          style={{ borderLeft: "4px solid var(--color-brand-green-deep)" }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center"
            style={{ background: "rgba(105, 175, 35, 0.1)", borderRadius: "0.5rem" }}
          >
            <Trophy className="h-5 w-5 text-brand-green-text" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-gray-900 lg:text-[0.95rem] lg:leading-[1.6]">
              {AWARD.headline}
            </h3>
            <p
              className="mt-1.5 text-sm text-gray-600"
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

        {/* ── Grid on desktop, one swipeable track below sm ────────────────
            Six cards stacked measured 1,561px — nearly two screens for six
            claims that are peers, not a sequence. Narrowing them into two
            columns was the obvious fix and the wrong one: at 187px a column
            these descriptions run about twenty characters to the line, which
            is below the point where prose stops being readable.

            Side by side at 82vw the measure is right, the whole set costs one
            card's height, and the shape says what the content is — six
            equivalent things, none of which ranks above the others. Nothing is
            removed; the peek and the count say how many there are.

            Same CSS scroll-snap as the app beats. The `.tb-card` GSAP stagger
            still fires off `.tb-grid` entering the viewport, and globals.css
            already forces these to `opacity: 1` under 1024px, so the track
            cannot end up holding six invisible cards. */}
        <div
          className={[
            "tb-grid -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-1 scrollbar-hide",
            "sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0",
            "lg:grid-cols-3",
          ].join(" ")}
        >
          {certifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="tb-card mgs-card group flex w-[82vw] shrink-0 snap-center items-start gap-4 rounded-sm p-4 opacity-0 sm:w-auto sm:shrink sm:gap-5 sm:p-7"
              >
                {/* Icon container */}
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(105, 175, 35, 0.1)",
                    borderRadius: "0.5rem",
                  }}
                >
                  <Icon className="h-5 w-5 text-brand-green-text" aria-hidden="true" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 lg:text-[0.95rem] lg:leading-[1.6]">
                    {item.label}
                  </h3>
                  <p
                    className="mt-1.5 text-sm text-gray-600"
                    style={{ fontWeight: 300, lineHeight: 1.65 }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Behind the peek, the same hint the app beats carry. */}
        <p
          aria-hidden="true"
          className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-600 sm:hidden"
        >
          <span>Swipe</span>
          <span className="h-px w-6 bg-gray-300" />
          <span>{certifications.length} reasons</span>
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { Shield, Award, ShieldCheck, UserCheck } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { COMPANY } from "@/lib/constants";

/**
 * The page's clearances section.
 *
 * REFRAMED FROM "WHY MGS". It used to be headed "Why facilities standardize on
 * us", which is a portfolio/procurement argument, while the cards underneath
 * were baseline credentials — insurance, background checks, ISSA, EPA/OSHA.
 * The header promised a reason to choose MGS and the payload delivered the
 * things any vendor must hold to be considered at all. Now the header says
 * what the cards actually are, and the "why us" argument is left to the
 * sections that genuinely make it.
 *
 * Four cards, not six. Two were removed rather than reworded:
 *   · "Verified, Not Assumed" (ATP testing) — a method claim, and THE STANDARD
 *     and THE RECORD beats below demonstrate verification with real app
 *     screens rather than asserting it.
 *   · "Response, Around the Clock" — a service capability, not a clearance,
 *     and 24/7 is already a hero stat. Its strongest line survives as the
 *     one-line coda under the grid.
 *
 * The Katy award moved out of this section: it is a reputation claim, not a
 * compliance one, and as the only third-party-verifiable item here it was also
 * the loudest thing in it. It now sits in the footer's bottom bar.
 *
 * Four badges, two rows of two at `sm`, one row of four at `lg`. Adding a
 * fifth orphans a row.
 */
const certifications = [
  {
    icon: Shield,
    label: "Compliant by Design",
    description:
      "Every product is EPA-registered and every crew works to OSHA standards. In surgical suites, laboratories and food-adjacent spaces, compliance is documented rather than assumed.",
  },
  {
    icon: ShieldCheck,
    label: "Fully Insured & Bonded",
    description:
      "General liability coverage and bonding on every engagement. Certificates are available on request.",
  },
  {
    icon: UserCheck,
    label: "Background-Checked Staff",
    description:
      "Every employee clears a criminal background check before their first shift. No exceptions.",
  },
  {
    icon: Award,
    label: "ISSA Member",
    description:
      "Member of the ISSA, the association that sets professional standards for the industry.",
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
        {/* Header. Same two-column arrangement as before — head left, deck
            right, aligned to the baseline of the heading's last line.

            The deck no longer opens on "Most contractors staff by
            availability. We assign one crew per site…", which was the crew
            argument the OUR CREWS section directly above already makes in
            full. Two adjacent sections were making one point. */}
        <div className="mb-8 grid grid-cols-1 gap-5 lg:mb-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="tb-header eyebrow mb-4 text-xs uppercase tracking-[var(--ls-eyebrow)] text-brand-green-text opacity-0">
              Clearances
            </p>
            <h2
              className="tb-header t-h2 font-gothic text-gray-900 opacity-0"
            >
              Everything that has to be true{" "}
              <span className="text-brand-green-text">before we&rsquo;re in your building.</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p
              className="tb-header text-base text-gray-600 opacity-0"
              style={{ fontWeight: 300, lineHeight: 1.7 }}
            >
              Insurance, licensing, background checks and documented chemical and
              safety compliance. The part nobody asks about until something goes
              wrong.
            </p>
          </div>
        </div>

        {/* The Katy award strip used to sit here, between the header and the
            grid. It is a reputation claim in a compliance section, and being
            the only independently verifiable item among six self-made claims
            it was also the loudest thing on screen. It now sits as one line in
            the footer's bottom bar — see `layout/footer.tsx`. */}

        {/* ── Grid on desktop, one swipeable track below sm ────────────────
            Cards stacked measured 1,561px at six — nearly two screens for
            claims that are peers, not a sequence. Narrowing them into two
            columns was the obvious fix and the wrong one: at 187px a column
            these descriptions run about twenty characters to the line, which
            is below the point where prose stops being readable.

            Side by side at 82vw the measure is right, the whole set costs one
            card's height, and the shape says what the content is — equivalent
            things, none of which ranks above the others. Nothing is removed;
            the peek and the count say how many there are.

            THE `lg:` OVERRIDE IS GONE, so `sm:grid-cols-2` now carries all the
            way up and the set reads 2×2. This is forced by the cut from six
            cards to four, and both alternatives were measured rather than
            guessed:

              · `lg:grid-cols-3` (what was here) leaves one card alone on a
                second row — six divided by three evenly, four does not.
              · `lg:grid-cols-4` gives 230px columns, and the body copy then
                runs SIXTEEN characters to the line. That is past the failure
                this very comment was written about.

            At two columns the columns are ~560px and the body runs a proper
            measure. Same breakpoints, same gap scale, same card markup — the
            only thing removed is one column-count override that four cards
            cannot satisfy.

            Same CSS scroll-snap as the app beats. The `.tb-card` GSAP stagger
            still fires off `.tb-grid` entering the viewport, and globals.css
            already forces these to `opacity: 1` under 1024px, so the track
            cannot end up holding invisible cards. */}
        <div
          className={[
            "tb-grid -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-1 scrollbar-hide",
            "sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0",
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
                  <h3 className="text-base font-semibold text-gray-900">
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
          className="mt-4 flex items-center gap-2 t-eyebrow text-gray-600 sm:hidden"
        >
          <span>Swipe</span>
          <span className="h-px w-6 bg-gray-300" />
          <span>{certifications.length} reasons</span>
        </p>

        {/* "Response, Around the Clock" was a card here. It is a service
            capability rather than a clearance, and 24/7 is already one of the
            four hero stats — so as a card it was both off-topic and the third
            time the page said the same thing.

            What survives is its strongest sentence, as one full-width line
            under the grid: no card shell, no comma'd heading, and the phone
            number live so the line is actionable rather than merely a claim.
            The rule above it is the same hairline the cards use. */}
        <p className="mt-8 border-t border-rgray-4 pt-5 text-base text-gray-600 sm:mt-10 sm:pt-6">
          <span className="font-semibold text-gray-900">
            Facility risk keeps no business hours.
          </span>{" "}
          <a
            href={`tel:${COMPANY.phone.primary}`}
            className="-mx-2 -my-3 inline-flex min-h-11 items-center px-2 py-3 font-medium text-brand-green-text underline underline-offset-4 hover:text-brand-green-deep lg:mx-0 lg:my-0 lg:min-h-0 lg:px-0 lg:py-0"
          >
            {COMPANY.phone.display}
          </a>
        </p>
      </div>
    </section>
  );
}

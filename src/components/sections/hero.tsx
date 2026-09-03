"use client";

import Image from "next/image";

/**
 * Stats moved up from the old standalone bar into the hero.
 *
 * NUMBER AND LABEL ONLY. Each of these carried a third line — "across
 * commercial, medical & industrial portfolios", "measured across recurring
 * site audits", "serving greater Houston since 2006", "spill, flood &
 * biohazard events" — and dropping them is what un-cluttered this hero.
 *
 * They were a seventh tier of type in a single viewport, set at the smallest
 * size on the page, over a photograph, wrapping to two lines each: eight
 * rendered lines in the worst position on the site for reading small text. And
 * they were restatement — the lede names the sectors and the city, so the
 * first and third captions repeated it almost word for word.
 *
 * A statistic that needs a footnote is not doing its job; the number and what
 * it counts is the whole point. Add a fifth stat before you add a third line
 * to these.
 */
const heroStats = [
  { value: "100+", label: "Facilities Maintained" },
  { value: "99.8%", label: "QA Inspection Score" },
  { value: "20", label: "Years In Operation" },
  { value: "24/7", label: "Emergency Response" },
];

export function HeroSection() {
  /**
   * NO ENTRY ANIMATION. This whole block is above the fold — it IS the first
   * painted frame — so there is nothing for an entry to introduce.
   *
   * What was here: every element carried `opacity-0` in its className and was
   * revealed by a `gsap.fromTo()` timeline on mount. Two problems, one of them
   * severe. The severe one is that a class of `opacity-0` waiting on a tween
   * that never runs is a permanently blank section: until hydration completed,
   * the first thing anyone saw of this site was a photograph with nothing on
   * it, and any hydration failure left it that way for good. The other is that
   * even when it all worked, the last line of the headline did not arrive
   * until 1.3s and the subtitle was still at zero at 150ms — a measurable
   * delay on the only copy that has to be read before anything else.
   *
   * Rewriting it as `gsap.from()` would have fixed the first problem and not
   * the second, so the timeline is gone rather than repaired. Reveals still
   * run everywhere below the fold, where an element genuinely does arrive.
   */

  return (
    <section
      className="relative flex w-full items-center overflow-hidden min-h-[max(24rem,64vh)] lg:min-h-[clamp(24rem,70vh,48rem)]"
    >
      {/* Real crew, real medical corridor. `priority` because this is the
          LCP element — without it Next lazy-loads and the hero flashes empty.
          object-position sits at 35% because phones only see ~34% of the
          width: the worker is at 30-47% of the frame and the floor machine at
          5-30%, so anything further right crops the machine out entirely. */}
      <Image
        src="/images/hero-medical-floor-care.jpg"
        alt="An MGS technician running a floor machine in a medical facility corridor"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: '35% center' }}
      />

      {/* Hero film — one shot from the 2026-08-07 cut: a tech wiping down a
          surgical light in an OR.

          LAYERED OVER THE STILL, NOT REPLACING IT. The photo underneath stays
          the LCP element and the fallback for everything a video has no answer
          to: autoplay refused under iOS Low Power Mode, decode unsupported, or
          the file still in flight. That is also why there is no `poster` — a
          poster would be a second image download to cover a frame the still
          already covers.

          `muted` + `playsInline` are what make mobile autoplay legal at all;
          drop either and phones sit on a blank element. `preload="metadata"`
          is deliberate — see the weight note below.

          ONE SHOT, NOT THE FULL CUT. The five-shot version of this shipped on
          2026-08-08 and came out the same hour: 30s encoded to 25.7 MB, pulled
          by every visitor before they had decided to stay. The fix is length,
          not quality — this is the same CRF 19 / 2560x1440 encode, and 5.96s
          of it is 4.1 MB. The hero renders at most 1722x648 CSS px, so a 2x
          panel wants 3444 px and the 4K master's extra detail lands below the
          visible difference; 1440p is already the honest ceiling here.

          objectPosition is 45%, NOT the 35% the still uses. A portrait phone
          shows about 40% of a 16:9 frame, and the camera dollies right across
          these six seconds. At 35% the opening frame loses the surgical light
          off the top-right corner — and the light is the entire reason this
          reads as an operating room rather than as a person in blue. 45% is
          the only value that holds both the tech and the light at both ends of
          the move. The still keeps 35% because it is a different photograph
          with a different subject position; the two values are unrelated.

          It hard-cuts on repeat. The camera never stops moving in this take,
          so there is no matching head and tail to dissolve between — a 0.6s
          crossfade was tried and put two ghosted copies of the tech on screen,
          which reads as a rendering fault rather than as film. A ping-pong
          encode loops seamlessly and is the alternative, at 11.84s and 8.1 MB.

          BOTH SCRIMS BELOW ARE INHERITED UNCHANGED, and they are now generous
          rather than marginal. Measured over the phone crop in the band the
          body copy occupies, this OR is darker than the photograph it sits on
          — mean luma 67 against 116, peak 144 against 255, the still's peak
          being the blown-out lit floor the mobile scrim was built to survive.
          Under the same 0.72 floor the lead copy reads about 11.7:1 here where
          the still gave 7:1. Re-measure before swapping in a brighter shot;
          shot 4 (the glass case) is the bright one and would not inherit. */}
      <video
        className="absolute inset-0 z-[10] h-full w-full object-cover motion-reduce:hidden"
        style={{ objectPosition: '45% center' }}
        src="/videos/hero-mgs-or.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Two scrims doing different jobs. The horizontal one buys legibility
          for the headline, which sits left — so it is heavy at the left edge
          and clears by the right, leaving the worker and the corridor visible
          rather than flattening the whole photo. The vertical one only darkens
          the top and bottom edges, for the nav above and the CTAs below.

          DESKTOP ONLY, because the premise it is built on is a desktop premise.
          The falloff assumes the text occupies the left ~55% of the frame and
          the photograph gets the rest. On a phone the copy spans the full
          width, so the subtitle's second half — "verified against a documented
          QA protocol" — was running across the 0.18 and 0.10 stops, over a
          lit floor and light trousers. Measured against the brightest pixels
          actually behind that run rather than the frame's average, it was
          about 2.4:1. */}
      <div
        className="absolute inset-0 z-[21] hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.72) 28%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.18) 78%, rgba(0,0,0,0.10) 100%),' +
            'linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.42) 100%)',
        }}
      />

      {/* Mobile scrim. Near-flat rather than a falloff: with the text running
          edge to edge there is no "text side" to weight toward, so the job is
          a uniform floor under the whole column. 0.72 at its lightest puts the
          body copy above 7:1 against the brightest pixel it crosses, and the
          photograph still reads through it — it is a scrim, not a fill. */}
      <div
        className="absolute inset-0 z-[21] lg:hidden"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.80) 45%, rgba(0,0,0,0.72) 100%),' +
            'linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.40) 100%)',
        }}
      />

      <div className="relative z-50 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-14">
        <div className="max-w-5xl">
          <p className="eyebrow text-brand-lime mb-4 sm:mb-5">
            Est. 2006
          </p>

          {/* `t-display` is the top rung and this is its only use on the site:
              the hero is the one thing allowed to be the largest text. */}
          <h1 className="t-display font-gothic text-[#FBFBFE] hero-text-shadow">
            <span className="hero-line inline-block">Janitorial services,</span>
            <br />
            <span className="hero-line inline-block text-brand-green-deep">engineered to</span>
            <br />
            <span className="hero-line inline-block">a measurable standard.</span>
          </h1>

          {/* One sentence, the qualifying one: who this is for, where, and how
              long. A visitor's first question is whether MGS serves their kind
              of building in their city.

              The sentence that used to follow — "Every visit is scored against a
              documented QA protocol, and the crew that did the work signs it" —
              is the stronger line, and that is why it is not spent here. It is
              the whole argument of the app chapter further down, which shows the
              scoring and the signature rather than asserting them. Making the
              claim up here means the reader meets it twice and gets the proof
              second. The headline already promises "a measurable standard". */}
          <p className="t-lead text-gray-200 mt-4 mb-6 max-w-xl sm:mt-5 sm:mb-8">
            Commercial, medical and industrial facilities across greater Houston,
            since 2006.
          </p>

          {/* Stats — pulled up from the old standalone bar. Floating CTAs cover
              the call-to-action, so the hero closes on proof instead.

              A 4-column grid from `sm`, not `flex-wrap`. Wrapping sized each
              stat to its own label, so the row broke wherever the widest one
              happened to land — at ~1050px that put three across and dropped
              "24/7" onto a second row by itself, which reads as an afterthought
              rather than the fourth of four. Four equal columns can only ever
              be 2×2 or 1×4. */}
          <div
            className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/15 pt-5 sm:grid-cols-4 sm:gap-y-5 sm:gap-x-8 sm:pt-6 lg:gap-x-12"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="hero-stat">
                <div className="t-stat font-gothic text-brand-lime">
                  {s.value}
                </div>
                {/* The sub-caption that used to sit here was already
                    `hidden … sm:block` — hidden on phones, in its author's
                    words, "to keep the hero uncluttered". The judgement was
                    right; it just never got applied to the screen size where
                    the caption was longest and there were four of them side by
                    side. Now it holds everywhere. */}
                <div className="mt-2 text-sm font-semibold text-white">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

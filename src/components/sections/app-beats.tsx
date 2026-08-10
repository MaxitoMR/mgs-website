import Image from "next/image";
import {
  ClipboardCheck,
  ShieldAlert,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import { PhoneFrame } from "@/components/shared/phone-frame";

/**
 * The app chapter's product argument, told as static overlapping compositions.
 *
 * WHAT THIS REPLACES. These claims used to be a pinned horizontal run:
 * a 420svh spacer, a sticky viewport, a scrubbed track, progress ticks and a
 * playback-filled indicator. It read as cluttered because it was — five claims
 * competing inside one viewport-height box, each one a third readable at any
 * moment, with the device shrunk to 272px so the screen it was arguing about
 * could not actually be seen.
 *
 * NO SCRIPT. This file ships no JavaScript of its own. There is no pin, no
 * scrub, no snap, no ticker and no observer, so there is nothing to desync,
 * nothing to fight a finger's momentum, and nothing that goes blank when a
 * timeline fails to advance. Reveals come from the `data-reveal` attribute that
 * app-showcase.tsx already animates with `gsap.from()`, so the resting state is
 * the authored DOM — if the animation never runs, the section still reads.
 *
 * THE COMPOSITION. One capture, one panel, and the panel breaks the capture's
 * edge. That overlap is the whole idea: it is what makes a beat read as a
 * composed thing rather than an image with a caption under it. The side
 * alternates so the eye has somewhere to go across the three; nothing else
 * changes between beats, because the repetition is what makes it calm.
 *
 * THE DEVICE IS WHOLE. It went through both other states first: no frame at all
 * (which made the captures read as flat rectangles) and a frame cropped by its
 * container (which, once the device was sized down, shaved a sliver off the
 * bottom bezel and looked like a bug rather than a crop). Shown entire it is a
 * considered object, the 17 Pro geometry is actually visible, and the full
 * screen — bottom bar included — is in frame.
 *
 * ONE CALLOUT PER BEAT. Without it the captures are just rectangles, and the
 * reader has to hunt the screen for whatever the headline is claiming. The chip
 * names the single fact that proves the beat and sets it against the field, so
 * the composition points instead of merely showing. It is `aria-hidden` — every
 * one of these facts is already in the capture's alt text and the body copy, so
 * announcing it a third time would only pad the screen reader.
 */

type Beat = {
  src: string;
  poster?: string;
  alt: string;
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
  /**
   * The one fact on the screen that proves the claim, lifted out onto a chip
   * that breaks the device's edge. Every one of these is literally legible in
   * its capture — the chip points, it does not add. If a beat's evidence isn't
   * visible in its own screenshot, the screenshot is wrong, not the chip.
   */
  callout: { icon: LucideIcon; text: string };
};

/**
 * Three blocks, not five. The chapter used to run checklist → failure →
 * refusal → handoff → shift, and by the third of them the reader had been told
 * three separate times that the app verifies things. Failure and refusal are
 * one idea — a problem has to be specific, and it does not get filed without
 * the proof — so they are one block with the clip that shows it. Handoff and
 * shift are also one idea: what the app leaves behind afterwards. The copy is
 * the original copy, merged and trimmed where two blocks said the same thing;
 * the word "verified" now appears in none of the three bodies, where it used to
 * carry two of the five.
 *
 * The two captures this drops — the failed item and the shift timeline — are
 * still shown in full on /app, so nothing is orphaned.
 */
const BEATS: Beat[] = [
  {
    src: "/images/app-screenshots/inspection-medical-sections.webp",
    alt: "An inspection at Greenfield Medical Center with section tabs reading Reception / Waiting, Exam Rooms and Lab / Specimen",
    eyebrow: "The checklist",
    callout: { icon: ClipboardCheck, text: "Section 1 of 6 \u00b7 Score 80" },
    title: "It knows what kind of building",
    accent: "it's standing in.",
    body: "Sections are built per facility type. A medical site is walked as Reception, Exam Rooms and Lab / Specimen \u2014 not a generic list of areas \u2014 so the crew is measured against the standard that space actually carries.",
  },
  {
    src: "/videos/submit-blocked.mp4",
    poster: "/videos/submit-blocked-poster.webp",
    alt: "A supervisor tries to submit an inspection with a failed item that has no photo. The app blocks it and shows \u201cPhotos required \u2014 1 failed item(s) need at least one photo\u201d.",
    eyebrow: "The standard",
    callout: { icon: ShieldAlert, text: "Submit refused \u00b7 1 photo missing" },
    title: "A problem has to be specific,",
    accent: "and photographed.",
    body: "Marking an item down opens a required note and a camera, and the site score moves as you do it. If a failed item has no photograph the submit is refused outright \u2014 not a warning that can be dismissed when the shift is running late. A standard that bends under time pressure isn't one.",
  },
  {
    src: "/images/app-screenshots/inspection-summary-signed.webp",
    alt: "A completed inspection scoring 78 with a timeline showing it started at 5:28 PM and was submitted at 5:29 PM, and a handwritten signature under Employee Acknowledgment",
    eyebrow: "The record",
    callout: { icon: PenLine, text: "Submitted 5:29 PM" },
    title: "What's left is a record",
    accent: "nobody has to take on trust.",
    body: "The supervisor hands the phone over at the end of the walk. The crew member reads the result and signs, and the acknowledgment is timestamped before the record is filed. Attendance is held to the same standard \u2014 clock-in is checked against the site's coordinates and refused outside them. Between the two, the file answers who was on site and what they saw.",
  },
];

const isClip = (b: Beat) => Boolean(b.poster);

export function AppBeats() {
  return (
    <div className="relative">
      {/* ── One swipeable track below lg, the stacked compositions above ─────
          Three full-bleed beats stacked vertically measured about five phone
          screens on their own, inside a chapter that ran to eight and a half.
          The compositions are right on a wide screen and wrong on a narrow one:
          a capture with a panel breaking its edge is a shape that needs width
          to read, and without it the reader gets three tall boxes in a row.

          Laid side by side they cost one screen instead of five, and the
          gesture matches what the content is — three parallel claims, not a
          sequence you have to descend through. The 86vw card leaves 14% of the
          next one showing, which is the affordance that says so; a hidden
          scrollbar with nothing peeking is what made the category chips
          undiscoverable higher up this same page.

          Still no JavaScript. CSS scroll-snap does the whole thing, so this
          works before hydration, survives a failed one, and needs no library —
          which is the property the note above is protecting. */}
      <div
        className={[
          "-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1 scrollbar-hide",
          "sm:-mx-10 sm:px-10",
          "lg:mx-0 lg:block lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0",
        ].join(" ")}
      >
      {BEATS.map((beat, i) => {
        // The capture takes the left half on even beats, the right on odd. Both
        // children sit in row 1 of the same grid, so they occupy the same band
        // and the columns they share are the overlap.
        const captureRight = i % 2 === 1;

        return (
          <article
            key={beat.title}
            data-reveal
            className={[
              "relative w-[86vw] shrink-0 snap-center sm:w-[70vw]",
              "lg:w-auto lg:shrink lg:snap-align-none",
              // The hairline is the section break. It belongs between beats in
              // the stacked layout; side by side, the gap already separates
              // them and a rule would read as a border on a card.
              i > 0 ? "lg:border-t lg:border-white/10 lg:pt-32" : "",
              i > 0 ? "lg:mt-32" : "",
            ].join(" ")}
          >
            <div className="lg:grid lg:grid-cols-12 lg:items-center">
              {/* ── The capture ──────────────────────────────────────────────
                  The device, whole. This cell does not clip, so the callout can
                  break the device's edge without being cut off. */}
              <div
                className={[
                  "relative",
                  // ONE source of truth for the device's width. PhoneFrame's
                  // `beat` size reads it, and the callout below positions itself
                  // off it — so resizing the device cannot leave the chip
                  // anchored to where the device used to be.
                  //
                  // 42% on phones, down from 76% in two passes. At 76% of a
                  // 430pt viewport the device was ~327pt wide — close enough to
                  // the real thing
                  // that a phone rendered inside a phone stopped reading as an
                  // illustration and started reading as a glitch. At 42% it is
                  // unambiguously an illustration: 181px, with dark field on
                  // both sides, and the next beat reachable in the same
                  // viewport. Everything else on this block
                  // steps down with it (type, padding, chip) so the beat scales
                  // as one thing rather than a shrunk device beside full-size
                  // copy. `lg:` is unchanged — desktop is untouched.
                  //
                  // 40% of the 86vw card rather than 42% of the viewport: the
                  // device is now inside a card instead of bleeding to both
                  // edges, so it measures against the card. The full-bleed
                  // negative margins went with it — a card that bleeds past
                  // its own snap boundary is a card that scrolls wrong.
                  "[--phone-w:40%] sm:[--phone-w:44%] lg:[--phone-w:54%]",
                  "lg:row-start-1",
                  captureRight
                    ? "lg:col-start-6 lg:col-end-13"
                    : "lg:col-start-1 lg:col-end-8",
                ].join(" ")}
              >
                {/* No crop box. At this size the device very nearly fits a 4:5
                    frame, and "very nearly" reads as an accident — a sliver of
                    the bottom bezel shaved off looks like a bug, not a
                    composition. Shown whole it is a considered object, the
                    hardware geometry is actually visible, and the whole screen
                    including the bottom bar is in frame. The overlap is still
                    there: the panel takes one edge, the callout the other. */}
                <div className="relative">
                  <PhoneFrame size="beat">
                    {isClip(beat) ? (
                      <video
                        src={beat.src}
                        poster={beat.poster}
                        aria-label={beat.alt}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <Image
                        src={beat.src}
                        alt={beat.alt}
                        fill
                        sizes="(max-width: 640px) 76vw, (max-width: 1024px) 60vw, 30vw"
                        className="object-cover object-top"
                      />
                    )}
                  </PhoneFrame>
                </div>

                {/* ── The callout ──────────────────────────────────────────
                    One fact, lifted off the screen and set against the field so
                    the eye is told where to look. It sits on the capture's
                    OUTER side — away from the panel — so the two things that
                    break the device's edge do it from opposite directions
                    instead of crowding the same corner.

                    Lime, because it has to stay legible against both the white
                    phone screen it half-covers and the near-black field it
                    half-sits on; an off-white chip would vanish into the screen
                    and a dark one into the field. */}
                <div
                  aria-hidden="true"
                  className={[
                    // Vertically over the status-bar band. Everything lower on
                    // these screens is evidence — the site name, the score, the
                    // failed row — and a chip that covers the thing it is
                    // pointing at is worse than no chip. The clock and the
                    // battery are the only pixels here nobody needs.
                    "absolute top-[4%] z-20 flex items-center gap-2.5",
                    "bg-brand-lime px-3 py-2 text-[#111111] sm:px-5 sm:py-3",
                    // The device is centred, so its edges sit at
                    // 50% ± --phone-w/2. Anchoring the chip there puts most of
                    // it out on the dark field and laps only ~56px onto the
                    // device — its bezel plus the app's own side padding, not
                    // content. Derived from the variable rather than a literal,
                    // so it follows the device at every breakpoint. On phones
                    // there is no field to sit in, so it hugs the edge instead.
                    captureRight
                      ? "right-2 sm:right-4 lg:left-[calc(50%+var(--phone-w)/2-56px)] lg:right-auto"
                      : "left-2 sm:left-4 lg:right-[calc(50%+var(--phone-w)/2-56px)] lg:left-auto",
                  ].join(" ")}
                >
                  <beat.callout.icon
                    className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4"
                    strokeWidth={2}
                  />
                  {/* 12px is the floor for a micro-label; 10.5 was below it. */}
                  <span className="whitespace-nowrap text-xs font-semibold leading-none sm:text-[13px]">
                    {beat.callout.text}
                  </span>
                </div>
              </div>

              {/* ── The panel ────────────────────────────────────────────────
                  Breaks the capture's edge. On phones it rides up over the
                  bottom of the image; on desktop it shares two grid columns
                  with it. Hard edges, no shadow — the overlap is what gives it
                  depth, so a shadow would only be saying it twice. */}
              <div
                className={[
                  "relative z-10 bg-[#F4F4F1] text-[#111111]",
                  // Inside a card the panel spans it rather than insetting from
                  // one side; the overlap that gives the composition its depth
                  // is the negative top margin, which survives.
                  "-mt-6 px-5 py-6 sm:-mt-8 sm:px-8 sm:py-8",
                  "lg:row-start-1 lg:mx-0 lg:mt-0 lg:px-12 lg:py-14",
                  // The panel and the capture are ADJACENT columns; the overlap
                  // is this negative margin, not a shared grid column. Letting
                  // the grid do it meant a ~100px bite out of the screenshot,
                  // which on a photograph would be free but here was covering
                  // the failed-item icon and the section label — the very
                  // things the beat is pointing at. 56px reads as an overlap
                  // and only clips the phone's own edge padding.
                  captureRight
                    ? "lg:col-start-1 lg:col-end-6 lg:-mr-14"
                    : "lg:col-start-8 lg:col-end-13 lg:-ml-14",
                ].join(" ")}
              >
                <p className="eyebrow mb-3 text-[#54760F] lg:mb-5">{beat.eyebrow}</p>
                <h3
                  className="font-gothic"
                  style={{
                    fontSize: "clamp(1.25rem, 3vw, 2.75rem)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {beat.title}{" "}
                  <span className="text-[#54760F]">{beat.accent}</span>
                </h3>
                <p
                  className="mt-4 max-w-xl text-[#3F3F3A] lg:mt-6"
                  style={{
                    fontSize: "clamp(0.9375rem, 1.15vw, 1.0625rem)",
                    fontWeight: 300,
                    lineHeight: 1.65,
                  }}
                >
                  {beat.body}
                </p>
              </div>
            </div>
          </article>
        );
      })}
      </div>

      {/* Second affordance, behind the peek. Static rather than a live
          position indicator: tracking the active card would mean state, state
          means a client component, and this file's whole value is that it
          ships none. The count is the useful half anyway — it says how much
          there is, which the peek alone does not. */}
      <p
        aria-hidden="true"
        className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/60 lg:hidden"
      >
        <span aria-hidden="true">Swipe</span>
        <span className="h-px w-6 bg-white/40" />
        <span>{BEATS.length} beats</span>
      </p>
    </div>
  );
}

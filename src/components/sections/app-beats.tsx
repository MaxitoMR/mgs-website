"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  ClipboardCheck,
  ShieldAlert,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
 * SCRIPT, NOW — AND WHAT THAT DID AND DID NOT COST. This file used to open
 * "NO SCRIPT. This file ships no JavaScript of its own", and below `lg` that is
 * no longer true: the single-device view holds an index, so this is a client
 * component.
 *
 * The bundle claim was already inaccurate when it was written. `app-showcase.tsx`
 * is `"use client"` and imports this module, so everything here has been inside
 * a client boundary and in the client bundle from the day it was added — the
 * `"use client"` directive changes nothing about what ships. What it changes is
 * that this component may now hold state.
 *
 * The property actually worth protecting was never bundle size, it was
 * RESILIENCE: the section must read correctly if hydration is slow, partial or
 * broken. That still holds. Index 0 is the initial state, all three beats are
 * authored into the server HTML, and the active one is selected by class — so
 * the pre-hydration paint is a complete, correct first beat. A failed hydration
 * costs the swipe and the dots. It cannot blank the section, and there is still
 * no pin, no scrub, no scroll ticker and no observer to desync.
 *
 * Reveals still come from the `data-reveal` attribute that app-showcase.tsx
 * animates with `gsap.from()`, so the resting state is the authored DOM — if
 * the animation never runs, the section still reads.
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
   * The same claim, cut to the phone.
   *
   * A SEPARATE FIELD, not a shorter `body`, and the reason is a hard
   * constraint rather than a preference: the desktop articles must render
   * byte-for-byte what they rendered before, so `body` cannot move. This is
   * the only string the mobile composition reads.
   *
   * It exists because the panel is sized by its longest beat and the device is
   * only 40% of the card — at full length the text block ran taller than the
   * phone it was captioning, so the evidence was the smaller half of its own
   * composition. Each of these keeps the load-bearing fact and drops the
   * elaboration, which the reader can get on /app.
   */
  bodyShort: string;
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
    body: "Sections are built per facility type. A medical site is walked as Reception, Exam Rooms and Lab / Specimen, so the crew is measured against the standard that space actually carries.",
    bodyShort: "Sections are built per facility type, so every space is measured against the standard it actually carries.",
  },
  {
    src: "/videos/submit-blocked.mp4",
    poster: "/videos/submit-blocked-poster.webp",
    alt: "A supervisor tries to submit an inspection with a failed item that has no photo. The app blocks it and shows \u201cPhotos required \u2014 1 failed item(s) need at least one photo\u201d.",
    eyebrow: "The standard",
    callout: { icon: ShieldAlert, text: "Submit refused \u00b7 1 photo missing" },
    title: "A problem has to be specific,",
    accent: "and photographed.",
    body: "Marking an item down opens a required note and a camera, and the site score moves as you do it. If a failed item has no photograph the submit is refused \u2014 not a warning you can dismiss when the shift is running late.",
    bodyShort: "Marking an item down opens a required note and a camera. With no photograph, the submit is refused.",
  },
  {
    src: "/images/app-screenshots/inspection-summary-signed.webp",
    alt: "A completed inspection scoring 78 with a timeline showing it started at 5:28 PM and was submitted at 5:29 PM, and a handwritten signature under Employee Acknowledgment",
    eyebrow: "The record",
    callout: { icon: PenLine, text: "Submitted 5:29 PM" },
    title: "What's left is a record",
    accent: "nobody has to take on trust.",
    body: "The crew member reads the result and signs, and the acknowledgment is timestamped before the record is filed. Clock-in is checked against the site's coordinates and refused outside them. Together they answer who was on site and what they saw.",
    bodyShort: "The crew member reads the result and signs, timestamped before filing. Clock-in is checked against the site's coordinates.",
  },
];

const isClip = (b: Beat) => Boolean(b.poster);

/** Cross-fade timing. ~300ms ease-out, matching the rest of the site; the
 *  incoming layer waits out the outgoing one so the two never overlap. */
const FADE = "duration-300 ease-out motion-reduce:transition-none";
const IN = "opacity-100 delay-150";
const OUT = "opacity-0 delay-0";

/**
 * The composition below `lg`: ONE phone, ONE badge, ONE panel, and an index.
 *
 * WHAT THIS REPLACES. The three beats used to sit in a `snap-x` rail, so a
 * swipe moved the whole composition — device, chip and panel slid off together
 * and the next one slid in. The device is the same device in all three; sliding
 * it out and back in says otherwise, and it meant the reader re-parsed a phone
 * mockup three times to read three captions about one product.
 *
 * Now the hardware is a fixed object and only its screen changes, which is what
 * the content actually is.
 *
 * THE FRAME NEVER RE-MOUNTS. `PhoneFrame` is rendered once, outside the map,
 * so the bezel, the buttons, the `container-type` element and the `--phone-w`
 * sizing are mounted a single time and never re-measured. All three screens are
 * mounted from the start, stacked absolutely inside the screen, and only their
 * opacity changes — so the first swap costs no decode and nothing pops in.
 *
 * NO HORIZONTAL MOVEMENT ANYWHERE. Screens get a 1.5% scale settle and nothing
 * else. A translate on the x-axis would reintroduce exactly the "the card is
 * moving" reading this change exists to remove.
 *
 * TEXT IS STACKED, NOT SWAPPED. Every beat's badge label and panel copy stays
 * in the DOM in a one-cell grid, so the panel reserves the height of the
 * tallest beat and the badge the width of the longest label — the section
 * cannot change height or the chip snap width while cycling. Inactive copy is
 * `aria-hidden`; the panel is a polite live region, so a screen reader is told
 * about the beat that just became visible and not about the two that did not.
 *
 * STILL READS WITHOUT HYDRATION. Index 0 is the initial state and every layer
 * is authored into the HTML, so the server-rendered output is a complete,
 * correct first beat. A failed hydration costs the gesture and the dots, not
 * the content — the same property the stacked layout had, kept deliberately.
 */
function BeatsMobile() {
  const [active, setActive] = useState(0);

  /** Clamped, not wrapping. The dots show position, and a filled last dot that
   *  jumps back to the first on one more swipe contradicts them.
   *
   *  FUNCTIONAL UPDATE, and it is not stylistic. Written as
   *  `setActive(clamp(active + delta))` this reads `active` from the render
   *  closure, so two steps dispatched before the next paint — a fast double
   *  arrow-press, or a swipe landing in the same frame as a dot tap — both
   *  compute from the same stale index and collapse into one move. Caught by
   *  pressing ArrowRight twice: the index went 0 → 1 instead of 0 → 2. */
  const step = useCallback(
    (delta: number) =>
      setActive((a) => Math.min(BEATS.length - 1, Math.max(0, a + delta))),
    [],
  );

  /* Axis-locked pointer gesture.
     `touch-action: pan-y` on the container is what keeps the page scrolling
     normally: the browser keeps ownership of vertical panning and never sends
     it here, while horizontal movement is ours and scrolls nothing, because
     there is no scroll container left to scroll. The axis is decided once per
     gesture, after 10px of travel, and a gesture that starts vertical can
     never later steal the page's scroll. */
  const drag = useRef<{ x: number; y: number; axis: "x" | "y" | null; id: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, axis: null, id: e.pointerId };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId || d.axis) return;
    const dx = Math.abs(e.clientX - d.x);
    const dy = Math.abs(e.clientY - d.y);
    if (dx < 10 && dy < 10) return;
    d.axis = dx > dy ? "x" : "y";
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId || d.axis !== "x") return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) < 40) return; // a tap or a twitch, not a swipe
    step(dx < 0 ? 1 : -1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    step(e.key === "ArrowRight" ? 1 : -1);
  };

  return (
    <div className="lg:hidden" data-reveal>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="What the app does, in three beats"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { drag.current = null; }}
        className="relative touch-pan-y rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-lime"
      >
        {/* The device. Same `--phone-w` ladder as the stacked layout, minus the
            `lg:` rung this tree never reaches. */}
        <div className="relative [--phone-w:40%] sm:[--phone-w:44%]">
          <div className="relative">
            <PhoneFrame size="beat">
              {BEATS.map((beat, i) => (
                <div
                  key={beat.title}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform]",
                    FADE,
                    i === active ? `${IN} scale-100` : `${OUT} scale-[1.015]`,
                  )}
                >
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
                      sizes="(max-width: 640px) 76vw, 60vw"
                      className="object-cover object-top"
                    />
                  )}
                </div>
              ))}
            </PhoneFrame>
          </div>

          {/* The chip keeps its box, its lime and its position. Only the mark
              and the label inside it change, and both are grid-stacked so the
              box is the width of the longest label at every beat — it cannot
              snap between widths because it never changes width. */}
          <div
            aria-hidden="true"
            className="absolute left-2 top-[4%] z-20 flex items-center gap-2.5 bg-brand-lime px-3 py-2 text-[#111111] sm:left-4 sm:px-5 sm:py-3"
          >
            <span className="grid h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4">
              {BEATS.map((beat, i) => {
                const Icon = beat.callout.icon;
                return (
                  <Icon
                    key={beat.title}
                    strokeWidth={2}
                    className={cn(
                      "col-start-1 row-start-1 h-full w-full transition-opacity",
                      FADE,
                      i === active ? IN : OUT,
                    )}
                  />
                );
              })}
            </span>
            <span className="grid">
              {BEATS.map((beat, i) => (
                <span
                  key={beat.title}
                  className={cn(
                    "col-start-1 row-start-1 whitespace-nowrap text-xs font-semibold leading-none transition-opacity",
                    FADE,
                    i === active ? IN : OUT,
                  )}
                >
                  {beat.callout.text}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* The panel. Same surface, same overlap, same padding as the stacked
            layout; a one-cell grid so all three copies share the cell and the
            box is as tall as the tallest of them. */}
        <div
          aria-live="polite"
          className="relative z-10 -mt-6 grid bg-[#F4F4F1] px-5 py-6 text-[#111111] sm:-mt-8 sm:px-8 sm:py-8"
        >
          {BEATS.map((beat, i) => (
            <div
              key={beat.title}
              aria-hidden={i !== active}
              className={cn(
                "col-start-1 row-start-1 transition-opacity",
                FADE,
                i === active ? IN : `${OUT} pointer-events-none`,
              )}
            >
              <p className="eyebrow mb-3 text-[#54760F]">{beat.eyebrow}</p>
              <h3 className="t-h2 font-gothic">
                {beat.title}{" "}
                <span className="text-[#54760F]">{beat.accent}</span>
              </h3>
              <p className="t-body mt-3 max-w-xl text-[#3F3F3A]">
                {beat.bodyShort}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* The "SWIPE — 3 BEATS" line, now that there is state to report. It says
          the same two things it always did — that there is more, and how much —
          and adds the one it could not: which of them you are on. Each dot is a
          44px target with a 6px mark inside it. */}
      <div className="mt-3 flex items-center">
        {BEATS.map((beat, i) => (
          <button
            key={beat.title}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Beat ${i + 1} of ${BEATS.length}: ${beat.eyebrow}`}
            aria-current={i === active ? "true" : undefined}
            className="-mx-1 flex h-11 w-11 items-center justify-center"
          >
            <span
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-out motion-reduce:transition-none",
                i === active ? "w-6 bg-brand-lime" : "w-1.5 bg-white/30",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function AppBeats() {
  return (
    <div className="relative">
      <BeatsMobile />
      {/* ── The stacked compositions, `lg` and up ────────────────────────────
          UNCHANGED BELOW THIS LINE. Every article, and every class on it, is
          exactly what it was — including the mobile-only ones
          (`w-[86vw] shrink-0 snap-center sm:w-[70vw]`) that this tree no longer
          reaches. They are inert at `lg`, where `lg:w-auto lg:shrink
          lg:snap-align-none` overrides all three, and they are kept rather than
          tidied so the desktop subtree is character-for-character what it was.

          The wrapper is the one thing that moved. It used to be the swipe rail
          itself — `flex snap-x overflow-x-auto` below `lg`, turned back into a
          plain block by `lg:block lg:gap-0 lg:overflow-visible lg:px-0
          lg:pb-0`. The rail is gone, so the wrapper is now only a gate, and at
          `lg` a bare `block` computes to what that string computed to: display
          block, no margin, no padding, no gap. Verified by comparing computed
          styles, not by reading it.

          What it replaces below `lg` is `BeatsMobile` above: the same three
          beats, one device. */}
      <div className="hidden lg:block">
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
                  <span className="whitespace-nowrap text-xs font-semibold leading-none">
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
                <h3 className="t-h2 font-gothic">
                  {beat.title}{" "}
                  <span className="text-[#54760F]">{beat.accent}</span>
                </h3>
                <p className="t-body mt-4 max-w-xl text-[#3F3F3A] lg:mt-6">
                  {beat.body}
                </p>
              </div>
            </div>
          </article>
        );
      })}
      </div>

    </div>
  );
}

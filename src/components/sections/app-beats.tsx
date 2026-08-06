import Image from "next/image";

/**
 * The app chapter's product argument, told as static overlapping compositions.
 *
 * WHAT THIS REPLACES. The same five claims used to be a pinned horizontal run:
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
 * alternates so the eye has somewhere to go across five of them; nothing else
 * changes between beats, because the repetition is what makes it calm.
 *
 * NO DEVICE FRAME. The captures used to sit in a phone bezel. Rendering a phone
 * inside a phone is absurd at 390px, and the bezel was eating the width that
 * made the screen legible. The captures are cropped to portrait from the top
 * instead — the header and the first rows are where the argument actually is,
 * and at this size you can read them.
 */

type Beat = {
  src: string;
  poster?: string;
  alt: string;
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
};

/** Copy carried over verbatim from the pinned sequence — the argument is unchanged. */
const BEATS: Beat[] = [
  {
    src: "/images/app-screenshots/inspection-medical-sections.webp",
    alt: "An inspection at Greenfield Medical Center with section tabs reading Reception / Waiting, Exam Rooms and Lab / Specimen",
    eyebrow: "The checklist",
    title: "It knows what kind of building",
    accent: "it's standing in.",
    body: "Sections are built per facility type. A medical site is walked as Reception, Exam Rooms and Lab / Specimen — not a generic list of areas — so the crew is measured against the standard that space actually carries.",
  },
  {
    src: "/images/app-screenshots/inspection-failed-item.webp",
    alt: "A checklist item marked Fail at 4 out of 10 with a required note reading “There is still dust everywhere”, an attached photograph, and the running score at 79 with one failure",
    eyebrow: "The failure",
    title: "A problem has to be",
    accent: "specific.",
    body: "Marking an item down opens a required note and a camera, and the site score moves as you do it. A low number with no reason attached and nothing photographed is not something this app will carry forward.",
  },
  {
    src: "/videos/submit-blocked.mp4",
    poster: "/videos/submit-blocked-poster.webp",
    alt: "A supervisor tries to submit an inspection with a failed item that has no photo. The app blocks it and shows “Photos required — 1 failed item(s) need at least one photo”.",
    eyebrow: "The refusal",
    title: "And it won't file without",
    accent: "the evidence.",
    body: "Not a warning that can be dismissed when the shift is running late — the submit is refused, and the app names how many items are still missing a photograph. A standard that bends under time pressure isn't one.",
  },
  {
    src: "/images/app-screenshots/inspection-summary-signed.webp",
    alt: "A completed inspection scoring 78 with a timeline showing it started at 5:28 PM and was submitted at 5:29 PM, and a handwritten signature under Employee Acknowledgment",
    eyebrow: "The handoff",
    title: "It closes with the crew,",
    accent: "signed.",
    body: "The supervisor hands the phone over at the end of the walk. The crew member reads the result and signs, and the acknowledgment is timestamped before the record is filed — so the file shows not just the score but that they saw it.",
  },
  {
    src: "/images/app-screenshots/shift-timeline-geofence.webp",
    alt: "A shift timeline showing the clock-in position on a map with coordinates and an event log reading “Clocked in inside geofence (18 m from site centre)”",
    eyebrow: "The shift",
    title: "And the attendance behind it",
    accent: "is verified too.",
    body: "Clock-in is checked against the site's coordinates and refused outside them. What's left is a timeline: where, when, and eighteen metres from site centre — the document behind any question about who was on site.",
  },
];

const isClip = (b: Beat) => Boolean(b.poster);

export function AppBeats() {
  return (
    <div className="relative">
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
              "relative",
              // The hairline is the section break. It belongs between beats, so
              // the first one does without.
              i > 0 ? "border-t border-white/10 pt-20 lg:pt-32" : "",
              i > 0 ? "mt-20 lg:mt-32" : "",
            ].join(" ")}
          >
            <div className="lg:grid lg:grid-cols-12 lg:items-center">
              {/* ── The capture ──────────────────────────────────────────────
                  Full-bleed to the viewport edge on phones: the whole point is
                  that the screen is finally big enough to read. `object-top`
                  because the header and the first rows carry the claim; the
                  bottom of a phone screen is chrome. */}
              <div
                className={[
                  // Portrait on phones, where the capture is full-bleed and can
                  // afford the height. Square on desktop: a 4:5 box beside a
                  // panel that is only ever a few lines tall left a third of the
                  // field empty under it. Squarer shows less of the screen, but
                  // at the same scale — the crop loses rows, not legibility.
                  "relative aspect-[4/5] overflow-hidden bg-black lg:aspect-square",
                  // Negative margins rather than `w-screen`: a block element
                  // widened by its own margins is exactly full-bleed, and does
                  // not overshoot by the width of a scrollbar.
                  "-mx-6 sm:-mx-10 lg:mx-0",
                  "lg:row-start-1",
                  captureRight
                    ? "lg:col-start-6 lg:col-end-13"
                    : "lg:col-start-1 lg:col-end-8",
                ].join(" ")}
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
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-top"
                  />
                )}
              </div>

              {/* ── The panel ────────────────────────────────────────────────
                  Breaks the capture's edge. On phones it rides up over the
                  bottom of the image; on desktop it shares two grid columns
                  with it. Hard edges, no shadow — the overlap is what gives it
                  depth, so a shadow would only be saying it twice. */}
              <div
                className={[
                  "relative z-10 bg-[#F4F4F1] text-[#111111]",
                  "-mt-12 mr-6 px-7 py-9 sm:mr-10 sm:px-10 sm:py-12",
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
                <p className="eyebrow mb-5 text-[#54760F]">{beat.eyebrow}</p>
                <h3
                  className="font-gothic"
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {beat.title}{" "}
                  <span className="text-[#54760F]">{beat.accent}</span>
                </h3>
                <p
                  className="mt-6 max-w-xl text-[#3F3F3A]"
                  style={{
                    fontSize: "clamp(1rem, 1.15vw, 1.0625rem)",
                    fontWeight: 300,
                    lineHeight: 1.75,
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
  );
}

import Image from "next/image";
import {
  ClipboardCheck,
  Camera,
  ShieldAlert,
  PenLine,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { PhoneFrame } from "@/components/shared/phone-frame";

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

/** Copy carried over verbatim from the pinned sequence — the argument is unchanged. */
const BEATS: Beat[] = [
  {
    src: "/images/app-screenshots/inspection-medical-sections.webp",
    alt: "An inspection at Greenfield Medical Center with section tabs reading Reception / Waiting, Exam Rooms and Lab / Specimen",
    eyebrow: "The checklist",
    callout: { icon: ClipboardCheck, text: "Section 1 of 6 · Score 80" },
    title: "It knows what kind of building",
    accent: "it's standing in.",
    body: "Sections are built per facility type. A medical site is walked as Reception, Exam Rooms and Lab / Specimen — not a generic list of areas — so the crew is measured against the standard that space actually carries.",
  },
  {
    src: "/images/app-screenshots/inspection-failed-item.webp",
    alt: "A checklist item marked Fail at 4 out of 10 with a required note reading “There is still dust everywhere”, an attached photograph, and the running score at 79 with one failure",
    eyebrow: "The failure",
    callout: { icon: Camera, text: "Scored 4/10 · reason required" },
    title: "A problem has to be",
    accent: "specific.",
    body: "Marking an item down opens a required note and a camera, and the site score moves as you do it. A low number with no reason attached and nothing photographed is not something this app will carry forward.",
  },
  {
    src: "/videos/submit-blocked.mp4",
    poster: "/videos/submit-blocked-poster.webp",
    alt: "A supervisor tries to submit an inspection with a failed item that has no photo. The app blocks it and shows “Photos required — 1 failed item(s) need at least one photo”.",
    eyebrow: "The refusal",
    callout: { icon: ShieldAlert, text: "Submit refused · 1 photo missing" },
    title: "And it won't file without",
    accent: "the evidence.",
    body: "Not a warning that can be dismissed when the shift is running late — the submit is refused, and the app names how many items are still missing a photograph. A standard that bends under time pressure isn't one.",
  },
  {
    src: "/images/app-screenshots/inspection-summary-signed.webp",
    alt: "A completed inspection scoring 78 with a timeline showing it started at 5:28 PM and was submitted at 5:29 PM, and a handwritten signature under Employee Acknowledgment",
    eyebrow: "The handoff",
    // "Submitted", not "Signed" — SUBMITTED 5:29 PM is the line visible in the
    // capture. The signature sits lower in the record, and app-showcase.tsx
    // already warns against upgrading the handoff into a guarantee the app does
    // not enforce. The headline can argue; the chip only reports.
    callout: { icon: PenLine, text: "Submitted 5:29 PM" },
    title: "It closes with the crew,",
    accent: "signed.",
    body: "The supervisor hands the phone over at the end of the walk. The crew member reads the result and signs, and the acknowledgment is timestamped before the record is filed — so the file shows not just the score but that they saw it.",
  },
  {
    src: "/images/app-screenshots/shift-timeline-geofence.webp",
    alt: "A shift timeline showing the clock-in position on a map with coordinates and an event log reading “Clocked in inside geofence (18 m from site centre)”",
    eyebrow: "The shift",
    // The coordinates, because they are what is on screen. "18 m from site
    // centre" reads better but lives in the event log below the crop, and a
    // chip pointing at something you cannot see is decoration.
    callout: { icon: MapPin, text: "Clock-in 29.73820, −95.56100" },
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
                  A real device, cropped. Showing a 9:19.5 phone WHOLE forces a
                  choice between tall-and-thin and too-small-to-read; cropping
                  it to its top half lets it be as wide as the column allows and
                  still look like a phone. The container clips it — the device
                  runs off the bottom on purpose.

                  This outer cell does NOT clip, so the callout can break the
                  device's edge. The clipping happens one level in. */}
              <div
                className={[
                  "relative",
                  // ONE source of truth for the device's width. PhoneFrame's
                  // `beat` size reads it, and the callout below positions itself
                  // off it — so resizing the device cannot leave the chip
                  // anchored to where the device used to be.
                  "[--phone-w:76%] sm:[--phone-w:60%] lg:[--phone-w:54%]",
                  "-mx-6 sm:-mx-10 lg:mx-0",
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
                    "bg-brand-lime px-4 py-3 text-[#111111] sm:px-5",
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
                    className="h-4 w-4 flex-shrink-0"
                    strokeWidth={2}
                  />
                  <span className="whitespace-nowrap text-[12px] font-semibold leading-none sm:text-[13px]">
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

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PhoneFrame } from "@/components/shared/phone-frame";

/**
 * The pinned device — one phone held in place while the argument walks past it,
 * the screen changing to whatever the current claim is talking about.
 *
 * WHY THIS SHAPE. The app chapter is one continuous argument, not a catalogue.
 * Laid out as alternating rows, five claims read as five separate features and
 * the visitor re-anchors on a new device five times. Held, they read as one
 * product answering five questions, and the screen change does the work a
 * caption otherwise has to.
 *
 * THE PIN IS CSS `position: sticky`, NOT ScrollTrigger's `pin`. GSAP pinning
 * rewrites layout — it wraps the element, hard-sets heights, and has to be
 * refreshed whenever anything above it changes size (this page loads
 * photographs above this section, so that happens). Sticky costs nothing, never
 * desynchronises, and if JS fails the device simply stops following. GSAP is
 * doing the part only GSAP can do: reading scroll position to decide which
 * claim owns the screen.
 *
 * MOTION CONTRACT. Screen 0 is visible in the authored DOM; the rest sit at
 * opacity 0 behind it. That is a deliberate exception to the section's usual
 * "nothing parked at opacity-0" rule and it is safe here for a specific reason:
 * with no JS at all you still get a phone showing a real screen beside all five
 * claims in full. The section degrades to a static product shot, which reads
 * completely — it cannot go blank the way `hero.tsx` does. Do not extend the
 * pattern to elements that have no visible sibling.
 */

type Screen = {
  /** `poster` is present only on the clip. */
  src: string;
  poster?: string;
  alt: string;
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
};

const SCREENS: Screen[] = [
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

export function AppSequence() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const screens = gsap.utils.toArray<HTMLElement>("[data-screen]", root);
    const claims = gsap.utils.toArray<HTMLElement>("[data-claim]", root);
    if (!screens.length || !claims.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The swap is information, not decoration, so it still happens under
    // reduced motion — it just happens instantly instead of crossfading.
    const duration = reduced ? 0 : 0.3;

    let current = -1;

    /**
     * EXACTLY ONE LAYER IS EVER ALIVE. Outgoing screens are cleared instantly
     * with `set`; only the incoming one is tweened, rising from the phone's own
     * white background.
     *
     * Two earlier versions of this were wrong, both for the same underlying
     * reason — every one of these screens is a white inspection UI with nearly
     * identical furniture, so any moment where two are simultaneously visible
     * is a double exposure, not a transition:
     *
     *   1. Symmetrical crossfade (old 1→0, new 0→1) parks both at ~50% mid-way.
     *      Measured: a 78 printed through an 80, two score rows overlapping.
     *   2. Fading the incoming in on top, leaving the outgoing opaque
     *      underneath, and tidying up in `onComplete`. That relies on the tween
     *      finishing — and during a fast scroll it never does. Measured at
     *      speed: `0:100/z0 1:63/z1 3:35/z2`, three live layers with a
     *      translucent one on top showing straight through to a solid one below.
     *
     * Clearing instantly cannot desynchronise, because it doesn't depend on any
     * tween completing. The only cost is a brief moment of the white screen
     * background, which is invisible here — every screen in this sequence is
     * itself near-white.
     */
    const activate = (index: number) => {
      if (index === current) return;
      current = index;

      screens.forEach((el, i) => {
        if (i !== index) {
          // killTweensOf FIRST. `gsap.set` writes a value, it does not stop a
          // tween already animating that property — the running fade-in simply
          // overwrites the set on its next tick and the layer climbs back up.
          // Measured scrolling back up through the sequence: `2:55 4:96`, the
          // previous screen still fading in underneath the new one.
          gsap.killTweensOf(el);
          gsap.set(el, { opacity: 0, zIndex: 0 });
        }

        const video = el.querySelector("video");
        if (video) {
          if (i === index) {
            void video.play().catch(() => {
              /* refused (low power, data saver) — the poster stands in */
            });
          } else {
            video.pause();
          }
        }
      });

      gsap.set(screens[index], { zIndex: 2 });
      gsap.to(screens[index], {
        opacity: 1,
        duration,
        ease: "power2.out",
        overwrite: "auto",
      });

      claims.forEach((el, i) => {
        gsap.to(el, {
          opacity: i === index ? 1 : 0.34,
          duration: reduced ? 0 : 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
        const rule = el.querySelector("[data-rule]");
        if (rule) {
          gsap.to(rule, {
            scaleY: i === index ? 1 : 0,
            duration: reduced ? 0 : 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    };

    /**
     * Which claim owns the screen is DERIVED from scroll position, not
     * accumulated from enter/leave events.
     *
     * The first version put a trigger on each claim and activated on
     * `onToggle`. That reads fine and is wrong: during a fast scroll several
     * triggers toggle within a frame, the last one to fire wins regardless of
     * where the viewport actually landed, and the crossfades strand each other
     * part-way. Measured mid-flick it left three screens sitting at ~33%
     * opacity — a phone showing a smear of three inspections at once.
     *
     * Nearest-centre wins. It cannot desynchronise, because it asks the same
     * question every frame and the answer only depends on the current layout.
     */
    const wide = window.matchMedia("(min-width: 1024px)");

    /**
     * Where the "current" claim is judged from. On desktop the device sits
     * beside the copy, so the viewport centre is right. On mobile the device is
     * pinned across the top ~450px of an 844px screen, and the viewport centre
     * falls BEHIND it — measuring from there picks whichever claim is hidden
     * under the phone. 72% down puts the line in the free space below it.
     */
    const referenceLine = () =>
      window.innerHeight * (wide.matches ? 0.5 : 0.72);

    const pick = () => {
      const line = referenceLine();
      let best = 0;
      let bestDistance = Infinity;
      claims.forEach((claim, i) => {
        const rect = claim.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - line);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      activate(best);
    };

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate: pick,
      onRefresh: pick,
    });

    pick();

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={rootRef}
      className="lg:grid lg:grid-cols-12 lg:gap-x-16"
    >
      {/* `contents` below lg is load-bearing, not tidiness.
          `position: sticky` can only travel inside its containing block. When
          this wrapper generated a box on mobile, the one-column grid made that
          box exactly as tall as the phone inside it — measured travelRoom of
          0px, so the device scrolled straight off and five claims followed
          with no visual at all. `display: contents` removes the box below lg,
          which promotes the sticky element's containing block to the tall
          parent holding both the phone and the claims. At lg it becomes a real
          grid column again, where the column itself provides the travel. */}
      <div className="contents lg:block lg:col-span-5">
        <div className="sticky top-3 z-10 mb-10 flex justify-center lg:top-[14vh] lg:mb-0 lg:justify-start">
          {/* Exactly one frame, not one per breakpoint: the `sequence` size is
              responsive, and a second stack would make [data-screen] resolve to
              ten elements and break the index activate() is handed. */}
          <PhoneFrame size="sequence" glow>
            <ScreenStack />
          </PhoneFrame>
        </div>
      </div>

      {/* The claims. */}
      <div className="lg:col-span-7">
        {SCREENS.map((s, i) => (
          <div
            key={s.title}
            data-claim
            className="flex min-h-[64vh] flex-col justify-center py-8 lg:min-h-[78vh]"
            style={{ opacity: i === 0 ? 1 : 0.34 }}
          >
            <div className="relative pl-6">
              <span
                data-rule
                aria-hidden="true"
                className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-brand-green-deep"
                style={{ transform: `scaleY(${i === 0 ? 1 : 0})` }}
              />
              <p className="eyebrow mb-4 text-brand-lime">{s.eyebrow}</p>
              <h3
                className="font-gothic text-white"
                style={{
                  fontSize: "clamp(1.5rem, 2.9vw, 2.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.title}{" "}
                <span className="text-brand-green-deep">{s.accent}</span>
              </h3>
              <p
                className="mt-5 max-w-xl text-gray-300"
                style={{ fontWeight: 300, lineHeight: 1.7 }}
              >
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The stack of screens inside the bezel — all five in the DOM, one visible.
 * There must only ever be one of these on the page: `activate()` addresses
 * screens by index, so a second stack would silently offset the mapping.
 */
function ScreenStack() {
  return (
    <>
      {SCREENS.map((s, i) => (
        <div
          key={s.src}
          data-screen
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          {s.poster ? (
            <video
              src={s.src}
              poster={s.poster}
              aria-label={s.alt}
              muted
              loop
              playsInline
              // "metadata", not "none": this clip is a beat inside a sequence
              // rather than something the visitor chooses. With "none" the
              // first play() starts from a cold fetch and the poster sits there
              // through the whole claim — measured readyState 0 on arrival.
              preload="metadata"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              className="object-cover object-top"
              sizes="(max-width: 1024px) 216px, 272px"
            />
          )}
        </div>
      ))}
    </>
  );
}

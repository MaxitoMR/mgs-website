"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PhoneFrame } from "@/components/shared/phone-frame";
import { cn } from "@/lib/utils";

/**
 * The app chapter as a horizontal run: the device holds still, and scrolling
 * down carries the claims sideways past it, advancing rightward.
 *
 * WHY SIDEWAYS. Vertically, the claims competed with the page's own scroll —
 * you were reading a column that moved in the same direction as everything
 * above and below it, so the sequence read as "more page" rather than as a
 * held moment. Turning the travel 90° makes the section announce itself: the
 * page stops, the argument runs across, the page resumes.
 *
 * NO ScrollTrigger `pin`. The hold is a tall spacer with a `sticky` viewport
 * inside it, and GSAP only scrubs the track's x. GSAP's pin rewrites layout —
 * it wraps the element, hard-sets heights, and needs refreshing whenever
 * anything above it changes size, which on this page means every photograph
 * that decodes late. Sticky costs nothing and cannot desynchronise. (It does
 * require that no ancestor carries `overflow-hidden`; the section wrapper uses
 * `overflow-x-clip` for exactly this reason — see app-showcase.tsx.)
 *
 * ONE DEVICE, NOT FIVE. The phone sits outside the moving track and never
 * translates; only its screen changes. Five panels each carrying their own
 * device would read as five products.
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const screens = gsap.utils.toArray<HTMLElement>("[data-screen]", root);
    const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", root);
    const ticks = gsap.utils.toArray<HTMLElement>("[data-tick]", root);
    if (!screens.length || !panels.length) return;

    let current = -1;

    /**
     * EXACTLY ONE LAYER IS EVER ALIVE — outgoing screens are cleared instantly,
     * only the incoming one is tweened, rising from the phone's own white
     * background. These are all white inspection UIs with near-identical
     * furniture, so any moment with two of them simultaneously visible is a
     * double exposure rather than a transition. `killTweensOf` first, because
     * `gsap.set` writes a value but does not stop a tween already animating it.
     */
    const activate = (index: number) => {
      if (index === current) return;
      current = index;

      screens.forEach((el, i) => {
        if (i !== index) {
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
        duration: reduced ? 0 : 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      panels.forEach((el, i) => {
        gsap.to(el, {
          opacity: i === index ? 1 : 0.32,
          duration: reduced ? 0 : 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      ticks.forEach((el, i) => {
        gsap.to(el, {
          backgroundColor:
            i === index ? "var(--color-brand-lime)" : "rgba(255,255,255,0.15)",
          scaleY: i === index ? 3 : 1,
          duration: reduced ? 0 : 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    // Reduced motion: the panels are stacked in normal flow, so there is
    // nothing to scrub. Show every screen's claim and leave the device on the
    // first — no scroll-linked movement at all.
    if (reduced) {
      activate(0);
      panels.forEach((el) => gsap.set(el, { opacity: 1 }));
      return;
    }

    const distance = () => track.scrollWidth - track.offsetWidth;

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Progress maps linearly onto panel index: at p=0 panel 0 is aligned,
          // at p=1 the last one is. Rounding picks whichever is nearest, so the
          // screen changes at the halfway point between two panels.
          activate(Math.round(self.progress * (panels.length - 1)));
        },
      },
    });

    activate(0);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className={cn("relative", !reduced && "h-[420vh]")}
      // The tall spacer IS the scroll budget: 420vh of page scroll is spent
      // travelling the track's width. Shorten it and the run feels rushed;
      // lengthen it and the page feels stuck.
    >
      <div
        className={cn(
          "flex flex-col justify-center gap-8 lg:flex-row lg:items-center lg:gap-14",
          !reduced && "sticky top-0 h-screen overflow-hidden"
        )}
      >
        {/* The device — outside the track, so it never translates. */}
        <div className="flex shrink-0 justify-center lg:justify-start">
          <PhoneFrame size="sequence" glow>
            <ScreenStack />
          </PhoneFrame>
        </div>

        {/* The window the claims run through. `overflow-hidden` here is safe —
            it is the sticky element's descendant, not its ancestor. */}
        <div
          className={cn(
            "min-w-0 flex-1",
            !reduced && "overflow-hidden"
          )}
        >
          <div
            ref={trackRef}
            className={cn(
              "flex",
              reduced ? "flex-col gap-14" : "will-change-transform"
            )}
          >
            {SCREENS.map((s, i) => (
              <div
                key={s.title}
                data-panel
                className={cn(
                  "w-full shrink-0",
                  !reduced && "pr-6 lg:pr-12"
                )}
                style={{ opacity: i === 0 ? 1 : 0.32 }}
              >
                <div className="border-l-2 border-brand-green-deep pl-5 lg:pl-6">
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

          {/* Progress across the run — five ticks, the live one filled. */}
          {!reduced && (
            <div
              aria-hidden="true"
              className="mt-10 flex gap-2 pl-5 lg:pl-6"
            >
              {SCREENS.map((s, i) => (
                <span
                  key={s.title}
                  data-tick={i}
                  className="h-px w-10 bg-white/15"
                />
              ))}
            </div>
          )}
        </div>
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
              // rather than something the visitor chooses, so it should be
              // ready when its panel arrives.
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
              sizes="(max-width: 640px) 168px, (max-width: 1024px) 240px, 272px"
            />
          )}
        </div>
      ))}
    </>
  );
}

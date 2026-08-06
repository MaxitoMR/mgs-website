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
 *
 * THE ACTIVE PANEL IS READ OFF THE TRACK, NOT OFF THE SCROLLBAR. `scrub` is a
 * number, so the track's x is a SMOOTHED follower of scroll position, not
 * scroll position itself. Deciding the active panel from `self.progress` (the
 * raw scrollbar) therefore lit a panel that was still up to ~1.7 slides away
 * from the window during a fast flick: the highlighted claim was off-screen
 * while the visible ones sat dimmed at 0.32, which read as the pin coming
 * loose. `panelIndexFromTrack()` measures the transform that is actually on
 * screen, so the highlight cannot lead or lag the thing it is highlighting.
 * If you ever change `scrub`, this stays correct; if you ever go back to
 * reading `self.progress`, the drift comes back.
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

/**
 * One place decides whether a screen renders as a <video>. `ScreenStack` uses
 * it to pick the element, and the progress ticks use it to pick between a
 * playback-filled indicator and the plain on/off one — so the two can't
 * disagree about what a given index is.
 */
const isClip = (s: Screen) => Boolean(s.poster);

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

    // Indicator fills, keyed by the panel they belong to. Only clips have one.
    const fills = new Map<number, HTMLElement>();
    gsap.utils
      .toArray<HTMLElement>("[data-tick-fill]", root)
      .forEach((el) => fills.set(Number(el.dataset.tickFill), el));
    fills.forEach((el) => gsap.set(el, { scaleX: 0, transformOrigin: "0% 50%" }));

    const videoAt = (i: number) => screens[i]?.querySelector("video") ?? null;

    /** Back to the resting state: stopped, rewound, and drained of fill. */
    const rewind = (i: number) => {
      const v = videoAt(i);
      if (v) {
        v.pause();
        // Rewinding on the way out is what makes re-entering a panel replay the
        // clip from the top instead of resuming halfway through an argument the
        // visitor never saw the start of.
        try {
          v.currentTime = 0;
        } catch {
          /* not seekable yet — it starts at 0 anyway */
        }
      }
      const f = fills.get(i);
      if (f) gsap.set(f, { scaleX: 0 });
    };

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
        if (i !== index) {
          rewind(i);
          return;
        }
        const video = videoAt(i);
        if (video && !reduced) {
          // Reset before playing so the fill and the clip start from the same
          // zero, whichever direction the panel was entered from.
          rewind(i);
          void video.play().catch(() => {
            /* refused (low power, data saver) — the poster stands in */
          });
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
        // A clip's own track never turns lime: its fill is what carries the
        // colour, and pre-filling the track would state the progress before the
        // video has made any. It still thickens like the others, so the active
        // indicator reads the same whichever kind of media it belongs to.
        const carriesFill = fills.has(i);
        gsap.to(el, {
          backgroundColor:
            i === index && !carriesFill
              ? "var(--color-brand-lime)"
              : "rgba(255,255,255,0.15)",
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

    /**
     * Which panel is in the window RIGHT NOW, measured off the transform the
     * browser is painting. One panel is exactly one window wide, so -x/width is
     * the panel index in fractional form; rounding picks whichever is nearest,
     * so the screen changes at the halfway point between two panels. Reading
     * the live transform (rather than scroll position) is what keeps the
     * highlight welded to the slide during a scrubbed, smoothed move — and it
     * survives a resize for free, because both terms are re-measured together.
     */
    const panelIndexFromTrack = () => {
      const width = track.offsetWidth || 1;
      const x = (gsap.getProperty(track, "x") as number) || 0;
      return gsap.utils.clamp(0, panels.length - 1, Math.round(-x / width));
    };

    const sync = () => activate(panelIndexFromTrack());

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      // On the tween, not on the ScrollTrigger: this fires as the SMOOTHED
      // playhead renders, which is the motion actually on screen.
      onUpdate: sync,
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        // 0.25, not 0.6. Six tenths of a second of smoothing is most of what
        // made the run feel loose — the track visibly trailed the scroll, so
        // the panel you were dragging toward kept sliding after you stopped.
        // Low enough to feel attached to the input, high enough that a
        // wheel-notch does not read as a jump cut.
        scrub: 0.25,
        invalidateOnRefresh: true,
        /**
         * Come to rest on a whole panel. The run stays continuous while you are
         * moving — that is the point of the sideways travel — but stopping
         * anywhere lands the track on one claim instead of halfway between two,
         * where you were reading the tail of one and the head of the next
         * across a 24px gutter with both dimmed to 0.32.
         *
         * `snapTo` is 1/(n-1) because progress maps linearly onto panel index:
         * the panel positions ARE the quarter points.
         */
        snap: {
          snapTo: 1 / (SCREENS.length - 1),
          // Settle, don't glide. Half a second of travel after the scroll has
          // already stopped is read as the section still moving on its own.
          duration: { min: 0.12, max: 0.28 },
          delay: 0.03,
          ease: "power3.out",
          // Nearest panel, not "whichever way you were heading". A slight
          // overshoot at the end of a flick should fall back to the panel you
          // are looking at rather than advance past it.
          directional: false,
          // Snap from where the scroll ACTUALLY stopped, not from where its
          // velocity predicts it would have gone. Left on (the default), a fast
          // trackpad flick extrapolates the throw and lands several panels
          // past the one you were looking at — measured jumping to 0.375
          // progress and landing on panel 4. "Nearest" has to mean nearest.
          inertia: false,
        },
        /**
         * `scroll-behavior: smooth` is set globally on html/body, which makes
         * the browser animate EVERY programmatic scroll — including the one the
         * snap performs. The two animations fight and the snap lands short, so
         * the sequence still comes to rest between panels. Neutralise it only
         * while this section owns the scroll; the skip link keeps its smooth
         * behaviour everywhere else on the page.
         */
        onToggle: (self) => {
          document.documentElement.style.scrollBehavior = self.isActive
            ? "auto"
            : "";
        },
        // A resize re-measures the track mid-page; re-read which panel that
        // leaves in the window rather than trusting the last known index.
        onRefresh: sync,
      },
    });

    /**
     * The fill is polled rather than driven off `timeupdate`, which fires only
     * ~4x/sec and would visibly stair-step. `gsap.ticker` is the rAF loop the
     * rest of the page is already on, so this costs no extra frame scheduling —
     * and it idles to a single map lookup whenever the active panel has no clip
     * or the section is off-screen.
     */
    let inView = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!inView) {
          const v = videoAt(current);
          if (v) v.pause();
        } else if (current >= 0) {
          const v = videoAt(current);
          if (v && !reduced) {
            void v.play().catch(() => {});
          }
        }
      },
      { rootMargin: "0px" }
    );
    io.observe(root);

    const paintFill = () => {
      if (!inView) return;
      const fill = fills.get(current);
      if (!fill) return;
      const v = videoAt(current);
      if (!v) return;
      const d = v.duration;
      if (!d || !Number.isFinite(d)) return;
      // A clip that ends without `loop` holds at full rather than snapping
      // back; a looping one wraps to 0 on its own because currentTime does.
      const p = v.ended && !v.loop ? 1 : gsap.utils.clamp(0, 1, v.currentTime / d);
      gsap.set(fill, { scaleX: p });
    };
    gsap.ticker.add(paintFill);

    /**
     * The first activate() has to be re-asserted a frame later. Called inline
     * here it runs while React is still settling the freshly hydrated subtree,
     * and every inline style it writes is discarded — measured: immediately
     * after `gsap.set(screen, {zIndex: 2})` the style attribute was still just
     * `opacity:1`. The section still LOOKED right, because the authored SSR
     * state (screen 0 visible, panel 0 at full opacity) happens to match panel
     * 0 being active — but the ticks never got their active state, so entering
     * the sequence showed five dim ticks and no indication of where you were.
     *
     * Resetting `current` is what makes the second call do the work; without it
     * activate() early-returns on the index it thinks it already applied.
     */
    const assertInitial = () => {
      gsap.ticker.remove(assertInitial);
      current = -1;
      sync();
    };
    gsap.ticker.add(assertInitial);

    sync();

    return () => {
      gsap.ticker.remove(paintFill);
      gsap.ticker.remove(assertInitial);
      io.disconnect();
      screens.forEach((_, i) => rewind(i));
      // Unmounting mid-section would otherwise strand the page with smooth
      // scrolling disabled.
      document.documentElement.style.scrollBehavior = "";
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  /**
   * Jump to a panel. This only moves the scrollbar — the same ScrollTrigger and
   * the same scrub carry the track there and light the panel, so clicking a
   * tick cannot introduce a second opinion about where the sequence is. The
   * geometry mirrors the trigger's own range: `top top` → `bottom bottom` is
   * exactly the spacer's height minus one viewport.
   */
  const goTo = (i: number) => {
    const root = rootRef.current;
    if (!root) return;
    const pin = root.offsetHeight - window.innerHeight;
    if (pin <= 0) return;
    const top =
      root.getBoundingClientRect().top +
      window.scrollY +
      (pin * i) / (SCREENS.length - 1);
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

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

          {/* Progress across the run. A clip's tick fills left-to-right with
              its own playback; a still's tick is the plain on/off it has always
              been. Both are now also the way to jump to a panel. */}
          {!reduced && (
            <div className="mt-10 flex gap-2 pl-5 lg:pl-6">
              {SCREENS.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1} of ${SCREENS.length}: ${s.eyebrow}`}
                  // The line itself is 1px tall — far too small to hit. The
                  // button carries a 24px target around it without changing
                  // what is drawn.
                  className="group flex h-6 w-10 shrink-0 items-center rounded-sm focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand-lime)]"
                >
                  <span
                    data-tick={i}
                    className="relative block h-px w-full bg-white/15"
                  >
                    {isClip(s) && (
                      <span
                        data-tick-fill={i}
                        aria-hidden="true"
                        className="absolute inset-0 block"
                        style={{
                          background: "var(--color-brand-lime)",
                          transform: "scaleX(0)",
                          transformOrigin: "0% 50%",
                        }}
                      />
                    )}
                  </span>
                </button>
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
          {isClip(s) ? (
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

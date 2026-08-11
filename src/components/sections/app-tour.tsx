"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CaptureStill, CaptureClip } from "@/components/shared/app-capture";
import { PhoneFrame } from "@/components/shared/phone-frame";
import { cn } from "@/lib/utils";

/**
 * `/app` — the complete tour of the MGS Management App.
 *
 * The homepage's AppShowcase makes an argument and shows the four or five
 * screens that carry it. This page is the other job: every capture we have,
 * in the order the work actually happens.
 *
 * ORGANISED BY WHAT THE APP DOES, NOT BY ROLE. Role sections were the obvious
 * structure and they're the wrong one — we have no client-role captures yet,
 * so a role-partitioned page would open a visibly empty fourth bay. Grouping
 * by the work (the inspection, the shift, the record) and tagging each capture
 * with its role keeps the four-role architecture legible without promising a
 * screenshot we don't have.
 *
 * MOTION CONTRACT — identical to app-showcase.tsx, and for the same reason:
 * everything is visible in the authored DOM, animation is `gsap.from()` only,
 * inside `matchMedia()`. Nothing is parked at `opacity-0`. A reveal that never
 * fires must cost a fade, never the content. (`hero.tsx` does the opposite and
 * goes blank in any rAF-throttled context — a background tab will reproduce
 * it. Don't copy the hero.)
 */

const APP_STORE_URL =
  "https://apps.apple.com/us/app/mgs-management-app/id6760367154";

const IMG = "/images/app-screenshots";
const VID = "/videos";

function AppStoreButton() {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-white px-6 py-3.5 text-[#191919] transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:shadow-white/10"
      style={{ borderTopLeftRadius: "1rem" }}
    >
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="flex flex-col">
        <span className="text-xs font-light leading-none lg:text-[10px]">
          Download on the
        </span>
        <span className="text-[16px] font-semibold leading-tight">
          App Store
        </span>
      </div>
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  accent,
  lede,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  lede: string;
}) {
  return (
    <div
      className="max-w-3xl"
      style={{ paddingTop: "clamp(2.5rem, 10vw, 8rem)" }}
    >
      <p data-reveal className="eyebrow mb-5 text-brand-lime">
        {eyebrow}
      </p>
      <h2
        data-reveal
        className="font-gothic text-white"
        style={{
          fontSize: "clamp(1.75rem, 3.4vw, 2.875rem)",
          fontWeight: 300,
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
        }}
      >
        {title} <span className="text-brand-green-deep">{accent}</span>
      </h2>
      <p
        data-reveal
        className="mt-5 text-gray-300"
        style={{ fontWeight: 300, lineHeight: 1.7 }}
      >
        {lede}
      </p>
    </div>
  );
}

/**
 * A capture beside its copy, sides alternating down the page.
 *
 * The phone holds the container's OUTER edge — `justify-start` on the left
 * side, `justify-end` on the right — rather than sitting centred in its own
 * column. Centred, it floats mid-column and leaves the container edge empty,
 * which is the precise imbalance AppShowcase went through three revisions to
 * fix. Same lesson, same fix; don't re-centre these.
 */
function TourRow({
  media,
  title,
  body,
  flip = false,
}: {
  media: ReactNode;
  title: string;
  body: string;
  flip?: boolean;
}) {
  return (
    <div
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
      style={{ paddingTop: "clamp(1.5rem, 5.5vw, 4.5rem)" }}
    >
      <div
        data-reveal
        className={cn(
          "flex justify-center lg:col-span-5",
          flip ? "lg:order-2 lg:justify-end" : "lg:justify-start"
        )}
      >
        {media}
      </div>
      <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
        <h3
          data-reveal
          className="font-gothic text-white"
          style={{
            fontSize: "clamp(1.25rem, 2.2vw, 1.875rem)",
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
          }}
        >
          {title}
        </h3>
        <p
          data-reveal
          className="mt-4 max-w-xl text-gray-300"
          style={{ fontWeight: 300, lineHeight: 1.7 }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

/** Two captures under one argument — used where the comparison IS the point. */
function TourPair({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <div style={{ paddingTop: "clamp(1.75rem, 7vw, 6rem)" }}>
      <div className="max-w-2xl">
        <h3
          data-reveal
          className="font-gothic text-white"
          style={{
            fontSize: "clamp(1.25rem, 2.2vw, 1.875rem)",
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
          }}
        >
          {title}
        </h3>
        <p
          data-reveal
          className="mt-4 text-gray-300"
          style={{ fontWeight: 300, lineHeight: 1.7 }}
        >
          {body}
        </p>
      </div>
      <div
        data-reveal-group
        className="mt-12 grid grid-cols-1 justify-items-center gap-x-10 gap-y-14 sm:grid-cols-2"
      >
        {children}
      </div>
    </div>
  );
}

export function AppTour() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);

      /* ABOVE THE FOLD IS NOT ANIMATED.
         A ScrollTrigger with `start: "top 90%"` fires immediately for anything
         already on screen, so the page's own h1 and subtitle were being faded
         in from zero at load — an entry animation on the first thing the
         visitor is trying to read, and a blank block for as long as it ran.
         Measuring once at setup and skipping whatever is already visible fixes
         the whole class rather than the two elements that happened to show it,
         and it needs no per-element tagging that a future beat could forget. */
      const belowFold = (el: Element) =>
        el.getBoundingClientRect().top >= window.innerHeight;

      q("[data-reveal]").forEach((el) => {
        if (!belowFold(el)) return;
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      q("[data-reveal-group]").forEach((group) => {
        if (!belowFold(group)) return;
        gsap.from(group.children, {
          opacity: 0,
          y: 24,
          duration: 0.65,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (root.contains(t.trigger as Node)) t.kill();
        });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    // A <section>, not a <main>: the marketing layout already renders the
    // page's <main id="main-content">, and nesting a second landmark inside it
    // is invalid and costs the skip link its target.
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-brand-dark-deeper"
    >
      {/* Same faint grid the homepage app chapter uses — the two surfaces are
          one continuous idea, so they share a texture. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* ── Hero ─────────────────────────────────────────────────────────
            The right side is a fanned trio rather than one device shot. Three
            reasons it beats both alternatives: type alone left half of a wide
            viewport dead; a single screenshot would make one arbitrary screen
            the face of a page whose whole claim is "every screen"; and at
            200px in a fan these read as impression, not as subjects, so
            meeting them again full-size further down is a payoff rather than
            a repeat. Hidden below lg, where the fan would have to shrink past
            legibility to fit. */}
        <header
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10"
          style={{
            paddingTop: "clamp(3rem, 12vw, 9rem)",
            paddingBottom: "clamp(1rem, 2vw, 2rem)",
          }}
        >
          {/* relative + z-10 so the copy always wins if the fan beside it ever
              runs wide at an intermediate breakpoint. Text over art, never the
              reverse. */}
          <div className="relative z-10 lg:col-span-7">
          <p data-reveal className="eyebrow mb-6 text-brand-lime">
            The MGS Management App
          </p>
          <h1
            data-reveal
            className="font-gothic text-white"
            style={{
              fontSize: "clamp(2.125rem, 5.4vw, 4.5rem)",
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
            }}
          >
            Every screen that{" "}
            <span className="text-brand-green-deep">runs a shift.</span>
          </h1>
          <p
            data-reveal
            className="mt-7 max-w-xl text-gray-300"
            style={{
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            The software our supervisors and crews use on site: inspections scored
            in the room, clock-ins verified against the building&apos;s
            coordinates, and a record that leaves with the client. Below is all
            of it, screen by screen, in the order the work happens.
          </p>

          <div data-reveal className="mt-9">
            <AppStoreButton />
            <p className="mt-3 text-xs font-light text-white/60">
              Free &middot; iOS 15.1+ &middot; iPhone, iPad &amp; Apple Vision
            </p>
          </div>

            <div data-reveal-group className="mt-9 flex flex-wrap gap-2">
              {["Admin", "Supervisor", "Employee", "Client"].map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 lg:text-[11px] lg:leading-[1.6]"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* The fan's natural width — three 200px frames tucked, plus the
              bounding box the rotations add — runs about 520px against a
              ~440px column, so left-unchecked it bleeds back over the
              paragraph. Scaled from the right edge it keeps its size relative
              to the type while staying inside its own column. */}
          <div
            data-reveal
            aria-hidden="true"
            className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-end lg:origin-right lg:scale-[0.82] xl:scale-90"
          >
            {[
              {
                src: `${IMG}/inspection-medical-sections.webp`,
                tilt: "-7deg",
                lift: "1.25rem",
              },
              { src: `${IMG}/inspection-failed-item.webp`, tilt: "0deg", lift: "0rem" },
              { src: `${IMG}/employee-home-dark.webp`, tilt: "7deg", lift: "1.25rem" },
            ].map((p, i) => (
              <div
                key={p.src}
                className={cn(i > 0 && "-ml-14 xl:-ml-10", i === 1 && "z-10")}
                style={{ transform: `rotate(${p.tilt}) translateY(${p.lift})` }}
              >
                <PhoneFrame size="sm" glow={i === 1}>
                  {/* Decorative — the header is aria-hidden and every one of
                      these screens is presented properly, with alt text, in
                      the beats below.

                      All three are `priority`, not just the centre one: they
                      sit together above the fold, so lazy-loading the outer
                      two makes the fan assemble itself in front of the
                      visitor. At a 200px render these are a few KB each. */}
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="200px"
                  />
                </PhoneFrame>
              </div>
            ))}
          </div>
        </header>

        {/* ── The inspection ──────────────────────────────────────────── */}
        <SectionIntro
          eyebrow="The Inspection"
          title="Scored in the room,"
          accent="not written up afterward."
          lede="A supervisor walks the site with the checklist open and scores every item where it stands. The app decides what counts as finished — which is the part that makes the number at the end worth anything."
        />

        <TourRow
          media={
            <CaptureStill
              src={`${IMG}/inspection-medical-sections.webp`}
              alt="An inspection in progress at Greenfield Medical Center, with section tabs reading Reception / Waiting, Exam Rooms and Lab / Specimen, and checklist items for sanitizing the check-in counter and disinfecting waiting-room seating"
              role="Supervisor"
              size="lg"
            />
          }
          title="It speaks the building's language."
          body="Section tabs are built per facility type. A medical site is walked as Reception / Waiting, Exam Rooms and Lab / Specimen, so the checklist matches the risk profile of the space and the crew is measured against the right standard."
        />

        <TourRow
          flip
          media={
            <CaptureStill
              src={`${IMG}/inspection-failed-item.webp`}
              alt="A checklist item marked Fail at 4 out of 10 with a required failure note reading &ldquo;There is still dust everywhere&rdquo;, an attached photograph of the area, and the running site score showing 79 with one failure"
              role="Supervisor"
              size="lg"
            />
          }
          title="A failure has to be specific."
          body="Marking an item down opens a required note and a camera. The app will not carry forward a low score with no reason and no photograph, so the deficiency reaches the crew as an instruction rather than an opinion."
        />

        {/* The centerpiece. Gets the middle of the page and its own width. */}
        <div
          className="flex flex-col items-center text-center"
          style={{ paddingTop: "clamp(2.5rem, 10vw, 8rem)" }}
        >
          <div className="max-w-2xl">
            <h3
              data-reveal
              className="font-gothic text-white"
              style={{
                fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)",
                fontWeight: 300,
                lineHeight: 1.16,
                letterSpacing: "-0.015em",
              }}
            >
              Watch the score move.
            </h3>
            <p
              data-reveal
              className="mt-4 text-gray-300"
              style={{ fontWeight: 300, lineHeight: 1.7 }}
            >
              Eighteen seconds, uncut: an item marked Fail, a photograph
              attached from the camera roll, the note typed — and the site score
              falling from 80 to 78 while it happens. The number is computed
              from the walk, not decided at the end of it.
            </p>
          </div>
          <div data-reveal className="mt-12">
            <CaptureClip
              mode="click"
              src={`${VID}/inspection-score-drop.mp4`}
              poster={`${VID}/inspection-score-drop-poster.webp`}
              alt="A supervisor marks a checklist item as failed, attaches a photograph and types a failure note, and the site score drops from 80 to 78 with one failure recorded"
              role="Supervisor"
              size="lg"
            />
          </div>
        </div>

        <TourRow
          media={
            <CaptureStill
              src={`${IMG}/inspection-submit-blocked.webp`}
              alt="The inspection review screen showing an overall score of 78 with 32 passes and one failure, overlaid by a dialog reading &ldquo;Photos required — 1 failed item(s) need at least one photo&rdquo;"
              role="Supervisor"
              size="lg"
            />
          }
          title="And it won't file without the evidence."
          body="The submit is refused outright, and the app names how many items are still missing a photograph. Not a warning you can dismiss when the shift is running late."
        />

        <TourRow
          flip
          media={
            <CaptureStill
              src={`${IMG}/inspection-summary-signed.webp`}
              alt="A completed inspection scoring 78, listing what needs fixing, a timeline showing it started at 5:28 PM and was submitted at 5:29 PM, supervisor comments, and a handwritten signature under Employee Acknowledgment"
              role="Supervisor"
              size="lg"
            />
          }
          title="What comes out the other end."
          body="The score, the ranked list of what needs fixing, the start and submit times, and the supervisor's comments. Underneath, the signature of the person who did the work, captured before the record was filed."
        />

        {/* ── The shift ───────────────────────────────────────────────── */}
        <SectionIntro
          eyebrow="The Shift"
          title="Verified against the building,"
          accent="not the honour system."
          lede="Attendance is the claim every janitorial contractor makes and almost none can evidence. Ours is checked against the site's coordinates and the shift's schedule, and refused when either doesn't hold."
        />

        <TourRow
          media={
            <CaptureStill
              src={`${IMG}/employee-home-dark.webp`}
              alt="The crew member's home screen in dark theme, showing a shift in progress at Greenfield Medical Center with a running timer, thirty-day statistics for completion and punctuality, the week's schedule, and recent time logs"
              role="Employee"
              size="lg"
              glow
            />
          }
          title="The crew's own view."
          body="Shift in progress with the clock running, thirty-day completion and on-time rates, the week ahead, and every previous clock-in and clock-out. The same record the office sees, from the crew side."
        />

        <TourPair
          title="It checks where you are. It also checks when."
          body="Two refusals, both real, neither staged. Distance is measured against the site's coordinates; timing is measured against the shift. Fail either one and the clock-in does not happen."
        >
          <CaptureClip
            src={`${VID}/clockin-refused-distance.mp4`}
            poster={`${VID}/clockin-refused-distance-poster.webp`}
            alt="A crew member taps clock in while away from the job site. The app refuses and displays &ldquo;You are 2642.4 km away from the job site. You must be at the location to clock in.&rdquo;"
            role="Employee"
            title="Out of range"
            body="The refusal states the distance. The device running this capture was 2,642 km from the site — which is exactly the check doing its job."
          />
          <CaptureClip
            src={`${VID}/clockin-refused-early.mp4`}
            poster={`${VID}/clockin-refused-early-poster.webp`}
            alt="A crew member taps clock in before their shift window opens. The app refuses and displays &ldquo;Too early — you can clock in 10 minutes before your shift. Please wait 24 more minute(s).&rdquo;"
            role="Employee"
            title="Out of window"
            body="Clock-in opens ten minutes before the shift. Arrive earlier and the app says how long the wait is, rather than quietly banking the time."
          />
        </TourPair>

        <TourRow
          media={
            <CaptureStill
              src={`${IMG}/shift-timeline-geofence.webp`}
              alt="An administrator's shift timeline showing the location, scheduled hours, a running work timer, a map of the clock-in position with coordinates, checklist progress, and an event log reading &ldquo;Clocked in inside geofence (18 m from site center)&rdquo;"
              role="Admin"
              size="lg"
            />
          }
          title="Where and when, to the meter."
          body="The clock-in coordinates, plotted. Underneath, a live event log: inside geofence, eighteen meters from site center, then every task completion timestamped after it. This is the document behind an attendance dispute."
        />

        <TourRow
          flip
          media={
            <CaptureStill
              src={`${IMG}/active-shifts-live.webp`}
              alt="An administrator's active shifts screen showing one live shift — a crew member at Greenfield Medical Center, in since 6:00 PM with a running timer and three of six tasks complete"
              role="Admin"
              size="lg"
            />
          }
          title="Live, right now."
          body="Who is on site, how long they have been there, and how much of the checklist is behind them. Answering &ldquo;is anyone at my building?&rdquo; takes a glance rather than a phone call to a supervisor who has to make one of their own."
        />

        {/* ── The record ──────────────────────────────────────────────── */}
        <SectionIntro
          eyebrow="The Record"
          title="A failure becomes an assignment,"
          accent="then a document."
          lede="Finding the problem is the easy half. What follows is the part a client can hold us to: the fix has an owner and a date, and the whole file leaves in a format their records team can accept."
        />

        <TourRow
          media={
            <CaptureStill
              src={`${IMG}/rework-queue.webp`}
              alt="A rework queue listing three corrective actions — re-clean breakroom counters and sink, re-scrub main aisle bays 4-7, and degrease dock apron — each with a site, an assigned crew member, a priority and a due date"
              role="Supervisor"
              size="lg"
            />
          }
          title="The queue it generates."
          body="Every failed item becomes a corrective action carrying an owner, a priority and a due date, and it stays open until someone resolves it. The inspection doesn't end at a score; it ends when the work behind the score is redone."
        />

        <TourPair
          title="Four formats, one tap."
          body="The whole record exports without anyone assembling it by hand — including a deficiency report that carries only the failed items and their photographs, which is usually the only part a client's compliance file actually needs."
        >
          <CaptureStill
            src={`${IMG}/export-formats.webp`}
            alt="An export sheet offering four formats for nine inspections — PDF Report, Excel multi-sheet workbook, CSV flat line-item data, and a Deficiency Report containing failed items and photos only"
            role="Supervisor"
            title="Pick the format"
            body="PDF for the file, Excel for the analysis, CSV for whatever system it has to land in, deficiency report for the fix list."
          />
          <CaptureClip
            src={`${VID}/export-deficiency.mp4`}
            poster={`${VID}/export-deficiency-poster.webp`}
            alt="A supervisor taps export, chooses the Deficiency Report format from the sheet of four options, and the generated document appears"
            role="Supervisor"
            title="Then it's a document"
            body="Tap through and the report is generated on the device, ready to send from site."
          />
        </TourPair>

        {/* ── Either language ─────────────────────────────────────────── */}
        <SectionIntro
          eyebrow="Either Language"
          title="The same screen, in the language"
          accent="they actually speak."
          lede="Chosen per user, not per company. Nobody on an MGS crew signs off on a result that had to be translated for them by the person who wrote it."
        />

        <TourPair
          title="One screen, twice."
          body="Not a partial translation over an English shell — the same Locations view, the same three sites, the same average of 78, rendered wholly in each language."
        >
          <CaptureStill
            src={`${IMG}/locations-health-en.webp`}
            alt="The Locations screen in English showing three sites, an average health score of 78, one healthy site and one at risk"
            role="Supervisor"
            title="English"
            body="Locations, Avg. Health, Healthy, At Risk."
          />
          <CaptureStill
            src={`${IMG}/locations-health-es.webp`}
            alt="The identical Locations screen in Spanish, headed Ubicaciones, showing the same three sites, the same average of 78, and the same healthy and at-risk counts"
            role="Supervisor"
            title="Español"
            body="Ubicaciones, Salud Prom., Saludable, En Riesgo."
          />
        </TourPair>

        {/* ── Close ───────────────────────────────────────────────────── */}
        <div
          className="max-w-2xl"
          style={{
            paddingTop: "clamp(3rem, 12vw, 9rem)",
            paddingBottom: "clamp(2.5rem, 10vw, 8rem)",
          }}
        >
          <h2
            data-reveal
            className="font-gothic text-white"
            style={{
              fontSize: "clamp(1.75rem, 3.4vw, 2.875rem)",
              fontWeight: 300,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
            }}
          >
            It ships with{" "}
            <span className="text-brand-green-deep">every contract.</span>
          </h2>
          <p
            data-reveal
            className="mt-5 text-gray-300"
            style={{ fontWeight: 300, lineHeight: 1.7 }}
          >
            The app is how MGS runs its own field operations — not an add-on
            module sold separately. Clients get an account on it, and see the
            activity at their site as it is recorded.
          </p>
          <div data-reveal className="mt-9">
            <AppStoreButton />
          </div>

          <p className="mt-12 max-w-md text-xs font-light leading-relaxed text-white/40 lg:text-[11px]">
            Screens captured from the MGS Management App. Sites, names and
            scores are demonstration data.
          </p>
        </div>
      </div>
    </section>
  );
}

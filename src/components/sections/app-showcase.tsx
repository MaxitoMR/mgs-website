"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  MapPin,
  ClipboardCheck,
  MessageSquare,
  Shield,
  Clock,
  BarChart3,
  Package,
  PenLine,
  Clock3,
  Languages,
  ArrowRight,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PhoneFrame } from "@/components/shared/phone-frame";
import { AppBeats } from "@/components/sections/app-beats";

/**
 * The app chapter — one continuous dark field, scrolled through in beats.
 *
 * This replaces what used to be two stacked sections (AppPromo on #191919,
 * then AppInTheField on #111111). The seam between them was the problem: it
 * read as two separate pitches about the same product, and it meant the field
 * photographs arrived as an unexplained fragment — you saw the last beat of an
 * inspection with no sense of what led to it.
 *
 * Now it is one canvas, one color, no dividers, no internal background steps.
 * The neighbors on the homepage are both light (ClientPortalCta above,
 * ClosingCta below), so this whole block reads as scrolling into a dark room,
 * hearing one argument, and scrolling back out.
 *
 * MOTION CONTRACT — read before editing:
 * Every element is fully visible in the DOM as authored. Animation is applied
 * only inside `gsap.matchMedia()` on the no-preference branch, and only with
 * `gsap.from()`. Nothing is parked at `opacity-0` in a className. That matters:
 * a `from()` tween that never runs is invisible-to-nobody, whereas a class of
 * `opacity-0` waiting on a tween that never runs is a blank section. The hero
 * uses the opposite pattern and goes blank whenever its timeline doesn't
 * advance. Do not copy that here.
 *
 * The parallax is the differential kind: each masked frame holds a slightly
 * oversized image that drifts against the scroll, so the pictures feel like
 * they're set into the page rather than pasted onto it. `scale(1.14)` on the
 * inner image is the headroom the drift eats — reduce the drift if you reduce
 * the scale, or the crop will show its edges at the extremes.
 *
 * BEATS: claim → product → the turn → the refusal (clip) → the walk (photo) →
 * the handoff (photo) → the terms → the evidence for the terms. The refusal
 * sits between the turn and the photographs on purpose; the note on that block
 * explains why, and moving it after the photos undoes the argument.
 *
 * The captures themselves are derived by `scripts/build-app-captures.mjs` from
 * originals that live in Dropbox, not in the repo. Add a capture there, re-run
 * it, don't hand-optimize files into `public/`.
 */

const APP_STORE_URL =
  "https://apps.apple.com/us/app/mgs-management-app/id6760367154";

const features = [
  { icon: MapPin, label: "GPS Clock In/Out" },
  { icon: ClipboardCheck, label: "QA Inspections" },
  { icon: BarChart3, label: "Site Health Scores" },
  { icon: MessageSquare, label: "In-App Messaging" },
  { icon: Clock, label: "Live Shift Tracking" },
  { icon: Package, label: "Supply Requests" },
  { icon: Shield, label: "Role-Based Access" },
  { icon: Smartphone, label: "Real-Time Dashboard" },
];

/**
 * Copy verified against the app's own strings in
 * `mgs-manager/src/lib/i18n/{en,es}.ts` — `employeeAckHelp` opens with
 * "Opcional." and `signedHint` promises a timestamp. Do not upgrade "can hand
 * the phone over" to "every inspection is signed"; the app doesn't enforce it.
 */
const facts = [
  {
    icon: PenLine,
    title: "Signed by the person who did the work",
    body:
      "The supervisor hands the phone over at the end of the walk. The crew member reads the result, adds notes if they have any, and signs — by typing their name or with a finger.",
  },
  {
    icon: Clock3,
    title: "Timestamped, then submitted",
    body:
      "The acknowledgment is captured with a timestamp before the inspection is filed, so the record shows not just the score but that the crew saw it.",
  },
  {
    icon: Languages,
    title: "English and Spanish",
    body:
      "The app runs fully in either language, chosen per user. Nobody signs off on a result they had to have translated for them.",
  },
];

export function AppShowcase() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);

      // Beat reveals. `from()` so the resting state is the authored DOM —
      // if any of this is skipped, the section still reads normally.
      q("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 34,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Staggered children — feature rows, fact columns.
      q("[data-reveal-group]").forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 22,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });

      // Differential parallax inside each mask — the move that makes a long
      // single-color field feel like depth instead of a list of blocks.
      q("[data-parallax]").forEach((el) => {
        const distance = Number(el.dataset.parallax) || 12;
        gsap.fromTo(
          el,
          { yPercent: -distance / 2 },
          {
            yPercent: distance / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // (The old [data-phone] drift lived here. It moved a static product shot
      // against the copy beside it; that shot is now the pinned sequence, which
      // owns its own motion in app-sequence.tsx. Nothing to drift.)

      return () => {
        // matchMedia's own cleanup reverts the tweens; kill the triggers that
        // belong to this context so a route change doesn't leak listeners.
        ScrollTrigger.getAll().forEach((t) => {
          if (root.contains(t.trigger as Node)) t.kill();
        });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      // `overflow-x-clip`, NOT `overflow-hidden`. Hidden makes this element a
      // scroll container, which silently disables `position: sticky` in every
      // descendant — and the pinned sequence below is sticky. Clip contains the
      // same horizontal overflow without that side effect. The two parallax
      // frames further down carry their own `overflow-hidden`, so nothing
      // escapes by dropping it here.
      className="relative w-full overflow-x-clip bg-brand-dark-deeper"
    >
      {/* One faint grid across the entire field — a shared texture is part of
          what stops the beats reading as separate sections. */}
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
        {/* ── Beat 1 — the claim ───────────────────────────────────────────
            The headline used to share a row with a static phone, and the note
            that used to live here explained how to balance those two columns.
            That problem is gone: the product is now the pinned sequence below,
            which needs the full measure, so the claim opens the chapter on its
            own. */}
        <div
          className="max-w-2xl"
          style={{ paddingTop: "clamp(5rem, 10vw, 8.5rem)" }}
        >
          <div>
            <p data-reveal className="eyebrow mb-5 text-brand-lime">
              Mobile App
            </p>
            <h2
              data-reveal
              className="font-gothic text-white"
              style={{
                fontSize: "clamp(2rem, 4.4vw, 3.75rem)",
                fontWeight: 300,
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
              }}
            >
              Field operations,
              <br />
              <span className="text-brand-green-deep">instrumented.</span>
            </h2>
            <p
              data-reveal
              className="mt-6 text-gray-300"
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              We built the software that runs our field operations: GPS-verified
              clock-ins, digital QA checklists, shift documentation, and supply
              requisitions. Clients log in to see activity at their site in real
              time.
            </p>

          </div>
        </div>

        {/* ── Beat 2 — the product, five compositions ───────────────────────
            Five claims, each one capture with a panel breaking its edge. This
            was a pinned horizontal run (app-sequence.tsx, still in the repo);
            it was replaced because holding five claims inside one viewport
            meant none of them was ever fully readable, and the device had to
            shrink to 272px to fit — so the screen being argued about could not
            be seen. These ship no JavaScript: the reveals come from the
            `data-reveal` pass above. */}
        <div style={{ paddingTop: "clamp(3rem, 6vw, 5rem)" }}>
          <AppBeats />
        </div>

        {/* ── Beat 3 — the turn ────────────────────────────────────────────
            The hinge of the whole chapter: it names what a screenshot can't
            prove, which is what earns the photographs that follow. Without
            this line the field images read as decoration. */}
        <div
          className="max-w-4xl"
          style={{
            paddingTop: "clamp(6rem, 13vw, 11rem)",
            paddingBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          <p
            data-reveal
            className="font-gothic text-white"
            style={{
              fontSize: "clamp(1.625rem, 3.4vw, 2.875rem)",
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Any contractor can show you a screenshot.{" "}
            <span className="text-brand-green-deep">
              This is the part that&apos;s harder to stage.
            </span>
          </p>
        </div>

        {/* ── Beat 4 — the walk ────────────────────────────────────────── */}
        <div data-reveal className="relative">
          <div className="relative h-[clamp(17rem,52vw,34rem)] w-full overflow-hidden bg-black">
            <Image
              src="/images/app-inspection-walk.jpg"
              alt="An MGS supervisor holding a phone while walking an office floor with the crew member who services it"
              fill
              quality={82}
              sizes="100vw"
              className="object-cover"
              // Oversized so the parallax drift has headroom; centred on the
              // pair so both people survive the crop down to phone width.
              style={{
                objectPosition: "50% 42%",
                transform: "scale(1.14)",
                transformOrigin: "center",
              }}
              data-parallax="9"
            />
          </div>
          <p className="mt-5 max-w-2xl text-sm text-gray-300" style={{ lineHeight: 1.65 }}>
            <span className="text-white">The walk.</span>{" "}
            The supervisor scores each area against the site&apos;s checklist
            while standing in it — with the crew member who services the
            building right there.
          </p>
        </div>

        {/* ── Beat 5 — the handoff ─────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
          style={{ paddingTop: "clamp(4rem, 8vw, 7rem)" }}
        >
          <div data-reveal className="lg:col-span-7">
            <div className="relative h-[clamp(17rem,44vw,30rem)] w-full overflow-hidden bg-black">
              <Image
                src="/images/app-signature-capture.jpg"
                alt="A gloved MGS crew member signing the employee acknowledgment on the inspection screen of the MGS Management App"
                fill
                quality={82}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                // Anchored high: the out-of-focus shoulder along the bottom is
                // what gets traded away so the screen fills the frame. Centred,
                // the phone shrinks to roughly half this size.
                style={{
                  objectPosition: "44% 38%",
                  transform: "scale(1.14)",
                  transformOrigin: "center",
                }}
                data-parallax="9"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p data-reveal className="eyebrow mb-5 text-brand-lime">
              The Handoff
            </p>
            <h3
              data-reveal
              className="font-gothic text-white"
              style={{
                fontSize: "clamp(1.625rem, 2.9vw, 2.5rem)",
                fontWeight: 300,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
              }}
            >
              The inspection closes{" "}
              <span className="text-brand-green-deep">with the crew,</span> not
              behind them.
            </h3>
            <p
              data-reveal
              className="mt-5 text-gray-300"
              style={{ fontWeight: 300, lineHeight: 1.7 }}
            >
              A QA score written up after the supervisor leaves is an opinion.
              Here it isn&apos;t filed until the person who did the work has read
              it and signed — in the language they actually speak.
            </p>
          </div>
        </div>

        {/* ── Beat 6 — the terms ───────────────────────────────────────── */}
        <div
          data-reveal-group
          className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-3"
          style={{
            paddingTop: "clamp(4rem, 8vw, 6.5rem)",
          }}
        >
          {facts.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title}>
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 text-brand-green-deep"
                  strokeWidth={1.5}
                />
                <h4 className="mt-4 text-base font-semibold text-white">
                  {f.title}
                </h4>
                <p
                  className="mt-2 text-sm text-gray-300"
                  style={{ fontWeight: 300, lineHeight: 1.65 }}
                >
                  {f.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── The evidence for the bilingual claim ─────────────────────────
            Only two frames, not three. The signature and the timestamps are
            already shown full-size in the pinned sequence above, so a third
            frame here would be the same screen twice in one chapter. The
            English/Spanish claim is the one that still needs showing, because
            the proof IS the pair — the identical screen, rendered twice. */}
        <div
          data-reveal-group
          className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-12 sm:grid-cols-2"
          style={{ paddingTop: "clamp(3.5rem, 7vw, 5.5rem)" }}
        >
          {[
            {
              src: "/images/app-screenshots/locations-health-en.webp",
              alt: "The Locations screen of the MGS Management App in English, showing three sites with health scores and an average of 78",
              label: "English",
            },
            {
              src: "/images/app-screenshots/locations-health-es.webp",
              alt: "The identical Locations screen of the MGS Management App in Spanish, headed Ubicaciones, showing the same three sites and the same average of 78",
              label: "Español",
            },
          ].map((shot) => (
            <figure key={shot.label} className="m-0">
              <PhoneFrame size="sm">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover object-top"
                  sizes="216px"
                />
              </PhoneFrame>
              <figcaption className="mt-4 text-center text-sm text-gray-400">
                {shot.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          className="flex flex-col items-start gap-6"
          style={{
            paddingTop: "clamp(3.5rem, 7vw, 5rem)",
            paddingBottom: "clamp(5rem, 10vw, 8.5rem)",
          }}
        >
          <Link
            data-reveal
            href="/app"
            className="group inline-flex items-center gap-2 border-b border-white/20 pb-1 text-sm text-white transition-colors hover:border-brand-lime hover:text-brand-lime"
          >
            See every screen in the app
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>

          {/* Same register and weight as the "Free · iOS 15.1+" line above.
              The sites, names and scores in every capture are seeded demo
              data; saying so once is cheaper than being asked. */}
          <p className="max-w-md text-[11px] font-light leading-relaxed text-white/40">
            Screens captured from the MGS Management App. Sites, names and
            scores are demonstration data.
          </p>
        </div>

        {/* The spec, then the download — the chapter closes on what the
            reader can actually do. It used to sit directly under the beats,
            which put a download button in front of someone who still had
            five sections of argument to read. */}
        <div style={{
          paddingTop: "clamp(4rem, 8vw, 6.5rem)",
          paddingBottom: "clamp(5rem, 10vw, 8.5rem)",
        }}>
          <div className="max-w-4xl">
            <div
              data-reveal-group
              className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4"
            >
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="flex items-center gap-2.5">
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 flex-shrink-0 text-brand-green-deep"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm text-gray-300">{f.label}</span>
                  </div>
                );
              })}
            </div>

            <div data-reveal-group className="mt-9 flex flex-wrap gap-2">
              {["Admin", "Supervisor", "Employee", "Client"].map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70"
                >
                  {role}
                </span>
              ))}
            </div>

            <div data-reveal className="mt-9">
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
                  <span className="text-[10px] font-light leading-none">
                    Download on the
                  </span>
                  <span className="text-[16px] font-semibold leading-tight">
                    App Store
                  </span>
                </div>
              </a>
              <p className="mt-3 text-[11px] font-light text-white/40">
                Free &middot; iOS 15.1+ &middot; iPhone, iPad &amp; Apple Vision
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

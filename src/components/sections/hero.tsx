"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

// Stats moved up from the old standalone bar into the hero.
const heroStats = [
  { value: "100+", label: "Facilities Maintained", sub: "across commercial, medical & industrial portfolios" },
  { value: "99.8%", label: "QA Inspection Score", sub: "measured across recurring site audits" },
  { value: "20", label: "Years In Operation", sub: "serving greater Houston since 2006" },
  { value: "24/7", label: "Emergency Response", sub: "spill, flood & biohazard events" },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Eyebrow — slide in from left with a line wipe
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6 },
        0.3
      );

      // Heading lines — each line clips up from below
      const lines = headingRef.current?.querySelectorAll(".hero-line");
      if (lines) {
        tl.fromTo(
          lines,
          { opacity: 0, y: 60, rotateX: 15 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15 },
          0.5
        );
      }

      // Subtitle — fade up
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.1
      );

      // Hero stats — stagger in from below
      const statItems = ctaRef.current?.querySelectorAll(".hero-stat");
      if (statItems) {
        tl.fromTo(
          statItems,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          1.3
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center overflow-hidden"
      style={{ minHeight: 'clamp(28rem, 70vh, 48rem)' }}
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

      {/* Hero film — the five-shot loop from the 2026-08-07 shoot. Layered ON
          TOP of the still rather than replacing it, so the photo stays the
          fallback for the cases a video has no answer to: autoplay refused
          (iOS Low Power Mode), decode unsupported, or the file still in
          flight. `muted` + `playsInline` are what make mobile autoplay legal
          at all — dropping either one leaves phones on the poster frame. */}
      <video
        className="absolute inset-0 z-[10] h-full w-full object-cover"
        src="/videos/hero-mgs.mp4"
        poster="/videos/hero-mgs-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Two scrims doing different jobs. The horizontal one buys legibility
          for the headline, which sits left — so it is heavy at the left edge
          and clears by the right, leaving the worker and the corridor visible
          rather than flattening the whole photo. The vertical one only darkens
          the top and bottom edges, for the nav above and the CTAs below. */}
      <div
        className="absolute inset-0 z-[21]"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.72) 28%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.18) 78%, rgba(0,0,0,0.10) 100%),' +
            'linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.42) 100%)',
        }}
      />

      <div className="relative z-50 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-14">
        <div className="max-w-5xl">
          <p ref={eyebrowRef} className="eyebrow text-brand-lime mb-5 opacity-0">
            Est. 2006
          </p>

          <h1
            ref={headingRef}
            className="font-gothic text-[#FBFBFE] hero-text-shadow"
            style={{
              fontSize: 'clamp(2.125rem, 4.1vw, 3.625rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              perspective: '600px',
            }}
          >
            <span className="hero-line inline-block opacity-0">Janitorial services,</span>
            <br />
            <span className="hero-line inline-block opacity-0 text-brand-green-deep">engineered to</span>
            <br />
            <span className="hero-line inline-block opacity-0">a measurable standard.</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-gray-300 mt-5 mb-8 max-w-xl opacity-0"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Since 2006, MGS Supply &amp; Services has maintained commercial, medical,
            and industrial facilities across greater Houston — every visit verified
            against a documented QA protocol, every crew accountable to it.
          </p>

          {/* Stats — pulled up from the old standalone bar. Floating CTAs cover
              the call-to-action, so the hero closes on proof instead. */}
          <div
            ref={ctaRef}
            className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-6 sm:flex sm:flex-wrap sm:gap-x-12 lg:gap-x-16"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="hero-stat opacity-0">
                <div
                  className="font-gothic text-brand-lime"
                  style={{ fontSize: "clamp(1.625rem, 2.6vw, 2.25rem)", fontWeight: 300, lineHeight: 1 }}
                >
                  {s.value}
                </div>
                <div className="mt-2 text-sm font-semibold text-white">{s.label}</div>
                {/* Sub-caption hidden on phones to keep the hero uncluttered
                    (matches the old stats bar's mobile behavior). */}
                <div
                  className="mt-0.5 hidden max-w-[12rem] text-xs text-gray-300 sm:block"
                  style={{ fontWeight: 300, lineHeight: 1.4 }}
                >
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

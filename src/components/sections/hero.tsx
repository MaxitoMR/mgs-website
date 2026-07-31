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
          object-position favours the right so the worker and the doorway
          survive the crop on narrow viewports, where centre-cropping would
          push the subject off-screen. */}
      <Image
        src="/images/hero-medical-floor-care.jpg"
        alt="An MGS technician running a floor machine in a medical facility corridor"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: '62% center' }}
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

      <div className="relative z-50 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="max-w-5xl">
          <p ref={eyebrowRef} className="eyebrow text-[#9FD01B] mb-5 opacity-0">
            Est. 2006
          </p>

          <h1
            ref={headingRef}
            className="font-gothic text-[#FBFBFE] hero-text-shadow"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              perspective: '600px',
            }}
          >
            <span className="hero-line inline-block opacity-0">Janitorial services,</span>
            <br />
            <span className="hero-line inline-block opacity-0 text-[#69AF23]">engineered to</span>
            <br />
            <span className="hero-line inline-block opacity-0">a measurable standard.</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-gray-300 mt-7 mb-10 max-w-xl opacity-0"
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
            className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-8 sm:flex sm:flex-wrap sm:gap-x-12 lg:gap-x-16"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="hero-stat opacity-0">
                <div
                  className="font-gothic text-[#9FD01B]"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 300, lineHeight: 1 }}
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

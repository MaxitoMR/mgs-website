"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const SUPABASE_PROJECT_REF = 'uuvspvqebodievfkwwss';
const heroVideos = [
  `https://${SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/hero-videos/mgs-hero-vid-1.mp4`,
  `https://${SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/hero-videos/mgs-hero-vid-2.mp4`,
  `https://${SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/hero-videos/mgs-hero-vid-3.mp4`,
  `https://${SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/hero-videos/mgs-hero-vid-4.mp4`,
  `https://${SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/hero-videos/mgs-hero-vid-5.mp4`,
];

function HeroVideo() {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const [activePlayer, setActivePlayer] = useState(0);
  const currentIndexRef = useRef(0);
  const activePlayerRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video1 = videoRef1.current;
    if (video1) {
      video1.src = heroVideos[0];
      video1.playbackRate = 0.6;
      video1.play().catch(() => {});
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % heroVideos.length;
      const nextVideo = activePlayerRef.current === 0 ? videoRef2.current : videoRef1.current;
      if (nextVideo) {
        nextVideo.src = heroVideos[nextIndex];
        nextVideo.playbackRate = 0.6;
        nextVideo.play().catch(() => {});
      }
      activePlayerRef.current = activePlayerRef.current === 0 ? 1 : 0;
      currentIndexRef.current = nextIndex;
      setActivePlayer(activePlayerRef.current);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-10">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <p className="text-gray-400 font-light">Loading videos...</p>
        </div>
      )}
      <video
        ref={videoRef1}
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
        style={{ opacity: activePlayer === 0 ? 1 : 0 }}
      />
      <video
        ref={videoRef2}
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
        style={{ opacity: activePlayer === 1 ? 1 : 0 }}
      />
    </div>
  );
}

// Stats moved up from the old standalone bar into the hero.
const heroStats = [
  { value: "100+", label: "Facilities Cleaned", sub: "offices, clinics & industrial sites around Houston" },
  { value: "99.8%", label: "QA Inspection Score", sub: "averaged across our site inspections" },
  { value: "20", label: "Years In Business", sub: "since 2006" },
  { value: "24/7", label: "Emergency Line", sub: "for spills, floods & urgent calls" },
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
      <HeroVideo />

      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: "url('/images/imaging_1751323808587.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }}
      />

      <div
        className="absolute inset-0 z-[21]"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)',
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
            <span className="hero-line inline-block opacity-0">Cleaning crews</span>
            <br />
            <span className="hero-line inline-block opacity-0 text-[#69AF23]">you can actually</span>
            <br />
            <span className="hero-line inline-block opacity-0">count on.</span>
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
            We&apos;ve been cleaning Houston-area facilities since 2006 — offices,
            clinics, warehouses. Our crews show up on time, do the work, and tell
            you when something&apos;s off.
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

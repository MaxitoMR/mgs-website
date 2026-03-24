"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const [currentIndex, setCurrentIndex] = useState(0);
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
      const nextIndex = (currentIndex + 1) % heroVideos.length;
      const nextVideo = activePlayer === 0 ? videoRef2.current : videoRef1.current;
      if (nextVideo) {
        nextVideo.src = heroVideos[nextIndex];
        nextVideo.playbackRate = 0.6;
        nextVideo.play().catch(() => {});
      }
      setActivePlayer(activePlayer === 0 ? 1 : 0);
      setCurrentIndex(nextIndex);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, activePlayer]);

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

export function HeroSection() {
  return (
    <section className="relative w-full flex items-center overflow-hidden" style={{ minHeight: 'clamp(28rem, 70vh, 48rem)' }}>
      {/* Video Background */}
      <HeroVideo />

      {/* Hero overlay image at 40% opacity */}
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: "url('/attached_assets/MGS_HERO_VID_4_frame_cropped.jpg')",
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          opacity: 0.4,
        }}
      />

      {/* ExxonMobil-style gradient overlay — darker at bottom for text legibility */}
      <div
        className="absolute inset-0 z-[21]"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Text Content — vertically centered, left-aligned */}
      <div className="relative z-50 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="eyebrow text-[#9FD01B] mb-5">
Est. 2006
          </p>

          {/* Main heading — large Pfizer-style */}
          <h1
            className="font-gothic text-[#FBFBFE] hero-text-shadow"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Leaders In
            <br />
            <span className="text-[#69AF23]">Methodical</span>
            <br />
            Precision Cleaning
          </h1>

          {/* Subtitle */}
          <p
            className="text-gray-300 mt-7 mb-10 max-w-xl"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Comprehensive facility management for commercial, medical,
            and industrial environments with proven expertise since 2006.
          </p>

          {/* ExxonMobil-style CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 bg-[#69AF23] px-8 py-4 text-white font-medium tracking-wide transition-all duration-300 hover:bg-[#5a9a1e] hover:shadow-lg text-base"
            >
              Get a Free Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 px-8 py-4 text-white font-light tracking-wide transition-all duration-300 hover:border-white hover:bg-white/10 text-base"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

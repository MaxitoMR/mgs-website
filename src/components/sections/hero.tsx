"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight, ChevronDown } from "lucide-react";
import { COMPANY, CLOUDFLARE_STREAMS } from "@/lib/constants";
import { VideoPlayer } from "@/components/shared/video-player";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
      {count}{suffix}
    </div>
  );
}

const stats = [
  { value: 500, suffix: "+", label: "Facilities Served" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Client Retention" },
  { value: 24, suffix: "/7", label: "Emergency Response" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <VideoPlayer
          src={CLOUDFLARE_STREAMS.hero}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        {/* Subtle green overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-green/5 to-transparent" />
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full pt-24 pb-32">
          <div className="max-w-4xl">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="glass inline-flex items-center gap-2 rounded-none px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.15em] text-brand-lime">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-none bg-brand-lime opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-none bg-brand-lime" />
                </span>
                Enterprise-Grade Facility Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-display text-5xl font-extrabold leading-[1em] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Professional
              <br />
              <span className="text-gradient">Janitorial</span> Services
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-gray-300/90 md:text-xl"
            >
              Commercial, medical, and industrial cleaning solutions trusted by
              leading facilities across Texas. Certified teams. Proven results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/quote"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-none bg-gradient-to-r from-brand-green to-brand-lime px-10 py-5 text-lg font-bold text-white shadow-xl shadow-brand-green/20 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-green/30 hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get a Free Quote
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-lime to-brand-green opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="glass inline-flex items-center justify-center gap-2 rounded-none px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5" />
                Call {COMPANY.phone.display}
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, delay: 1.0 }}
              className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-400"
            >
              {[
                "Licensed & Insured",
                "24/7 Emergency Services",
                "AEPA Approved Vendor",
                "Certified Teams",
              ].map((badge) => (
                <span key={badge} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-none bg-brand-lime shadow-[0_0_6px_rgba(159,208,27,0.6)]" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Glassmorphic Stats Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 lg:max-w-3xl"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.25 + i * 0.1 }}
                className="glass rounded-none p-5 text-center transition-all duration-300 hover:bg-white/10"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.75 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-gray-400">Scroll</span>
          <ChevronDown className="h-5 w-5 text-brand-lime" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

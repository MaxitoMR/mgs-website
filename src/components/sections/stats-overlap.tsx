"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { RipplePattern } from "@/components/shared/droplet-accent";

const stats = [
  { value: 100, suffix: "+", label: "Facilities Cleaned", description: "offices, clinics & industrial sites around Houston" },
  { value: 99.8, suffix: "%", label: "QA Inspection Score", description: "averaged across our site inspections" },
  { value: 20, suffix: "", label: "Years In Business", description: "since 2006" },
  { value: 24, suffix: "/7", label: "Emergency Line", description: "for spills, floods & urgent calls" },
];

export function StatsOverlap() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each stat card sliding up with stagger
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Animate number countups
      stats.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            const display = stat.value % 1 !== 0
              ? obj.val.toFixed(1)
              : Math.floor(obj.val).toString();
            el.textContent = display + stat.suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-paper border-b border-gray-100 overflow-hidden">
      <RipplePattern color="#69AF23" opacity={0.12} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-card opacity-0">
              <div
                ref={(el) => { numberRefs.current[i] = el; }}
                className="t-stat-lg font-gothic text-[#69AF23]"
              >
                0{stat.suffix}
              </div>
              <p className="font-medium text-gray-900 mt-2 text-sm lg:text-base">
                {stat.label}
              </p>
              <p className="hidden sm:block text-gray-500 mt-1 text-xs lg:text-sm" style={{ fontWeight: 300 }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

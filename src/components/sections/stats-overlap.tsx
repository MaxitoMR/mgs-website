"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 500, suffix: "+", label: "Facilities Managed", description: "across commercial, medical & industrial sectors" },
  { value: 99.8, suffix: "%", label: "Service Reliability", description: "consistent quality every visit" },
  { value: 30, suffix: "", label: "Years Experience", description: "trusted since 2006" },
  { value: 24, suffix: "/7", label: "Emergency Response", description: "always available when you need us" },
];

export function StatsOverlap() {
  return (
    <section className="w-full bg-[#FBFBFE] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className="font-gothic text-[#69AF23]"
                style={{
                  fontSize: 'clamp(2.25rem, 3.5vw, 3.5rem)',
                  fontWeight: 300,
                  lineHeight: 1,
                }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-medium text-gray-900 mt-2 text-sm lg:text-base">
                {stat.label}
              </p>
              <p className="text-gray-500 mt-1 text-xs lg:text-sm" style={{ fontWeight: 300 }}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

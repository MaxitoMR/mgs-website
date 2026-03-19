"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  Award,
  Users,
  CheckCircle,
  Zap,
} from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";

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
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { value: 500, suffix: "+", label: "Facilities Served" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Client Retention" },
  { value: 50, suffix: "+", label: "Certified Staff" },
];

const features = [
  {
    icon: Shield,
    title: "Certified & Insured",
    description:
      "Fully licensed, bonded, and insured with comprehensive coverage for every project.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Rapid deployment teams available around the clock for scheduled and emergency services.",
  },
  {
    icon: Award,
    title: "AEPA Approved Vendor",
    description:
      "Active vendor certification ensuring compliance with the highest industry standards.",
  },
  {
    icon: Users,
    title: "Trained Professionals",
    description:
      "Every team member undergoes rigorous training, background checks, and ongoing education.",
  },
  {
    icon: CheckCircle,
    title: "ATP Testing Verified",
    description:
      "Scientific verification of cleaning results with documented ATP testing protocols.",
  },
  {
    icon: Zap,
    title: "Advanced Equipment",
    description:
      "Industrial-grade equipment and EPA-registered hospital-grade disinfectants.",
  },
];

export function WhyChooseUs() {
  return (
    <>
      {/* Stats Section - Dark */}
      <section className="relative overflow-hidden bg-brand-dark py-[60px] md:py-[80px] lg:py-[100px]">
        <div className="absolute inset-0 grid-pattern" />
        {/* Subtle green glow */}
        <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-green/5 blur-[100px]" />
        <div className="absolute right-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-lime/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.125 }}
                className="text-center"
              >
                <div className="font-display text-5xl font-extrabold tracking-[-0.02em] text-white md:text-6xl lg:text-7xl">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <SectionWrapper className="bg-gray-50/80">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="subtitle inline-block text-brand-green"
          >
            Why Choose MGS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="mt-4 font-display text-4xl font-extrabold tracking-[-0.02em] text-gray-900 sm:text-5xl"
          >
            The MGS Difference
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1 + index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-premium transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-1"
            >
              {/* Hover gradient accent */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-brand-green to-brand-lime opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative mb-5 inline-flex">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green/10 to-brand-lime/5 text-brand-green transition-all duration-500 group-hover:shadow-green-glow">
                  <feature.icon className="h-7 w-7" />
                </div>
              </div>
              <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

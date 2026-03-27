"use client";

import { useEffect, useRef } from "react";
import { Shield, Leaf, Award, ShieldCheck, UserCheck, Clock } from "lucide-react";
import { gsap } from "@/lib/gsap";

const certifications = [
  {
    icon: Shield,
    label: "OSHA Compliant",
    description:
      "Full compliance with Occupational Safety and Health Administration standards across all operations.",
  },
  {
    icon: Leaf,
    label: "EPA Registered Products",
    description:
      "Exclusively using Environmental Protection Agency registered cleaning and disinfection products.",
  },
  {
    icon: Award,
    label: "ISSA Member",
    description:
      "Proud member of the International Sanitary Supply Association, the cleaning industry authority.",
  },
  {
    icon: ShieldCheck,
    label: "Fully Insured & Bonded",
    description:
      "Comprehensive liability coverage and bonding for complete peace of mind on every project.",
  },
  {
    icon: UserCheck,
    label: "Background Checked Staff",
    description:
      "Every team member passes thorough background screening before entering your facility.",
  },
  {
    icon: Clock,
    label: "24/7 Emergency Response",
    description:
      "Round-the-clock availability for emergency cleaning, spill response, and urgent facility needs.",
  },
];

export function TrustBadges() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".tb-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      // Cards stagger
      gsap.fromTo(
        ".tb-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".tb-grid",
            start: "top 82%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "#f5f5f5",
        paddingTop: "clamp(4rem, 8vw, 8rem)",
        paddingBottom: "clamp(4rem, 8vw, 8rem)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="tb-header eyebrow mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#69AF23] opacity-0">
            Trusted &amp; Certified
          </p>
          <h2
            className="tb-header font-gothic text-gray-900 opacity-0"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            Industry-recognized standards.
          </h2>
        </div>

        {/* Grid */}
        <div className="tb-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="tb-card group flex items-start gap-5 rounded-sm bg-white p-7 opacity-0 transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Icon container */}
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(105, 175, 35, 0.1)",
                    borderRadius: "0.5rem",
                  }}
                >
                  <Icon className="h-5 w-5 text-[#69AF23]" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-[0.95rem] font-semibold text-gray-900">
                    {item.label}
                  </h3>
                  <p
                    className="mt-1.5 text-sm text-gray-500"
                    style={{ fontWeight: 300, lineHeight: 1.65 }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

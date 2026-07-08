"use client";

import { useEffect, useRef } from "react";
import { Shield, Microscope, Award, Clock } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const features = [
  {
    icon: Shield,
    color: "#69AF23",
    title: "Compliant by Design",
    description: "Every product carries EPA registration; every crew operates to OSHA standards. In regulated environments — surgical suites, laboratories, food-adjacent spaces — compliance is documented, not assumed.",
  },
  {
    icon: Microscope,
    color: "#19A0DB",
    title: "Verified, Not Assumed",
    description: "ATP bioluminescence testing confirms a surface is clean at the microbial level, not merely to the eye. A failed reading triggers re-cleaning before sign-off. UV-C and electrostatic disinfection are deployed where the risk profile warrants.",
  },
  {
    icon: Award,
    color: "#9FD01B",
    title: "A Measured Track Record",
    description: "100-plus facilities maintained across commercial, medical, and industrial portfolios — each scored against recurring QA audits and reported back to the client.",
  },
  {
    icon: Clock,
    color: "#FF8F00",
    title: "Response, Around the Clock",
    description: "A line staffed 24/7 for spill, flood, and biohazard events. Facility risk does not observe business hours, and neither does our response.",
  },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header text reveal
      gsap.fromTo(
        ".wcu-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true },
        }
      );

      // Cards — stagger from bottom with a slight rotation
      gsap.fromTo(
        ".wcu-card",
        { opacity: 0, y: 40, rotateY: 8 },
        {
          opacity: 1, y: 0, rotateY: 0,
          duration: 0.7, stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".wcu-grid", start: "top 95%", once: true },
        }
      );

      // Accent line width animation on each card
      gsap.fromTo(
        ".wcu-accent",
        { width: "0%" },
        {
          width: "30%",
          duration: 0.8, stagger: 0.12,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".wcu-grid", start: "top 95%", once: true },
          delay: 0.5,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#111111]"
      style={{
        paddingTop: 'clamp(5rem, 10vw, 10rem)',
        paddingBottom: 'clamp(5rem, 10vw, 10rem)',
        borderTopLeftRadius: 'clamp(2.5rem, 5vw, 8rem)',
      }}
    >

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-20">
          <div>
            <p className="wcu-header eyebrow text-[#9FD01B] mb-4 opacity-0">
              Why MGS
            </p>
            <h2
              className="wcu-header font-gothic text-white opacity-0"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1.1 }}
            >
              Why facilities{' '}
              <span className="text-[#69AF23]">standardize on us.</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="wcu-header text-gray-400 text-base opacity-0" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              Most contractors staff by availability. We assign a dedicated crew to
              each site, accountable to the same documented protocol on every visit —
              so performance stays consistent, and consistency stays verifiable.
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="wcu-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ perspective: '800px' }}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="wcu-card group relative p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 opacity-0"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '2.5rem 0.25rem 0.25rem 0.25rem',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${feature.color}15`, borderTopLeftRadius: '1rem' }}
                >
                  <Icon className="h-6 w-6" style={{ color: feature.color }} />
                </div>

                <h3 className="text-white mb-3 text-lg font-medium">{feature.title}</h3>
                <p className="text-gray-400 text-sm" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                  {feature.description}
                </p>

                {/* Animated accent line */}
                <div
                  className="wcu-accent absolute bottom-0 left-0 h-1 group-hover:!w-full"
                  style={{ background: feature.color, width: '0%', transition: 'width 0.5s ease' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

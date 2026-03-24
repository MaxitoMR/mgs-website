"use client";

import { motion } from "framer-motion";
import { Shield, Microscope, Award, Clock } from "lucide-react";
import { DropletAccent } from "@/components/shared/droplet-accent";

const features = [
  {
    icon: Shield,
    color: "#69AF23",
    title: "Industry Certified Standards",
    description: "OSHA compliant, EPA registered products, and comprehensive quality assurance protocols for every facility we service.",
  },
  {
    icon: Microscope,
    color: "#2196F3",
    title: "Advanced Technology",
    description: "ATP testing verification, UV-C disinfection, and electrostatic application systems — science-driven cleaning.",
  },
  {
    icon: Award,
    color: "#9FD01B",
    title: "Proven Track Record",
    description: "500+ facilities managed with 99.8% service reliability across commercial, medical, and industrial sectors.",
  },
  {
    icon: Clock,
    color: "#FF8F00",
    title: "24/7 Availability",
    description: "Emergency response teams ready around the clock. We're always here when your facility needs us most.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#1a252f]"
      style={{
        paddingTop: 'clamp(5rem, 10vw, 10rem)',
        paddingBottom: 'clamp(5rem, 10vw, 10rem)',
        borderTopLeftRadius: 'clamp(2.5rem, 5vw, 8rem)',
      }}
    >
      {/* Subtle leaf-vein pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 60px 60px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow text-[#9FD01B] mb-4"
            >
              <DropletAccent color="#9FD01B" size={13} />
              Why MGS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-gothic text-white"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              Why industry leaders{' '}
              <span className="text-[#69AF23]">choose us.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-end"
          >
            <p className="text-gray-400 text-base" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              Our focus on precision, technology, and accountability sets us apart.
              We don&apos;t just clean facilities — we protect your investment and
              maintain the standards your operation demands.
            </p>
          </motion.div>
        </div>

        {/* Feature cards — 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-8 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2rem 0.5rem 0.5rem 0.5rem',
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${feature.color}15`,
                    borderTopLeftRadius: '1rem',
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: feature.color }} />
                </div>

                <h3 className="text-white mb-3 text-lg font-medium">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                  {feature.description}
                </p>

                {/* Accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: feature.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

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

const stats = [
  { value: "500+", label: "Facilities Served" },
  { value: "15+", label: "Years Experience" },
  { value: "24/7", label: "Emergency Response" },
  { value: "99%", label: "Client Retention" },
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
    <SectionWrapper className="bg-gray-50">
      {/* Stats bar */}
      <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display text-4xl font-bold text-brand-green md:text-5xl">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm font-bold uppercase tracking-widest text-brand-green"
        >
          Why Choose MGS
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl"
        >
          The MGS Difference
        </motion.h2>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-gray-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

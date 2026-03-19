import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { CtaBanner } from "@/components/sections/cta-banner";
import {
  Wind,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Scent Diffusers",
  description:
    "Advanced scent diffusion technology for commercial spaces. Create welcoming environments with our professional diffuser systems.",
};

const features = [
  {
    icon: Wind,
    title: "Advanced Diffusion Technology",
    description:
      "Cold-air nebulization delivers consistent, long-lasting fragrance without heat, residue, or waste.",
  },
  {
    icon: Shield,
    title: "Safe & Compliant",
    description:
      "Hypoallergenic, IFRA-compliant essential oil blends safe for commercial environments.",
  },
  {
    icon: Clock,
    title: "Programmable Schedules",
    description:
      "Set custom schedules to match your facility's operating hours for maximum efficiency.",
  },
];

const benefits = [
  "Enhanced customer and visitor experience",
  "Improved employee well-being and productivity",
  "Elimination of unwanted facility odors",
  "Customizable scent profiles for your brand",
  "Low maintenance with automatic refills",
  "Coverage for spaces up to 5,000 sq ft per unit",
];

export default function DiffusersPage() {
  return (
    <>
      <PageHeader
        title="Scent Diffusers"
        subtitle="Elevate your facility experience with advanced scent diffusion technology."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Diffusers" },
        ]}
      />

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-2">
          <MotionWrapper>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-green">
              Premium Scenting
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Transform Your Space
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              First impressions matter. Our commercial-grade scent diffusion
              systems create welcoming, memorable environments that leave lasting
              impressions on visitors, clients, and employees.
            </p>

            <div className="mt-8 space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <div className="rounded-2xl bg-gradient-to-br from-brand-green to-brand-lime p-8 text-white">
              <h3 className="font-display text-2xl font-bold">Key Benefits</h3>
              <ul className="mt-6 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/quote"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-brand-green transition-all hover:bg-gray-50"
              >
                Request a Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </SectionWrapper>

      <CtaBanner />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import {
  Briefcase,
  GraduationCap,
  Heart,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the MGS Supply & Services team. We offer competitive wages, advancement opportunities, and a supportive work environment.",
};

const benefits = [
  {
    icon: Briefcase,
    title: "Competitive Wages",
    description: "Industry-leading pay with regular performance-based increases.",
  },
  {
    icon: GraduationCap,
    title: "Training & Certification",
    description:
      "Access training resources and materials. Earn industry certifications on the job.",
  },
  {
    icon: TrendingUp,
    title: "Advancement Opportunities",
    description: "Clear career paths from team member to team lead to management.",
  },
  {
    icon: Heart,
    title: "Supportive Culture",
    description:
      "A family-oriented workplace where every team member is valued and respected.",
  },
];

const openPositions = [
  {
    title: "Janitorial Team Member",
    type: "Full-Time / Part-Time",
    location: "Katy / Houston, TX",
  },
  {
    title: "Medical Facility Cleaning Specialist",
    type: "Full-Time",
    location: "Houston, TX",
  },
  {
    title: "Floor Care Technician",
    type: "Full-Time",
    location: "Katy, TX",
  },
  {
    title: "Team Lead — Industrial Division",
    type: "Full-Time",
    location: "Houston Metro Area",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Careers at MGS"
        subtitle="Apply to join the MGS professional cleaning team. Build a career with purpose."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers" },
        ]}
      />

      <SectionWrapper>
        <div className="text-center">
          <MotionWrapper>
            <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Work With Us?
            </h2>
          </MotionWrapper>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <MotionWrapper key={benefit.title} delay={i * 0.1}>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-brand-green/10 text-brand-green">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-gray-50">
        <h2 className="mb-8 font-display text-2xl font-bold text-gray-900">
          Open Positions
        </h2>
        <div className="space-y-4">
          {openPositions.map((position) => (
            <MotionWrapper key={position.title}>
              <div className="flex flex-col items-start justify-between gap-4 rounded-none bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-900">
                    {position.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {position.type} &bull; {position.location}
                  </p>
                </div>
                <Link
                  href="/employee-application"
                  className="group inline-flex items-center gap-2 rounded-none bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-lime"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

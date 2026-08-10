import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { WalkthroughForm } from "@/components/forms/walkthrough-form";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Phone, Clock, MapPin, Shield, CheckCircle } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Schedule a Walkthrough",
  description:
    "Schedule a free facility walkthrough with MGS Supply & Services. Our team will assess your space and provide a customized cleaning proposal.",
};

export default function WalkthroughPage() {
  return (
    <>
      <PageHeader
        title="Schedule a Walkthrough"
        subtitle="Book a free on-site assessment of your facility. We'll evaluate your space and deliver a customized cleaning plan."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Schedule Walkthrough" },
        ]}
      />

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <WalkthroughForm />
          </div>

          <div className="space-y-6">
            {/* CTA Card */}
            <div className="bg-brand-green-deep p-6 text-brand-on-green shadow-lg">
              <h3 className="font-display text-xl font-bold">
                Prefer to Call?
              </h3>
              {/* on-green, not white — white/90 is 2.27:1 on #80B515. */}
              <p className="mt-2 text-brand-on-green/90">
                Speak directly with our team to schedule your walkthrough over the phone.
              </p>
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="mt-4 flex min-h-11 items-center gap-2 text-lg font-bold"
              >
                <Phone className="h-5 w-5" />
                {COMPANY.phone.display}
              </a>
            </div>

            {/* How it works */}
            <div className="border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-gray-900">
                How It Works
              </h3>
              <ul className="mt-4 space-y-5">
                {[
                  {
                    icon: Clock,
                    title: "1. Schedule your visit",
                    text: "Pick a date and time that works for you. We'll confirm within 24 hours.",
                  },
                  {
                    icon: MapPin,
                    title: "2. On-site assessment",
                    text: "Our team visits your facility for a thorough 45-90 minute walkthrough.",
                  },
                  {
                    icon: Shield,
                    title: "3. Custom proposal",
                    text: "We deliver a detailed cleaning plan with transparent pricing — no obligations.",
                  },
                  {
                    icon: CheckCircle,
                    title: "4. Start service",
                    text: "Approve the plan and we begin servicing your facility on your schedule.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green-text" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{title}</p>
                      <p className="text-xs text-gray-500">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust signals */}
            <div className="border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-gray-900">
                Why a Walkthrough?
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Every facility is different. Our on-site assessment lets us understand your
                specific needs — from traffic patterns to specialized areas like medical suites
                or industrial floors — so we can deliver a cleaning plan that actually fits.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["100% Free", "No Obligation", "Same-Week Available", "Bilingual Team"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-xs font-medium text-brand-green-text bg-brand-green/8 border border-brand-green/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

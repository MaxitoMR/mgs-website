import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { WalkthroughForm } from "@/components/forms/walkthrough-form";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Phone, Clock, MapPin, Shield, CheckCircle } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Schedule a Walkthrough",
  description:
    "Book a free on-site assessment. We measure the actual square footage, surfaces and traffic, then price against that.",
};

export default function WalkthroughPage() {
  return (
    <>
      <PageHeader
        title="Schedule a Walkthrough"
        subtitle="We measure the actual square footage, surfaces and traffic, then price against that."
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
                Prefer to book it over the phone? The line is staffed around the clock.
              </p>
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="mt-4 flex min-h-11 items-center gap-2 text-xl font-bold lg:text-lg"
              >
                <Phone className="h-5 w-5" />
                {COMPANY.phone.display}
              </a>
            </div>

            {/* How it works */}
            <div className="border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-xl font-bold text-gray-900 lg:text-lg">
                How It Works
              </h3>
              <ul className="mt-4 space-y-5">
                {[
                  {
                    icon: Clock,
                    title: "1. Schedule your visit",
                    text: "Pick a date and time. We confirm within 24 hours.",
                  },
                  {
                    icon: MapPin,
                    title: "2. On-site assessment",
                    text: "A 45–90 minute walkthrough, depending on the size of the site.",
                  },
                  {
                    icon: Shield,
                    title: "3. Custom proposal",
                    text: "A detailed plan with itemized pricing. No obligation.",
                  },
                  {
                    icon: CheckCircle,
                    title: "4. Start service",
                    text: "Approve the plan and we start on your schedule.",
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
              <h3 className="font-display text-xl font-bold text-gray-900 lg:text-lg">
                Why a Walkthrough?
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Traffic patterns, medical suites, industrial floors — what sets the price is
                what you can only see on site. That is what the walkthrough is for.
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

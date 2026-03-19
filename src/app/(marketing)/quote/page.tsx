import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { QuoteForm } from "@/components/forms/quote-form";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Phone, Clock, Shield } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request a free custom quote for professional janitorial services. Complete our form with your facility requirements and we'll respond within 24 hours.",
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        title="Get a Free Quote"
        subtitle="Complete our detailed quote form with your facility requirements."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get a Quote" },
        ]}
      />

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <QuoteForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl bg-brand-green p-6 text-white shadow-lg">
              <h3 className="font-display text-xl font-bold">
                Need Immediate Help?
              </h3>
              <p className="mt-2 text-white/90">
                Call us directly for urgent requests or to speak with a
                representative.
              </p>
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="mt-4 flex items-center gap-2 text-lg font-bold"
              >
                <Phone className="h-5 w-5" />
                {COMPANY.phone.display}
              </a>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-gray-900">
                What to Expect
              </h3>
              <ul className="mt-4 space-y-4">
                {[
                  {
                    icon: Clock,
                    title: "Response within 24 hours",
                    text: "Our team reviews every request promptly.",
                  },
                  {
                    icon: Shield,
                    title: "Free facility walkthrough",
                    text: "45-90 minutes depending on facility size.",
                  },
                  {
                    icon: Phone,
                    title: "Custom service plan",
                    text: "Detailed project timeline and service implementation plan.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {title}
                      </p>
                      <p className="text-xs text-gray-500">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

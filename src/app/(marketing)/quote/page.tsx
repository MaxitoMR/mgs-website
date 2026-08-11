import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { QuoteForm } from "@/components/forms/quote-form";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Phone, Clock, Shield } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Tell us your facility requirements and we respond within 24 hours with a detailed proposal.",
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        title="Get a Free Quote"
        subtitle="Tell us about the site. We respond within 24 hours."
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
            <div className="rounded-none bg-brand-green-deep p-6 text-brand-on-green shadow-lg">
              <h3 className="font-display text-xl font-bold">
                Need Immediate Help?
              </h3>
              {/* on-green, not white: white/90 is 2.27:1 on #80B515. See the
                  --color-brand-on-green note in globals.css — this token is
                  what the surrounding card already uses. */}
              <p className="mt-2 text-brand-on-green/90">
                For urgent work, call. The line is staffed around the clock.
              </p>
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="mt-4 flex min-h-11 items-center gap-2 text-xl font-bold lg:text-lg"
              >
                <Phone className="h-5 w-5" />
                {COMPANY.phone.display}
              </a>
            </div>

            <div className="rounded-none border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-xl font-bold text-gray-900 lg:text-lg">
                What to Expect
              </h3>
              <ul className="mt-4 space-y-4">
                {[
                  {
                    icon: Clock,
                    title: "Response within 24 hours",
                    text: "Reviewed by the people who will scope the work.",
                  },
                  {
                    icon: Shield,
                    title: "Free facility walkthrough",
                    text: "45–90 minutes, depending on the size of the site.",
                  },
                  {
                    icon: Phone,
                    title: "Custom service plan",
                    text: "A scope, a schedule and a price, in writing.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green-text" />
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

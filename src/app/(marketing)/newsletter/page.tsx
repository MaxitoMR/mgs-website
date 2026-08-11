import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Newspaper, Clock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "MGS Field Brief — Monthly Newsletter",
  description:
    "One short email a month for facility managers: field notes, real supply pricing, and what is moving in the industry.",
  openGraph: {
    title: "MGS Field Brief — Monthly Newsletter",
    description:
      "One short email a month. Field notes, supply pricing, and industry call-outs for facility managers.",
    type: "website",
  },
};

const features = [
  {
    icon: Newspaper,
    title: "Field notes",
    body: "What our drivers and techs see on route, before it reaches the trade press.",
  },
  {
    icon: Clock,
    title: "Once a month",
    body: "Three minutes to read, then back to running your building.",
  },
  {
    icon: Mail,
    title: "One-click unsubscribe",
    body: "One-click unsubscribe in every issue. If it stops being useful, leave.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        title="The MGS Field Brief"
        subtitle="Monthly, written by the people in the field."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Newsletter" },
        ]}
      />

      <SectionWrapper>
        <div className="grid gap-7 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <NewsletterForm
              source="website_newsletter_page"
              variant="card"
              heading="Subscribe."
              blurb="One short issue a month on what is actually moving in facility ops."
            />
          </div>

          <div className="lg:col-span-2">
            <ul className="space-y-6">
              {features.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-brand-green/10 text-brand-green">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-gray-900">
                      {f.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Admin: gated subscriber list (access-key protected) */}
        <div className="mt-10 border-t border-gray-100 pt-4 text-right lg:mt-16 lg:pt-6">
          <Link
            href="/newsletter/subscribers"
            className="-my-3.5 inline-block py-3.5 text-xs text-gray-600 transition-colors hover:text-brand-green-text"
          >
            Admin · View subscribers →
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}

import type { Metadata } from "next";
import FAQContent from "./faq-content";
import { faqCategories } from "@/lib/faq-data";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pricing, service areas, schedules, medical-grade sanitization, billing, and how to start service with MGS Supply & Services.",
  openGraph: {
    title: "Frequently Asked Questions | MGS Supply & Services",
    description:
      "Answers to common questions about our janitorial services, pricing, and processes.",
  },
};

export default function FAQPage() {
  const allFaqs = faqCategories.flatMap((cat) => cat.faqs);

  return (
    <>
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: allFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }}
      />
      <FAQContent />
    </>
  );
}

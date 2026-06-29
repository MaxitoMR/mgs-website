import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SubscribersAdmin } from "./subscribers-admin";

// Keep this page out of search engines — it's an internal admin view.
export const metadata: Metadata = {
  title: "Subscribers",
  robots: { index: false, follow: false },
};

export default function SubscribersPage() {
  return (
    <>
      <PageHeader
        title="Newsletter Subscribers"
        subtitle="Admin only. Enter the access key to view active subscribers."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Newsletter", href: "/newsletter" },
          { label: "Subscribers" },
        ]}
      />
      <SectionWrapper>
        <SubscribersAdmin />
      </SectionWrapper>
    </>
  );
}

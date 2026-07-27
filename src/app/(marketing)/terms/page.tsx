import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for MGS Supply & Services janitorial services.",
};

const sections = [
  {
    title: "1. Services Agreement",
    content: `By engaging MGS Supply & Services LLC ("MGS," "we," "our") for janitorial or facility maintenance services, you ("Client") agree to these Terms of Service. Our services are provided pursuant to a separate Service Agreement that details scope, frequency, and pricing specific to your facility.`,
  },
  {
    title: "2. Service Scheduling & Access",
    content: `Client agrees to provide reasonable access to the facility during agreed service hours. MGS will perform services according to the schedule outlined in the Service Agreement. Changes to scheduling require 48 hours written notice. Client is responsible for ensuring safe access conditions and informing MGS of any hazards present in the facility.`,
  },
  {
    title: "3. Payment Terms",
    content: `Invoices are issued on the billing cycle specified in your Service Agreement (typically monthly). Payment terms are Net 15, Net 30, or Net 60 as agreed. Late payments are subject to a 1.5% monthly service charge. MGS reserves the right to suspend services for accounts more than 60 days past due.`,
  },
  {
    title: "4. Liability & Insurance",
    content: `MGS maintains comprehensive general liability insurance, workers' compensation coverage, and is fully bonded. Our liability for any claim arising from services is limited to the fees paid for the specific service giving rise to the claim. MGS is not liable for pre-existing conditions, normal wear and tear, or damage caused by third parties.`,
  },
  {
    title: "5. Cancellation Policy",
    content: `Either party may terminate the Service Agreement with 30 days written notice. Client is responsible for payment of all services rendered through the termination date. Early termination of annual agreements may be subject to an early termination fee as specified in the Service Agreement.`,
  },
  {
    title: "6. Confidentiality",
    content: `MGS treats all client facility information, security codes, access procedures, and business operations as strictly confidential. All MGS employees sign confidentiality agreements. We will not disclose client information to third parties except as required by law.`,
  },
  {
    title: "7. Quality Assurance",
    content: `MGS conducts regular quality inspections and welcomes client feedback. If services do not meet agreed-upon standards, Client should notify MGS within 24 hours. MGS will re-perform the service at no additional charge or provide a credit for the affected service period.`,
  },
  {
    title: "8. Indemnification",
    content: `Each party agrees to indemnify and hold harmless the other party from claims, damages, and expenses arising from the indemnifying party's negligence or willful misconduct in connection with this agreement.`,
  },
  {
    title: "9. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the State of Texas. Any disputes shall be resolved in the courts of Harris County, Texas.`,
  },
  {
    title: "10. Contact",
    content: `For questions about these Terms of Service, contact us at ${COMPANY.email} or call ${COMPANY.phone.display}. Mail: ${COMPANY.address.full}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />
      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-gray-500 mb-10">Last updated: March 2026</p>
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                {/* h2: the page's only other heading is the h1 in PageHeader,
                    so h3 skipped a level. */}
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

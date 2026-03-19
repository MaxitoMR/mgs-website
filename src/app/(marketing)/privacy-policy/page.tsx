import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${COMPANY.name} privacy policy. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <SectionWrapper>
        <div className="prose prose-gray mx-auto max-w-3xl">
          <p className="text-sm text-gray-500">
            Last updated: January 1, 2025
          </p>

          <h2 className="font-display">Introduction</h2>
          <p>
            {COMPANY.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
            respects your privacy and is committed to protecting your personal
            information. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website
            or use our services.
          </p>

          <h2 className="font-display">Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, company name, and facility address when you submit a quote
              request, contact form, or employment application.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact
              with our website, including pages visited, time spent, and
              referring URLs.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies and similar technologies
              to improve your browsing experience and analyze site traffic.
            </li>
          </ul>

          <h2 className="font-display">How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries and provide requested services</li>
            <li>To process quote requests and schedule facility walkthroughs</li>
            <li>To evaluate employment applications</li>
            <li>To improve our website and services</li>
            <li>To send relevant service information with your consent</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="font-display">Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to outside parties except as necessary to provide our
            services, comply with the law, or protect our rights.
          </p>

          <h2 className="font-display">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>

          <h2 className="font-display">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal
            information. To exercise these rights, please contact us at{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-brand-green">
              {COMPANY.email}
            </a>
            .
          </p>

          <h2 className="font-display">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-brand-green">
                {COMPANY.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href={`tel:${COMPANY.phone.primary}`} className="text-brand-green">
                {COMPANY.phone.display}
              </a>
            </li>
            <li>Address: {COMPANY.address.full}</li>
          </ul>
        </div>
      </SectionWrapper>
    </>
  );
}

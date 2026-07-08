import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Smartphone, MapPin, ClipboardCheck, Package } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Employee Sign-In",
  description:
    "MGS Supply & Services team access. Employees clock in, complete QA inspections, log shift notes, and submit supply requests through MGS Manager.",
  robots: { index: false, follow: false },
};

const MGS_MANAGER_URL = "https://mgsmanagement.app/";
const APP_STORE_URL =
  "https://apps.apple.com/us/app/mgs-management-app/id6760367154";

const capabilities = [
  { icon: MapPin, label: "GPS-verified clock-in and attendance" },
  { icon: ClipboardCheck, label: "Digital QA inspections and shift documentation" },
  { icon: Package, label: "Supply requisitions and site messaging" },
];

export default function StaffPortalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            src="/images/logo.png"
            alt={COMPANY.name}
            width={200}
            height={59}
            className="mx-auto mb-6 h-14 w-auto"
          />
          <h1 className="font-display text-2xl font-bold text-gray-900">
            Employee Sign-In
          </h1>
          <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500">
            MGS field teams operate through MGS Manager — attendance, inspections,
            and site records in one system.
          </p>
        </div>

        <div className="rounded-none bg-white p-8 shadow-premium">
          {/* Primary: open MGS Manager */}
          <a
            href={MGS_MANAGER_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open MGS Manager (opens in new tab)"
            className="flex w-full items-center justify-center gap-2 rounded-none bg-brand-green py-3.5 font-semibold text-white transition-all hover:bg-brand-lime"
          >
            Sign in to MGS Manager
            <ArrowUpRight className="h-5 w-5" />
          </a>

          {/* Secondary: iOS app */}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download the MGS Management app on the App Store (opens in new tab)"
            className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-none border border-gray-200 py-3 text-sm font-medium text-gray-700 transition-all hover:border-brand-green hover:text-brand-green"
          >
            <Smartphone className="h-4 w-4" />
            Download the iOS app
          </a>

          {/* What the system covers */}
          <ul className="mt-7 space-y-3 border-t border-gray-100 pt-6">
            {capabilities.map((c) => (
              <li key={c.label} className="flex items-start gap-3 text-[13px] leading-snug text-gray-600">
                <c.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-green" />
                {c.label}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs leading-relaxed text-gray-400">
            No credentials yet? Contact your supervisor or MGS management to have
            your account provisioned.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-brand-green"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

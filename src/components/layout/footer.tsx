"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";

const services = [
  { label: "Commercial Cleaning", href: "/services/multi-tenant-offices" },
  { label: "Medical Facilities", href: "/services/surgery-centers" },
  { label: "Industrial Cleaning", href: "/services/factory-plants" },
  { label: "Specialized Services", href: "/services/specialized" },
  { label: "Post-Construction", href: "/services/post-construction" },
  { label: "Window Cleaning", href: "/services/windows" },
  { label: "Concrete Floors", href: "/services/concrete-floors" },
];

const resources = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Schedule Walkthrough", href: "/walkthrough" },
  { label: "Client Portal", href: "https://mgsclientportal.app/" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const socialLinks = [
  { icon: Facebook, href: COMPANY.social.facebook, label: "Facebook" },
  { icon: Twitter, href: "#", label: "X (Twitter)" },
  { icon: Linkedin, href: COMPANY.social.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: COMPANY.social.instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-[#1a252f] text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1 - Company */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <p className="text-lg font-bold tracking-wide text-white">
                MGS SUPPLY &amp; SERVICES
              </p>
              <p className="text-xs font-medium uppercase tracking-widest text-[#69AF23]">
                total janitorial management
              </p>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              Delivering enterprise-grade facility management and janitorial
              services for commercial, medical, and industrial environments
              across the Greater Houston area since 2006.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-[#69AF23] hover:bg-[#69AF23] hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Services */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#69AF23]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#69AF23]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">
              Contact
            </h3>
            <div className="space-y-4">
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-[#69AF23]"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#69AF23]" />
                {COMPANY.phone.display}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-[#69AF23]"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#69AF23]" />
                {COMPANY.email}
              </a>
              <a
                href={COMPANY.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-[#69AF23]"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#69AF23]" />
                {COMPANY.address.full}
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#69AF23]" />
                <div>
                  <p>Mon-Fri 9AM-5PM</p>
                  <p>24/7 Emergency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Green accent divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#69AF23] to-transparent" />

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; 2026 {COMPANY.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/privacy-policy"
              className="text-gray-500 transition-colors hover:text-[#69AF23]"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-700">|</span>
            <Link
              href="/terms"
              className="text-gray-500 transition-colors hover:text-[#69AF23]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

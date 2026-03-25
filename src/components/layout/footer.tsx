"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center bg-[#69AF23]">
                <span className="text-lg font-bold text-white">MGS</span>
              </div>
              <div>
                <p className="font-light text-lg text-white">MGS Supply & Services</p>
                <p className="font-ultra-light text-sm text-gray-400">Total Janitorial Management</p>
              </div>
            </div>
            <p className="font-ultra-light text-sm leading-relaxed text-gray-400">
              Comprehensive facility management services for commercial, medical,
              and industrial environments with proven expertise since 2006.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-light text-lg text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                { label: "Commercial Cleaning", href: "/services/multi-tenant-offices" },
                { label: "Medical Facilities", href: "/services/surgery-centers" },
                { label: "Industrial Cleaning", href: "/services/factory-plants" },
                { label: "Post-Construction", href: "/services/post-construction" },
                { label: "Window Cleaning", href: "/services/windows" },
                { label: "Concrete Floors", href: "/services/concrete-floors" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-ultra-light text-sm text-gray-400 transition-colors hover:text-[#69AF23]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-light text-lg text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-ultra-light text-sm text-gray-400 transition-colors hover:text-[#69AF23]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-light text-lg text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <a href={`tel:${COMPANY.phone.primary}`} className="flex items-center gap-2 font-ultra-light text-sm text-gray-400 transition-colors hover:text-[#69AF23]">
                <Phone className="h-4 w-4 text-[#69AF23]" />
                {COMPANY.phone.display}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 font-ultra-light text-sm text-gray-400 transition-colors hover:text-[#69AF23]">
                <Mail className="h-4 w-4 text-[#69AF23]" />
                {COMPANY.email}
              </a>
              <a href={COMPANY.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-ultra-light text-sm text-gray-400 transition-colors hover:text-[#69AF23]">
                <MapPin className="h-4 w-4 text-[#69AF23]" />
                {COMPANY.address.full}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 pt-8 mt-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm sm:flex-row sm:px-6 lg:px-8">
          <p className="font-ultra-light text-gray-400">
            &copy; 2024 MGS Supply & Services. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="font-ultra-light text-gray-400 transition-colors hover:text-[#69AF23]">
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="font-ultra-light text-gray-400 transition-colors hover:text-[#69AF23]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

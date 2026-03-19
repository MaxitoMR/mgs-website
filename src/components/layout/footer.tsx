import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { serviceNav } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div>
            <Image
              src="/images/logo.png"
              alt={COMPANY.name}
              width={160}
              height={47}
              className="mb-6 h-10 w-auto brightness-200"
            />
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              {COMPANY.description}
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="flex items-center gap-3 text-sm transition-colors hover:text-brand-lime"
              >
                <Phone className="h-4 w-4 text-brand-green" />
                {COMPANY.phone.display}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-3 text-sm transition-colors hover:text-brand-lime"
              >
                <Mail className="h-4 w-4 text-brand-green" />
                {COMPANY.email}
              </a>
              <a
                href={COMPANY.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors hover:text-brand-lime"
              >
                <MapPin className="h-4 w-4 text-brand-green" />
                {COMPANY.address.full}
              </a>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-brand-green" />
                24/7 Emergency Services Available
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 font-display text-lg font-semibold text-white">
              Our Services
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {serviceNav.map((category) => (
                <div key={category.label} className="mb-4">
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-green">
                    {category.label}
                  </h4>
                  <ul className="space-y-1">
                    {category.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-gray-400 transition-colors hover:text-brand-lime"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-6 font-display text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Careers", href: "/careers" },
                { label: "Get a Quote", href: "/quote" },
                { label: "Employee Application", href: "/employee-application" },
                { label: "Staff Portal", href: "/staff-portal" },
                { label: "Privacy Policy", href: "/privacy-policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-brand-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="mt-8">
              <h4 className="mb-3 text-sm font-semibold text-white">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: COMPANY.social.facebook },
                  { icon: Instagram, href: COMPANY.social.instagram },
                  { icon: Linkedin, href: COMPANY.social.linkedin },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-brand-green hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.</p>
          <p>
            AEPA approved vendor &bull; Licensed &amp; Insured
          </p>
        </div>
      </div>
    </footer>
  );
}

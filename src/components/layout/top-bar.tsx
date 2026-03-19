import { Phone, Mail, MapPin } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function TopBar() {
  return (
    <div className="hidden bg-brand-dark text-white lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${COMPANY.phone.primary}`}
            className="flex items-center gap-1.5 transition-colors hover:text-brand-lime"
          >
            <Phone className="h-3 w-3" />
            {COMPANY.phone.display}
          </a>
          <a
            href={`mailto:${COMPANY.email}`}
            className="flex items-center gap-1.5 transition-colors hover:text-brand-lime"
          >
            <Mail className="h-3 w-3" />
            {COMPANY.email}
          </a>
        </div>
        <a
          href={COMPANY.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition-colors hover:text-brand-lime"
        >
          <MapPin className="h-3 w-3" />
          {COMPANY.address.full}
        </a>
      </div>
    </div>
  );
}

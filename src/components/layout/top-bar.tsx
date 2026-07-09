import { COMPANY } from "@/lib/constants";

export function TopBar() {
  return (
    <div className="hidden bg-white lg:block" style={{ height: 'clamp(2rem, 2.5vw, 2.5rem)' }}>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8" style={{ gap: 'clamp(1rem, 2vw, 2rem)' }}>
        <span className="text-gray-600" style={{ fontSize: 'clamp(0.65rem, 0.75vw, 0.75rem)' }}>
          Call Us: {COMPANY.phone.display}
        </span>
        <span className="text-gray-600" style={{ fontSize: 'clamp(0.65rem, 0.75vw, 0.75rem)' }}>
          Email: {COMPANY.email}
        </span>
        <span className="text-gray-600" style={{ fontSize: 'clamp(0.65rem, 0.75vw, 0.75rem)' }}>
          Hours: Mon-Fri 9AM-5PM
        </span>
      </div>
      {/* Bottom border with subtle line */}
      <div className="border-b border-gray-200" />
    </div>
  );
}

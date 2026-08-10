import { COMPANY } from "@/lib/constants";

/**
 * The utility strip above the logo row. Desktop-only (`lg:block`).
 *
 * Type floor raised from `clamp(0.65rem, …)` to `clamp(0.75rem, …)`. The old
 * minimum resolved to 10.4px on any viewport under ~1387px — which is most
 * laptops — for the three pieces of contact information a visitor is most
 * likely to be hunting for. 12px is the floor for a micro-label; the strip's
 * height is a separate clamp and does not move, so the row is unchanged.
 */
export function TopBar() {
  return (
    <div className="hidden bg-white lg:block" style={{ height: 'clamp(2rem, 2.5vw, 2.5rem)' }}>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8" style={{ gap: 'clamp(1rem, 2vw, 2rem)' }}>
        <span className="text-gray-600" style={{ fontSize: 'clamp(0.75rem, 0.75vw, 0.8125rem)' }}>
          Call Us: {COMPANY.phone.display}
        </span>
        <span className="text-gray-600" style={{ fontSize: 'clamp(0.75rem, 0.75vw, 0.8125rem)' }}>
          Email: {COMPANY.email}
        </span>
        <span className="text-gray-600" style={{ fontSize: 'clamp(0.75rem, 0.75vw, 0.8125rem)' }}>
          Hours: Mon-Fri 9AM-5PM
        </span>
      </div>
      {/* Bottom border with subtle line */}
      <div className="border-b border-gray-200" />
    </div>
  );
}

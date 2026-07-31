import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

// Homepage closing: the team photo paired with the assessment ask in one unit.
export function ClosingCta() {
  return (
    <section
      className="w-full bg-[#F4F4F5]"
      style={{ paddingTop: "clamp(3.5rem, 7vw, 6rem)", paddingBottom: "clamp(3.5rem, 7vw, 6rem)" }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div
          className="grid overflow-hidden shadow-premium lg:grid-cols-2"
          style={{ borderTopLeftRadius: "clamp(2rem, 4vw, 4rem)" }}
        >
          {/* Team photo — full aspect on mobile, fills the panel height on desktop */}
          <div className="relative aspect-[3/2] lg:aspect-auto">
            <Image
              src="/images/mgs-team.jpg"
              alt="The MGS Supply & Services cleaning team"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              quality={84}
              className="object-cover object-top lg:object-center"
            />
          </div>

          {/* The ask */}
          <div className="flex flex-col justify-center bg-brand-green-deep p-8 sm:p-12 lg:p-14">
            {/* /90 is the floor for 4.5:1 on this green — see globals.css. */}
            <p className="eyebrow text-brand-on-green/90">The team that shows up</p>
            <h2
              className="mt-3 font-gothic text-brand-on-green"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 300, lineHeight: 1.1 }}
            >
              Request a site assessment.
            </h2>
            <p className="mt-4 max-w-md text-brand-on-green/90" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              We will walk your facility, scope the work against your
              requirements, and return a detailed proposal. No obligation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 bg-white px-7 py-3.5 font-medium text-brand-green-text transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
                style={{ borderTopLeftRadius: "1rem" }}
              >
                Schedule Free Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-brand-on-green/50 px-7 py-3.5 font-light text-brand-on-green transition-all duration-300 hover:border-brand-on-green hover:bg-black/[0.08]"
                style={{ borderTopLeftRadius: "1rem" }}
              >
                <Phone className="h-4 w-4" />
                Call {COMPANY.phone.display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

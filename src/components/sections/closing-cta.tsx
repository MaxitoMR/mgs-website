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
          <div className="flex flex-col justify-center bg-[#69AF23] p-8 sm:p-12 lg:p-14">
            <p className="eyebrow text-white/80">The team that shows up</p>
            <h2
              className="mt-3 font-gothic text-white"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 300, lineHeight: 1.1 }}
            >
              Request a site assessment.
            </h2>
            <p className="mt-4 max-w-md text-white/90" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              We will walk your facility, scope the work against your
              requirements, and return a detailed proposal. No obligation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 bg-white px-7 py-3.5 font-medium text-[#69AF23] transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
                style={{ borderTopLeftRadius: "1rem" }}
              >
                Schedule Free Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/60 px-7 py-3.5 font-light text-white transition-all duration-300 hover:border-white hover:bg-white/10"
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

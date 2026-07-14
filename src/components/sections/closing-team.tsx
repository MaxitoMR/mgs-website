import Image from "next/image";
import { MotionWrapper } from "@/components/shared/motion-wrapper";

// Warm closing note — the crew behind the standard, right before the final CTA.
export function ClosingTeam() {
  return (
    <section className="w-full bg-[#F4F4F5]" style={{ paddingTop: "clamp(3.5rem, 7vw, 6rem)", paddingBottom: "clamp(3.5rem, 7vw, 6rem)" }}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <MotionWrapper>
          <p className="eyebrow text-[#69AF23]">The MGS Team</p>
          <h2
            className="mt-3 font-gothic text-gray-900"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 300, lineHeight: 1.1 }}
          >
            The people behind the standard.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-gray-600" style={{ fontWeight: 300, lineHeight: 1.7 }}>
            Every protocol, every QA score, and every on-time visit comes down to
            the crews who do the work — and take pride in doing it right.
          </p>
        </MotionWrapper>

        <MotionWrapper delay={0.15}>
          <div
            className="mgs-card mt-10 overflow-hidden"
            style={{ borderTopLeftRadius: "clamp(1.5rem, 3vw, 3rem)" }}
          >
            <Image
              src="/images/mgs-team.jpg"
              alt="Three members of the MGS Supply & Services cleaning team"
              width={2000}
              height={1333}
              sizes="(min-width: 1024px) 56rem, 100vw"
              quality={84}
              className="h-auto w-full"
            />
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}

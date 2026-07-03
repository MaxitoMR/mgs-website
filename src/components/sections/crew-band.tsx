"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Full-width photo of the actual MGS crew — sits right after "Why MGS", where
// the copy promises dedicated teams, so the real faces back up the claim.
export function CrewBand() {
  return (
    <section className="relative w-full overflow-hidden bg-[#111111]">
      <div className="relative h-[clamp(20rem,55vw,36rem)] w-full">
        <Image
          src="/images/mgs-crew.jpg"
          alt="MGS crew members in uniform working together at a client facility"
          fill
          sizes="100vw"
          quality={82}
          className="object-cover object-center"
        />

        {/* Left-to-right scrim so the caption stays legible over the photo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.05) 70%, transparent 100%)",
          }}
        />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-xl"
            >
              <p className="eyebrow mb-4 text-[#9FD01B]">Our Crews</p>
              <h2
                className="font-gothic text-white"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                  fontWeight: 300,
                  lineHeight: 1.1,
                }}
              >
                Real people who{" "}
                <span className="text-[#69AF23]">know your building.</span>
              </h2>
              <p
                className="mt-5 max-w-md text-gray-300"
                style={{ fontWeight: 300, lineHeight: 1.7 }}
              >
                The same uniformed team shows up each visit — not a rotating cast
                of subcontractors. They learn your space, your schedule, and what
                matters to you.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
          // Anchor left so the branded MGS crew member is never the part that
          // gets cropped out on narrow/mobile viewports.
          className="object-cover object-left"
        />

        {/* Right-to-left scrim: caption sits over the softer right side, leaving
            the sharp MGS-branded subject on the left fully visible. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.08) 65%, transparent 100%)",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-end">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 flex justify-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-xl text-right"
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
                className="mt-5 ml-auto max-w-md text-gray-300"
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

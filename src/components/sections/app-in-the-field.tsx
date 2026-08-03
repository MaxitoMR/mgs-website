"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PenLine, Clock3, Languages } from "lucide-react";

/**
 * Photographic proof for the claim AppPromo makes just above it.
 *
 * AppPromo shows the product (a clean screenshot in a phone frame); this band
 * shows the product *being used* — a supervisor scoring an inspection on site,
 * then handing the phone to the crew member to read it and sign. A screenshot
 * can be staged; a photo of the handoff is the part competitors can't mock up,
 * which is why these two images sit here rather than in the gallery.
 *
 * Copy is verified against the app's own strings (`src/lib/i18n/{en,es}.ts` in
 * mgs-manager): the acknowledgment step is optional, the signature is stored
 * with a timestamp, and the whole app ships in English and Spanish. Don't
 * upgrade "optional" to "every inspection" here — the app doesn't enforce it.
 */

const facts = [
  {
    icon: PenLine,
    title: "Signed by the person who did the work",
    body:
      "The supervisor hands the phone over at the end of the walk. The crew member reads the result, adds notes if they have any, and signs — by typing their name or with a finger.",
  },
  {
    icon: Clock3,
    title: "Timestamped, then submitted",
    body:
      "The acknowledgment is captured with a timestamp before the inspection is filed, so the record shows not just the score but that the crew saw it.",
  },
  {
    icon: Languages,
    title: "English and Spanish",
    body:
      "The app runs fully in either language, chosen per user. Nobody signs off on a result they had to have translated for them.",
  },
];

export function AppInTheField() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-dark-deeper">
      <div
        className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16"
        style={{
          paddingTop: "clamp(4.5rem, 9vw, 7rem)",
          paddingBottom: "clamp(4.5rem, 9vw, 7rem)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-5 text-brand-lime">In The Field</p>
          <h2
            className="font-gothic text-white"
            style={{
              fontSize: "clamp(1.875rem, 3.8vw, 3.25rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            The inspection closes{" "}
            <span className="text-brand-green-deep">with the crew,</span> not
            behind them.
          </h2>
          <p
            className="mt-5 max-w-2xl text-gray-300"
            style={{ fontWeight: 300, lineHeight: 1.7 }}
          >
            A QA score written up after the supervisor leaves is an opinion. On
            our sites the inspection is scored on the floor, in front of the
            person who cleaned it — and it isn&apos;t filed until they&apos;ve
            read it and signed.
          </p>
        </motion.div>

        {/* Two photographs, one moment: the walk, then the handoff. Matched
            heights rather than matched aspect ratios — both frames are 3:2, so
            a shared height keeps the pair reading as a sequence instead of two
            unrelated pictures, and object-position keeps each subject in the
            crop as the columns narrow. */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 lg:grid-cols-12 lg:gap-6">
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="relative h-[clamp(16rem,42vw,27rem)] w-full overflow-hidden bg-black">
              <Image
                src="/images/app-inspection-walk.jpg"
                alt="An MGS supervisor holding a phone while walking an office floor with the crew member who services it"
                fill
                quality={82}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                // The crew member is at ~52% of the frame and the supervisor's
                // shoulder anchors the left edge; centering keeps both in a
                // crop that gets much narrower on tablet.
                style={{ objectPosition: "50% 42%" }}
              />
            </div>
            <figcaption className="mt-4 flex gap-3 text-sm text-gray-300">
              <span
                aria-hidden="true"
                className="mt-[0.45rem] h-px w-6 flex-shrink-0 bg-brand-green-deep"
              />
              <span style={{ fontWeight: 300, lineHeight: 1.6 }}>
                The walk — the supervisor scores each area against the site&apos;s
                checklist while standing in it, with the assigned crew member
                present.
              </span>
            </figcaption>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative h-[clamp(16rem,42vw,27rem)] w-full overflow-hidden bg-black">
              <Image
                src="/images/app-signature-capture.jpg"
                alt="A gloved MGS crew member signing the employee acknowledgment on the inspection screen of the MGS Management App"
                fill
                quality={82}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                // The phone screen — the entire point of the photo — sits at
                // ~44% across and ~38% down. Anchoring high trades away the
                // out-of-focus shoulder along the bottom edge, which is what
                // lets the screen fill the frame in the narrower column.
                style={{ objectPosition: "44% 38%" }}
              />
            </div>
            <figcaption className="mt-4 flex gap-3 text-sm text-gray-300">
              <span
                aria-hidden="true"
                className="mt-[0.45rem] h-px w-6 flex-shrink-0 bg-brand-green-deep"
              />
              <span style={{ fontWeight: 300, lineHeight: 1.6 }}>
                The handoff — the crew member reviews the write-up in Spanish and
                signs it before the supervisor can submit.
              </span>
            </figcaption>
          </motion.figure>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-9 border-t border-white/10 pt-10 sm:mt-16 sm:grid-cols-3">
          {facts.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 text-brand-green-deep"
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 text-base font-semibold text-white">
                  {f.title}
                </h3>
                <p
                  className="mt-2 text-sm text-gray-300"
                  style={{ fontWeight: 300, lineHeight: 1.65 }}
                >
                  {f.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

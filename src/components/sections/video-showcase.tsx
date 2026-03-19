"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { VideoPlayer } from "@/components/shared/video-player";
import { CLOUDFLARE_STREAMS } from "@/lib/constants";

const videos = [
  { src: CLOUDFLARE_STREAMS.showcase1, title: "Commercial Cleaning" },
  { src: CLOUDFLARE_STREAMS.showcase2, title: "Medical Sanitization" },
  { src: CLOUDFLARE_STREAMS.showcase3, title: "Industrial Services" },
];

export function VideoShowcase() {
  return (
    <SectionWrapper className="bg-brand-dark" dark>
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm font-bold uppercase tracking-widest text-brand-lime"
        >
          See Us In Action
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl"
        >
          Our Work Speaks for Itself
        </motion.h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {videos.map((video, index) => (
          <motion.div
            key={video.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="overflow-hidden rounded-xl"
          >
            <div className="aspect-video bg-black">
              <VideoPlayer
                src={video.src}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 text-center">
              <h3 className="font-display text-lg font-semibold text-white">
                {video.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

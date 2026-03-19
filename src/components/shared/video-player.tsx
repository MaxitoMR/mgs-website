"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  poster?: string;
}

export function VideoPlayer({
  src,
  autoPlay = true,
  muted = true,
  loop = true,
  className,
  poster,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (src.includes(".m3u8")) {
      import("hls.js").then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          const hls = new Hls({ enableWorker: false });
          hls.loadSource(src);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (autoPlay) video.play().catch(() => {});
          });
          return () => hls.destroy();
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = src;
          if (autoPlay) video.play().catch(() => {});
        }
      });
    } else {
      video.src = src;
      if (autoPlay) video.play().catch(() => {});
    }
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      muted={muted}
      loop={loop}
      playsInline
      poster={poster}
      className={className}
    />
  );
}

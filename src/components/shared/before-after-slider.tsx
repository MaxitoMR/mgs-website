"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  label: string;
}

export function BeforeAfterSlider({ before, after, label }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div className="group">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden cursor-col-resize select-none bg-gray-100"
        style={{ borderTopLeftRadius: '1.5rem' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onClick={(e) => updatePosition(e.clientX)}
      >
        {/* After image (full) */}
        <Image src={after} alt={`${label} - After`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />

        {/* Before image (clipped) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={before} alt={`${label} - Before`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white z-10"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L3 10L7 16" stroke="#69AF23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 4L17 10L13 16" stroke="#69AF23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 text-white text-[10px] font-bold tracking-wider uppercase z-10">
          Before
        </div>
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#69AF23]/90 text-white text-[10px] font-bold tracking-wider uppercase z-10">
          After
        </div>
      </div>
      <p className="text-sm font-medium text-gray-700 mt-3">{label}</p>
    </div>
  );
}

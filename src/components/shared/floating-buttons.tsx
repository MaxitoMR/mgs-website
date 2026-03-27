"use client";

import Link from "next/link";

export function FloatingActionButtons() {
  return (
    <div className="fixed bottom-4 right-6 z-[9999] flex flex-col space-y-2">
      <Link
        href="/quote"
        className="flex items-center justify-center text-center bg-[#69AF23] hover:bg-[#9FD01B] text-white shadow-lg hover:scale-105 transition-all duration-300 px-4 py-2.5 lg:px-5 lg:py-3"
      >
        <span className="font-clinical font-light text-xs md:text-sm lg:text-base tracking-wide uppercase whitespace-nowrap">
          Request Quote
        </span>
      </Link>
      <Link
        href="/walkthrough"
        className="flex items-center justify-center text-center border-2 border-[#69AF23] bg-white text-[#69AF23] hover:bg-[#69AF23] hover:text-white shadow-lg hover:scale-105 transition-all duration-300 px-4 py-2.5 lg:px-5 lg:py-3"
      >
        <span className="font-clinical font-light text-xs md:text-sm lg:text-base tracking-wide uppercase whitespace-nowrap">
          Schedule Walkthrough
        </span>
      </Link>
    </div>
  );
}

import Link from "next/link";
import { Home, FileText } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBFBFE] px-4">
      <div className="text-center max-w-lg">
        {/* Large 404 */}
        <h1
          className="font-gothic font-bold leading-none"
          style={{
            fontSize: "clamp(7rem, 20vw, 12rem)",
            background: "linear-gradient(135deg, #69AF23, #9FD01B)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </h1>

        {/* Heading */}
        <h2
          className="mt-4 font-gothic text-gray-900"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600 }}
        >
          Page not found
        </h2>

        {/* Subtitle */}
        <p
          className="mt-3 text-gray-500"
          style={{ fontWeight: 300, lineHeight: 1.7 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Divider accent */}
        <div
          className="mx-auto mt-8 h-[2px] w-16"
          style={{ background: "linear-gradient(90deg, #69AF23, #9FD01B)" }}
        />

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-green-deep px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-brand-on-green transition-all duration-300 hover:bg-brand-green-deep-hover"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center gap-2 border-2 border-brand-green-deep px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-brand-green-text transition-all duration-300 hover:bg-brand-green-deep hover:text-brand-on-green"
          >
            <FileText className="h-4 w-4" />
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

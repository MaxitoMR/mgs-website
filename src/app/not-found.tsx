import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="font-display text-8xl font-bold text-brand-green">
          404
        </h1>
        <h2 className="mt-4 font-display text-2xl font-bold text-gray-900">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-3 font-semibold text-white transition-all hover:bg-brand-lime"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-green px-6 py-3 font-semibold text-brand-green transition-all hover:bg-brand-green hover:text-white"
          >
            <Search className="h-5 w-5" />
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  );
}

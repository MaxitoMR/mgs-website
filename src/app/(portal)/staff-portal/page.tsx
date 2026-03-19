"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, ArrowLeft, Loader2 } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function StaffPortalPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulated authentication
    setTimeout(() => {
      setError("Portal access is being migrated. Please contact management.");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            src="/images/logo.png"
            alt={COMPANY.name}
            width={200}
            height={59}
            className="mx-auto mb-6 h-14 w-auto"
          />
          <h1 className="font-display text-2xl font-bold text-gray-900">
            Staff Portal
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your access code to log in
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-none bg-white p-8 shadow-lg"
        >
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Access Code
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-none border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                placeholder="Enter your access code"
              />
            </div>
          </div>

          {error && (
            <p className="mb-4 rounded-none bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !code}
            className="flex w-full items-center justify-center gap-2 rounded-none bg-brand-green py-3 font-semibold text-white transition-all hover:bg-brand-lime disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Access Portal"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-brand-green"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}

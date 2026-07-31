"use client";

import { useState } from "react";
import { Lock, Copy, Check, Download, Loader2, RefreshCw } from "lucide-react";

type Subscriber = {
  email: string;
  name: string | null;
  source: string | null;
  segment: string | null;
};

export function SubscribersAdmin() {
  const [key, setKey] = useState("");
  const [subscribers, setSubscribers] = useState<Subscriber[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function load(e?: React.FormEvent) {
    e?.preventDefault();
    if (!key.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter-subscribers", {
        headers: { "x-admin-key": key.trim() },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          res.status === 401
            ? "Wrong access key."
            : data?.error || "Could not load subscribers.",
        );
      }
      setSubscribers(data.subscribers ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubscribers(null);
    } finally {
      setLoading(false);
    }
  }

  const emails = (subscribers ?? []).map((s) => s.email);

  async function copyEmails() {
    try {
      await navigator.clipboard.writeText(emails.join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Couldn't copy to clipboard.");
    }
  }

  function downloadCsv() {
    const header = "email,name,source,segment";
    const rows = (subscribers ?? []).map((s) =>
      [s.email, s.name ?? "", s.source ?? "", s.segment ?? ""]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Access key form */}
      <form
        onSubmit={load}
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-gray-400">
            Access key
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter admin access key"
              className="w-full border border-gray-200 bg-white py-3.5 pl-10 pr-4 font-light text-gray-700 placeholder:text-gray-400 focus:border-[#69AF23] focus:outline-none focus:ring-2 focus:ring-[#69AF23]/10"
              style={{ borderTopLeftRadius: "0.75rem" }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || !key.trim()}
          className="inline-flex items-center justify-center gap-2 bg-brand-green-deep px-6 py-3.5 font-medium text-brand-on-green transition-all hover:bg-brand-green-deep-hover disabled:cursor-not-allowed disabled:opacity-50"
          style={{ borderTopLeftRadius: "0.75rem" }}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : subscribers ? (
            <RefreshCw className="h-4 w-4" />
          ) : null}
          {subscribers ? "Refresh" : "View subscribers"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      {/* Results */}
      {subscribers && (
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              <span className="text-2xl font-bold text-gray-900">
                {subscribers.length}
              </span>{" "}
              active subscriber{subscribers.length === 1 ? "" : "s"}
            </p>
            <div className="flex gap-2">
              <button
                onClick={copyEmails}
                disabled={emails.length === 0}
                className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:border-[#69AF23] hover:text-brand-green-text disabled:opacity-40"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-brand-green-text" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied" : "Copy all emails"}
              </button>
              <button
                onClick={downloadCsv}
                disabled={emails.length === 0}
                className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:border-[#69AF23] hover:text-brand-green-text disabled:opacity-40"
              >
                <Download className="h-4 w-4" />
                CSV
              </button>
            </div>
          </div>

          {subscribers.length === 0 ? (
            <p className="mt-8 text-sm text-gray-500">No active subscribers yet.</p>
          ) : (
            <div className="mt-6 overflow-hidden border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-paper text-xs uppercase tracking-wider text-gray-400">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">
                      Name
                    </th>
                    <th className="hidden px-4 py-3 font-semibold md:table-cell">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {subscribers.map((s) => (
                    <tr key={s.email} className="hover:bg-paper/60">
                      <td className="px-4 py-3 text-gray-800">
                        <a
                          href={`mailto:${s.email}`}
                          className="hover:text-brand-green-text"
                        >
                          {s.email}
                        </a>
                      </td>
                      <td className="hidden px-4 py-3 text-gray-500 sm:table-cell">
                        {s.name || "—"}
                      </td>
                      <td className="hidden px-4 py-3 text-gray-400 md:table-cell">
                        {s.source || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

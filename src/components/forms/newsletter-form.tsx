"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { newsletterSchema, type NewsletterFormData } from "@/types/forms";
import { useStatusPanel } from "@/hooks/use-status-panel";
import { api } from "@/lib/api";

type Variant = "compact" | "card";

type Props = {
  /**
   * Where this signup is rendered. Saved in newsletter_subscribers.source
   * so we can see which surfaces convert. Defaults to "website".
   */
  source?: string;

  /**
   * "compact"  - email-only, single row, fits in a footer
   * "card"     - email + name, stacked, padded card for a dedicated page
   */
  variant?: Variant;

  /** Optional headline override. */
  heading?: string;
  /** Optional subhead override. */
  blurb?: string;
};

export function NewsletterForm({
  source = "website",
  variant = "compact",
  heading,
  blurb,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    shouldFocusError: true,
  });

  /* Ids have to be unique: the compact variant renders in the footer of every
     page, and `/newsletter` puts the card variant on the same document. Two
     inputs sharing `newsletter-email` would give the card's label a 50/50
     chance of pointing at the footer's field. */
  const uid = `newsletter-${variant}-${source}`;

  // When the form first mounted — used to reject suspiciously fast (bot) submits.
  const loadedAt = useRef(Date.now());

  const mutation = useMutation({
    mutationFn: (data: NewsletterFormData) =>
      api.submitNewsletter({ ...data, source }),
  });

  const onSubmit = (data: NewsletterFormData) =>
    mutation.mutate({ ...data, elapsed_ms: Date.now() - loadedAt.current });

  // Hidden honeypot field. Visually removed (not display:none, which some bots
  // skip), kept out of the tab order and a11y tree, and autocomplete off so
  // browsers never fill it. Any value submitted here flags the row as spam.
  const honeypot = (
    <input
      type="text"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      {...register("company_url")}
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        opacity: 0,
      }}
    />
  );

  const successRef = useStatusPanel<HTMLDivElement>(mutation.isSuccess);

  if (mutation.isSuccess) {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className={
          variant === "card"
            ? "flex min-h-[200px] items-center justify-center rounded-none bg-white p-10 shadow-sm"
            : "flex items-center gap-3 rounded-none bg-brand-green/10 px-4 py-3"
        }
      >
        <CheckCircle className="h-5 w-5 shrink-0 text-brand-green-text" />
        <div className="text-sm">
          <span className="font-semibold text-gray-900">You're on the list.</span>{" "}
          <span className="text-gray-600">
            Check your inbox for a welcome message.
          </span>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {honeypot}
        {(heading || blurb) && (
          <div>
            {heading && (
              <p className="font-display text-base font-semibold text-white">
                {heading}
              </p>
            )}
            {blurb && (
              <p className="mt-1 text-sm text-white/60">{blurb}</p>
            )}
          </div>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            {/* min-h-12. The field measured 42px and the button 40px — both
                under the 44px minimum, in the footer of every page on the
                site, for the one conversion this section exists to get. */}
            <input
              id={uid}
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              enterKeyHint="send"
              placeholder="you@company.com"
              {...register("email")}
              className="min-h-12 w-full rounded-none border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-brand-green focus:bg-white/[0.06]"
              aria-label="Email address"
              aria-required="true"
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? `${uid}-error` : undefined}
            />
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-none bg-brand-green-deep px-5 py-2.5 t-eyebrow text-brand-on-green transition hover:bg-brand-green-deep-hover disabled:opacity-60"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
        {errors.email && (
          <p id={`${uid}-error`} role="alert" className="text-sm text-red-300">
            {errors.email.message}
          </p>
        )}
        {mutation.isError && (
          <div className="flex items-start gap-2 text-xs text-red-300">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 translate-y-0.5" />
            <span>
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Could not sign up. Please try again."}
            </span>
          </div>
        )}
      </form>
    );
  }

  // Card variant — dedicated page / hero CTA
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-none bg-white p-8 shadow-sm sm:p-10"
    >
      {honeypot}
      {(heading || blurb) && (
        <div className="space-y-2">
          {heading && (
            <h2 className="font-display text-xl font-bold text-gray-900 sm:text-3xl">
              {heading}
            </h2>
          )}
          {blurb && <p className="text-gray-600">{blurb}</p>}
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label
            htmlFor={`${uid}-name`}
            className="block t-eyebrow text-gray-500"
          >
            Name (optional)
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            placeholder="Pat Martinez"
            {...register("name")}
            className="mt-1 min-h-12 w-full rounded-none border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-brand-green"
          />
        </div>

        <div>
          <label
            htmlFor={uid}
            className="block t-eyebrow text-gray-500"
          >
            Email
          </label>
          <input
            id={uid}
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            enterKeyHint="send"
            placeholder="you@company.com"
            {...register("email")}
            aria-required="true"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? `${uid}-error` : undefined}
            className="mt-1 min-h-12 w-full rounded-none border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-brand-green"
          />
          {errors.email && (
            <p id={`${uid}-error`} role="alert" className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-none bg-brand-green-deep px-6 py-3 t-eyebrow text-brand-on-green transition hover:bg-brand-green-deep-hover disabled:opacity-60"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Subscribing…
          </>
        ) : (
          "Subscribe to the Field Brief"
        )}
      </button>

      {mutation.isError && (
        <div className="flex items-start gap-2 text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 translate-y-0.5" />
          <span>
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Could not sign up. Please try again."}
          </span>
        </div>
      )}

      {/* 14px, not 12: this is a sentence, and the type floor for a real
          sentence on mobile is 14px. */}
      <p className="text-sm text-gray-500">
        One short email a month. Unsubscribe anytime — every issue has a one-click
        link.
      </p>
    </form>
  );
}

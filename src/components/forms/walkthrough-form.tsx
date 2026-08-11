"use client";

import { useForm } from "react-hook-form";
import { useStatusPanel } from "@/hooks/use-status-panel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, CheckCircle, CalendarCheck } from "lucide-react";
import { walkthroughSchema, type WalkthroughFormData } from "@/types/forms";
import { api } from "@/lib/api";
import { gtagReportConversion } from "@/lib/analytics";

// Shared field/error styles; the visible focus ring comes from globals.css.
const FIELD =
  "w-full border border-gray-300 px-4 py-3 text-sm focus:border-brand-green-deep focus:outline-none focus:ring-2 focus:ring-brand-green-deep/20";
// red-600, not red-500: #ef4444 is only 3.76:1 on white and fails AA.
const ERROR = "mt-1 text-xs text-red-600";

const facilityTypes = [
  "Commercial Office",
  "Medical Facility",
  "Industrial Plant",
  "School / University",
  "Religious Facility",
  "Restaurant",
  "Retail Store",
  "Warehouse",
  "Car Dealership",
  "Gymnasium",
  "Other",
];

const timeSlots = [
  "Morning (8AM - 12PM)",
  "Afternoon (12PM - 4PM)",
  "Late Afternoon (4PM - 6PM)",
  "Flexible",
];

export function WalkthroughForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WalkthroughFormData>({
    resolver: zodResolver(walkthroughSchema),
    // Moves focus to the first field that failed validation.
    shouldFocusError: true,
  });

  const mutation = useMutation({
    mutationFn: (data: WalkthroughFormData) => api.submitWalkthrough(data),
    onSuccess: () => gtagReportConversion(),
  });

  const onSubmit = (data: WalkthroughFormData) => mutation.mutate(data);
  const successRef = useStatusPanel<HTMLDivElement>(mutation.isSuccess);

  if (mutation.isSuccess) {
    return (
      <div ref={successRef} role="status" tabIndex={-1} className="flex min-h-[400px] items-center justify-center bg-white p-12 shadow-sm">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center bg-brand-green/10">
            <CalendarCheck className="h-10 w-10 text-brand-green-text" />
          </div>
          <h2 className="font-display text-xl font-bold text-gray-900 lg:text-2xl">
            Walkthrough Scheduled!
          </h2>
          <p className="mt-3 text-gray-600">
            We&apos;ll confirm your walkthrough appointment within 24 hours. A member of our team
            will visit your facility for a complimentary assessment.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            For immediate assistance, call{" "}
            <a href="tel:+12818295357" className="text-brand-green-text hover:underline">
              (281) 829-5357
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {mutation.isError && (
        <div role="alert" className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          Something went wrong. Please try again or call us directly.
        </div>
      )}

      {/* Contact Info */}
      <div className="bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-xl font-bold text-gray-900 lg:text-lg">
          Contact Information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="wt-name" className="mb-1.5 block text-sm font-medium text-gray-700">
              Full Name <span aria-hidden="true">*</span>
            </label>
            <input
              {...register("name")}
              id="wt-name"
              required
              autoComplete="name"
              enterKeyHint="next"
              aria-required="true"
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "wt-name-error" : undefined}
              className={FIELD}
              placeholder="John Smith"
            />
            {errors.name && <p id="wt-name-error" role="alert" className={ERROR}>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="wt-company" className="mb-1.5 block text-sm font-medium text-gray-700">Company</label>
            <input
              {...register("company")}
              id="wt-company"
              autoComplete="organization"
              enterKeyHint="next"
              className={FIELD}
              placeholder="Company name"
            />
          </div>
          <div>
            <label htmlFor="wt-email" className="mb-1.5 block text-sm font-medium text-gray-700">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              {...register("email")}
              id="wt-email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              enterKeyHint="next"
              aria-required="true"
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "wt-email-error" : undefined}
              className={FIELD}
              placeholder="john@company.com"
            />
            {errors.email && <p id="wt-email-error" role="alert" className={ERROR}>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="wt-phone" className="mb-1.5 block text-sm font-medium text-gray-700">
              Phone <span aria-hidden="true">*</span>
            </label>
            <input
              {...register("phone")}
              id="wt-phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              enterKeyHint="next"
              aria-required="true"
              aria-invalid={errors.phone ? "true" : undefined}
              aria-describedby={errors.phone ? "wt-phone-error" : undefined}
              className={FIELD}
              placeholder="(555) 123-4567"
            />
            {errors.phone && <p id="wt-phone-error" role="alert" className={ERROR}>{errors.phone.message}</p>}
          </div>
        </div>
      </div>

      {/* Facility Details */}
      <div className="bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-xl font-bold text-gray-900 lg:text-lg">
          Facility Details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="wt-address" className="mb-1.5 block text-sm font-medium text-gray-700">
              Facility Address <span aria-hidden="true">*</span>
            </label>
            <input
              {...register("address")}
              id="wt-address"
              required
              autoComplete="street-address"
              enterKeyHint="next"
              aria-required="true"
              aria-invalid={errors.address ? "true" : undefined}
              aria-describedby={errors.address ? "wt-address-error" : undefined}
              className={FIELD}
              placeholder="123 Main St, Houston, TX 77001"
            />
            {errors.address && <p id="wt-address-error" role="alert" className={ERROR}>{errors.address.message}</p>}
          </div>
          <div>
            <label htmlFor="wt-facility-type" className="mb-1.5 block text-sm font-medium text-gray-700">
              Facility Type <span aria-hidden="true">*</span>
            </label>
            <select
              {...register("facilityType")}
              id="wt-facility-type"
              required
              autoComplete="off"
              aria-required="true"
              aria-invalid={errors.facilityType ? "true" : undefined}
              aria-describedby={errors.facilityType ? "wt-facility-type-error" : undefined}
              className={FIELD}
            >
              <option value="">Select facility type</option>
              {facilityTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>{type}</option>
              ))}
            </select>
            {errors.facilityType && <p id="wt-facility-type-error" role="alert" className={ERROR}>{errors.facilityType.message}</p>}
          </div>
        </div>
      </div>

      {/* Scheduling */}
      <div className="bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-xl font-bold text-gray-900 lg:text-lg">
          Preferred Schedule
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="wt-date" className="mb-1.5 block text-sm font-medium text-gray-700">
              Preferred Date <span aria-hidden="true">*</span>
            </label>
            <input
              {...register("preferredDate")}
              id="wt-date"
              type="date"
              required
              autoComplete="off"
              min={new Date().toISOString().split("T")[0]}
              aria-required="true"
              aria-invalid={errors.preferredDate ? "true" : undefined}
              aria-describedby={errors.preferredDate ? "wt-date-error" : undefined}
              className={FIELD}
            />
            {errors.preferredDate && <p id="wt-date-error" role="alert" className={ERROR}>{errors.preferredDate.message}</p>}
          </div>
          <div>
            <label htmlFor="wt-time" className="mb-1.5 block text-sm font-medium text-gray-700">Preferred Time</label>
            <select
              {...register("preferredTime")}
              id="wt-time"
              autoComplete="off"
              className={FIELD}
            >
              <option value="">Select time slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white p-6 shadow-sm">
        <label htmlFor="wt-notes" className="mb-1.5 block text-sm font-medium text-gray-700">Additional Notes</label>
        <textarea
          {...register("notes")}
          id="wt-notes"
          rows={4}
          autoComplete="off"
          enterKeyHint="done"
          className={FIELD}
          placeholder="Tell us about your facility, specific areas of concern, access requirements, etc."
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="flex w-full items-center justify-center gap-2 bg-brand-green-deep px-8 py-4 text-xl font-semibold text-brand-on-green shadow-lg transition-all hover:bg-brand-green-deep-hover hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 lg:text-lg"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Schedule Walkthrough
            <Send className="h-5 w-5" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

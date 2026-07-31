"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { quoteSchema, type QuoteFormData } from "@/types/forms";
import { services } from "@/lib/services-data";
import { gtagReportConversion } from "@/lib/analytics";
import { api } from "@/lib/api";
import { COMPANY } from "@/lib/constants";

// Shared field/error styles. `focus-visible` handling comes from the global
// focus ring in globals.css, so fields only carry their resting styles here.
const FIELD =
  "w-full rounded-none border border-gray-300 px-4 py-3 text-sm focus:border-brand-green-deep focus:outline-none focus:ring-2 focus:ring-brand-green-deep/20";
// red-600, not red-500: #ef4444 is only 3.76:1 on white and fails AA.
const ERROR = "mt-1 text-xs text-red-600";

const facilityTypes = [
  "Commercial Office",
  "Medical Facility",
  "Industrial Plant",
  "School/University",
  "Religious Facility",
  "Restaurant",
  "Retail Store",
  "Warehouse",
  "Other",
];

export function QuoteForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { services: [] },
  });

  const mutation = useMutation({
    mutationFn: (data: QuoteFormData) => api.submitQuote(data),
    onSuccess: () => gtagReportConversion(),
  });

  const facilityType = watch("facilityType");

  const toggleService = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setSelectedServices(updated);
    setValue("services", updated, { shouldValidate: true });
  };

  const onSubmit = (data: QuoteFormData) => mutation.mutate(data);

  if (mutation.isSuccess) {
    return (
      <div role="status" className="flex min-h-[400px] items-center justify-center rounded-none bg-white p-12 shadow-sm">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-none bg-brand-green/10">
            <CheckCircle className="h-10 w-10 text-brand-green-text" />
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900" tabIndex={-1}>
            Quote Request Submitted!
          </h2>
          <p className="mt-3 text-gray-600">
            Our team will review your requirements and contact you within 24
            hours with a detailed proposal.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            For immediate assistance, call{" "}
            <a href={`tel:${COMPANY.phone.primary}`} className="text-brand-green-text hover:underline">
              {COMPANY.phone.display}
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
      <div className="rounded-none bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg font-bold text-gray-900">
          Contact Information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-name" className="mb-1.5 block text-sm font-medium text-gray-700">
              Full Name <span aria-hidden="true">*</span>
            </label>
            <input
              {...register("name")}
              id="quote-name"
              autoComplete="name"
              aria-required="true"
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "quote-name-error" : undefined}
              className={FIELD}
              placeholder="John Smith"
            />
            {errors.name && (
              <p id="quote-name-error" role="alert" className={ERROR}>{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="quote-company" className="mb-1.5 block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              {...register("company")}
              id="quote-company"
              autoComplete="organization"
              className={FIELD}
              placeholder="Company name"
            />
          </div>
          <div>
            <label htmlFor="quote-email" className="mb-1.5 block text-sm font-medium text-gray-700">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              {...register("email")}
              id="quote-email"
              type="email"
              autoComplete="email"
              aria-required="true"
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "quote-email-error" : undefined}
              className={FIELD}
              placeholder="john@company.com"
            />
            {errors.email && (
              <p id="quote-email-error" role="alert" className={ERROR}>{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="quote-phone" className="mb-1.5 block text-sm font-medium text-gray-700">
              Phone <span aria-hidden="true">*</span>
            </label>
            <input
              {...register("phone")}
              id="quote-phone"
              type="tel"
              autoComplete="tel"
              aria-required="true"
              aria-invalid={errors.phone ? "true" : undefined}
              aria-describedby={errors.phone ? "quote-phone-error" : undefined}
              className={FIELD}
              placeholder="(555) 123-4567"
            />
            {errors.phone && (
              <p id="quote-phone-error" role="alert" className={ERROR}>{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Facility Info */}
      <div className="rounded-none bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg font-bold text-gray-900">
          Facility Details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-facility-type" className="mb-1.5 block text-sm font-medium text-gray-700">
              Facility Type <span aria-hidden="true">*</span>
            </label>
            <select
              {...register("facilityType")}
              id="quote-facility-type"
              aria-required="true"
              aria-invalid={errors.facilityType ? "true" : undefined}
              aria-describedby={errors.facilityType ? "quote-facility-type-error" : undefined}
              className={FIELD}
            >
              <option value="">Select facility type</option>
              {facilityTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
            {errors.facilityType && (
              <p id="quote-facility-type-error" role="alert" className={ERROR}>
                {errors.facilityType.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="quote-sqft" className="mb-1.5 block text-sm font-medium text-gray-700">
              Square Footage
            </label>
            <input
              {...register("squareFootage")}
              id="quote-sqft"
              className={FIELD}
              placeholder="e.g. 10,000 sq ft"
            />
          </div>
        </div>
        {facilityType === "other" && (
          <div className="mt-4">
            <label htmlFor="quote-custom-facility" className="mb-1.5 block text-sm font-medium text-gray-700">
              Specify Facility Type <span aria-hidden="true">*</span>
            </label>
            <input
              {...register("customFacilityType")}
              id="quote-custom-facility"
              aria-required="true"
              aria-invalid={errors.customFacilityType ? "true" : undefined}
              aria-describedby={errors.customFacilityType ? "quote-custom-facility-error" : undefined}
              className={FIELD}
              placeholder="Describe your facility"
            />
            {errors.customFacilityType && (
              <p id="quote-custom-facility-error" role="alert" className={ERROR}>
                {errors.customFacilityType.message}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Services Selection — a checkbox group, so it needs fieldset/legend
          rather than a bare heading for the grouping to reach screen readers. */}
      <fieldset className="rounded-none bg-white p-6 shadow-sm">
        <legend className="mb-4 font-display text-lg font-bold text-gray-900">
          Services Needed <span aria-hidden="true">*</span>
        </legend>
        {errors.services && (
          <p id="quote-services-error" role="alert" className="mb-3 text-xs text-red-600">
            {errors.services.message}
          </p>
        )}
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "General Janitorial",
            "Floor Care",
            "Carpet Cleaning",
            "Window Cleaning",
            "Restroom Sanitization",
            "Medical Sanitization",
            "Terminal Cleaning",
            "Post-Construction",
            "Pressure Washing",
            "Concrete Floor Coating",
            "Emergency Cleanup",
            "Specialized Cleaning",
          ].map((service) => (
            <label
              key={service}
              className={`flex cursor-pointer items-center gap-3 rounded-none border p-3 text-sm transition-all ${
                selectedServices.includes(service)
                  ? "border-brand-green-deep bg-brand-green/5 text-brand-green-text"
                  : "border-gray-200 hover:border-brand-green/30"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={() => toggleService(service)}
                className="sr-only"
              />
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-none border ${
                  selectedServices.includes(service)
                    ? "border-brand-green-deep bg-brand-green-deep text-brand-on-green"
                    : "border-gray-300"
                }`}
              >
                {selectedServices.includes(service) && (
                  <CheckCircle className="h-3 w-3" />
                )}
              </div>
              {service}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Notes */}
      <div className="rounded-none bg-white p-6 shadow-sm">
        <label htmlFor="quote-notes" className="mb-1.5 block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          {...register("notes")}
          id="quote-notes"
          rows={4}
          className={FIELD}
          placeholder="Tell us about any specific requirements, scheduling preferences, or questions..."
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="flex w-full items-center justify-center gap-2 rounded-none bg-brand-green-deep px-8 py-4 text-lg font-semibold text-brand-on-green shadow-lg transition-all hover:bg-brand-green-deep-hover hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
      >
        {mutation.isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            Submit Quote Request
            <Send className="h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
}

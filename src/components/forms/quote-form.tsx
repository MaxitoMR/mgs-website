"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { quoteSchema, type QuoteFormData } from "@/types/forms";
import { services } from "@/lib/services-data";
import { gtagReportConversion } from "@/lib/analytics";

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
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { services: [] },
  });

  const facilityType = watch("facilityType");

  const toggleService = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setSelectedServices(updated);
    setValue("services", updated, { shouldValidate: true });
  };

  const onSubmit = async (data: QuoteFormData) => {
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSubmitted(true);
      gtagReportConversion();
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-white p-12 shadow-sm">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-green/10">
            <CheckCircle className="h-10 w-10 text-brand-green" />
          </div>
          <h3 className="font-display text-2xl font-bold text-gray-900">
            Quote Request Submitted!
          </h3>
          <p className="mt-3 text-gray-600">
            Our team will review your requirements and contact you within 24
            hours with a detailed proposal.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            For immediate assistance, call{" "}
            <a href="tel:+17138048529" className="text-brand-green hover:underline">
              (713) 804-8529
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact Info */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-display text-lg font-bold text-gray-900">
          Contact Information
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              {...register("name")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              placeholder="John Smith"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              {...register("company")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              placeholder="Company name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              placeholder="john@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Phone *
            </label>
            <input
              {...register("phone")}
              type="tel"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              placeholder="(555) 123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Facility Info */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-display text-lg font-bold text-gray-900">
          Facility Details
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Facility Type *
            </label>
            <select
              {...register("facilityType")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            >
              <option value="">Select facility type</option>
              {facilityTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
            {errors.facilityType && (
              <p className="mt-1 text-xs text-red-500">
                {errors.facilityType.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Square Footage
            </label>
            <input
              {...register("squareFootage")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              placeholder="e.g. 10,000 sq ft"
            />
          </div>
        </div>
        {facilityType === "other" && (
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Specify Facility Type *
            </label>
            <input
              {...register("customFacilityType")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              placeholder="Describe your facility"
            />
            {errors.customFacilityType && (
              <p className="mt-1 text-xs text-red-500">
                {errors.customFacilityType.message}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Services Selection */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-display text-lg font-bold text-gray-900">
          Services Needed *
        </h3>
        {errors.services && (
          <p className="mb-3 text-xs text-red-500">{errors.services.message}</p>
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
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-all ${
                selectedServices.includes(service)
                  ? "border-brand-green bg-brand-green/5 text-brand-green"
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
                className={`flex h-5 w-5 items-center justify-center rounded border ${
                  selectedServices.includes(service)
                    ? "border-brand-green bg-brand-green text-white"
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
      </div>

      {/* Notes */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          {...register("notes")}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          placeholder="Tell us about any specific requirements, scheduling preferences, or questions..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-lime hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
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

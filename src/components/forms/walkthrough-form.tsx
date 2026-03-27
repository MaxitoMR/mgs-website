"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, CheckCircle, CalendarCheck } from "lucide-react";
import { walkthroughSchema, type WalkthroughFormData } from "@/types/forms";
import { api } from "@/lib/api";
import { gtagReportConversion } from "@/lib/analytics";

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
  });

  const mutation = useMutation({
    mutationFn: (data: WalkthroughFormData) => api.submitWalkthrough(data),
    onSuccess: () => gtagReportConversion(),
  });

  const onSubmit = (data: WalkthroughFormData) => mutation.mutate(data);

  if (mutation.isSuccess) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-white p-12 shadow-sm">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center bg-brand-green/10">
            <CalendarCheck className="h-10 w-10 text-brand-green" />
          </div>
          <h3 className="font-display text-2xl font-bold text-gray-900">
            Walkthrough Scheduled!
          </h3>
          <p className="mt-3 text-gray-600">
            We&apos;ll confirm your walkthrough appointment within 24 hours. A member of our team
            will visit your facility for a complimentary assessment.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            For immediate assistance, call{" "}
            <a href="tel:+12818295358" className="text-brand-green hover:underline">
              (281) 829-5358
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {mutation.isError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          Something went wrong. Please try again or call us directly.
        </div>
      )}

      {/* Contact Info */}
      <div className="bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-display text-lg font-bold text-gray-900">
          Contact Information
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name *</label>
            <input
              {...register("name")}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              placeholder="John Smith"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Company</label>
            <input
              {...register("company")}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              placeholder="Company name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email *</label>
            <input
              {...register("email")}
              type="email"
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              placeholder="john@company.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone *</label>
            <input
              {...register("phone")}
              type="tel"
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              placeholder="(555) 123-4567"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
          </div>
        </div>
      </div>

      {/* Facility Details */}
      <div className="bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-display text-lg font-bold text-gray-900">
          Facility Details
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Facility Address *</label>
            <input
              {...register("address")}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              placeholder="123 Main St, Houston, TX 77001"
            />
            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Facility Type *</label>
            <select
              {...register("facilityType")}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            >
              <option value="">Select facility type</option>
              {facilityTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>{type}</option>
              ))}
            </select>
            {errors.facilityType && <p className="mt-1 text-xs text-red-500">{errors.facilityType.message}</p>}
          </div>
        </div>
      </div>

      {/* Scheduling */}
      <div className="bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-display text-lg font-bold text-gray-900">
          Preferred Schedule
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Preferred Date *</label>
            <input
              {...register("preferredDate")}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            />
            {errors.preferredDate && <p className="mt-1 text-xs text-red-500">{errors.preferredDate.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Preferred Time</label>
            <select
              {...register("preferredTime")}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
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
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Additional Notes</label>
        <textarea
          {...register("notes")}
          rows={4}
          className="w-full border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          placeholder="Tell us about your facility, specific areas of concern, access requirements, etc."
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="flex w-full items-center justify-center gap-2 bg-brand-green px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-lime hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
      >
        {mutation.isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            Schedule Walkthrough
            <Send className="h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
}

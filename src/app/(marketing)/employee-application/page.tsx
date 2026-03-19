"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { applicationSchema, type ApplicationFormData } from "@/types/forms";

export default function EmployeeApplicationPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormData) => {
    const res = await fetch("/api/application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        title="Employee Application"
        subtitle="Apply to join the MGS professional cleaning team."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: "Apply" },
        ]}
      />

      <SectionWrapper>
        {submitted ? (
          <div className="mx-auto flex max-w-md items-center justify-center rounded-2xl bg-white p-12 shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-green/10">
                <CheckCircle className="h-10 w-10 text-brand-green" />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900">
                Application Submitted!
              </h3>
              <p className="mt-3 text-gray-600">
                Thank you for your interest. Our HR team will review your
                application and contact you within 5 business days.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-2xl space-y-6"
          >
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-display text-lg font-bold text-gray-900">
                Personal Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: "firstName" as const, label: "First Name", placeholder: "John" },
                  { name: "lastName" as const, label: "Last Name", placeholder: "Smith" },
                  { name: "email" as const, label: "Email", placeholder: "john@email.com", type: "email" },
                  { name: "phone" as const, label: "Phone", placeholder: "(555) 123-4567", type: "tel" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      {field.label} *
                    </label>
                    <input
                      {...register(field.name)}
                      type={field.type || "text"}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-display text-lg font-bold text-gray-900">
                Position Details
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Position Applied For *
                  </label>
                  <select
                    {...register("position")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  >
                    <option value="">Select position</option>
                    <option value="janitorial-team-member">Janitorial Team Member</option>
                    <option value="medical-specialist">Medical Facility Specialist</option>
                    <option value="floor-care-tech">Floor Care Technician</option>
                    <option value="team-lead">Team Lead</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.position && (
                    <p className="mt-1 text-xs text-red-500">{errors.position.message}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Availability
                  </label>
                  <select
                    {...register("availability")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  >
                    <option value="">Select availability</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Relevant Experience
                </label>
                <textarea
                  {...register("experience")}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  placeholder="Describe any relevant cleaning, maintenance, or facility management experience..."
                />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  placeholder="Anything else you'd like us to know..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-lime disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Submit Application
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        )}
      </SectionWrapper>
    </>
  );
}

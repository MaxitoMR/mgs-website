"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { applicationSchema, type ApplicationFormData } from "@/types/forms";
import { api } from "@/lib/api";

// Shared field/error styles; the visible focus ring comes from globals.css.
const FIELD =
  "w-full rounded-none border border-gray-300 px-4 py-3 text-sm focus:border-brand-green-deep focus:outline-none focus:ring-2 focus:ring-brand-green-deep/20";
// red-600, not red-500: #ef4444 is only 3.76:1 on white and fails AA.
const ERROR = "mt-1 text-xs text-red-600";

export default function ApplicationContent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ApplicationFormData) => api.submitApplication(data),
  });

  const onSubmit = (data: ApplicationFormData) => mutation.mutate(data);

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
        {mutation.isSuccess ? (
          <div role="status" className="mx-auto flex max-w-md items-center justify-center rounded-none bg-white p-12 shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-none bg-brand-green/10">
                <CheckCircle className="h-10 w-10 text-brand-green-text" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900">
                Application Submitted!
              </h2>
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
            <div className="rounded-none bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-display text-lg font-bold text-gray-900">
                Personal Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: "firstName" as const, label: "First Name", placeholder: "John", autoComplete: "given-name" },
                  { name: "lastName" as const, label: "Last Name", placeholder: "Smith", autoComplete: "family-name" },
                  { name: "email" as const, label: "Email", placeholder: "john@email.com", type: "email", autoComplete: "email" },
                  { name: "phone" as const, label: "Phone", placeholder: "(555) 123-4567", type: "tel", autoComplete: "tel" },
                ].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={`app-${field.name}`} className="mb-1.5 block text-sm font-medium text-gray-700">
                      {field.label} <span aria-hidden="true">*</span>
                    </label>
                    <input
                      {...register(field.name)}
                      id={`app-${field.name}`}
                      type={field.type || "text"}
                      autoComplete={field.autoComplete}
                      aria-required="true"
                      aria-invalid={errors[field.name] ? "true" : undefined}
                      aria-describedby={errors[field.name] ? `app-${field.name}-error` : undefined}
                      className={FIELD}
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && (
                      <p id={`app-${field.name}-error`} role="alert" className={ERROR}>
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-none bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-display text-lg font-bold text-gray-900">
                Position Details
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="app-position" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Position Applied For <span aria-hidden="true">*</span>
                  </label>
                  <select
                    {...register("position")}
                    id="app-position"
                    aria-required="true"
                    aria-invalid={errors.position ? "true" : undefined}
                    aria-describedby={errors.position ? "app-position-error" : undefined}
                    className={FIELD}
                  >
                    <option value="">Select position</option>
                    <option value="floor-tech">Floor Tech</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="day-maid">Day Maid</option>
                    <option value="janitor">Janitor</option>
                  </select>
                  {errors.position && (
                    <p id="app-position-error" role="alert" className={ERROR}>{errors.position.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="app-availability" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Availability
                  </label>
                  <select
                    {...register("availability")}
                    id="app-availability"
                    className={FIELD}
                  >
                    <option value="">Select availability</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="app-experience" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Relevant Experience
                </label>
                <textarea
                  {...register("experience")}
                  id="app-experience"
                  rows={3}
                  className={FIELD}
                  placeholder="Describe any relevant cleaning, maintenance, or facility management experience..."
                />
              </div>
              <div className="mt-4">
                <label htmlFor="app-notes" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  {...register("notes")}
                  id="app-notes"
                  rows={3}
                  className={FIELD}
                  placeholder="Anything else you'd like us to know..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-none bg-brand-green-deep px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-green-deep-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {mutation.isPending ? (
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

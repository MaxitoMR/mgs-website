"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { contactSchema, type ContactFormData } from "@/types/forms";
import { SectionWrapper } from "@/components/shared/section-wrapper";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSubmitted(true);
      reset();
    }
  };

  return (
    <SectionWrapper id="contact" className="bg-gray-50">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-bold uppercase tracking-widest text-brand-green"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-600"
          >
            Ready to experience the MGS difference? Reach out today for a free
            consultation.
          </motion.p>

          <div className="mt-8 space-y-6">
            {[
              {
                icon: Phone,
                label: "Phone",
                value: COMPANY.phone.display,
                href: `tel:${COMPANY.phone.primary}`,
              },
              {
                icon: Mail,
                label: "Email",
                value: COMPANY.email,
                href: `mailto:${COMPANY.email}`,
              },
              {
                icon: MapPin,
                label: "Address",
                value: COMPANY.address.full,
                href: COMPANY.address.mapsUrl,
              },
              {
                icon: Clock,
                label: "Hours",
                value: "24/7 Emergency Services Available",
                href: undefined,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-gray-900 transition-colors hover:text-brand-green"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-gray-900">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {submitted ? (
            <div className="flex h-full items-center justify-center rounded-2xl bg-white p-12 shadow-sm">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
                  <Send className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900">
                  Message Sent!
                </h3>
                <p className="mt-2 text-gray-600">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl bg-white p-8 shadow-sm"
            >
              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                    placeholder="How can we help?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-8 py-3.5 font-semibold text-white shadow-md transition-all hover:bg-brand-lime hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

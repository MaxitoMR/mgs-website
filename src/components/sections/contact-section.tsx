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
    <SectionWrapper id="contact" className="bg-gray-50/80">
      <div className="grid gap-16 lg:grid-cols-2">
        {/* Left: Contact Info */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="subtitle inline-block text-brand-green"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="mt-4 font-display text-4xl font-extrabold tracking-[-0.02em] text-gray-900 sm:text-5xl"
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="mt-5 text-lg text-gray-500"
          >
            Ready to experience the MGS difference? Reach out today for a free
            consultation.
          </motion.p>

          <div className="mt-10 space-y-6">
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
            ].map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group flex items-start gap-4"
              >
                <div className="flex h-13 w-13 flex-shrink-0 items-center justify-center rounded-none bg-gradient-to-br from-brand-green/10 to-brand-lime/5 text-brand-green transition-all duration-300 group-hover:shadow-green-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-0.5 text-gray-900 transition-colors hover:text-brand-green"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-gray-900">{value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.5 }}
            className="mt-10 overflow-hidden rounded-none"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.5!2d-95.82!3d29.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQ3JzI0LjAiTiA5NcKwNDknMTIuMCJX!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="200"
              style={{ border: 0, filter: "grayscale(0.5) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MGS Supply & Services Location"
              className="rounded-none"
            />
          </motion.div>
        </div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.3 }}
        >
          {submitted ? (
            <div className="flex h-full items-center justify-center rounded-none bg-white p-12 shadow-premium">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-none bg-gradient-to-br from-brand-green/10 to-brand-lime/10">
                  <Send className="h-9 w-9 text-brand-green" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-gray-900">
                  Message Sent!
                </h3>
                <p className="mt-2 text-gray-500">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-none bg-white p-8 shadow-premium md:p-10"
            >
              <div className="mb-8">
                <h3 className="font-display text-xl font-extrabold text-gray-900">Send us a message</h3>
                <p className="mt-1 text-sm text-gray-500">Fill out the form and we&apos;ll respond promptly.</p>
              </div>

              <div className="space-y-5">
                <div className="group relative">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    className="w-full rounded-none border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all duration-300 placeholder:text-gray-400 focus:border-brand-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/10"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full rounded-none border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all duration-300 placeholder:text-gray-400 focus:border-brand-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/10"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Phone
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full rounded-none border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all duration-300 placeholder:text-gray-400 focus:border-brand-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/10"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="w-full rounded-none border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all duration-300 placeholder:text-gray-400 focus:border-brand-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/10"
                    placeholder="How can we help?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-none bg-gradient-to-r from-brand-green to-brand-lime px-8 py-4 font-bold text-white shadow-lg shadow-brand-green/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand-green/30 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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

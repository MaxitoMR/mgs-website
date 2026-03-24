"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { contactSchema, type ContactFormData } from "@/types/forms";

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
    <section
      id="contact"
      className="relative w-full bg-white overflow-hidden"
      style={{
        paddingTop: 'clamp(4rem, 8vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        borderTopLeftRadius: 'clamp(2rem, 4vw, 4rem)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: Contact Info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow text-[#69AF23] mb-4"
            >
              Get In Touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-gothic text-gray-900 mb-6"
              style={{ fontSize: 'var(--font-h2)', fontWeight: 300 }}
            >
              Let&apos;s discuss your{' '}
              <span className="text-[#69AF23]">facility needs.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 mb-12"
              style={{ fontSize: 'var(--font-body-base)', fontWeight: 300, lineHeight: 1.7 }}
            >
              Ready to experience the MGS difference? Reach out today for a free
              consultation and customized proposal.
            </motion.p>

            <div className="space-y-6">
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
                  value: "Mon-Fri 9AM-5PM | 24/7 Emergency",
                  href: undefined,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center"
                    style={{
                      background: '#69AF2310',
                      borderTopLeftRadius: '0.75rem',
                    }}
                  >
                    <Icon className="h-5 w-5 text-[#69AF23]" />
                  </div>
                  <div>
                    <p className="eyebrow text-gray-400 mb-1">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-medium text-gray-900 transition-colors hover:text-[#69AF23]"
                        style={{ fontSize: 'var(--font-body-base)' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-medium text-gray-900" style={{ fontSize: 'var(--font-body-base)' }}>
                        {value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <div
                className="flex h-full items-center justify-center bg-[#f0f5e8] p-12 shadow-premium"
                style={{ borderTopLeftRadius: '3rem' }}
              >
                <div className="text-center">
                  <div
                    className="mx-auto mb-5 flex h-20 w-20 items-center justify-center"
                    style={{ background: '#69AF2315', borderTopLeftRadius: '1.5rem' }}
                  >
                    <Send className="h-9 w-9 text-[#69AF23]" />
                  </div>
                  <h3 className="font-gothic text-gray-900" style={{ fontSize: 'var(--font-h3)', fontWeight: 400 }}>
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 mt-2" style={{ fontSize: 'var(--font-caption)', fontWeight: 300 }}>
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#f9faf7] p-8 shadow-premium md:p-10"
                style={{ borderTopLeftRadius: '3rem' }}
              >
                <div className="mb-8">
                  <h3 className="font-gothic text-gray-900" style={{ fontSize: 'var(--font-h3)', fontWeight: 400 }}>
                    Send us a message
                  </h3>
                  <p className="text-gray-500 mt-1" style={{ fontSize: 'var(--font-caption)', fontWeight: 300 }}>
                    Fill out the form and we&apos;ll respond promptly.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block eyebrow text-gray-400">
                      Name
                    </label>
                    <input
                      {...register("name")}
                      className="w-full border border-gray-200 bg-white px-4 py-3.5 font-light text-gray-700 placeholder:text-gray-400 focus:border-[#69AF23] focus:outline-none focus:ring-2 focus:ring-[#69AF23]/10"
                      style={{ fontSize: 'var(--font-caption)', borderTopLeftRadius: '0.75rem' }}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block eyebrow text-gray-400">
                        Email
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full border border-gray-200 bg-white px-4 py-3.5 font-light text-gray-700 placeholder:text-gray-400 focus:border-[#69AF23] focus:outline-none focus:ring-2 focus:ring-[#69AF23]/10"
                        style={{ fontSize: 'var(--font-caption)', borderTopLeftRadius: '0.75rem' }}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block eyebrow text-gray-400">
                        Phone
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className="w-full border border-gray-200 bg-white px-4 py-3.5 font-light text-gray-700 placeholder:text-gray-400 focus:border-[#69AF23] focus:outline-none focus:ring-2 focus:ring-[#69AF23]/10"
                        style={{ fontSize: 'var(--font-caption)', borderTopLeftRadius: '0.75rem' }}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block eyebrow text-gray-400">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="w-full border border-gray-200 bg-white px-4 py-3.5 font-light text-gray-700 placeholder:text-gray-400 focus:border-[#69AF23] focus:outline-none focus:ring-2 focus:ring-[#69AF23]/10"
                      style={{ fontSize: 'var(--font-caption)', borderTopLeftRadius: '0.75rem' }}
                      placeholder="How can we help?"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 bg-[#69AF23] px-8 py-4 font-medium text-white shadow-lg transition-all hover:bg-[#5a9a1e] disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ fontSize: 'var(--font-body-base)', borderTopLeftRadius: '1.5rem' }}
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
          </div>
        </div>
      </div>
    </section>
  );
}

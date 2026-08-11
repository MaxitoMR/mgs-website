"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { useStatusPanel } from "@/hooks/use-status-panel";
import { contactSchema, type ContactFormData } from "@/types/forms";
import { api } from "@/lib/api";

// gray-600, not gray-400: #99a1af sits at ~2.5:1 on this near-white card
// and fails AA for the small uppercase eyebrow labels.
const LABEL = "mb-1.5 block eyebrow text-gray-600";
const FIELD =
  "w-full border border-gray-200 bg-white px-4 py-3.5 font-light text-gray-700 placeholder:text-gray-500 focus:border-brand-green-deep focus:outline-none focus:ring-2 focus:ring-brand-green-deep/10";
const ERROR = "mt-1 text-xs text-red-600";

export function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    // Moves focus to the first field that failed validation.
    shouldFocusError: true,
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => api.submitContact(data),
    onSuccess: () => reset(),
  });

  const onSubmit = (data: ContactFormData) => mutation.mutate(data);
  const successRef = useStatusPanel<HTMLDivElement>(mutation.isSuccess);

  return (
    <section
      id="contact"
      className="relative w-full bg-white overflow-hidden"
      style={{
        paddingTop: 'clamp(2rem, 8vw, 8rem)',
        paddingBottom: 'clamp(2rem, 8vw, 8rem)',
        borderTopLeftRadius: 'clamp(2rem, 4vw, 4rem)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left: Contact Info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow text-brand-green-text mb-4"
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
              Let&apos;s scope your{' '}
              <span className="text-brand-green-text">facility requirements.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 mb-7 lg:mb-12"
              style={{ fontSize: 'var(--font-body-base)', fontWeight: 300, lineHeight: 1.7 }}
            >
              Send your site details and requirements. We respond within one business
              day with a walkthrough date.
            </motion.p>

            <div className="space-y-3 lg:space-y-6">
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
                    <Icon className="h-5 w-5 text-brand-green-text" />
                  </div>
                  <div>
                    <p className="eyebrow text-gray-600 mb-1">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="-my-2.5 inline-flex min-h-11 items-center py-2.5 font-medium text-gray-900 transition-colors hover:text-brand-green-text lg:my-0 lg:min-h-0 lg:py-0"
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
            {mutation.isSuccess ? (
              <div
                ref={successRef}
                role="status"
                tabIndex={-1}
                className="flex h-full items-center justify-center bg-[#f0f5e8] p-12 shadow-premium"
                style={{ borderTopLeftRadius: '3rem' }}
              >
                <div className="text-center">
                  <div
                    className="mx-auto mb-5 flex h-20 w-20 items-center justify-center"
                    style={{ background: '#69AF2315', borderTopLeftRadius: '1.5rem' }}
                  >
                    <Send className="h-9 w-9 text-brand-green-text" />
                  </div>
                  <h3 className="font-gothic text-gray-900" style={{ fontSize: 'var(--font-h3)', fontWeight: 400 }}>
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 mt-2" style={{ fontSize: 'var(--font-caption)', fontWeight: 300 }}>
                    We respond within one business day.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#f9faf7] p-5 shadow-premium sm:p-8 md:p-10"
                style={{ borderTopLeftRadius: '3rem' }}
              >
                <div className="mb-8">
                  <h3 className="font-gothic text-gray-900" style={{ fontSize: 'var(--font-h3)', fontWeight: 400 }}>
                    Send us a message
                  </h3>
                  <p className="text-gray-500 mt-1" style={{ fontSize: 'var(--font-caption)', fontWeight: 300 }}>
                    Share your requirements; we respond within one business day.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className={LABEL}>
                      Name
                    </label>
                    <input
                      {...register("name")}
                      id="contact-name"
                      required
                      autoComplete="name"
                      enterKeyHint="next"
                      aria-required="true"
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={FIELD}
                      style={{ fontSize: 'var(--font-caption)', borderTopLeftRadius: '0.75rem' }}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className={ERROR}>{errors.name.message}</p>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-email" className={LABEL}>
                        Email
                      </label>
                      <input
                        {...register("email")}
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        enterKeyHint="next"
                        aria-required="true"
                        aria-invalid={errors.email ? "true" : undefined}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        className={FIELD}
                        style={{ fontSize: 'var(--font-caption)', borderTopLeftRadius: '0.75rem' }}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p id="contact-email-error" role="alert" className={ERROR}>{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className={LABEL}>
                        Phone
                      </label>
                      <input
                        {...register("phone")}
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        enterKeyHint="next"
                        className={FIELD}
                        style={{ fontSize: 'var(--font-caption)', borderTopLeftRadius: '0.75rem' }}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={LABEL}>
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      id="contact-message"
                      rows={4}
                      required
                      autoComplete="off"
                      enterKeyHint="send"
                      aria-required="true"
                      aria-invalid={errors.message ? "true" : undefined}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className={FIELD}
                      style={{ fontSize: 'var(--font-caption)', borderTopLeftRadius: '0.75rem' }}
                      placeholder="How can we help?"
                    />
                    {errors.message && (
                      <p id="contact-message-error" role="alert" className={ERROR}>{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex w-full items-center justify-center gap-2 bg-brand-green-deep px-8 py-4 font-medium text-brand-on-green shadow-lg transition-all hover:bg-brand-green-deep-hover disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ fontSize: 'var(--font-body-base)', borderTopLeftRadius: '1.5rem' }}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" aria-hidden="true" />
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

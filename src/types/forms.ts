import { z } from "zod";

export const quoteSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    company: z.string().optional(),
    facilityType: z.string().min(1, "Facility type is required"),
    customFacilityType: z.string().optional(),
    squareFootage: z.string().optional(),
    services: z.array(z.string()).min(1, "Select at least one service"),
    notes: z.string().optional(),
  })
  .refine(
    (data) =>
      !(data.facilityType === "other" && !data.customFacilityType),
    {
      message: "Please specify your facility type",
      path: ["customFacilityType"],
    }
  );

export type QuoteFormData = z.infer<typeof quoteSchema>;

export const walkthroughSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  company: z.string().optional(),
  address: z.string().min(1, "Facility address is required"),
  facilityType: z.string().min(1, "Facility type is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
});

export type WalkthroughFormData = z.infer<typeof walkthroughSchema>;

export const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  position: z.string().min(1, "Position is required"),
  experience: z.string().optional(),
  availability: z.string().optional(),
  notes: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// app/schemas/contactSchema.ts

import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  text: z.string().min(5, "Tell us why you're here"),
  turnstileToken: z.string().min(1, "Turnstile verification is required"),
});

export type ContactFormInput = z.infer<typeof ContactSchema>;

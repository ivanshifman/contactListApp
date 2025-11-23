import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "The name must be at least 2 characters long")
    .max(50, "The name cannot exceed 50 characters long")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "The name can only contain letters and spaces"),

  lastname: z
    .string()
    .min(2, "The lastname must be at least 2 characters long")
    .max(50, "The lastname cannot exceed 50 characters long")
    .regex(
      /^[A-Za-zÀ-ÿ\s]+$/,
      "The lastname can only contain letters and spaces"
    ),

  email: z.string().email("Invalid email format"),

  phone: z
    .string()
    .regex(/^[0-9]{7,15}$/, "The phone must have 7 to 15 digits"),

  address: z
    .string()
    .min(4, "The address must be at least 4 characters long")
    .max(250, "The address cannot exceed 250 characters"),
});

export type ContactSchema = z.infer<typeof contactSchema>;

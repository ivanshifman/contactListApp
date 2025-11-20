import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(4, "The username must be at least 4 characters long")
    .max(50, "The username cannot exceed 50 characters long"),
  password: z
    .string()
    .min(1, "The password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "The password must contain uppercase, lowercase, number, and special character"
    ),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "The name must be at least 2 characters long")
      .max(50, "The name cannot exceed 50 characters long")
      .regex(/^[A-Za-zÀ-ÿ\s]+$/, "The name can only contain letters and spaces"),
    username: z
      .string()
      .min(4, "The username must be at least 4 characters long")
      .max(50, "The username cannot exceed 50 characters long"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "The password must contain uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords do not match",
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

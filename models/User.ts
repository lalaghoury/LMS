import { z } from "zod";

export const UserSignupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, { message: "Name must be 4 or more characters long" })
    .max(32, { message: "Name must be 32 or fewer characters long" }),
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .trim()
    .refine(
      (val) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{6,20}$/.test(
          val
        ),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export const UserSigninSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .trim()
    .refine(
      (val) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{6,20}$/.test(
          val
        ),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export type UserSignup = z.infer<typeof UserSignupSchema>;
export type UserSignin = z.infer<typeof UserSigninSchema>;

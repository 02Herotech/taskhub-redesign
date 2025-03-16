import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  actionChoice: z.enum(["GET_TASKS_DONE", "MONETIZE_YOUR_SKILLS"], {
    errorMap: () => ({ message: "" }),
  }),
  userType: z.enum(["USER", "BUSINESS"], {
    errorMap: () => ({ message: "" }),
  }),
  abn: z.string().optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    })
    .regex(/^\S*$/, { message: "No spaces allowed" }),
  confirmPassword: z.string(),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions to continue",
  }),
});

export const stepOneSchema = signupSchema
  .pick({
    firstName: true,
    lastName: true,
    actionChoice: true,
    userType: true,
    abn: true,
  })
  .superRefine(({ abn, actionChoice }, ctx) => {
    const isABNRequired = actionChoice == "MONETIZE_YOUR_SKILLS";
    if (isABNRequired && !abn) {
      ctx.addIssue({
        path: ["abn"],
        message: "Valid ABN is required",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type StepOneSchema = z.infer<typeof stepOneSchema>;

export const stepTwoSchema = signupSchema
  .pick({
    email: true,
    password: true,
    confirmPassword: true,
    terms: true,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type StepTwoSchema = z.infer<typeof stepTwoSchema>;

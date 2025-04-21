import { z } from "zod";

export const recurringFormSchema = z.object({
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"], {
    errorMap: () => ({ message: "Please select a frequency" }),
  }),
  day: z.string().optional().nullable(),
  time: z.string({
    required_error: "Please select a time",
  }),
  endType: z.enum(["never", "on"], {
    errorMap: () => ({ message: "Please select when to end" }),
  }),
  endDate: z
    .date({
      required_error: "Please select an end date",
      invalid_type_error: "That's not a valid date",
    })
    .optional()
    .nullable()
    .refine(
      (date) => {
        if (!date) return true;
        return date > new Date();
      },
      { message: "End date must be in the future" },
    ),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a valid number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Amount must be greater than 0",
    }),
});

export type RecurringFormValues = z.infer<typeof recurringFormSchema>;

import { z } from "zod";

//@ts-ignore
const MAX_FILE_SIZE = 5 * 1024 * 1024;
//@ts-ignore
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

const taskSchema = z.object({
  taskBriefDescription: z.string().min(1, "Task brief description is required"),
  taskDescription: z.string().min(1, "Task description is required"),
  taskImage: z
    .any()
    .optional()
    .refine((file) => {
      return file?.length > 0 && typeof file != "string"
        ? ACCEPTED_FILE_TYPES.includes(file?.type)
        : true;
    }, "Only images are allowed")
    .refine((file) => {
      return file?.length > 0 && typeof file != "string"
        ? file?.size <= MAX_FILE_SIZE
        : true;
    }, "File size must be less than 5MB"),
  taskDate: z.string().optional(),
  taskTime: z.string().optional(),
  isFlexible: z.boolean().optional(),
  taskType: z.enum(["PHYSICAL_SERVICE", "REMOTE_SERVICE"], {
    errorMap: () => ({ message: "Please select a type of service" }),
  }),
  suburb: z.string().optional(),
  customerBudget: z.number(),
  state: z.string().optional(),
  postcode: z.string().optional(),
  suburbName: z.string().optional(),
});

export const stepOneSchema = taskSchema
  .pick({
    taskBriefDescription: true,
    taskDescription: true,
    taskImage: true,
    taskDate: true,
    taskTime: true,
    isFlexible: true,
  })
  .superRefine(({ isFlexible, taskTime, taskDate }, ctx) => {
    //Function for validating a field if another field isn't available
    if (!isFlexible && (!taskDate || !taskTime)) {
      ctx.addIssue({
        path: ["taskDate"],
        message: "Date is required",
        code: z.ZodIssueCode.custom,
      });
      ctx.addIssue({
        path: ["taskTime"],
        message: "Time is required",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type StepOneSchema = z.infer<typeof stepOneSchema>;

export const stepTwoSchema = taskSchema
  .pick({
    taskType: true,
    suburb: true,
    customerBudget: true,
    state: true,
    postcode: true,
    suburbName: true,
  })
  .superRefine(({ taskType, suburb, state, postcode, suburbName }, ctx) => {
    if (taskType === "PHYSICAL_SERVICE" && !suburb) {
      ctx.addIssue({
        path: ["suburb"],
        message: "Please enter a suburb",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type StepTwoSchema = z.infer<typeof stepTwoSchema>;

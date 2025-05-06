import { z } from "zod";

export const listingZodSchema = z.object({
  listingTitle: z
    .string()
    .min(3, "Minimum of 3 characters")
    .refine((str) => str.split(" ").filter(Boolean).length > 0, {
      message: `Title must have ${1} word or more`,
    }),
  listingDescription: z
    .string()
    .min(10, "Minimum of 10 characters")
    .refine((str) => str.split(" ").filter(Boolean).length >= 5, {
      message: `Description must have ${5} words or more`,
    }),
  availableDays: z.array(z.string()),
  available: z.boolean(),
  taskType: z.string(),
  negotiable: z.boolean(),
  planOneDescription: z.string().min(1, "Please write a plan description"),
  planOnePrice: z.number(),
  planTwoDescription: z.string().nullable().optional(),
  planTwoPrice: z.string().nullable().optional(),
  planThreeDescription: z.string().nullable().optional(),
  planThreePrice: z.string().nullable().optional(),
  suburb: z.string().nullable().optional(),
  image1: z.string().optional(),
  image2: z.string().optional(),
  image3: z.string().optional(),
  image4: z.string().optional(),
});
export default listingZodSchema;

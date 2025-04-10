import { z } from "zod";

const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

const publicProfileSchema = z.object({
  profileImage: z
    .any()
    .optional()
    .refine((file) => {
      return file ? ACCEPTED_FILE_TYPES.includes(file?.type) : true;
    }, "Only images are allowed"),
  bioDescription: z.string().min(1, "Bio description is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  location: z.string().min(1, "Location is required"),
});

export type PublicProfileSchema = z.infer<typeof publicProfileSchema>;

export { publicProfileSchema };

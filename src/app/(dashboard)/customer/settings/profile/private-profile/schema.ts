import { z } from "zod";

const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const updateProfileSchema = z
  .object({
    dateOfBirth: z.date(),
    phoneNumber: z.string().min(1, "Phone number is required"),
    email: z.string().email(),
    idType: z
      .enum(
        [
          "MEDICARE_CARD",
          "INTERNATIONAL_PASSPORT",
          "PHOTO_ID",
          "DRIVERS_LICENSE",
        ],
        {
          errorMap: () => ({ message: "Please select a type of ID" }),
        },
      )
      .optional()
      .nullable(),
    idNumber: z.string().min(1, "Enter your ID number"),
    idImageFront: z
      .any()
      .optional()
      // .refine((file) => file, "ID Image is required")
      .refine((file) => {
        return file ? ACCEPTED_FILE_TYPES.includes(file?.type) : true;
      }, "Only images are allowed"),
    idImageBack: z
      .any()
      .optional()
      .refine((file) => {
        return file ? ACCEPTED_FILE_TYPES.includes(file?.type) : true;
      }, "Only images are allowed"),
  })
  .superRefine(({ idType, idImageBack }, ctx) => {
    //Function for validating a field if another field isn't available
    // if (idType !== "INTERNATIONAL_PASSPORT" && !idImageBack) {
    //   ctx.addIssue({
    //     path: ["idImageBack"],
    //     message: "ID Image is required",
    //     code: z.ZodIssueCode.custom,
    //   });
    // }
  });

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

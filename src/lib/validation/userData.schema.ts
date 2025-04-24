import { z } from "zod";

export const userDataSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  dateOfBirth: z.date().nullable().optional(),
  // phoneNumber: z.string().optional(),
  emailAddress: z.string().email().optional(),
  suburb: z.string().optional(),
  postcode: z.string().optional(),
  state: z.string().optional(),
  suburbName: z.string().optional(),
  idType: z.string().optional().nullable(),
  abn: z.string().nullable().optional(),
  idNumber: z.string().optional(),
  bio: z.string().nullable().optional(),
  isVerified: z.boolean().optional(),
  idImageFront: z.string().nullable().optional(),
  idImageBack: z.string().nullable().optional(),
});

export type UserDataType = z.infer<typeof userDataSchema>;

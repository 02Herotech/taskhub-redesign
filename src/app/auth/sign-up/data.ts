import { z } from "zod";

import { signupSchema } from "./schema";

const userTypeSchema = signupSchema.shape.userType;

export type UserType = z.infer<typeof userTypeSchema>;

const actionChoiceSchema = signupSchema.shape.actionChoice;

type ActionChoice = z.infer<typeof actionChoiceSchema>;

type Option<T> = {
  imageUrl: string;
  title: string;
  description: string;
  action: T;
};

export const actionChoices: Option<ActionChoice>[] = [
  {
    imageUrl: "/assets/images/onboarding/business-tasklist.svg",
    title: "Get tasks done",
    description:
      "Need a job done? Post a task and hire the right expert in minutes!",
    action: "GET_TASKS_DONE",
  },
  {
    imageUrl: "/assets/images/onboarding/money-investment.svg",
    title: "Monetize my skills",
    description:
      "Turn your skills into cash—list your services and start earning today!",
    action: "MONETIZE_YOUR_SKILLS",
  },
];

export const userTypes: Option<UserType>[] = [
  {
    imageUrl: "/assets/images/onboarding/user-wink.gif",
    title: "Individual",
    description: "Just me—ready to hire or get hired and make things happen!",
    action: "INDIVIDUAL",
  },
  {
    imageUrl: "/assets/images/onboarding/business-choice.svg",
    title: "Business",
    description:
      "Representing a business? Find top talent or connect with new clients effortlessly!",
    action: "BUSINESS",
  },
];

export const passwordRules = [
  { regex: /.{8,}/, message: "At least 8 characters long" },
  { regex: /[A-Z]/, message: "At least one uppercase letter (A-Z)" },
  { regex: /[a-z]/, message: "At least one lowercase letter (a-z)" },
  { regex: /[0-9]/, message: "At least one number (0-9)" },
  { regex: /[\W_]/, message: "At least one special character (@, #, $, etc.)" },
  { regex: /^\S*$/, message: "No spaces allowed" },
];

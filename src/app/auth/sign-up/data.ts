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
  color?: string;
};

export const actionChoices: Option<ActionChoice>[] = [
  {
    imageUrl: "/assets/images/onboarding/get_tasks_done.png",
    title: "Get tasks done",
    description: "Need help?. Choose an expert. Task Done!",
    action: "GET_TASKS_DONE",
    color: "#7600CC",
  },
  {
    imageUrl: "/assets/images/onboarding/earn_on_oloja.png",
    title: "Earn on Olójá",
    description: "Got skills? Start earning—list your services today!",
    action: "MONETIZE_YOUR_SKILLS",
    color: "#FFD700",
  },
];

export const userTypes: Option<UserType>[] = [
  {
    imageUrl: "/assets/images/onboarding/individual.png",
    title: "Individual",
    description: "Here to hire, get hired, and make it happen",
    action: "INDIVIDUAL",
    color: "#7600CC",
  },
  {
    imageUrl: "/assets/images/onboarding/business.png",
    title: "Business",
    description: "Hire top talent or win new clients with ease!",
    action: "BUSINESS",
    color: "#FFD700",
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

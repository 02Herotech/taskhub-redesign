// Previous signup component
import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import SignUp from "./SignUp";

export const metadata: Metadata = {
  title: "Sign up | Olójà",
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;

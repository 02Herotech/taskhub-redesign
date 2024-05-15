import LoginForm from "@/components/auth/LoginForm"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskHub | Login",
};

const LoginPage = () => {
  return <LoginForm />
}

export default LoginPage
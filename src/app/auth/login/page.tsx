import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import Login from "./Login";

export const metadata: Metadata = {
  title: "Login | Olójà",
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;

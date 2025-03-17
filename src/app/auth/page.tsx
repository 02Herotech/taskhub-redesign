import { redirect } from "next/navigation";
import AccountType from "./AccountType";

const AuthForm = () => {
  redirect("/auth/sign-up");
  return <AccountType />;
};

export default AuthForm;

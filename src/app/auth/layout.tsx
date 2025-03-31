import { Manrope } from "next/font/google";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={`${manrope.variable} min-w-80`}>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;

import Logo from "@/components/layout/Logo";
import SmallLogo from "@/components/layout/SmallLogo";
import Link from "next/link";
import { Suspense } from "react";
import { Manrope } from "next/font/google";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={`${manrope.variable} min-w-80`}>
      {/* <header className="fixed left-0 top-0 z-40 w-full bg-white">
        <div className="flex w-full items-center justify-between px-8 py-5 lg:px-10 lg:py-8">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </header> */}
      {/* <main className="mt-[81px] w-full py-16 lg:container max-lg:px-5">
        <Suspense>{children}</Suspense>
      </main> */}
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;

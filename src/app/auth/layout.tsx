import Logo from "@/components/layout/Logo";
import SmallLogo from "@/components/layout/SmallLogo";
import Link from "next/link";
import { Suspense } from "react";

type AuthLayoutProps = {
    children: React.ReactNode;
};

const AuthLayout = ({
    children,
}: AuthLayoutProps) => {
    return (
        <>
            <header className='w-full bg-white fixed top-0 left-0 z-40'>
                <div className='w-full container py-5 lg:py-8 lg:px-10 px-4 flex items-center justify-between'>
                    <Link href="/" className="max-sm:hidden">
                        <Logo />
                    </Link>
                    <Link href="/" className="lg:hidden">
                        <SmallLogo />
                    </Link>
                </div>
            </header>
            <main className='w-full max-lg:px-5 lg:container mt-[81px] py-16'>
                <Suspense>
                    {children}
                </Suspense>
            </main>
        </>
    );
};

export default AuthLayout;

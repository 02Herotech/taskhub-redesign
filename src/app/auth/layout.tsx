import Logo from "@/components/layout/Logo";
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
                <div className='w-full container py-8 px-10 flex items-center justify-between'>
                    <Link href='/'>
                        <Logo />
                    </Link>
                </div>
            </header>
            <main className='w-full lg:container mt-[81px] py-16'>
                <Suspense>
                    {children}
                </Suspense>
            </main>
        </>
    );
};

export default AuthLayout;

import Icons from "@/components/icons";
import Image from "next/image";
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
            <header className='w-full bg-white border-b border-[#E5E9F0] fixed top-0 left-0 z-40'>
                <div className='w-full container py-8 px-10 flex items-center justify-between'>
                    <Link href='/'>
                        <Image src="/assets/images/logo.png" width={154} height={46} alt="Logo" />
                        {/* <Icons.LogoIcon /> */}
                    </Link>
                </div>
            </header>
            <main className='w-full container mt-[81px] py-16 xl:py-20'>
                <Suspense>
                    {children}
                </Suspense>
            </main>
        </>
    );
};

export default AuthLayout;

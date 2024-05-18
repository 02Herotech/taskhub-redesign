"use client"

import Footer from "@/components/layout/Footer";
import HomeNavigation from "@/components/layout/HomeNavigation";
import Navigation from "@/components/layout/Navigation";
import { useSession } from "next-auth/react";

type MarketplaceLayoutProps = {
    children: React.ReactNode;
};

const MarketplaceLayout = ({
    children,
}: MarketplaceLayoutProps) => {
    const session = useSession();
    const isAuth = session.status === "authenticated";
    const isUnAuth = session.status === "unauthenticated";
    console.log(session)

    return (
        <div>
            {isAuth && (
                <>
                    <Navigation />
                    <main className='mt-[20px]'>
                        {children}
                    </main>
                    <Footer />
                </>
            )}

            {isUnAuth && (
                <>
                    <HomeNavigation />
                    <main className='mt-[20px]'>
                        {children}
                    </main>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default MarketplaceLayout;

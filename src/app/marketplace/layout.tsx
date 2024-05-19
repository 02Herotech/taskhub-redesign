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

    return (
        <div>
            {isAuth && <Navigation />}
            {!isAuth && <HomeNavigation />}
            <main className='mt-[20px]'>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MarketplaceLayout;

"use client";

import { useSession } from "next-auth/react";

import Footer from "@/components/layout/Footer";
import HomeNavigation from "@/components/layout/HomeNavigation";
import Navigation from "@/components/layout/Navigation";
import ServiceProviderNavbar from "@/components/serviceProviderDashboard/global/ServiceProviderNavbar";

type AboutLayoutProps = {
    children: React.ReactNode;
};

const AboutLayout = ({ children }: AboutLayoutProps) => {
    const session = useSession();
    const isAuth = session.status === "authenticated";
    const userRole: string[] | undefined = session?.data?.user?.user?.roles;

    const isServiceProvider = userRole && userRole[0] === "SERVICE_PROVIDER";

    return (
        <div>
            {isAuth ? (
                <>
                    {isServiceProvider ? <ServiceProviderNavbar /> : <Navigation />}

                    <main className={` ${isServiceProvider ? "-mt-4" : " pt-[20px]"}`}>
                        {children}
                    </main>
                    <Footer />
                </>
            ) : (
                <>
                    <HomeNavigation />
                    <main className="pt-[20px]">{children}</main>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default AboutLayout;

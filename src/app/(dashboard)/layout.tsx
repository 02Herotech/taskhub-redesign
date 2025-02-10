import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
import { Suspense } from "react";
import Navigation from "@/components/layout/Navigation";
import SessionTimeout from "@/components/global/Popup/SessionTimeout";
import "../../styles/serviceProviderStyles.css";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative mx-auto ">
      <Navigation />
      <DashboardSidebar />
      <SessionTimeout />
      <main className="mt-[4rem] max-lg:container max-lg:mt-[4.8rem] lg:ml-72 ">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
};

export default DashboardLayout;

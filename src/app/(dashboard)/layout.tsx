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
    <div className="">
      <Navigation />
      <DashboardSidebar />
      <SessionTimeout />
      <main className="mt-[3.3rem] min-h-screen bg-gray-50 px-2 pb-8 sm:mt-[3.5rem] sm:px-7 lg:ml-64">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
};

export default DashboardLayout;

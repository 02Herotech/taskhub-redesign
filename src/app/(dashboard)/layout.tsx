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
    <div className="relative mx-auto max-w-[1400px]">
      <Navigation />
      <DashboardSidebar />
      <SessionTimeout />
      <main className="mt-[3.5rem] px-2 sm:px-7 lg:ml-64 bg-gray-50">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
};

export default DashboardLayout;

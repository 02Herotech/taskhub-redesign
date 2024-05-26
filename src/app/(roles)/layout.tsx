import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
import Navigation from "@/components/layout/Navigation";
import { Suspense } from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const ServicePoviderDashboardLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative mx-auto ">
      <Navigation />
      <DashboardSidebar />
      <main className="mt-20 lg:ml-72 ">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
};

export default ServicePoviderDashboardLayout;

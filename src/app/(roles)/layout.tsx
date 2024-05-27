import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
import Navigation from "@/components/layout/Navigation";
import { Suspense } from "react";
  import Navigation from "@/components/layout/Navigation";
  import ServiceProviderSidebar from "@/components/serviceProviderDashboard/global/ServiceProviderSidebar";
  import { Suspense } from "react";

  type AuthLayoutProps = {
    children: React.ReactNode;
  };

  const DashboardLayout = ({ children }: AuthLayoutProps) => {
    return (
      <div className="relative mx-auto">
        <Navigation />
        <ServiceProviderSidebar />
        <main className="lg:ml-72 h-[calc(100vh-80px)]">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    );
  };

  export default DashboardLayout;

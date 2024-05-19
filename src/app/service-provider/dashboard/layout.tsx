import ServiceProviderSidebar from "@/components/serviceProviderDashboard/global/ServiceProviderSidebar";
import { Suspense } from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const ServicePoviderDashboardLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative mx-auto ">
      <ServiceProviderSidebar />

      <main className="lg:ml-72">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
};

export default ServicePoviderDashboardLayout;

import Icons from "@/components/icons";
import ServiceProviderNavbar from "@/components/serviceProviderDashboard/global/ServiceProviderNavbar";
import { Suspense } from "react";
import "./serviceProviderStyles.css";
// import {} from  ""

type AuthLayoutProps = {
  children: React.ReactNode;
};

const ServicePoviderLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative mx-auto ">
      <header className="fixed left-0 top-0 z-40 w-full border-b border-[#E5E9F0] bg-white">
        <ServiceProviderNavbar />
      </header>
      <main className="min-h-[calc(100vh-4rem)] pt-20">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
};

export default ServicePoviderLayout;

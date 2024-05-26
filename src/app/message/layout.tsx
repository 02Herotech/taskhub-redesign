import Navigation from "@/components/layout/Navigation";
import ServiceProviderNavbar from "@/components/serviceProviderDashboard/global/ServiceProviderNavbar";
import { Suspense } from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const MessageLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <Navigation />
      <main className="min-h-[calc(100vh-4rem)] pt-20">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
};

export default MessageLayout;

import React from "react";
import PaymentHeader from "./PaymentHeader";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="mt-[5.5rem] px-1 sm:px-5">
      <PaymentHeader />
      <section className="my-3 flex items-stretch gap-2">{children}</section>
    </div>
  );
};

export default DashboardLayout;

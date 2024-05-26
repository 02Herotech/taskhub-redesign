"use client";

import GeneralSidbarNavigation from "./GeneralSidbarNavigation";

const ServiceProviderSidebar = () => {

  return (
    <aside className="fixed right-full top-0 mt-[6rem] h-[calc(100vh-4rem)] w-72 rounded-br-3xl rounded-tr-3xl bg-[#381F8C] lg:left-0">
      <GeneralSidbarNavigation />
    </aside>
  );
};

export default ServiceProviderSidebar;

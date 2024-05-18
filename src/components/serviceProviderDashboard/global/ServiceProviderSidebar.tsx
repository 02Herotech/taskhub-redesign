"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiMessageDetail } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { PiNotepadThin } from "react-icons/pi";
import ServiceProvideMobileNav from "./ServiceProvideMobileNav";
import { providerSiderbarLinks } from "@/app/data/service-provider/sidebar";
import GeneralSidbarNavigation from "./GeneralSidbarNavigation";

const ServiceProviderSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed right-full top-0 mt-16 h-[calc(100vh-4rem)] w-72 rounded-br-3xl rounded-tr-3xl bg-[#381F8C] lg:left-0">
      <GeneralSidbarNavigation />
    </aside>
  );
};

export default ServiceProviderSidebar;

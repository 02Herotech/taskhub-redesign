"use client";

import { providerSiderbarLinks } from "@/app/data/service-provider/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import GeneralSidbarNavigation from "./GeneralSidbarNavigation";
import { FaX } from "react-icons/fa6";

interface MobileSidebarType {
  isRightSidebarOpen: boolean;
  setIsRightSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const ServiceProviderMobileSidebar = ({
  isRightSidebarOpen,
  setIsRightSidebarOpen,
}: MobileSidebarType) => {
  const pathname = usePathname();
  return (
    <aside
      className={`fixed top-0 z-40 h-screen w-screen lg:hidden  ${isRightSidebarOpen ? "right-0 " : "-right-full"}  `}
    >
      <div
        className={`h-screen w-screen bg-violet-normal  transition-all duration-300 lg:hidden  ${isRightSidebarOpen ? "pointer-events-auto opacity-30  " : "pointer-events-none opacity-0"}  `}
        onClick={() => setIsRightSidebarOpen((prev) => !prev)}
      ></div>
      <aside
        className={`pointer-events-auto fixed top-0 h-screen w-72 bg-violet-normal p-6 shadow transition-all duration-300 lg:hidden ${isRightSidebarOpen ? "right-0 " : "-right-full"} `}
      >
        <button
          onClick={() => setIsRightSidebarOpen((prev) => !prev)}
          className={`absolute left-4 top-4 rotate-0 transition-all duration-1000 ease-in-out ${isRightSidebarOpen ? "rotate-0 " : "rotate-[540deg]"}  `}
        >
          <FaX className="size-8 text-red-500 transition-all duration-300 hover:scale-105 " />
        </button>
        <GeneralSidbarNavigation />
      </aside>
    </aside>
  );
};

export default ServiceProviderMobileSidebar;

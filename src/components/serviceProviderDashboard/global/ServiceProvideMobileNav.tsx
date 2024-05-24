"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { FaX } from "react-icons/fa6";

interface MobileNavType {
  setIsLeftSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isLeftSidebarOpen: boolean;
}

const ServiceProvideMobileNav = ({
  setIsLeftSidebarOpen,
  isLeftSidebarOpen,
}: MobileNavType) => {
  const pathname = usePathname();

  return (
    <div
      className={` fixed inset-0 h-screen w-screen lg:hidden  ${isLeftSidebarOpen ? "left-0 " : "-left-full"}  `}
    >
      <div
        className={`h-screen w-screen bg-violet-normal opacity-30 transition-all duration-300 `}
        onClick={() => setIsLeftSidebarOpen((prev) => !prev)}
      ></div>
      <aside
        className={` pointer-events-auto fixed top-0 z-40 h-screen w-72 bg-white px-6 py-20 shadow transition-all duration-300 lg:hidden ${isLeftSidebarOpen ? "left-0 " : "-left-full"} `}
      >
        <button
          onClick={() => setIsLeftSidebarOpen((prev) => !prev)}
          className={`absolute right-4 top-4 rotate-0 transition-all duration-1000 ease-in-out ${isLeftSidebarOpen ? "rotate-0 " : "rotate-[540deg]"}  `}
        >
          <FaX className="size-8 text-red-500 transition-all duration-300 hover:scale-105 " />
        </button>
        <nav className=" flex flex-col gap-10">
          <Link
            href="/service-provider/provide-service"
            className={`rounded-md  px-6 py-3 font-clashDisplay text-lg font-bold hover:opacity-90 ${pathname === "/service-provider/provide-service" ? "bg-yellow-500 text-white " : "bg-violet-100 text-[#2A1769] "} `}
          >
            Provide a service
          </Link>
          <Link
            href="/explore"
            className={`rounded-md  px-6 py-3 font-clashDisplay text-lg font-bold hover:opacity-90 ${pathname === "/explore" ? "bg-yellow-500 text-white " : "bg-violet-100 text-[#2A1769] "} `}
          >
            Explore Task
          </Link>
          <Link
            href="/marketplace"
            className={`rounded-md px-6 py-3 font-clashDisplay text-lg font-bold hover:opacity-90 ${pathname === "/marketplace" ? "bg-yellow-500 text-white " : "bg-violet-100 text-[#2A1769] "} `}
          >
            Market Place
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default ServiceProvideMobileNav;

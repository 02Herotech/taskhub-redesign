"use client";
import { providerSiderbarLinks } from "@/app/data/service-provider/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BiLogOut } from "react-icons/bi";

const GeneralSidbarNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogUserOut = () => {
    // router.push("/")
  };

  return (
    <nav className="flex h-full flex-col justify-between gap-6 px-2 py-8 lg:px-6">
      <div className="flex flex-col gap-4">
        <Link
          href={"/service-provider/dashboard"}
          className={`flex items-center gap-4 rounded-md px-4 py-3 font-medium  text-white transition-all duration-300 max-md:text-sm ${
            pathname === "/service-provider/dashboard" ||
            pathname.includes("/service-provider/dashboard/profile")
              ? "bg-yellow-500 hover:bg-opacity-90"
              : "hover:bg-violet-950"
          } `}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          Profie
        </Link>
        {providerSiderbarLinks.map((item) => (
          <Link
            key={item.title}
            href={item.link}
            className={`flex items-center gap-4 rounded-md px-4 py-3 font-medium text-white  transition-all duration-300 max-md:text-sm ${
              pathname.includes(item.link)
                ? "bg-yellow-500 hover:bg-opacity-90"
                : "hover:bg-violet-950"
            } `}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
      <div>
        <button className="flex   w-full items-center gap-4 rounded-md px-4 py-3 font-medium  text-white transition-all duration-300 hover:bg-violet-950 max-md:text-sm">
          <span>
            <BiLogOut className="size-7" />
          </span>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default GeneralSidbarNavigation;

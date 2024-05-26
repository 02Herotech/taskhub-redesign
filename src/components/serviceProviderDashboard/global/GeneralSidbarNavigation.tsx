"use client";
import { providerSiderbarLinks } from "@/app/data/service-provider/sidebar";
import {
  customerDashboardLinks,
  serviceProviderDashboardLinks,
} from "@/lib/dashboardLinks";
import { SettingsIcon } from "@/lib/svgIcons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";

const GeneralSidbarNavigation = () => {
  const [showSettings, setShowSettings] = useState(false);
  const session = useSession();
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";
  const pathname = usePathname();
  const router = useRouter();

  const handleLogUserOut = async () => {
    await signOut();
    router.push("/");
  };

  const customerDashboardDropdown = [
    {
      label: "Payment",
      link: "/customer/payment",
    },
    {
      label: "Password",
      link: "/customer/password",
    },
    {
      label: "Notification",
      link: "/customer/notification",
    },
  ];
  const serviceProviderDashboardDropdown = [
    {
      label: "Password",
      link: "/service-provider/password",
    },
    {
      label: "Notification",
      link: "/service-provider/notification",
    },
  ];

  const currentDropDownLink = isServiceProvider
    ? serviceProviderDashboardDropdown
    : customerDashboardDropdown;

  const currentDashboardLink = isServiceProvider
    ? serviceProviderDashboardLinks
    : customerDashboardLinks;

  return (
    <nav className="flex h-full flex-col justify-between gap-6 px-2 py-8 lg:px-6 font-clashMedium">
      <div className="flex flex-col gap-4">
        {currentDashboardLink.map((item) => (
          <Link
            key={item.label}
            href={item.link}
            className={`flex items-center rounded-md px-4 py-3 text-sm font-medium text-white  transition-all duration-300 max-md:text-sm ${isServiceProvider ? "gap-4" : "gap-8"}  ${
              pathname.includes(item.link)
                ? "bg-yellow-500 hover:bg-opacity-90"
                : "hover:bg-violet-950"
            } `}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        {/* Settings Dropdown section */}
        <button
          onClick={() => setShowSettings((prev) => !prev)}
          className={`flex items-center gap-7 rounded-md px-4 py-3 text-sm font-clashMedium text-white transition-all duration-300 max-md:text-sm ${
            pathname.includes("/service-provider/dashboard/settings")
              ? "bg-yellow-500 hover:bg-opacity-90"
              : "bg-violet-normal hover:bg-violet-950"
          } `}
        >
          {SettingsIcon}
          Settings
        </button>

        <div
          className={` space-y-2 overflow-hidden px-4 transition-all duration-300 ${showSettings ? "max-h-80" : "max-h-0"} `}
        >
          {currentDropDownLink.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              className={`flex items-center gap-4 rounded-md px-4 py-3 text-sm font-clashMedium text-white transition-all duration-300 max-md:text-sm ${
                pathname === item.link
                  ? "bg-yellow-500 hover:bg-opacity-90"
                  : "hover:bg-violet-950"
              } `}
              onClick={() => setShowSettings(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <button
          onClick={handleLogUserOut}
          className="flex   w-full items-center gap-4 rounded-md px-4 py-3 font-clashMedium text-white transition-all duration-300 hover:bg-violet-950 max-md:text-sm"
        >
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

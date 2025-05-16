"use client";

import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import {
  customerDashboardDropdown,
  customerDashboardLinks,
  serviceProviderDashboardDropdown,
  serviceProviderDashboardLinks,
} from "@/lib/dashboardLinks";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeUserProfile } from "@/store/Features/userProfile";

/**Dashboard sidebar navigation */
const DashboardSidebar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const session = useSession();
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(removeUserProfile());
      localStorage.removeItem("auth");
      await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/home` });
      router.push("/home");
    } catch (error: any) {
      console.error(error);
    }
  };

  const currentDropDownLink = isServiceProvider
    ? serviceProviderDashboardDropdown
    : customerDashboardDropdown;

  const currentDashboardLink = isServiceProvider
    ? serviceProviderDashboardLinks
    : customerDashboardLinks;

  return (
    <aside className="fixed right-full top-0 mt-20 h-[calc(100vh-5rem)] w-64 rounded-br-3xl rounded-tr-3xl bg-[#381F8C] lg:left-0">
      <nav className="dashboard-nav flex h-full flex-col justify-between gap-6 overflow-y-auto px-2 py-8 lg:px-4">
        <div className="flex flex-col gap-2">
          {currentDashboardLink.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              className={`flex items-center rounded-md px-4 py-3 text-sm font-medium transition-all duration-300 max-md:text-sm ${isServiceProvider ? "gap-4" : "gap-6"}  ${
                pathname.includes(item.link)
                  ? "bg-white text-primary hover:bg-opacity-90"
                  : "text-white hover:bg-violet-950"
              } `}
            >
              <item.icon />
              {item.label}
            </Link>
          ))}

          <div
            className={`space-y-2 overflow-hidden px-4 transition-all duration-300 ${showSettings ? "max-h-80" : "max-h-0"} `}
          >
            {currentDropDownLink.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                className={`flex items-center gap-4 rounded-md px-4 py-3 pl-6 text-sm font-medium text-white transition-all duration-300 max-md:text-sm ${
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
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-md px-4 py-3 font-medium  text-white transition-all duration-300 hover:bg-violet-950 max-md:text-sm"
          >
            <span>
              <BiLogOut className="size-7" />
            </span>
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;

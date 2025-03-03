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
import { SettingsIcon } from "@/lib/svgIcons";
import { useDispatch } from "react-redux";
import { removeUserProfile } from "@/store/Features/userProfile";

const initialAuthState = {
  token: null,
  role: null,
};

const DashboardSidebar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const session = useSession();
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";
  const pathname = usePathname();
  const router = useRouter();

  const [auth, setAuth] = useState<{
    token: string | null;
    role: string[] | null;
  }>(initialAuthState);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      setAuth(initialAuthState);
      dispatch(removeUserProfile());
      await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/home` });
      router.push("/home");
    } catch (error: any) {
      console.log(error);
    }
  };

  const currentDropDownLink = isServiceProvider
    ? serviceProviderDashboardDropdown
    : customerDashboardDropdown;

  const currentDashboardLink = isServiceProvider
    ? serviceProviderDashboardLinks
    : customerDashboardLinks;

  return (
    <aside className="fixed right-full top-0 mt-20 h-[calc(100vh-5rem)] w-72 rounded-br-3xl rounded-tr-3xl bg-[#381F8C] lg:left-0">
      <nav className="flex h-full flex-col justify-between gap-6 px-2 py-8 lg:px-6">
        <div className="flex flex-col gap-4">
          {currentDashboardLink.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              className={`flex items-center  rounded-md px-4 py-3 text-sm font-medium text-white  transition-all duration-300 max-md:text-sm ${isServiceProvider ? "gap-4" : "gap-8"}  ${
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
            className={`flex items-center gap-4 rounded-md px-4 py-3 text-sm font-medium  text-white ${isServiceProvider ? "gap-4" : "gap-8"} transition-all duration-300 max-md:text-sm ${
              pathname.includes("/service-provider/dashboard/settings")
                ? "bg-yellow-500 hover:bg-opacity-90"
                : "bg-violet-normal hover:bg-violet-950"
            } `}
          >
            <span>{SettingsIcon}</span> <span>Settings</span>
          </button>

          <div
            className={` space-y-2 overflow-hidden px-4 transition-all duration-300 ${showSettings ? "max-h-80" : "max-h-0"} `}
          >
            {currentDropDownLink.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                className={`flex items-center gap-4 rounded-md px-4 py-3 pl-16 text-sm  font-medium text-white transition-all duration-300 max-md:text-sm ${
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

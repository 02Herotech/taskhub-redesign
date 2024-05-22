"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import MobileNavigation from "../MobileNavigation";
import { AnimatePresence } from "framer-motion";
import { BsChat } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { RiMenu3Fill } from "react-icons/ri";
import Dropdown from "@/components/global/Dropdown";
import { signOut, useSession } from "next-auth/react";
import Logo from "../Logo";
import axios from "axios";
import ServiceProviderNavbar from "@/components/serviceProviderDashboard/global/ServiceProviderNavbar";
import PlaceholderImage from "../../../../public/assets/images/placeholder.jpeg"

const Navigation = () => {
  const router = useRouter();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut();
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      );
      router.push("/marketplace");
    } catch (error: any) {
      console.log(error);
    }
  };

  const links = [
    {
      label: "Add a task",
      url: "/customer/add-task",
    },
    {
      label: "Explore Tasks",
      url: "/explore",
    },
    {
      label: "Marketplace",
      url: "/marketplace",
    },
  ];

  const dropdownItems = [
    {
      label: "Profile",
      onClick: () => { },
    },
    {
      label: "Settings",
      onClick: () => { },
    },
    {
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const session = useSession();
  const profileImage = session?.data?.user.user.profileImage;
  const userRole = session?.data?.user.user.roles;
  const isServiceProvider = userRole && userRole[0] === "SERVICE_PROVIDER";

  const notificationLength = session.data?.user.user.appNotificationList.length

  return (
    <>
      {isServiceProvider ? (
        <ServiceProviderNavbar />
      ) : (
        <>
          <nav className="fixed left-0 right-0 top-0 z-50 w-full bg-white drop-shadow-sm">
            <div className="container flex items-center justify-between px-7 py-4 lg:px-14 lg:py-5">
              <Link href="/marketplace">
                <Logo />
              </Link>
              <button
                onClick={() => setShowMobileNav((state) => !state)}
                className="lg:hidden"
              >
                <RiMenu3Fill className="h-9 w-9 text-primary" />
              </button>
              <ul className="hidden items-center space-x-8 lg:flex">
                {links.map((link) => {
                  return (
                    <li key={link.url} className="relative">
                      <Link
                        href={link.url as string}
                        className={cn("text-xl font-semibold text-primary", {
                          "text-tc-orange":
                            link.url === "/" && pathname === "/"
                              ? true
                              : link.url !== "/" && pathname.includes(link.url)
                                ? true
                                : false,
                        })}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="hidden items-center space-x-5 lg:flex">
                <div className="relative cursor-pointer">
                  <BsChat className="size-[22px] text-black" />
                  <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-tc-orange text-xs text-white">
                    2
                  </div>
                </div>
                <div className="relative cursor-pointer">
                  <IoMdNotificationsOutline className="size-[24px] text-black" />
                  <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-tc-orange text-xs text-white">
                    {notificationLength}
                  </div>
                </div>
                <Dropdown
                  trigger={() => (
                    <div className="flex items-center space-x-1 cursor-pointer">
                      <img
                        src={profileImage || PlaceholderImage.src}
                        alt="Profile"
                        className="size-[46px] rounded-full object-cover"
                      />
                      <BiChevronDown className="size-6" />
                    </div>
                  )}
                  className="-left-32 top-20"
                >
                  <div className="w-[200px] rounded-md bg-white">
                    {dropdownItems.map((button, index) => (
                      <button
                        key={index}
                        onClick={button.onClick}
                        className="dropdown-item text-md flex w-full items-center justify-between p-3 transition-all hover:bg-status-lightViolet"
                      >
                        {button.label}
                      </button>
                    ))}
                  </div>
                </Dropdown>
              </div>
            </div>
          </nav>
          <AnimatePresence initial={false}>
            {showMobileNav && (
              <MobileNavigation
                setShowMobileNav={setShowMobileNav}
                showMobileNav={showMobileNav}
                links={links}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Navigation;

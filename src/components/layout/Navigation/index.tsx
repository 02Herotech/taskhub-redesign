"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import MobileNavigation from "../MobileNavigation";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BsChat } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { RiMenu3Fill } from "react-icons/ri";
import Dropdown from "@/components/global/Dropdown";
import { signOut, useSession } from "next-auth/react";
import Logo from "../Logo";

const Navigation = () => {
  const router = useRouter();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    router.push("/auth/login");
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
    {
      label: "Provide a service",
      url: "/provide-service",
    },
  ];

  const dropdownItems = [
    {
      label: "Profile",
      onClick: () => {},
    },
    {
      label: "Settings",
      onClick: () => {},
    },
    {
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const session = useSession();
  const profileImage = session?.data?.user.user.profileImage;

  return (
    <>
      <nav className="bg-white z-50 fixed top-0 left-0 right-0 w-full drop-shadow-sm">
        <div className="container py-4 lg:py-5 px-7 lg:px-14 flex items-center justify-between">
          <Logo />
          <button
            onClick={() => setShowMobileNav((state) => !state)}
            className="lg:hidden">
            <RiMenu3Fill className="text-primary w-9 h-9" />
          </button>
          <ul className="hidden lg:flex items-center space-x-8">
            {links.map((link) => {
              return (
                <li key={link.url} className="relative">
                  <Link
                    href={link.url as string}
                    className={cn("text-primary text-xl font-semibold", {
                      "text-tc-orange":
                        link.url === "/" && pathname === "/"
                          ? true
                          : link.url !== "/" && pathname.includes(link.url)
                          ? true
                          : false,
                    })}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="hidden lg:flex items-center space-x-5">
            <div className="relative">
              <BsChat className="size-[22px] text-black" />
              <div className="bg-tc-orange absolute size-5 flex items-center justify-center text-xs -top-1 -right-1 rounded-full text-white">
                2
              </div>
            </div>
            <div className="relative">
              <IoMdNotificationsOutline className="size-[24px] text-black" />
              <div className="bg-tc-orange absolute size-5 flex items-center justify-center text-xs -top-1 -right-1 rounded-full text-white">
                2
              </div>
            </div>
            <Dropdown
              trigger={() => (
                <div className="flex items-center space-x-1">
                  <img
                    src={profileImage || ""}
                    alt="Logo"
                    className="object-cover size-[46px] rounded-full"
                  />
                  <BiChevronDown className="size-6" />
                </div>
              )}
              className="-left-32 top-20">
              <div className="w-[200px] bg-white rounded-md">
                {dropdownItems.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.onClick}
                    className="flex w-full dropdown-item hover:bg-status-lightViolet transition-all text-md items-center justify-between p-3">
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
  );
};

export default Navigation;

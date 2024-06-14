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
import PlaceholderImage from "../../../../public/assets/images/placeholder.jpeg";
import { customerLinks, homeLinks, serviceProviderLinks } from "@/lib/links";
import Button from "@/components/global/Button";
import Image from "next/image";

const Navigation = () => {
  const router = useRouter();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut();

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      router.push("/home");
    } catch (error: any) {
      console.log(error);
    } finally {
      router.push("/home");
    }
  };

  const session = useSession();
  const profileImage = session?.data?.user.user.profileImage;
  const userRole = session?.data?.user.user.roles;
  const isServiceProvider = userRole && userRole[0] === "SERVICE_PROVIDER";
  const isAuth = session.status === "authenticated";

  const dropdownItems = [
    {
      label: "Profile",
      onClick: () => {
        router.push(
          isServiceProvider ? "/service-provider/profile" : "/customer/profile",
        );
      },
    },
    {
      label: "Settings",
      onClick: () => {
        router.push(
          isServiceProvider
            ? "/service-provider/settings"
            : "/customer/settings",
        );
      },
    },
    {
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const notificationLength = session.data?.user.user.appNotificationList.length;

  const currentLinks = !isAuth
    ? homeLinks
    : isServiceProvider
      ? serviceProviderLinks
      : customerLinks;
  const notificationRoute = isServiceProvider
    ? "/service-provider/dashboard/notification"
    : "/customer/notifications";

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 w-full ${currentLinks === homeLinks ? `bg-[#F5E2FC]` : `bg-white`} drop-shadow-sm`}
      >
        <div className="container flex items-center justify-between px-7 py-4 lg:px-14 lg:py-5">
          <Link href="/">
            <Logo />
          </Link>
          <button
            onClick={() => setShowMobileNav((state) => !state)}
            className="lg:hidden"
          >
            <RiMenu3Fill className="h-9 w-9 text-primary" />
          </button>
          <ul className="hidden items-center space-x-8 lg:flex">
            {currentLinks.map((link) => {
              return (
                <li key={link.url} className="relative">
                  <Link
                    href={link.url as string}
                    className={cn("text-xl font-clashMedium text-primary", {
                      "text-tc-orange":
                        link.url === "/" && pathname === "/"
                          ? true
                          : link.url !== "/" && pathname.includes(link.url!)
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
            {!isAuth ? (
              <div className="hidden items-center space-x-5 lg:flex">
                <Link href="/auth">
                  <Button className="rounded-full">Sign Up</Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    theme="outline"
                    className="rounded-full bg-transparent"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/message" className="relative cursor-pointer">
                  <BsChat className="size-[22px] text-black" />
                  {/* display a number chat nummber here */}
                  {/* <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-tc-orange text-xs text-white">
                  </span> */}
                </Link>
                <div
                  className="relative cursor-pointer"
                  onClick={() => router.push(notificationRoute)}
                >
                  <IoMdNotificationsOutline className="size-[24px] text-black" />
                  {/* display notification length here */}
                  {/* <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-tc-orange text-xs text-white">
                    {notificationLength}
                  </div> */}
                </div>
                <Dropdown
                  trigger={() => (
                    <div className="flex cursor-pointer items-center space-x-1">
                      <Image
                        src={profileImage || PlaceholderImage.src}
                        alt="Profile"
                        className="size-[46px] rounded-full object-cover"
                        width={46}
                        height={46}
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
                        className="dropdown-item text-md flex w-full items-center justify-between p-3 font-semibold text-primary transition-all hover:opacity-80"
                      >
                        {button.label}
                      </button>
                    ))}
                  </div>
                </Dropdown>
              </>
            )}
          </div>
        </div>
      </nav>
      <AnimatePresence initial={false}>
        {showMobileNav && (
          <MobileNavigation
            setShowMobileNav={setShowMobileNav}
            showMobileNav={showMobileNav}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

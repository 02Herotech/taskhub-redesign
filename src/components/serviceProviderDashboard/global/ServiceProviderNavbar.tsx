"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiBell, BiMenu } from "react-icons/bi";

import { IoChatbubbleOutline, IoTriangle } from "react-icons/io5";
import ServiceProvideMobileNav from "./ServiceProvideMobileNav";
import ServiceProviderMobileSidebar from "./ServiceProviderMobileSidebar";
import ServiceProviderNotificationModal from "./ServiceProviderNotificationModal";
import { useSession } from "next-auth/react";

const ServiceProviderNavbar = () => {
  const session = useSession();
  const user = session?.data?.user?.user;
  const pathname = usePathname();

  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-40 mx-auto  flex h-16 w-full items-center justify-between border-b border-[#E5E9F0] bg-white px-4 lg:px-10 ">
      <ServiceProvideMobileNav
        setIsLeftSidebarOpen={setIsLeftSidebarOpen}
        isLeftSidebarOpen={isLeftSidebarOpen}
      />
      <ServiceProviderMobileSidebar
        isRightSidebarOpen={isRightSidebarOpen}
        setIsRightSidebarOpen={setIsRightSidebarOpen}
      />
      <button
        onClick={() => setIsLeftSidebarOpen((prev) => !prev)}
        className="lg:hidden "
      >
        <BiMenu color="rgb(56 31 140)" size={24} />
      </button>
      <Link href="/">
        <Image
          src="/assets/images/logo.png"
          width={154}
          height={46}
          alt="Logo"
          className="max-md:w-32"
        />
      </Link>

      <nav className=" hidden items-center justify-center gap-10 lg:flex">
        <Link
          href="/service-provider/provide-service"
          className={` text-lg font-bold hover:opacity-90 ${pathname === "/service-provider/provide-service" ? "text-yellow-500 " : "text-[#2A1769]"} `}
        >
          Provide a service
        </Link>
        <Link
          href="/service-provider/explore-task"
          className={` text-lg font-bold hover:opacity-90 ${pathname === "/service-provider/explore-task" ? "text-yellow-500 " : "text-[#2A1769]"} `}
        >
          Explore Task
        </Link>
        <Link
          href="/marketplace"
          className={` text-lg font-bold hover:opacity-90 ${pathname === "/marketplace" ? "text-yellow-500 " : "text-[#2A1769]"} `}
        >
          Market Place
        </Link>
      </nav>
      <div className="flex items-center gap-2 lg:gap-4">
        <Link
          href="/service-provider/message"
          className="relative z-10 rounded-lg  p-2 hover:shadow-md "
        >
          <span className=" absolute -right-0 -top-0 z-10 rounded-full bg-yellow-400 p-1 text-[8px] text-white ">
            12
          </span>
          <IoChatbubbleOutline className="size-5 lg:size-6" />
        </Link>
        <div className="relative z-10">
          <button
            className="relative z-10 rounded-lg  p-2 hover:shadow-md "
            onClick={() => setIsNotificationOpen((prev) => !prev)}
          >
            <span className=" z-10-right-0 absolute -top-0 rounded-full bg-yellow-400 p-1 text-[8px] text-white ">
              12
            </span>
            <BiBell className="size-6 lg:size-7" />
          </button>
          <ServiceProviderNotificationModal
            setIsNotificationOpen={setIsNotificationOpen}
            isNotificationOpen={isNotificationOpen}
          />
        </div>
        <Link
          href="/service-provider/dashboard"
          className="flex items-center gap-1 max-md:hidden"
          onClick={() => setIsRightSidebarOpen((prev) => !prev)}
        >
          <Image
            src={
              user?.profileImage
                ? user?.profileImage
                : "/assets/images/serviceProvider/user.jpg"
            }
            alt="user"
            width={40}
            height={40}
            className="size-10 rounded-full border border-violet-normal object-cover max-md:size-9 "
          />
          <IoTriangle className="rotate-[60deg]" size={8} />
        </Link>
        <button
          className="flex items-center gap-1 lg:hidden"
          onClick={() => setIsRightSidebarOpen((prev) => !prev)}
        >
          <Image
            src={
              user?.profileImage
                ? user?.profileImage
                : "/assets/images/serviceProvider/user.jpg"
            }
            alt="user"
            width={40}
            height={40}
            className="size-10 rounded-full border border-violet-normal object-cover max-md:size-9 "
          />
          <IoTriangle className="rotate-[60deg]" size={8} />
        </button>
      </div>
    </header>
  );
};

export default ServiceProviderNavbar;

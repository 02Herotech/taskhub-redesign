"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiBell, BiChat } from "react-icons/bi";
import {
  BsChatLeftQuote,
  BsFillChatLeftQuoteFill,
  BsQuote,
  BsTriangle,
} from "react-icons/bs";
import { IoChatbubbleOutline, IoTriangle } from "react-icons/io5";
import { PiTriangleFill } from "react-icons/pi";

const ServiceProviderNavbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 top-0 z-40 mx-auto  flex h-16 w-full items-center justify-between border-b border-[#E5E9F0] bg-white px-10">
      <Link href="/">
        <Image
          src="/assets/images/logo.png"
          width={154}
          height={46}
          alt="Logo"
        />
      </Link>
      <nav className="flex items-center justify-center gap-6">
        <Link
          href="/service-provider/provide-service"
          className={`text-lg font-bold hover:opacity-90 ${pathname === "/service-provider/provide-service" ? "text-yellow-500 " : "text-[#2A1769]"} `}
        >
          Provide a service
        </Link>
        <Link
          href="/service-provider/explore-task"
          className={`text-lg font-bold hover:opacity-90 ${pathname === "/service-provider/explore-task" ? "text-yellow-500 " : "text-[#2A1769]"} `}
        >
          Explore Task
        </Link>
        <Link
          href="/marketplace"
          className={`text-lg font-bold hover:opacity-90 ${pathname === "/marketplace" ? "text-yellow-500 " : "text-[#2A1769]"} `}
        >
          Market Place
        </Link>
        <Link
          href="/service-provider/add-task"
          className={`text-lg font-bold hover:opacity-90 ${pathname === "/service-provider/add-task" ? "text-yellow-500 " : "text-[#2A1769]"} `}
        >
          Add a task
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <button className="rounded-lg p-2  hover:shadow-md">
          <IoChatbubbleOutline size={20} />
        </button>
        <button className="rounded-lg p-2  hover:shadow-md">
          <BiBell size={20} />
        </button>
        <Link
          href="/service-provider/provider-profile"
          className="flex items-center gap-2"
        >
          <Image
            src="/assets/images/marketplace/singleTask/oluchi.png"
            alt="user"
            width={40}
            height={40}
            className="rounded-full"
          />
          <IoTriangle className="rotate-[60deg]" size={16} />
        </Link>
      </div>
    </header>
  );
};

export default ServiceProviderNavbar;

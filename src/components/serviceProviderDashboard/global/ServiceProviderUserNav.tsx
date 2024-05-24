"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoChatbubbleOutline, IoTriangle } from "react-icons/io5";
import ServiceProviderNotificationModal from "./ServiceProviderNotificationModal";
import { BsChat } from "react-icons/bs";
import { LuBell } from "react-icons/lu";

const ServiceProviderUserNav = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const session = useSession();
  const user = session?.data?.user?.user;
  return (
    <div className="flex items-center gap-2 lg:gap-4">
      <Link
        href="/service-provider/message"
        className="relative z-10 rounded-lg  p-2 hover:shadow-md "
      >
        {/* <span className=" absolute -right-0 -top-0 z-10 rounded-full bg-yellow-400 p-1 text-[8px] text-white ">
          12
        </span> */}
        <BsChat className="size-5 lg:size-6" />
      </Link>
      <div className="relative z-10">
        <button
          className="relative z-10 rounded-lg  p-2 hover:shadow-md "
          onClick={() => setIsNotificationOpen((prev) => !prev)}
        >
          {/* <span className=" z-10-right-0 absolute -top-0 rounded-full bg-yellow-400 p-1 text-[8px] text-white ">
            12
          </span> */}
          <LuBell className="size-6 lg:size-7" />
        </button>
        <ServiceProviderNotificationModal
          setIsNotificationOpen={setIsNotificationOpen}
          isNotificationOpen={isNotificationOpen}
        />
      </div>
      <div>
        <Link
          href="/service-provider/dashboard"
          className="flex items-center gap-1 max-md:hidden"
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
      </div>
    </div>
  );
};

export default ServiceProviderUserNav;

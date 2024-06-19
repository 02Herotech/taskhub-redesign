"use client";
import { formatDateFromNumberArray } from "@/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

interface NotificationTypes {
  id: number;
  message: string;
  read: boolean;
  bookingId: number;
  type: null;
  notificationTime: number[];
}

const ServiceNotification = () => {
  const [currentCategory, setCurrentCategory] = useState("All");

  const session = useSession();
  const userNotification: NotificationTypes[] =
    // Use optional chaining and default value to avoid TypeError
    session?.data?.user?.user?.appNotificationList || [];

  const handleChangeCategory = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <main className="space-y-8 p-4 lg:p-8 mt-20">
      <div className="flex flex-wrap gap-4">
        <button
          className={`min-w-20 rounded-md px-4 py-2 transition-all duration-300 hover:opacity-90 ${currentCategory === "All" ? "bg-violet-normal text-white" : "bg-violet-light text-violet-normal hover:bg-violet-200"}`}
          onClick={() => handleChangeCategory("All")}
        >
          All
        </button>
        <button
          className={`min-w-20 rounded-md px-4 py-2 transition-all duration-300 hover:opacity-90 ${currentCategory === "Recent" ? "bg-violet-normal text-white" : "bg-violet-light text-violet-normal hover:bg-violet-200"}`}
          onClick={() => handleChangeCategory("Recent")}
        >
          Recent
        </button>
        <button
          className={`min-w-20 rounded-md px-4 py-2 transition-all duration-300 hover:opacity-90 ${currentCategory === "Old" ? "bg-violet-normal text-white" : "bg-violet-light text-violet-normal hover:bg-violet-200"}`}
          onClick={() => handleChangeCategory("Old")}
        >
          Old
        </button>
      </div>

      <div className="flex flex-col gap-8 pb-4">
        {userNotification.map((item, index) => (
          <div
            key={index}
            className="pointer-events-auto grid w-full cursor-pointer grid-cols-12 items-center gap-4 transition-shadow duration-300"
          >
            <div className="col-span-9 flex items-center gap-2">
              <Image
                src={"/assets/images/placeholder.jpeg"}
                alt={item.message}
                width={100}
                height={100}
                className="size-16 rounded-full"
              />
              <div>
                <p className="cursor-pointer font-bold text-violet-normal">
                  {item.message}
                </p>
              </div>
            </div>
            <p className="col-span-3 cursor-pointer text-sm text-slate-500">
              {formatDateFromNumberArray([
                item.notificationTime[0],
                item.notificationTime[1],
                item.notificationTime[2],
              ])}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ServiceNotification;

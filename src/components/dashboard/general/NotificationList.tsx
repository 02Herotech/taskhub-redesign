"use client";

import { formatRelativeDate } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface NotificationListProps {
  notifications: NotificationTypes[];
  heading: string;
}

const NotificationList = ({
  notifications,
  heading,
}: NotificationListProps) => {
  const session = useSession();
  const router = useRouter();

  console.log(notifications);

  const token = session?.data?.user?.accessToken;
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";

  const showSelectedNotification = async (notification: NotificationTypes) => {
    try {
      const type = notification.type;
      const subType = notification.subType;
      if (isServiceProvider) {
        if (type === "TASK" && subType === "ASSIGNED") {
          router.push(`/service-provider/jobs`);
        }
      }

      if (type === "TASK") {
        router.push(`/customer/tasks`);
      }

      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/notification/change-notification-status?notificationId=" +
        notification.id;
      await axios.post(
        url,
        { notificationId: notification.id },
        {
          headers: { Authorization: "Bearer " + token },
        },
      );
    } catch (error: any) {
      console.error(error?.response?.data || error);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      <h1 className="border-b border-violet-light py-3 font-satoshiBold text-2xl font-bold text-violet-normal">
        {heading}
      </h1>
      {notifications.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => showSelectedNotification(item)}
            className=" pointer-events-auto relative flex w-full cursor-pointer justify-between gap-2 rounded-md border-b border-b-violet-light p-2 py-4  transition-shadow duration-300 hover:bg-violet-light lg:items-center"
          >
            <div
              className={`absolute left-0 top-0 size-2 rounded-full p-1.5 ${!item.read && "bg-orange-normal"} `}
            />
            <div className=" flex gap-2 lg:items-center">
              <Image
                src={
                  item.notificationImage ??
                  "/assets/images/serviceProvider/user.jpg"
                }
                alt="checkicon"
                width={80}
                height={80}
                quality={100}
                className="size-16 flex-shrink-0 rounded-full object-cover"
              />
              {/* </div> */}
              <div className="space-y-">
                <div className="flex items-start gap-2 ">
                  <p className="cursor-pointer font-bold text-[#140B31]">
                    {item.message}
                  </p>
                </div>
              </div>
            </div>

            {/* left handside */}
            <p className="cursor-pointer whitespace-nowrap text-center text-xs lowercase text-slate-500 first-letter:uppercase lg:text-sm">
              {formatRelativeDate(item.notificationTime)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationList;

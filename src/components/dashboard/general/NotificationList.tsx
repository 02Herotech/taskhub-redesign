"use client";

import { formatRelativeDate } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { BiX } from "react-icons/bi";

interface NotificationListProps {
  notifications: NotificationTypes[];
  heading: string;
}

const notificationRoute = [
  {
    type: "BOOKING",
    subtype: "BOOKING",
    customerRoute: "",
    providerRoute: "/service-provider/jobs",
  },
  {
    type: "TASK",
    subtype: "",
    customerRoute: "",
    providerRoute: "",
  },
];

const NotificationList = ({
  notifications,
  heading,
}: NotificationListProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentNotification, setCurrentNotification] =
    useState<NotificationTypes | null>(null);
  const [currentRoute, setCurrentRoute] = useState("");

  const session = useSession();
  const router = useRouter();

  console.log(notifications);

  const token = session?.data?.user?.accessToken;
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";

  const showSelectedNotification = async (notification: NotificationTypes) => {
    try {
      setCurrentNotification(notification);
      dialogRef?.current?.showModal();
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

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (dialog && event.target === dialog) {
      dialogRef.current?.close();
    }
  };

  console.log(isServiceProvider);

  const handleNavigateNotification = () => {
    if (!currentNotification) return;
    const route = notificationRoute.filter(
      (item) =>
        item.type === currentNotification.type &&
        item.subtype === currentNotification.subType,
    )[0];
    if (isServiceProvider) {
      return route.providerRoute;
    }
    return route.customerRoute;
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="bg-transparent"
      >
        <div className="relative w-[90vw] max-w-md space-y-4 rounded-md bg-white p-6 shadow-sm">
          <button
            className="absolute right-3 top-3 rounded-full bg-violet-light p-1 text-violet-normal"
            onClick={closeDialog}
          >
            <BiX className="size-4" />
          </button>
          <h2 className="text-center font-clashSemiBold text-3xl font-semibold text-violet-normal">
            {currentNotification?.type}
          </h2>
          <div className="space-y-3">
            <p className="font-clashSemiBold text-xl font-semibold text-violet-normal">
              Details
            </p>
            <p className="text-violet-dark">{currentNotification?.message}</p>
          </div>
          <div className="flex items-center justify-center">
            <Link
              href={handleNavigateNotification() as string}
              className="rounded-full bg-violet-normal px-4 py-2 text-white"
            >
              View
            </Link>
          </div>
        </div>
      </dialog>

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

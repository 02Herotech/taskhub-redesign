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
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
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
    subtype: "ASSIGNED",
    customerRoute: "/customer/tasks?tab=New tasks",
    providerRoute: "/service-provider/jobs",
  },
  {
    type: "TASK",
    subtype: "COMPLETED",
    customerRoute: "/customer/tasks?tab=Completed tasks",
    providerRoute: "",
  },
  {
    type: "TASK",
    subtype: "OFFER",
    customerRoute: "/customer/tasks?tab=New tasks",
    providerRoute: "",
  },
  {
    type: "JOB",
    subtype: "PENDING",
    customerRoute: "/customer/tasks?tab=Ongoing tasks",
    providerRoute: "",
  },
  {
    type: "JOB",
    subtype: "ONGOING",
    customerRoute: "/customer/tasks?tab=Ongoing tasks",
    providerRoute: "",
  },
  {
    type: "JOB",
    subtype: "COMPLETED",
    customerRoute: "/customer/tasks?tab=Completed tasks",
    providerRoute: "/service-provider/services",
  },
  {
    type: "INVOICE",
    subtype: "PAID",
    customerRoute: "/customer/payment/payment-history",
    providerRoute: "",
  },
  {
    type: "INVOICE",
    subtype: "UNPAID",
    customerRoute: "/customer/payment/offers",
    providerRoute: "",
  },
  {
    type: "INVOICE",
    subtype: "EXPIRED",
    customerRoute: "/customer/payment/payment-history",
    providerRoute: "",
  },
  {
    type: "INVOICE",
    subtype: null,
    customerRoute: "/customer/payment/offers",
    providerRoute: "",
  },
  {
    type: "PAYMENT",
    subtype: "SUCCESS",
    customerRoute: "/customer/payment/payment-history",
    providerRoute: "",
  },
  {
    type: "PAYMENT",
    subtype: "FAILURE",
    customerRoute: "/customer/payment/offers",
    providerRoute: "",
  },
  {
    type: "PAYMENT",
    subtype: "PENDING",
    customerRoute: "/customer/payment/offers",
    providerRoute: "",
  },
];

const NotificationList = ({
  notifications,
  heading,
  setRefresh,
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
      const route = notificationRoute.filter(
        (item) =>
          item.type === notification.type &&
          item.subtype === notification.subType,
      )[0];
      if (isServiceProvider) {
        setCurrentRoute(route.providerRoute);
      } else {
        setCurrentRoute(route.customerRoute);
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
      setRefresh((prev) => prev + 1);
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

  return (
    <div className="flex flex-col gap-4 pb-4">
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="bg-transparent"
      >
        <div className="relative w-[90vw] max-w-md space-y-5 rounded-md bg-white p-6 shadow-sm">
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
            {currentRoute && (
              <Link
                href={currentRoute}
                className="rounded-full bg-violet-normal px-4 py-2 text-white"
              >
                View
              </Link>
            )}
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

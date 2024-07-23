"use client";

import { formatRelativeDate } from "@/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface NotificationListProps {
  notifications: NotificationTypes[];
  heading: string;
  userBookings: BookingType[];
  userListings: ListingDataType[];
  showSelectedNotification: ({
    notification,
    booking,
    listing,
  }: {
    notification: NotificationTypes;
    booking: BookingType;
    listing: ListingDataType;
  }) => Promise<void>;
}

const NotificationList = ({
  notifications,
  heading,
  userBookings,
  userListings,
  showSelectedNotification,
}: NotificationListProps) => {
  const session = useSession();
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";

  return (
    <div className="flex flex-col gap-4 pb-4">
      <h1 className="border-b border-violet-light py-3 font-satoshiBold text-2xl font-bold text-violet-normal">
        {heading}
      </h1>
      {notifications.map((item, index) => {
        const booking = userBookings.find(
          (singleBooking) => singleBooking.id === item.bookingId,
        );
        const listing = userListings.find(
          (singleListing) => singleListing.id === booking?.listing.id,
        );
        if (!booking || !listing) return;
        return (
          <div
            key={index}
            onClick={() =>
              showSelectedNotification({
                notification: item,
                booking,
                listing,
              })
            }
            className=" pointer-events-auto relative flex w-full cursor-pointer justify-between gap-2 rounded-md border-b border-b-violet-light p-2 py-4  transition-shadow duration-300 hover:bg-violet-light lg:items-center"
          >
            <div
              className={`absolute left-0 top-0 size-2 rounded-full p-1.5 ${!item.read && "bg-orange-normal"} `}
            />
            <div className=" flex gap-2 lg:items-center">
              <Image
                src={
                  (isServiceProvider
                    ? booking?.customer?.user?.profileImage
                    : listing?.serviceProvider.user.profileImage) ??
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
                    {item.message} from{" "}
                    {isServiceProvider
                      ? booking?.customer?.user?.fullName
                      : listing?.serviceProvider?.user?.fullName}
                  </p>
                </div>
                <p className="text-#716F78 font-satoshiMedium">
                  {booking?.bookingTitle}
                </p>
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
"use client";
import { marketPlaceModalIcon } from "@/lib/svgIcons";
import Loading from "@/shared/loading";
import { formatDateFromNumberArrayToRelativeDate } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ServiceNotification = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [allNotifications, setAlNotifications] = useState<NotificationTypes[]>(
    [],
  );

  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const userId = session?.data?.user?.user?.id;
  console.log(userId);

  const handleFetchNotifications = async () => {
    try {
      setLoading(true);
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/notification?userId=" +
        userId;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAlNotifications(data);
      setNotifications(data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchNotifications();
    // eslint-disable-next-line
  }, [token]);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const handleChangeCategory = (category: string) => {
    setCurrentCategory(category);
    const newNotifications = allNotifications.filter((notification) => {
      const [year, month, day, hour, minute, second, nanosecond] =
        notification.notificationTime;
      const notificationDate = new Date(
        year,
        month - 1,
        day,
        hour,
        minute,
        second,
        nanosecond / 1000000,
      );
      if (category === "Recent") {
        return notificationDate >= oneWeekAgo;
      } else if (category === "Old") {
        return notificationDate < oneWeekAgo;
      }
      return true;
    });

    setNotifications(newNotifications);
  };

  return (
    <main className="mt-24  py-4 lg:p-8">
      {loading ? (
        <div className="flex min-h-80 items-center justify-center">
          <Loading />
        </div>
      ) : notifications.length < 1 ? (
        <div className="flex min-h-96 w-full flex-col items-center justify-center gap-4 p-4 ">
          <span className="size-64">{marketPlaceModalIcon}</span>
          <p className="text-xl font-medium text-violet-normal">
            No Notification
          </p>
        </div>
      ) : (
        <div className="space-y-8">
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
            {notifications.map((item, index) => (
              <div
                key={index}
                className="pointer-events-auto grid w-full cursor-pointer grid-cols-12 gap-4 transition-shadow duration-300 lg:items-center"
              >
                <div className="col-span-9 flex gap-2 lg:items-center">
                  <div className=" size-9 flex-shrink-0 rounded-full bg-violet-darker p-2 lg:size-12">
                    <Image
                      src={"/assets/images/serviceProvider/jobs/checkicon.png"}
                      alt="checkicon"
                      width={80}
                      height={80}
                      quality={100}
                      className="h-full w-full"
                    />
                  </div>
                  <div>
                    <p className="cursor-pointer font-bold text-violet-normal">
                      {item.message}
                    </p>
                  </div>
                </div>
                <p className="col-span-3 cursor-pointer text-sm text-slate-500">
                  {formatDateFromNumberArrayToRelativeDate([
                    item.notificationTime[0],
                    item.notificationTime[1],
                    item.notificationTime[2],
                    item.notificationTime[3],
                    item.notificationTime[4],
                    item.notificationTime[5],
                  ])}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ServiceNotification;

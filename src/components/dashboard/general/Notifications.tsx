"use client";

import { marketPlaceModalIcon } from "@/lib/svgIcons";
import Loading from "@/shared/loading";
import { isOlder, isThisMonth, isThisWeek, isToday } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import NotificationList from "./NotificationList";

const NotificationComponent = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [allNotifications, setAlNotifications] = useState<NotificationTypes[]>(
    [],
  );
  const [refresh, setRefresh] = useState(0);

  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const userId = session?.data?.user?.user?.id;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const handleFetchNotifications = async () => {
    try {
      setLoading(true);
      const url =
        `${process.env.NEXT_PUBLIC_API_URL}/notification?userId=` + userId;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAlNotifications(data);
      setNotifications(data);
    } catch (error: any) {
      console.error(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchNotifications();
    // eslint-disable-next-line
  }, [token, refresh]);

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
      } else if (category === "All") {
        return true;
      }
      return true;
    });
    setNotifications(newNotifications);
  };

  const categorizeNotifications = (notifications: NotificationTypes[]) => {
    const today: NotificationTypes[] = [];
    const thisWeek: NotificationTypes[] = [];
    const thisMonth: NotificationTypes[] = [];
    const older: NotificationTypes[] = [];

    notifications.forEach((notification) => {
      const date = notification.notificationTime;
      if (isToday(date)) {
        today.push(notification);
      } else if (isThisWeek(date)) {
        thisWeek.push(notification);
      } else if (isThisMonth(date)) {
        thisMonth.push(notification);
      } else if (isOlder(date)) {
        older.push(notification);
      }
    });
    return { today, thisWeek, thisMonth, older };
  };

  useEffect(() => {
    notifications && categorizeNotifications(notifications);
  }, [notifications]);

  return (
    <main className="mt-24 py-4 lg:p-8">
      {loading && !refresh ? (
        <div className="flex min-h-80 items-center justify-center">
          <Loading />
        </div>
      ) : allNotifications.length < 1 ? (
        <div className="flex min-h-96 w-full flex-col items-center justify-center gap-4 p-4 ">
          <span className="size-64">{marketPlaceModalIcon}</span>
          <p className="text-xl font-medium text-violet-normal">
            No Notification
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Buttons display section */}
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
          <div className="space-y-2">
            {/* {categorizeNotifications(notifications).today.length > 0 && ( */}
            <NotificationList
              heading="Today"
              notifications={notifications}
              setRefresh={setRefresh}
            />
            {/* )} */}
            {/* {categorizeNotifications(notifications).thisWeek.length > 0 && (
              <NotificationList
                heading="This Week"
                notifications={categorizeNotifications(notifications).thisWeek}
                setRefresh={setRefresh}
              />
            )}
            {categorizeNotifications(notifications).thisMonth.length > 0 && (
              <NotificationList
                heading="This Month"
                notifications={categorizeNotifications(notifications).thisMonth}
                setRefresh={setRefresh}
              />
            )}
            {categorizeNotifications(notifications).older.length > 0 && (
              <NotificationList
                heading="Older"
                notifications={categorizeNotifications(notifications).older}
                setRefresh={setRefresh}
              />
            )} */}
          </div>
        </div>
      )}
    </main>
  );
};

export default NotificationComponent;

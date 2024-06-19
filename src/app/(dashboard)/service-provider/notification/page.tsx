"use client";
import { typeData } from "@/data/marketplace/data";
import { marketPlaceModalIcon } from "@/lib/svgIcons";
import Loading from "@/shared/loading";
import {
  formatDateFromNumberArray,
  formatDateFromNumberArrayToRelativeDate,
} from "@/utils";
import { truncateText } from "@/utils/marketplace";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";

const ServiceNotification = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [allNotifications, setAlNotifications] = useState<NotificationTypes[]>(
    [],
  );
  const [bookingIds, setBookingIds] = useState<number[]>([]);
  const [userBookings, setUserBookings] = useState<BookingType[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<{
    notification: NotificationTypes | null;
    booking: BookingType | null;
    loading: boolean;
    listing: ListingDataType | null;
  }>({
    notification: null,
    booking: null,
    loading: false,
    listing: null,
  });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const userId = session?.data?.user?.user?.id;

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
      const tempdata: NotificationTypes[] = data;
      tempdata.forEach((item) =>
        setBookingIds((prev) => [...prev, item.bookingId]),
      );
      setAlNotifications(data);

      setNotifications(data);
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleFetchNotifications();
    // eslint-disable-next-line
  }, [token]);

  const fetchBookingById = async () => {
    try {
      const requests = bookingIds.map((bookingId) => {
        const url = `https://smp.jacinthsolutions.com.au/api/v1/booking/${bookingId}`;
        return axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      });

      const responses = await Promise.all(requests);
      const bookings = responses.map((response) => response.data);
      setUserBookings(bookings);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (bookingIds.length > 0) {
      fetchBookingById();
    }
    // eslint-disable-next-line
  }, [bookingIds]);

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

  const showSelectedNotification = async ({
    notification,
    booking,
  }: {
    notification: NotificationTypes;
    booking: BookingType;
  }) => {
    setSelectedNotification((prev) => ({ ...prev, loading: true }));

    setSelectedNotification((prev) => ({ ...prev, notification, booking }));
    const selectedListingId = booking?.listing.id;
    const notificationId = notification.id;

    try {
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/notification/change-notification-status?notificationId=" +
        notificationId;
      const response = await axios.post(
        url,
        { notificationId },
        {
          headers: { Authorization: "Bearer " + token },
        },
      );
    } catch (error: any) {
      console.error(error.response.data);
    }
    try {
      const url = `https://smp.jacinthsolutions.com.au/api/v1/listing/${selectedListingId}`;
      const { data } = await axios.get(url);
      setSelectedNotification((prev) => ({ ...prev, listing: data }));
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setSelectedNotification((prev) => ({ ...prev, loading: false }));
    }
  };

  const removeSelectedNotification = () => {
    setSelectedNotification({
      notification: null,
      booking: null,
      loading: false,
      listing: null,
    });
  };

  return (
    <main className="mt-24  py-4 lg:p-8">
      {loading ? (
        <div className="flex min-h-80 items-center justify-center">
          <Loading />
        </div>
      ) : notifications.length < 1 && currentCategory ? (
        <div className="flex min-h-96 w-full flex-col items-center justify-center gap-4 p-4 ">
          <span className="size-64">{marketPlaceModalIcon}</span>
          <p className="text-xl font-medium text-violet-normal">
            No Notification
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-8">
            <div className="flex flex-wrap gap-4">
              {selectedNotification.booking ? (
                <button
                  className={`rounded-md px-4 py-2 transition-all duration-300 hover:opacity-90 ${currentCategory === "All" ? "bg-violet-normal text-white" : "bg-violet-light text-violet-normal hover:bg-violet-200"}`}
                  onClick={removeSelectedNotification}
                >
                  <FaArrowLeftLong />
                </button>
              ) : (
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
              )}
            </div>

            {notifications.length < 1 && currentCategory === "All" ? (
              <div className="flex min-h-96 w-full flex-col items-center justify-center gap-4 p-4 ">
                <span className="size-64">{marketPlaceModalIcon}</span>
                <p className="text-xl font-medium text-violet-normal">
                  No Notification
                </p>
              </div>
            ) : (
              <>
                {!selectedNotification.booking ? (
                  <div className="flex flex-col gap-4 pb-4">
                    {notifications.map((item, index) => {
                      const booking = userBookings.find(
                        (singleBooking) => singleBooking.id === item.bookingId,
                      );
                      if (!booking) return;
                      return (
                        <div
                          key={index}
                          onClick={() =>
                            showSelectedNotification({
                              notification: item,
                              booking,
                            })
                          }
                          className=" pointer-events-auto relative flex w-full cursor-pointer justify-between gap-2 rounded-md p-2  transition-shadow duration-300 hover:bg-violet-light lg:items-center"
                        >
                          <div
                            className={`absolute left-0 top-0 size-2 rounded-full  p-1.5 ${!item.read && "bg-orange-normal"} `}
                          />
                          <div className=" flex gap-2 lg:items-center">
                            <Image
                              src={
                                booking?.user?.profileImage ??
                                "/assets/images/serviceProvider/jobs/checkicon.png"
                              }
                              alt="checkicon"
                              width={80}
                              height={80}
                              quality={100}
                              className="size-12 flex-shrink-0 rounded-full object-cover"
                            />
                            {/* </div> */}
                            <div className="space-y-">
                              <div className="flex items-start gap-2 ">
                                <p className="cursor-pointer font-bold text-violet-normal">
                                  {booking?.user.fullName}
                                </p>
                                <p className="cursor-pointer font-bold text-violet-normal">
                                  {item.message}
                                </p>
                              </div>
                              <p className="text-#716F78 font-satoshiMedium">
                                {booking?.bookingTitle}
                              </p>
                            </div>
                          </div>

                          {/* left handside */}
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
                      );
                    })}
                  </div>
                ) : selectedNotification.loading ? (
                  <div className="flex min-h-80 items-center justify-center">
                    <Loading />
                  </div>
                ) : (
                  <section className="flex flex-col gap-6 lg:grid lg:grid-cols-12">
                    <div className="lg:col-span-6">
                      <article className="space-y-4 rounded-3xl bg-violet-light p-3 lg:p-6">
                        <p className="inline-block border-b-2 border-black font-satoshiBold text-3xl font-semibold">
                          Service Details
                        </p>
                        <Image
                          src={
                            selectedNotification?.listing
                              ?.businessPictures[0] || ""
                          }
                          alt="booking image"
                          width={1000}
                          height={1000}
                          quality={100}
                          className="h-64 w-full rounded-xl object-cover"
                        />
                        <p className="font-satoshiBold text-3xl font-semibold text-violet-dark">
                          {selectedNotification.listing?.listingTitle}
                        </p>
                        <p className="font-satoshiMedium font-semibold text-violet-normal">
                          {truncateText(
                            selectedNotification.listing?.listingDescription ??
                              "",
                            60,
                          )}
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-4">
                            {selectedNotification.listing?.suburb && (
                              <p className="text-[ #716F78] flex items-center gap-2 text-lg ">
                                <span>
                                  <HiLocationMarker fill="#716F78" />
                                </span>
                                <span>
                                  {selectedNotification.listing.suburb}
                                </span>
                              </p>
                            )}
                            {/* <p className="text-[ #716F78] flex items-center gap-2 text-lg ">
                              <span>
                                <BsClock fill="#716F78" />
                              </span>
                              <span>Midday</span>
                            </p> */}
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            {selectedNotification.listing?.createdAt && (
                              <p className="text-[ #716F78] flex items-center gap-2 text-lg ">
                                <span>
                                  <BiCalendarEvent fill="#716F78" />
                                </span>
                                <span>
                                  {formatDateFromNumberArray(
                                    selectedNotification.listing?.createdAt,
                                  )}
                                </span>
                              </p>
                            )}
                            <p className="font-satoshiBold text-lg font-bold text-violet-normal ">
                              From ${selectedNotification.listing?.planOnePrice}
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                    <div className="lg:col-span-5 lg:col-start-8">
                      <article className="space-y-4 rounded-3xl bg-violet-light p-3 lg:p-6">
                        <p className="inline-block border-b-2 border-black font-satoshiBold text-3xl font-semibold">
                          From
                        </p>
                        <div className="flex items-center gap-4">
                          <Image
                            src={
                              selectedNotification.booking?.user.profileImage ??
                              "/assets/images/serviceProvider/user.jpg"
                            }
                            alt="booking image"
                            width={400}
                            height={400}
                            quality={100}
                            className="size-20 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-satoshiBold font-semibold text-violet-normal">
                              {selectedNotification.booking?.bookingTitle}
                            </p>
                            <p className="text-[ #111111] font-satoshiMediumfont-semibold">
                              Location/
                              {typeData[0].value ===
                              selectedNotification.listing?.taskType
                                ? "Remote Service"
                                : "Physical Service"}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Link
                            href={"/message"}
                            className="rounded-full bg-orange-normal px-6 py-3 font-bold text-white"
                          >
                            Send a message
                          </Link>
                        </div>
                      </article>
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default ServiceNotification;

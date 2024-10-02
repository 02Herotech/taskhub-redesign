"use client";
import MessageButton from "@/components/global/MessageButton";
import { typeData } from "@/data/marketplace/data";
import { marketPlaceModalIcon } from "@/lib/svgIcons";
import Loading from "@/shared/loading";
import {
  formatDateFromNumberArray,
  formatRelativeDate,
  isOlder,
  isThisMonth,
  isThisWeek,
  isToday,
} from "@/utils";
import { truncateText } from "@/utils/marketplace";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import NotificationList from "./NotificationList";

const NotificationComponent = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [allNotifications, setAlNotifications] = useState<NotificationTypes[]>(
    [],
  );
  const [bookingIds, setBookingIds] = useState<number[]>([]);
  const [userBookings, setUserBookings] = useState<BookingType[]>([]);
  const [userListings, setUserListings] = useState<ListingDataType[]>([]);
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
  const [refreshPage, setRefreshPage] = useState(false);
  const [categorizedNotification, setcategorizedNotification] = useState<
    { notificaion: NotificationTypes; heading: string }[]
  >([]);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";
  const userId = session?.data?.user?.user?.id;

  const handleFetchNotifications = async () => {
    try {
      setLoading(true);
      const url =
        "https://api.oloja.com.au/api/v1/notification?userId=" +
        userId;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const tempdata: NotificationTypes[] = data;
      const newBookingIds = tempdata.map((item) => item.bookingId);
      setBookingIds((prev) => [...prev, ...newBookingIds]);
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
  }, [token, refreshPage]);

  const fetchBookingById = async () => {
    try {
      const requests = bookingIds.map((bookingId) => {
        const url = `https://api.oloja.com.au/api/v1/booking/${bookingId}`;
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

  const fetchListingById = async () => {
    try {
      const requests = userBookings.map((item) => {
        const url = `https://api.oloja.com.au/api/v1/listing/${item.listing.id}`;
        return axios.get(url);
      });

      const responses = await Promise.all(requests);
      const listings = responses.map((response) => response.data);
      setUserListings(listings);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (bookingIds.length > 0) {
      fetchBookingById().then(() => {
        fetchListingById().catch((error) => {
          console.log(error.response?.data || error);
        });
      });
    }
    // eslint-disable-next-line
  }, [bookingIds, userBookings]);

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
    listing,
  }: {
    notification: NotificationTypes;
    booking: BookingType;
    listing: ListingDataType;
  }) => {
    setSelectedNotification({
      loading: true,
      notification,
      booking,
      listing,
    });

    const notificationId = notification.id;
    try {
      const url =
        "https://api.oloja.com.au/api/v1/notification/change-notification-status?notificationId=" +
        notificationId;
      await axios.post(
        url,
        { notificationId },
        {
          headers: { Authorization: "Bearer " + token },
        },
      );
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
    setRefreshPage(!refreshPage);
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
      {loading ? (
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
                {!selectedNotification.booking && notifications ? (
                  <>
                    {categorizeNotifications(notifications).today.length >
                      0 && (
                        <NotificationList
                          heading="Today"
                          notifications={
                            categorizeNotifications(notifications).today
                          }
                          userBookings={userBookings}
                          userListings={userListings}
                          showSelectedNotification={showSelectedNotification}
                        />
                      )}
                    {categorizeNotifications(notifications).thisWeek.length >
                      0 && (
                        <NotificationList
                          heading="This Week"
                          notifications={
                            categorizeNotifications(notifications).thisWeek
                          }
                          userBookings={userBookings}
                          userListings={userListings}
                          showSelectedNotification={showSelectedNotification}
                        />
                      )}
                    {categorizeNotifications(notifications).thisMonth.length >
                      0 && (
                        <NotificationList
                          heading="This Month"
                          notifications={
                            categorizeNotifications(notifications).thisMonth
                          }
                          userBookings={userBookings}
                          userListings={userListings}
                          showSelectedNotification={showSelectedNotification}
                        />
                      )}
                    {categorizeNotifications(notifications).older.length >
                      0 && (
                        <NotificationList
                          heading="Older"
                          notifications={
                            categorizeNotifications(notifications).older
                          }
                          userBookings={userBookings}
                          userListings={userListings}
                          showSelectedNotification={showSelectedNotification}
                        />
                      )}
                  </>
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
                                  {selectedNotification.listing?.suburb}
                                </span>
                              </p>
                            )}
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
                              (isServiceProvider
                                ? selectedNotification.booking?.customer?.user
                                  ?.profileImage
                                : selectedNotification.listing?.serviceProvider
                                  .user.profileImage) ??
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
                              {isServiceProvider
                                ? selectedNotification.booking?.customer?.user
                                  ?.fullName
                                : selectedNotification.listing?.serviceProvider
                                  ?.user.fullName}
                            </p>
                            <p className="text-[ #111111] font-satoshiMediumfont-semibold">
                              Location/
                              {typeData[0].value ===
                                selectedNotification.listing?.taskType
                                ? "Remote Service"
                                : "Physical Service"}
                            </p>
                            {selectedNotification.listing?.suburb ? (
                              <p className="text-[ #716F78] flex items-center gap-2 text-lg ">
                                <span>
                                  {selectedNotification.listing?.suburb}
                                </span>
                              </p>
                            ) : (
                              <p className="text-[ #111111] font-satoshiMediumfont-semibold">
                                Remote Service
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          {selectedNotification.booking &&
                            selectedNotification.listing && (
                              <MessageButton
                                recipientId={
                                  isServiceProvider
                                    ? selectedNotification.booking.customer.user.id.toString()
                                    : selectedNotification.listing.serviceProvider.user.id.toString()
                                }
                                recipientName={
                                  isServiceProvider
                                    ? selectedNotification.booking.customer.user
                                      .fullName
                                    : selectedNotification.listing
                                      .serviceProvider.user.fullName
                                }
                              />
                            )}
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

export default NotificationComponent;

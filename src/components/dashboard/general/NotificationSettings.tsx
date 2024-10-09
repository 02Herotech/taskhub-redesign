"use client";

import Button from "@/components/global/Button";
import Loading from "@/shared/loading";
import { RootState } from "@/store";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiSealCheckFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

const NotificationsSettings = () => {
  const { userProfileAuth: auth, profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [notificationPreferences, setNotificationPreferences] = useState<
    string[]
  >([]);
  const [fetchedNotificationPreferences, setFetchedNotificationPreferences] =
    useState<string[]>([]);

  const isServiceProvider = auth?.role?.[0] === "SERVICE_PROVIDER";

  const NotificationOptions = [
    {
      label: `When someone books my ${isServiceProvider ? "Service" : "Task"}`,
      value: "BOOKING",
    },
    {
      label: "When someone send me an offer",
      value: "INVOICE",
    },
    {
      label: `When a ${isServiceProvider ? "task" : "service"} is posted that matches your preferences`,
      value: `${isServiceProvider ? "LISTING" : "TASK"}`,
    },
    {
      label: `When I have an ongoing job`,
      value: "JOB",
    },
    {
      label: `When a payment is made`,
      value: "PAYMENT",
    },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth || !user) return;
    try {
      setLoading(true);
      const url = `https://smp.jacinthsolutions.com.au/api/v1/notification/preference?userId=${user.id}`;
      await axios.post(url, notificationPreferences, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setSuccess(true);

      setTimeout(() => setSuccess(false), 4000);
    } catch (error: any) {
      console.log(error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetPreferences = async () => {
    if (!auth || !user) return;
    setPageLoading(true);
    const url = `https://smp.jacinthsolutions.com.au/api/v1/notification/preference?userId=${user.id}`;
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(data);
      setNotificationPreferences(data);
    } catch (error: any) {
      console.log(error?.response?.data || error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    handleGetPreferences();
    // eslint-disable-next-line
  }, [auth, user]);

  return (
    <>
      {pageLoading ? (
        <div className="flex min-h-96 items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="mt-10 p-4 lg:mt-20 lg:px-14">
          <div className="flex items-center justify-between rounded-2xl bg-[#EBE9F4] px-6 py-3 lg:px-8 lg:py-4">
            <div className="space-y-3">
              <h3 className="font-satoshiBold text-xl font-bold text-[#140B31] lg:text-2xl">
                Control how we notify you
              </h3>
              <h5 className="font-satoshiMedium text-lg text-black">
                Notify me
              </h5>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-white p-3">
              <IoIosNotificationsOutline className="size-5 lg:size-8" />
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-5 rounded-2xl bg-[#EBE9F4] px-6 py-3 lg:px-8 lg:py-4"
          >
            {auth &&
              NotificationOptions.map((option, index) => (
                <div
                  key={index}
                  className="mb-5 flex items-center justify-between space-x-5 lg:space-x-8"
                >
                  <h5 className="font-satoshiMedium text-lg text-black">
                    {option.label}
                  </h5>
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={notificationPreferences.includes(option.value)}
                    onChange={(event) => {
                      setNotificationPreferences((prev) =>
                        event.target.checked
                          ? prev.includes(option.value)
                            ? prev
                            : [...prev, option.value]
                          : prev.filter((item) => item !== option.value)
                      );
                    }}

                    className="h-4 w-4 cursor-pointer lg:h-5 lg:w-5"
                  />
                </div>
              ))}
            <div className="my-6 flex items-center justify-center lg:justify-end">
              <button
                className="rounded-full bg-violet-normal px-4 py-2 font-bold text-white lg:w-48"
                disabled={loading}
              >
                {loading ? (
                  <BeatLoader color="white" loading={loading} />
                ) : (
                  "Save"
                )}
              </button>
            </div>
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#4CAF50] w-full p-3 rounded-2xl flex items-center space-x-3 my-4"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="10" fill="#F9FFF9" />
                      <path d="M15.7899 10.5243L14.5057 9.12617L14.6846 7.27539L12.7846 6.86299L11.7899 5.26367L10.0004 5.99795L8.21094 5.26367L7.2162 6.86299L5.3162 7.27036L5.49515 9.12114L4.21094 10.5243L5.49515 11.9225L5.3162 13.7783L7.2162 14.1907L8.21094 15.79L10.0004 15.0507L11.7899 15.785L12.7846 14.1856L14.6846 13.7732L14.5057 11.9225L15.7899 10.5243ZM8.94778 13.039L6.84252 11.0272L7.58462 10.3181L8.94778 11.6157L12.4162 8.30137L13.1583 9.01553L8.94778 13.039Z" fill="#4CAF50" />
                    </svg>
                    <h2 className="text-lg text-white">Settings successfully updated!</h2>
                  </motion.div>
                )}
              </AnimatePresence>
          </form>
        </div>
      )}
    </>
  );
};

export default NotificationsSettings;
"use client";

import Button from "@/components/global/Button";
import Loading from "@/shared/loading";
import { RootState } from "@/store";
import axios from "axios";
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
      value: `${isServiceProvider ? "TASK" : "LISTING"}`,
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
          {success && (
            <section className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
              <div
                className="absolute inset-0 h-screen w-screen"
                onClick={() => setSuccess(false)}
              />
              <div className="relative z-10 flex w-[90vw] max-w-xl flex-col items-center justify-center gap-3 rounded-xl bg-white p-3 px-4 lg:space-y-4 lg:p-10">
                <div className=" flex flex-col items-center justify-center gap-4">
                  <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
                    <div className=" flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
                      <PiSealCheckFill className="size-10 text-green-500" />
                    </div>
                  </div>
                  <p className="text-center font-satoshiBold text-2xl font-extrabold text-violet-normal">
                    Success
                  </p>
                  <p className="text-center font-semibold text-violet-darker">
                    Your Notification preference has succesfully
                  </p>
                  <div className="flex items-center gap-6">
                    <Link
                      href={
                        isServiceProvider
                          ? "/service-provider/profile"
                          : "/customer/profile"
                      }
                      className="rounded-full bg-violet-normal px-4 py-2 font-bold text-white max-sm:text-sm"
                    >
                      Proceed to profile
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
          <div className="flex items-center justify-between rounded-2xl bg-[#EBE9F4] px-6 py-3 lg:px-8 lg:py-4">
            <div className="space-y-3">
              <h3 className="font-satoshiBold text-xl font-bold text-[#140B31] lg:text-2xl">
                Control how we notify you
              </h3>
              <h5 className="font-satoshiMedium text-black lg:text-lg">
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
                  <h5 className="font-satoshiMedium text-sm text-black lg:text-lg">
                    {option.label}
                  </h5>
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={notificationPreferences.includes(option.value)}
                    onChange={(event) =>
                      setNotificationPreferences((prev) =>
                        event.target.checked
                          ? [...(prev as string[]), option.value]
                          : (prev.filter(
                              (item) => item !== option.value,
                            ) as string[]),
                      )
                    }
                    className="h-4 w-4 cursor-pointer lg:h-5 lg:w-5"
                  />
                </div>
              ))}
            <div className="mt-6 flex items-center justify-center lg:justify-end">
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
          </form>
        </div>
      )}
    </>
  );
};

export default NotificationsSettings;

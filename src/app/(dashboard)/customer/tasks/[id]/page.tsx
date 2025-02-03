"use client";

import Image from "next/image";
import Button from "@/components/global/Button";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiCalendar, FiClock } from "react-icons/fi";
import { useGetTaskByIdQuery, useGetTasksOffersQuery } from "@/services/tasks";
import {
  dayOfWeekNames,
  formatAmount,
  formatTime24Hour,
  monthNames,
  suffixes,
} from "@/lib/utils";
import Loading from "@/shared/loading";
import { useEffect, useRef, useState } from "react";
import AssignOfferForm from "@/components/dashboard/customer/AssignOfferForm";
import CustomerTaskOffers from "@/components/dashboard/customer/CustomerTaskOffers";
import { useSession } from "next-auth/react";
import { instance as authInstance } from "@/utils/axiosInterceptor.config";
import Popup from "@/components/global/Popup";
import Link from "next/link";

const NewTaskDetails = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const session = useSession();
  const isEnabled = session.data?.user.user.enabled;

  const {
    data: task,
    isLoading,
    error,
  } = useGetTaskByIdQuery(id as unknown as number);
  const { data: offers, refetch } = useGetTasksOffersQuery(
    id as unknown as number,
  );

  const [showAssignForm, setShowAssignForm] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const updateUserData = async () => {
      //Check if user is not authenticated so the auth instance doesnt fire the re-directions when user is logged in
      if (session.status !== "authenticated" || isEnabled) return;
      try {
        const { data } = await authInstance.get("customer/profile");
        if (!data.isEnabled) return;
        //Update session
        const user = session.data?.user;
        if (!user) return;
        const { user: userInfo } = user;
        userInfo.enabled = data.isEnabled;
        await session.update({ user: userInfo });
      } catch (error) {
        console.error(error);
      }
    };
    updateUserData();
  }, [isEnabled, session]);

  const handleAssign = (offerId: string) => {
    console.log(`Assigning task to offer: ${offerId}`);
  };

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const intervalId = setInterval(() => {
      if (isMounted.current) {
        refetch();
      }
    }, 10000);

    return () => {
      isMounted.current = false;
      clearInterval(intervalId);
    };
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex h-[full] w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!task || error) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center">
        <h2 className="font-satoshiBold text-xl font-bold text-primary lg:text-3xl">
          Task not found!
        </h2>
        <p className="font-satoshiMedium text-lg text-[#140B31] lg:text-xl">
          Something went wrong, please try again later.
        </p>
      </div>
    );
  }

  const date = task?.taskDate
    ? new Date(task.taskDate[0], task.taskDate[1] - 1, task.taskDate[2])
    : new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const monthName = monthNames[month];
  const dayOfWeek = date.getDay();
  const dayOfWeekName = dayOfWeekNames[dayOfWeek];
  let daySuffix;
  if (day === 11 || day === 12 || day === 13) {
    daySuffix = "th";
  } else {
    daySuffix = suffixes[day % 10] || suffixes[0]; // Default to "th" if suffix is undefined
  }
  const formattedDate = `${dayOfWeekName}, ${monthName} ${day}${daySuffix}`;
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let formattedTime;
  if (hours >= 12) {
    formattedTime = `${hours === 12 ? 12 : hours - 12}:${(minutes < 10 ? "0" : "") + minutes} PM`;
  } else {
    formattedTime = `${hours === 0 ? 12 : hours}:${(minutes < 10 ? "0" : "") + minutes} AM`;
  }

  const isAssigned = task?.taskStatus === "ASSIGNED";

  return (
    <section className="py-5 font-satoshi lg:px-10 lg:py-14">
      {isLoading ? (
        <div className="flex h-[full] w-full items-center justify-center">
          <Image
            src="/assets/images/marketplace/taskhub-newloader.gif"
            alt="loader"
            height={300}
            width={300}
          />
        </div>
      ) : (
        <>
          <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:space-x-5">
            <div className="space-y-7 font-satoshi lg:space-y-10">
              <h2 className="text-lg font-black text-primary lg:text-4xl">
                {task?.taskBriefDescription}
              </h2>
              <div className="space-y-3">
                <h2 className="font-satoshiMedium font-bold text-primary lg:text-2xl">
                  Task Description
                </h2>
                <p className="font-satoshiMedium text-xl font-medium text-[#221354]">
                  {task?.taskDescription}
                </p>
              </div>
              <div className="space-y-5">
                <h4 className="font-satoshiMedium font-bold text-primary lg:text-2xl">
                  Location
                </h4>
                <div className="flex w-full items-center space-x-2 text-[#716F78]">
                  <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
                  <h5 className="font-satoshiMedium text-[15px] font-medium lg:text-xl">
                    {task.state
                      ? `${task.postCode}, ${task.suburb}, ${task.state}`
                      : "Remote"}
                  </h5>
                </div>
              </div>

              <div className="space-y-5">
                <h4 className="font-satoshiMedium font-bold text-primary lg:text-2xl">
                  Date and Time
                </h4>
                <div className="flex items-center space-x-3 text-[#716F78] max-lg:text-xs">
                  <FiCalendar className="h-6 w-6" />
                  <h5 className="font-satoshiMedium text-[15px] font-medium lg:text-xl">
                    On {formattedDate}
                  </h5>
                </div>
                <div className="flex items-center space-x-3 text-[#716F78] max-lg:text-xs">
                  <FiClock className="h-6 w-6" />
                  <h5 className="font-satoshiMedium text-[15px] font-medium lg:text-xl">
                    {formatTime24Hour(task.taskTime) || "Flexible"}
                  </h5>
                </div>
              </div>
            </div>

            <div className="space-y-7 lg:space-y-10">
              <div className="rounded-[20px] border-2 border-primary px-5 py-8">
                <h2 className="font-satoshi text-lg font-bold text-primary lg:text-3xl">
                  Budget Details
                </h2>
                <div className="mb-6 mt-4 border-2 border-primary" />
                <div className="flex w-full items-center justify-between">
                  <h2 className="font-satoshi text-lg font-bold text-primary lg:text-3xl">
                    AUD {formatAmount(task?.customerBudget!, "USD", false)}
                  </h2>
                  <Button
                    onClick={() => {
                      if (!isEnabled) return setOpenPopup(true);
                      setShowAssignForm(true);
                    }}
                    className="rounded-full"
                    disabled={isAssigned}
                  >
                    Assign Task
                  </Button>
                </div>
              </div>
              <h2 className="text-lg font-bold text-primary lg:text-xl">
                Reference Images
              </h2>
              {task.taskImage ? (
                <Image
                  src={task.taskImage}
                  width={200}
                  height={100}
                  alt="Explore task"
                  className="h-52 object-cover"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          </div>
          <Popup isOpen={openPopup} onClose={() => setOpenPopup(false)}>
            <div className="px-14 py-10 lg:px-24">
              <div className="relative grid items-center justify-center space-y-5">
                <p className="font-clashDisplay text-center text-[20px] font-extrabold text-[#2A1769] md:text-[36px] lg:text-[37px] ">
                  Your profile is not updated
                </p>
                <div>
                  <p className="text-center text-[14px] lg:text-[20px]">
                    Please proceed to update your profile
                  </p>
                  <p className="text-center text-[14px] lg:text-[20px]">
                    before you can assign a task to a service provider
                  </p>
                </div>
                <Image
                  src="/assets/images/customer/Task management.png"
                  width={116}
                  height={110}
                  alt="icon"
                  className="absolute -right-14 top-28 w-24 lg:-right-12 lg:top-2/3 lg:w-24 "
                />
                <Image
                  src="/assets/images/blend.png"
                  alt="icon"
                  width={84}
                  height={219}
                  className="absolute -left-12 top-12 w-12 lg:-left-[53px] lg:top-8 lg:w-16"
                />
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => setOpenPopup(false)}
                    className="rounded-2xl bg-status-purpleBase p-2 text-[14px] text-white outline-none md:w-[100px]"
                  >
                    Close
                  </button>

                  <Link href="/customer/profile/edit-profile">
                    <button className="rounded-2xl border border-primary px-4 py-2 text-[14px] text-status-purpleBase outline-none">
                      Go to profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Popup>
        </>
      )}
      {offers && offers.length > 0 && (
        <CustomerTaskOffers taskId={Number(id)} posterId={task.posterId} />
      )}
      {showAssignForm && (
        <AssignOfferForm
          onClose={() => setShowAssignForm(false)}
          onAssign={handleAssign}
          offers={offers || []}
          taskId={Number(id)}
        />
      )}
    </section>
  );
};

export default NewTaskDetails;

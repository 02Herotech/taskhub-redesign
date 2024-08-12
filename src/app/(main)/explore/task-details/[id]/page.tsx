"use client";

import Image from "next/image";
import Button from "@/components/global/Button";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiCalendar, FiClock } from "react-icons/fi";
import { useGetTaskByIdQuery, useGetTasksOffersQuery } from "@/services/tasks";
import {
  dayOfWeekNames,
  formatAmount,
  monthNames,
  suffixes,
} from "@/lib/utils";
import Loading from "@/shared/loading";
import TaskOffers from "@/components/main/explore/TaskOffers";
import { useRef, useState } from "react";
import OfferForm from "@/components/main/explore/OfferForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { connectSocket } from "@/lib/socket";

const TaskDetailsPage = ({ params }: { params: { id: string } }) => {
  const [showOfferForm, setShowOfferForm] = useState(false);
  const offerButtonRef = useRef<HTMLDivElement>(null);
  const id = params.id;
  const { data: task, isLoading } = useGetTaskByIdQuery(
    id as unknown as number,
  );
  const { data: offers, refetch } = useGetTasksOffersQuery(
    id as unknown as number,
  );
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const handleSubmitOffer = async (message: string) => {
    const socket = connectSocket(id as unknown as number);

    const data = {
      taskId: id,
      customerId: task?.posterId,
      serviceProviderId: user?.serviceProviderId,
      fullName: user?.firstName + " " + user?.lastName,
      message,
    };

    if (user && socket) {
      try {
        socket.emit("offer", data, () => {});
        refetch();
      } catch (error) {
        console.error("Error submitting offer:", error);
      }
    } else {
      console.error("Socket not connected or user not logged in");
    }

    handleCloseOfferForm();
  };

  if (!task) {
    return (
      <div className="flex h-[full] w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  const handleMakeOffer = () => {
    setShowOfferForm(true);
  };

  const handleCloseOfferForm = () => {
    setShowOfferForm(false);
  };

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

  return (
    <section className="container py-20 font-satoshi">
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
                    {task.taskTime || "Flexible"}
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
                  <div className="relative" ref={offerButtonRef}>
                    <Button
                      onClick={handleMakeOffer}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleMakeOffer();
                        }
                      }}
                      aria-expanded={showOfferForm}
                      aria-haspopup="true"
                      className="rounded-full"
                    >
                      Make an offer
                    </Button>

                    {showOfferForm && (
                      <OfferForm
                        onClose={handleCloseOfferForm}
                        onSubmit={handleSubmitOffer}
                      />
                    )}
                  </div>
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
        </>
      )}
      {offers && offers.length > 0 && (
        <TaskOffers
          posterId={task?.posterId}
          currentUserId={user?.id!}
          taskId={Number(id)}
        />
      )}
    </section>
  );
};

export default TaskDetailsPage;

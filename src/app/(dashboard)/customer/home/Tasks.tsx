"use client";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";
import { useGetAllTaskByCustomerIdQuery } from "@/services/tasks";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import { truncateText } from "@/utils/marketplace";
import Link from "next/link";

function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th";
  const suffixes = ["st", "nd", "rd"];
  return suffixes[(day % 10) - 1] || "th";
}

function formatDate(date) {
  const options = { weekday: "short", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const day = date.getDate();
  return formattedDate.replace(day, `${day}${getOrdinalSuffix(day)}`);
}

function convertMonthInDateArray(dates: number[]) {
  return new Date(dates[0], dates[1] - 1, dates[2]);
}

function Tasks() {
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const userId = user?.customerId;
  const { data, isLoading, error } = useGetAllTaskByCustomerIdQuery({customerId: userId, page: 0}, {
    skip: !userId,
  });

  type TaskType = NonNullable<typeof data>[number];

  function displayTaskStatus(task: TaskType) {
    if (task.taskStatus == "COMPLETED") {
      return (
        <div className="mb-2 text-sm text-[#34B367] sm:text-xs">Completed</div>
      );
    } else if (task.taskStatus == "ONGOING") {
      return (
        <div className="mb-2 text-sm text-[#FEA621] sm:text-xs">Ongoing</div>
      );
      //@ts-ignore
    } else if (task.assignedTo) {
      return (
        <div className="mb-2 text-sm text-primary sm:text-xs">Assigned</div>
      );
    } else {
      return <div className="mb-2 text-sm text-[#045AA6] sm:text-xs">Open</div>;
    }
  }
  return (
    <section className="w-full md:w-2/5">
      <h3 className="mb-1 font-semibold text-[#0000009E]">My Tasks</h3>
      <div className="relative h-[550px] overflow-y-hidden rounded-2xl border border-[#0000001A] px-3">
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src="/assets/images/marketplace/loader.gif"
              alt="loader"
              width={80}
              height={80}
            />
          </div>
        )}
        {data && (
          <>
            {/* @ts-ignore  */}
            {data.content.length < 1 ? (
              <div className=" py-10">
                <Image
                  src="/assets/images/dashboard/empty-task.jpg"
                  alt="Empty Transaction history"
                  width={958}
                  height={948}
                  className="mx-auto mb-14 w-1/2"
                />
                <p className="mb-4 text-center font-semibold text-[#2A1769]">
                  You have no tasks yet. Add a task to find <br /> the perfect
                  service provider
                </p>

                <Link
                  href="/customer/add-task"
                  className="mx-auto flex w-max gap-2 rounded-full bg-[#E58C06] px-4 py-2 font-bold text-white"
                >
                  <span>Post A Task</span>
                  <div className="rounded-full bg-white p-1">
                    <MdArrowOutward color="#E58C06" />
                  </div>
                </Link>
              </div>
            ) : (
              <ul className="space-y-3 py-3">
                {/* @ts-ignore  */}
                {data.content.slice(0, 4).map((task) => (
                  <li
                    className="flex justify-between rounded-2xl border border-[#00000003] bg-[#EBE9F44D] p-3"
                    key={Math.random() * 1234}
                  >
                    <div>
                      {displayTaskStatus(task)}
                      <p className="mb-4 font-satoshiBold text-base font-bold text-[#01353D] sm:text-xs">
                        {task.taskBriefDescription}
                      </p>
                      <p className="max-w-[200px] text-sm text-[#00323A] sm:text-xs">
                        {truncateText(task.taskDescription, 66)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="mb-3 text-right font-satoshiBold text-2xl font-bold text-[#E58C06]">
                        ${task.customerBudget}
                      </div>
                      <div className="mb-1 flex items-center gap-2 text-right text-[#716F78]">
                        <IoLocationOutline />
                        <span className="text-[10px] font-medium">
                          {task.state ? task.state : "Remote"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-right text-[#716F78]">
                        <CiCalendar />
                        <span className="text-[10px] font-medium">
                          {formatDate(convertMonthInDateArray(task.createdAt))}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
                <div className="w-full bg-white">
                  <Link
                    href="/customer/tasks/all-tasks"
                    className="ml-auto block w-max font-satoshiBold font-bold text-primary"
                  >
                    View all
                  </Link>
                </div>
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}

Tasks.displayName = "ProfileTaskPreview";
export default Tasks;

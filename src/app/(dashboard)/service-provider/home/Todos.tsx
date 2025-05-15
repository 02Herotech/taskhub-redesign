"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { MdArrowOutward } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { truncateText } from "@/utils/marketplace";
import Link from "next/link";
import { useGetServiceProviderJobsQuery } from "@/services/bookings";
import { JobItem } from "@/types/services/jobs";

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

function Todos() {
  const [data, setData] = useState<undefined | JobItem[]>(undefined);

  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const { data: jobs, isLoading } = useGetServiceProviderJobsQuery(
    { serviceProviderId: user?.serviceProviderId, page: 0 },
    { skip: !user?.serviceProviderId },
  );

  useEffect(() => {
    if (jobs) {
      const completedJobs = jobs.content.filter(
        (job) => job.jobInfo.jobStatus === "PENDING",
      );
      setData(completedJobs);
    }
  }, [jobs]);
  return (
    <section className="w-full md:w-2/5">
      <h3 className="mb-1 font-semibold text-[#0000009E]">To-do</h3>
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
            {data?.length < 1 ? (
              <div className=" py-10">
                <Image
                  src="/assets/images/dashboard/empty-listing.png"
                  alt="Empty Transaction history"
                  width={958}
                  height={948}
                  className="mx-auto mb-14 w-1/2"
                />
                <p className="mb-4 text-center font-semibold text-[#2A1769]">
                  You have no active tasks yet. Make an offer <br /> on a task
                  to get started with earning!
                </p>

                <Link
                  href="/provide-service"
                  className="mx-auto flex w-max gap-2 rounded-full bg-[#E58C06] px-4 py-2 font-bold text-white"
                >
                  <span>Create a listing</span>
                  <div className="rounded-full bg-white p-1">
                    <MdArrowOutward color="#E58C06" />
                  </div>
                </Link>
              </div>
            ) : (
              <ul className="space-y-3 py-3">
                {data.slice(0, 4).map((task) => (
                  <li
                    className="flex justify-between rounded-2xl border border-[#00000003] bg-[#EBE9F44D] p-3"
                    key={Math.random() * 1234}
                  >
                    <div>
                      <div className="mb-2 text-sm text-primary sm:text-xs">
                        Assigned
                      </div>
                      <p className="mb-4 font-satoshiBold text-base font-bold text-[#01353D] sm:text-xs">
                        {task.jobInfo.jobTitle}
                      </p>
                      <p className="max-w-[200px] text-sm text-[#00323A] sm:text-xs">
                        {truncateText(task.jobInfo.jobDescription, 66)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="mb-3 text-right font-satoshiBold text-2xl font-bold text-[#E58C06]">
                        ${task.jobInfo.total}
                      </div>
                      <div className="mb-1 flex items-center gap-2 text-right text-[#716F78]">
                        <IoLocationOutline />
                        <span className="text-[10px] font-medium">
                          {task.jobInfo.jobAddress}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-right text-[#716F78]">
                        <CiCalendar />
                        <span className="text-[10px] font-medium">
                          {formatDate(
                            convertMonthInDateArray(task.jobInfo.createdAt),
                          )}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
                <div className="w-full bg-white">
                  <Link
                    href="/service-provider/services"
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

export default Todos;

import { dateFromNumberArray } from "@/utils";
import React from "react";
import { BiCalendarWeek, BiCheck } from "react-icons/bi";
import { CiClock1 } from "react-icons/ci";
import { HiLocationMarker } from "react-icons/hi";

interface CompletedServices {
  jobs: JobsType[];
  allBookings: BookingType[];
}

const CompletedServices = ({ jobs, allBookings }: CompletedServices) => {
  return (
    <div className="flex flex-wrap gap-8 pb-4  max-sm:flex-col">
      {jobs
        .filter((job) => job.jobStatus === "COMPLETED")
        .map((item, index) => {
          if (!allBookings) return;

          const customer = allBookings.find(
            (booking) => booking.id === item.bookingId,
          );
          return (
            <article
              key={index}
              className="round-md w-full space-y-6  rounded-lg bg-violet-light p-4 md:max-w-sm"
            >
              <div className="flex justify-between gap-16 py-2">
                <h2 className="text-3xl font-bold text-violet-normal">
                  {item.jobTitle}
                </h2>
                <span className="flex h-fit  items-center gap-2 rounded-full border border-green-500 bg-[#F4FCF4] px-4  py-2 text-xs text-green-500">
                  <BiCheck />
                  Done
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-slate-700">
                  <HiLocationMarker /> {item.jobAddress}
                </span>
                {/* <span className="flex items-center gap-2 text-slate-700 ">
                  Midday <CiClock1 />
                </span> */}
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-slate-700">
                  <BiCalendarWeek /> {dateFromNumberArray(item.jobEnd)}
                </span>
                <span className="text-xl font-bold text-violet-normal">
                  ${item.total}
                </span>
              </div>
            </article>
          );
        })}
    </div>
  );
};

export default CompletedServices;

import React from "react";
import { BiCalendarWeek, BiCheck } from "react-icons/bi";
import { CiClock1 } from "react-icons/ci";
import { HiLocationMarker } from "react-icons/hi";

const CompletedServices = () => {
  return (
    <div className="flex flex-col gap-8  pb-4">
      <article className="round-md w-fit flex-grow-0 space-y-2 rounded-lg bg-violet-light p-4">
        <div className="flex justify-between gap-16 py-2">
          <h2 className="text-3xl font-bold text-violet-normal">Babysitting</h2>
          <span className="flex items-center gap-2 rounded-full border border-green-500 bg-green-100 px-3 py-[1px] text-xs text-green-500">
            <BiCheck />
            Done
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-slate-700">
            <HiLocationMarker /> Brisbane
          </span>
          <span className="flex items-center gap-2 text-slate-700 ">
            Midday <CiClock1 />
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-slate-700">
            <BiCalendarWeek /> On Sat, June 8th
          </span>
          <span className="text-xl font-bold text-violet-normal">$200</span>
        </div>
      </article>
    </div>
  );
};

export default CompletedServices;

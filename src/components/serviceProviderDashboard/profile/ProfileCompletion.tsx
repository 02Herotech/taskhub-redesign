import React from "react";
import { BiCheck, BiPlus } from "react-icons/bi";

const ProfileCompletion = () => {
  return (
    <section className="grid grid-cols-12 gap-3 rounded-lg bg-[#EBE9F4] p-4">
      <div className="col-span-3">Chart Here</div>
      <div className="col-span-9 space-y-4 ">
        <h2 className="text-3xl font-bold text-[#140B31] ">
          Profile Completion
        </h2>
        <div className="flex flex-wrap gap-4 ">
          <p className="flex items-center gap-2 rounded-full bg-[#381F8C] px-4 py-2 text-xs font-medium text-white">
            <span className="rounded-full bg-white p-1">
              <BiCheck color="#381F8C" size={12} />
            </span>
            <span>Profile Picture</span>
          </p>
          <p className="flex items-center gap-2 rounded-full bg-[#381F8C] px-4 py-2 text-xs font-medium text-white">
            <span className="rounded-full bg-white p-1">
              <BiCheck color="#381F8C" size={12} />
            </span>
            <span>Email Address</span>
          </p>
          <p className="flex items-center gap-2 rounded-full bg-[#381F8C] px-4 py-2 text-xs font-medium text-white">
            <span className="rounded-full bg-white p-1">
              <BiCheck color="#381F8C" size={12} />
            </span>
            <span>Mobile Number</span>
          </p>
          <p className="flex items-center gap-2 rounded-full bg-[#381F8C] px-4 py-2 text-xs font-medium text-white">
            <span className="rounded-full bg-white p-1">
              <BiCheck color="#381F8C" size={12} />
            </span>
            <span>Email Address</span>
          </p>
          <p className="flex items-center gap-2 rounded-full bg-slate-300 px-4 py-2 text-xs font-medium text-slate-700">
            <span className="rounded-full bg-slate-600 p-1">
              <BiPlus color="rgb(203 213 225)" size={12} />
            </span>
            <span>Identification Document</span>
          </p>
          <p className="flex items-center gap-2 rounded-full bg-slate-300 px-4 py-2 text-xs font-medium text-slate-700">
            <span className="rounded-full bg-slate-600 p-1">
              <BiPlus color="rgb(203 213 225)" size={12} />
            </span>
            <span>Date of Birth</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileCompletion;

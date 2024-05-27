"use client";

import React from "react";
import { BiCheck, BiPlus } from "react-icons/bi";
import ProfilePieChart from "./ProfilePieChart";
import Link from "next/link";

const profileProgressData = [
  {
    title: "Profile Picture",
    status: "notactivated",
  },
  {
    title: "Email Address",
    status: "activated",
  },
  {
    title: "Home Address",
    status: "activated",
  },
  {
    title: "Mobile Number",
    status: "activated",
  },
  {
    title: "Identification Document",
    status: "notactivated",
  },
  {
    title: "Date of Birth",
    status: "notactivated",
  },
];

const ProfileCompletion = () => {
  return (
    <section className="flex items-center flex-col gap-3 rounded-lg bg-[#EBE9F4] p-4 md:grid md:grid-cols-12">
      <div className="col-span-4 max-md:max-w-40">
        <ProfilePieChart />
      </div>
      <div className="col-span-8 space-y-4 ">
        <h2 className="text-3xl font-bold text-[#140B31] ">
          Profile Completion
        </h2>
        <div className="flex flex-wrap gap-4 ">
          {profileProgressData
            .sort((a, b) => {
              if (a.status === "activated" && b.status !== "activated") {
                return -1;
              }
              if (a.status !== "activated" && b.status === "activated") {
                return 1;
              }
              return 0;
            })
            .map((item, index) => (
              <Link
                href={
                  item.status === "activated"
                    ? "#"
                    : "/service-provider/profile/edit-profile"
                }
                key={index}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium  ${item.status == "activated" ? "bg-violet-normal text-white" : " bg-slate-300 text-slate-700"} `}
              >
                <span
                  className={`rounded-full ${item.status === "activated" ? "bg-white" : "bg-slate-600"} p-1`}
                >
                  {item.status === "activated" ? (
                    <BiCheck className="size-3 text-violet-normal" />
                  ) : (
                    <BiPlus className="size-3 text-slate-300" />
                  )}
                </span>
                <span> {item.title} </span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileCompletion;

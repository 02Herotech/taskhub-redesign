"use clien";

import React from "react";
import { BiCheck, BiPlus } from "react-icons/bi";
import ProfilePieChart from "./ProfilePieChart";
import { useSession } from "next-auth/react";
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
    title: "Email Address",
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
  const session = useSession();
  const user = session?.data?.user?.user;
  return (
    <section className=" flex h-full flex-col gap-3 rounded-lg bg-[#EBE9F4] p-4 md:grid md:grid-cols-12">
      <div className="col-span-4 max-md:max-w-40 ">
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
              <button
                key={index}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium  ${item.status == "activated" ? "bg-violet-normal text-white" : " bg-slate-300 text-slate-700"} `}
                disabled={item.status === "activated"}
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
              </button>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileCompletion;

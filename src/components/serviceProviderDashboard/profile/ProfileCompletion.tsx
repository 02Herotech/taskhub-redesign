"use client";

import React, { useEffect, useState } from "react";
import { BiCheck, BiPlus } from "react-icons/bi";
import ProfilePieChart from "./ProfilePieChart";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ProfileCompletionType {
  fetchedUserData: DefaultUserDetailsType;
}

const ProfileCompletion = ({ fetchedUserData }: ProfileCompletionType) => {
  // const user = session?.data?.user?.user;
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const [chartData, setChartData] = useState({ total: 0, completed: 0 });

  const profileProgressData = [
    {
      title: "Profile Picture",
      status: user?.profileImage,
    },
    {
      title: "Email Address",
      status: user?.emailAddress,
    },
    {
      title: "Home Address",
      status: user?.address?.state,
    },
    {
      title: "Mobile Number",
      status: user?.phoneNumber,
    },
    {
      title: "Identification Document",
      status: "",
    },
    {
      title: "Date of Birth",
      status: fetchedUserData.dateOfBirth,
    },
  ];

  useEffect(() => {
    setChartData((prev) => ({
      ...prev,
      total: profileProgressData.length,
      completed: profileProgressData.filter(
        (item) => item.status !== "" && item.status !== null,
      ).length,
    }));
    // eslint-disable-next-line
  }, [fetchedUserData, user]);

  return (
    <section className="flex min-h-64 flex-col items-center gap-3 rounded-lg bg-[#EBE9F4] p-4 md:grid md:grid-cols-12">
      <div className="col-span-4 max-md:max-w-40">
        {chartData && <ProfilePieChart chartData={chartData} />}
      </div>
      <div className="col-span-8 space-y-4 ">
        <h2 className="text-3xl font-bold text-[#140B31] ">
          Profile Completion
        </h2>
        <div className="flex flex-wrap gap-4 ">
          {profileProgressData
            .sort((a, b) => {
              if (a.status === "" && b.status !== "") {
                return -1;
              }
              if (a.status !== "" && b.status === "") {
                return 1;
              }
              return 0;
            })
            .map((item, index) => (
              <Link
                href={
                  item.status ? "#" : "/service-provider/profile/edit-profile"
                }
                key={index}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium  ${item.status ? "bg-violet-normal text-white" : " bg-slate-300 text-slate-700"} `}
              >
                <span
                  className={`rounded-full ${item.status ? "bg-white" : "bg-slate-600"} p-1`}
                >
                  {item.status ? (
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

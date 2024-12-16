"use client";

import React, { useEffect, useState } from "react";
import { BiCheck, BiPlus } from "react-icons/bi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProfilePieChart from "@/components/serviceProviderDashboard/profile/ProfilePieChart";

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
      status: fetchedUserData?.profileImage,
    },
    {
      title: "Email Address",
      status: user?.emailAddress,
    },
    {
      title: "Address Information",
      status: user?.address?.postCode,
    },
    // {
    //   title: "Mobile Number",
    //   status: user?.phoneNumber,
    // },
    {
      title: "Identification Document",
      status: fetchedUserData.idImageFront,
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
      completed: profileProgressData.filter((item) => {
        // Check for various falsy values and empty strings
        return item.status !== "" &&
          item.status !== null &&
          item.status !== undefined &&
          item.status !== "null" &&  // Check for "null" string
          item.status !== "undefined" && // Check for "undefined" string
          !(typeof item.status === "string" && item.status.trim() === ""); // Check for whitespace-only strings
      }).length,
    }));
  }, [fetchedUserData, user]);

  return (
    <section className="flex min-h-64 flex-col items-center gap-3 rounded-lg bg-[#EBE9F4] p-4 md:grid md:grid-cols-12">
      <h2 className="text-center text-3xl font-bold text-[#140B31] md:hidden">
        Profile Completion
      </h2>
      <div className="col-span-2 max-w-32">
        {chartData && <ProfilePieChart chartData={chartData} />}
      </div>
      <div className="col-span-8 space-y-4">
        <h2 className="text-3xl font-bold text-[#140B31] max-md:hidden">
          Profile Completion
        </h2>
        <div className="flex flex-wrap gap-4 max-md:items-center max-md:justify-center ">
          {profileProgressData
            .map((item, index) => (
              <Link
                href={
                  item.status ? "#" : "/customer/profile/edit-profile"
                }
                key={index}
                className={`flex items-center gap-2 max-md:py-1 rounded-full px-4 py-2 max-md:px-2 text-xs max-md:text-[9px] md:font-medium  ${item.status ? "bg-violet-normal text-white" : " bg-slate-300 text-slate-700"} `}
              >
                <span
                  className={`rounded-full ${item.status ? "bg-white" : "bg-slate-600"} p-0.5 md:p-1`}
                >
                  {item.status ? (
                    <BiCheck className=" size-2 md:size-3 text-violet-normal" />
                  ) : (
                    <BiPlus className="size-2 md:size-3 text-slate-300" />
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

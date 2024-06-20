"use clien";

import React, { useEffect, useState } from "react";
import { BiCheck, BiPlus } from "react-icons/bi";
import ProfilePieChart from "@/components/serviceProviderDashboard/profile/ProfilePieChart";
import { useSession } from "next-auth/react";

const CustomerProfileCompletion = () => {
  const session = useSession();
  const user = session?.data?.user?.user;

  const [chartData, setChartData] = useState({ total: 0, completed: 0 });

  const profileProgressData = [
    {
      title: "Profile Picture",
      status: user?.profileImage ? "activated" : "notactivated",
    },
    {
      title: "Email Address",
      status: user?.emailAddress ? "activated" : "notactivated",
    },
    {
      title: "Home Address",
      status: user?.address?.state ? "activated" : "notactivated",
    },
    {
      title: "Mobile Number",
      status: user?.phoneNumber ? "activated" : "notactivated",
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

  useEffect(() => {
    setChartData((prev) => ({
      ...prev,
      total: profileProgressData.length,
      completed: profileProgressData.filter(
        (item) => item.status === "activated",
      ).length,
    }));
    // eslint-disable-next-line
  }, [user]);

  return (
    <section className="rounded-lg bg-[#EBE9F4] p-4">
      <h2 className="text-lg mb-2 lg:hidden font-bold text-[#140B31]">
        Profile Completion
      </h2>
      <div className="flex max-lg:items-center gap-3">
        <div className="size-28 lg:size-48">
          {chartData && <ProfilePieChart chartData={chartData} />}
        </div>
        <div className="space-y-4 lg:py-5">
          <h2 className="hidden lg:block text-3xl font-bold text-[#140B31]">
            Profile Completion
          </h2>
          <div className="flex flex-wrap max-lg:gap-y-2 lg:gap-4">
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
      </div>
    </section>
  );
};

export default CustomerProfileCompletion;

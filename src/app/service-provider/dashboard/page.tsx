import ProfileHeader from "@/components/serviceProviderDashboard/profile/ProfileHeader";
import Image from "next/image";
import React from "react";
import { BiCheck, BiPlus } from "react-icons/bi";

const page = () => {
  return (
    <main className="space-y-8 p-4 lg:p-8">
      <ProfileHeader />
      <section className="grid gap-6 lg:grid-cols-2">
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
        {/* <Wallet /> */}
        <section className="relative flex flex-col gap-4 overflow-hidden rounded-xl bg-[#C1BADB] p-6 ">
          <Image
            src={"/assets/images/serviceProvider/walletOverlay.png"}
            alt="overlay"
            width={400}
            height={300}
            className="absolute right-0 top-0"
          />
          <h4 className="text-2xl font-bold text-[#381F8C] ">Wallet</h4>
          <h1 className="flex flex-col font-bold text-yellow-300">
            <span className="text-base"> $ </span>
            <span className="text-6xl"> 0.00</span>
          </h1>
          <button className="w-fit  rounded-full bg-[#381F8C] px-6 py-3 text-white">
            Withdraw
          </button>
        </section>
        {/* <CompletionRate /> */}
        <section className="relative flex flex-col gap-2 overflow-hidden rounded-xl bg-[#C1BADB] p-6 ">
          <h2 className="text-3xl font-bold text-[#381F8C]">
            Your Completion Rate
          </h2>
          <h4 className=" text-lg font-medium text-[#221354] ">
            This is based on your service completion rate
          </h4>
          <div>
            <div className="relative my-4 mb-10 h-4 w-full rounded-full bg-[#F1F1F2]">
              <div className="h-4 w-[55%] rounded-full bg-yellow-500 transition-all"></div>
              <span className="absolute -bottom-6 left-0 text-sm font-medium text-[#221354]">
                Bad
              </span>
              <span className="absolute -bottom-6 left-[25%] text-sm font-medium text-[#221354]">
                Fair
              </span>
              <span className="absolute -bottom-6 left-[50%] text-sm font-medium text-[#221354]">
                Good
              </span>
              <span className="absolute -bottom-6 left-[70%] text-sm font-medium text-[#221354]">
                Great
              </span>
              <span className="absolute -bottom-6 right-0 text-sm font-medium text-[#221354]">
                Excellent
              </span>
            </div>
          </div>
          <p className="text-sm font-medium text-[#221354]">
            Your rating is set to good upon signup to give you a leg up on this
            journey, Complete your tasks to increase ratings.
          </p>
        </section>

        {/* <Barge /> */}
        <section className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-xl bg-[#EBE9F4] p-6 ">
          <div className="flex items-center justify-between">
            <Image
              src={"/assets/images/serviceProvider/protective shield.png"}
              alt="overlay"
              width={400}
              height={300}
              className=" max-w-32 "
            />
            <div className="flex flex-col items-end gap-2 text-right">
              <h4 className="text-3xl font-bold text-[#140B31]">My Badge</h4>
              <p className="text-sm  text-yellow-700">Bronze</p>
            </div>
          </div>
          <div>
            <p className="font-medium text-[#381F8C]">
              Based on your status as a certified Service provider
            </p>
            <p className="text-xs text-slate-600">
              Complete your profile for better badge rewards and increased
              service visibility.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
};

export default page;

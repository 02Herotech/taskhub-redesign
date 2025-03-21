import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircle } from "react-icons/io";
import PaymentHistory from "./PaymentHistory";
import Tasks from "./Tasks";
import Heading from "./Heading";
import PostTask from "./PostTask";
import Link from "next/link";

function Page() {
  return (
    <section className="relative mt-[5rem] p-4">
      <Heading />
      <div className="mb-4 overflow-x-auto">
        <header className="mb-5 flex min-w-[500px] gap-2">
          <Link href="/customer/profile" className="block">
            <h3 className="mb-2 font-semibold">Profile</h3>
            <div className="flex items-center gap-2 rounded-xl border border-[#0000001A] p-4">
              <CgProfile strokeWidth={0.8} size={40} color="#2A1769" />
              <div>
                <h4 className="mb-1 text-2xl font-bold text-[#2A1769]">
                  Complete your <br /> Profile
                </h4>
                <p className="max-w-[200px] text-sm font-medium text-[#0000007A]">
                  Completing your profile helps you get matched to the best
                  service providers for your needs
                </p>
              </div>
            </div>
          </Link>

          <div className="flex flex-col">
            <h3 className="mb-2 font-semibold">Quick Actions</h3>
            <div className="flex flex-1 rounded-xl border border-[#0000001A]">
              <Link href='/customer/add-task'
                className="hidden items-center gap-2 border-r border-r-[#0000003D] py-4 pl-2 pr-8 md:flex"
                role="button"
              >
                <IoIosAddCircle color="#2A1769" size={40} />
                <div className="">
                  <h4 className="mb-1 text-2xl font-bold text-[#2A1769]">
                    Add a <br />
                    Task
                  </h4>
                  <p className="max-w-[200px] text-sm font-medium text-[#0000007A]">
                    Add a task in 2 simple steps and get matched to a service
                    provider
                  </p>
                </div>
              </Link>

              <div className="h-full rounded-lg bg-primary text-white">
                <div className="relative flex h-full items-center justify-center px-5">
                  <p className="absolute left-1 top-1">Wallet</p>
                  <p className="text-6xl font-semibold ">$300.00</p>
                  <button className="absolute bottom-1 right-1 z-10 rounded-full bg-white px-4 py-2 font-bold text-primary">
                    Top up
                  </button>
                  <svg
                    width="134"
                    height="115"
                    viewBox="0 0 134 115"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-1 -right-1"
                  >
                    <path
                      d="M0 22C0 10.9543 8.95431 2 20 2H27C38.0457 2 47 10.9543 47 22V118H0V22Z"
                      fill="white"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M51 20C51 8.95431 59.9543 0 71 0H78C89.0457 0 98 8.95431 98 20V120H51V20Z"
                      fill="white"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M102 20C102 8.95431 110.954 0 122 0H129C140.046 0 149 8.95431 149 20V120H102V20Z"
                      fill="white"
                      fillOpacity="0.1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="flex gap-2">
        <PaymentHistory />
        <Tasks />
      </div>

      <PostTask />
    </section>
  );
}

export default Page;

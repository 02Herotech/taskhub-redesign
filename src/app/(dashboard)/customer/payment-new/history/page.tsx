"use client";
import React, { useState } from "react";
import { IoCalendar } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { LuDownload } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";
import { useEffect } from "react";
import Fundings from "./Fundings";

type Tab = "Earnings" | "Outgoings";

function Page() {
  const [currentTab, setCurrentTab] = useState<Tab>("Earnings");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadCrumbs({
        header: "Payment history",
        links: [{ url: "#", text: "Payment history" }],
      }),
    );
  }, []);
  return (
    <section className="mt-4 w-full pb-10">
      {/* Tabs  */}
      <header>
        <div className="mb-6 w-max rounded-2xl bg-[#F5F4F4]">
          <button
            className={
              "rounded-2xl px-12 py-2 font-semibold " +
              (currentTab === "Earnings"
                ? "bg-primary text-white"
                : "text-primary")
            }
            onClick={() => setCurrentTab("Earnings")}
          >
            Credits
          </button>
          <button
            className={
              "rounded-2xl px-12 py-2 font-semibold " +
              (currentTab === "Outgoings"
                ? "bg-primary text-white"
                : "text-primary")
            }
            onClick={() => setCurrentTab("Outgoings")}
          >
            Debits
          </button>
        </div>
        {/* <div className="mb-5 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <button className="flex items-center gap-5">
            <IoCalendar color="#381F8C" />
            <p className="flex items-center gap-1 text-lg font-bold">
              <span>All</span>
              <GoTriangleDown color="#381F8C" />
            </p>
          </button>
          <p className="text-sm text-[#8C8A93]">
            20 Transactions from March 10th - April 13th
          </p>
        </div> */}
      </header>

      {currentTab === "Earnings" && <Fundings />}

      {/* <ul>
        <li>
          <div className="flex justify-between rounded-lg px-3 py-2 shadow-lg">
            <div>
              <p className="font-satoshiMedium text-xs font-medium text-[#9B9AA9]">
                10 Feb 2025
              </p>
              <p className="mb-1 font-satoshiMedium text-sm font-medium">
                I need a graphic designer{" "}
              </p>
              <div className="flex items-center gap-2">
                <img
                  src="/happy_customer.jpg"
                  alt="Customer"
                  className="size-8 rounded-full object-cover"
                />
                <p className="font-satoshiMedium text-xs text-[#9B9AA9]">
                  Assigned by Jake Paul
                </p>
              </div>
            </div>
            <div>
              <p className="mb-1 font-satoshiMedium text-xs text-[#9B9AA9]">
                Debited
              </p>
              <p className="text-black">$200</p>
            </div>
          </div>
        </li>
      </ul> */}
    </section>
  );
}

export default Page;

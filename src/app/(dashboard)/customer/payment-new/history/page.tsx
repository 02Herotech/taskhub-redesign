"use client";
import React, { useState } from "react";
import { IoCalendar } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { LuDownload } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";
import { useEffect } from "react";
import Fundings from "./Fundings";
import Debits from "./Debits";

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

      {currentTab === "Outgoings" && <Debits />}
    </section>
  );
}

export default Page;

"use client";
import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";
import { useEffect } from "react";

function Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadCrumbs({
        header: "Payment methods",
        links: [{ url: "#", text: "Payment methods" }],
      }),
    );
  }, []);
  return (
    <div className="max-h-[300px] flex-grow space-y-2 rounded-xl bg-[#EBE9F4] p-3">
      <Link
        href="/customer/payment-new/update/make/fund"
        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 font-medium"
      >
        <span className="text-lg md:text-xl">Fund wallet</span>
        <FaChevronRight size={16} color="#381F8C" />
      </Link>
      <Link
        href="/customer/payment-new/update/make/points"
        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 font-medium"
      >
        <span className="text-lg md:text-xl">Task points</span>
        <FaChevronRight size={16} color="#381F8C" />
      </Link>
      <Link
        href="/customer/payment-new/update/make/credits"
        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 font-medium"
      >
        <span className="text-lg md:text-xl">Task credits</span>
        <FaChevronRight size={16} color="#381F8C" />
      </Link>
    </div>
  );
}

export default Page;

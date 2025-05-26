"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";
import { useEffect } from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

function Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadCrumbs({
        header: "Update payment methods",
        links: [{ url: "#", text: "Update payment methods" }],
      }),
    );
  }, []);
  return (
    <div className="max-h-[300px] flex-grow space-y-2 rounded-xl bg-[#EBE9F4] p-3">
      <Link
        href="/customer/payment-new/update/receive/add-bank"
        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 font-medium"
      >
        <span className="text-lg md:text-xl">Add bank account</span>
        <FaChevronRight size={16} color="#381F8C" />
      </Link>
      {/* <Link
        href="#"
        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 font-medium"
      >
        <span className="text-lg md:text-xl">Add billing address</span>
        <FaChevronRight size={16} color="#381F8C" />
      </Link> */}
      <Link
        href="/customer/payment-new/update/receive/withdraw"
        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 font-medium"
      >
        <span className="text-lg md:text-xl">Withdraw from Oloja wallet</span>
        <FaChevronRight size={16} color="#381F8C" />
      </Link>
    </div>
  );
}

export default Page;

"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";
import { FaStar } from "react-icons/fa6";
import { FiAlertOctagon } from "react-icons/fi";
import { useGetWalletBalanceQuery } from "@/services/wallet";

function Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadCrumbs({
        header: "Task points",
        links: [
          {
            url: "/customer/payment-new/update/make",
            text: "Make payments",
          },
          { url: "#", text: "Task credits" },
        ],
      }),
    );
  }, []);
  const { data: result } = useGetWalletBalanceQuery();
  return (
    <section className="flex min-h-[55vh] items-center justify-center">
      <div className="w-full space-y-4 p-2 sm:w-10/12 sm:p-4">
        <h3 className="mb-5 text-center text-2xl font-bold text-[#0F052E]">
          Task Credit
        </h3>
        <FaStar className="mx-auto mb-3" size={100} fill="#C1BADB" />
        <p className="mb-4 font-bold text-[#000000B0]">Credit balance</p>
        <p className="mb-1 text-center text-5xl font-bold">
          {" "}
          ${result ? parseInt(result.data.signUpBonus) : 0}
        </p>
        <p className="text-center text-xs font-medium text-[#000000B0]">
          Valid until <span className="text-[#2A1962]">April 10th</span>{" "}
        </p>
        <div className="mt-5 flex items-center gap-2">
          <FiAlertOctagon strokeWidth={2.5} color="#FE9B07" />
          <p className="font-semibold text-primary">
            What can I use my credit for?
          </p>
        </div>
      </div>
    </section>
  );
}

export default Page;

"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";

function Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadCrumbs({
        header: "Withdraw from Oloja wallet",
        links: [
          {
            url: "/customer/payment-new/update/receive",
            text: "Receive payments",
          },
          { url: "#", text: "Withdraw" },
        ],
      }),
    );
  }, []);
  return (
    <section className="flex min-h-[55vh] items-center justify-center">
      <div className="w-full rounded-xl bg-[#EBE9F4] p-2 px-3 sm:w-10/12 sm:p-4">
        <h3 className="mb-2 text-xl font-bold sm:text-2xl">
          Withdraw from wallet
        </h3>
        <p className="mb-2 text-[#546276]">
          Input your details to get money sent to your account
        </p>
        <p className="mb-4 text-sm text-[#666B73]">ACCOUNT INFORMATION</p>
        <form className="space-y-3">
          <div>
            <label htmlFor="amount" className="block text-sm text-[#4E5158]">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              className="block w-full rounded-lg p-2 outline-none"
              placeholder="$ 500"
            />
          </div>
          <div>
            <label
              htmlFor="account-details"
              className="block text-sm text-[#4E5158]"
            >
              Send to
            </label>
            <select
              id="account-details"
              className="w-full rounded-lg p-2 outline-none"
            >
              <option value="" disabled hidden>
                Saved bank account
              </option>
            </select>
          </div>
          <div>
            <label
              htmlFor="account-name"
              className="block text-sm text-[#4E5158]"
            >
              Account name
            </label>
            <input
              type="text"
              id="account-name"
              className="block w-full rounded-lg p-2 outline-none"
              placeholder="John Doe"
            />
          </div>
          <button className="mt-20 w-full rounded-full bg-primary px-10 py-2 text-white sm:mt-10 sm:w-max">
            Withdraw
          </button>
        </form>
      </div>
    </section>
  );
}

export default Page;

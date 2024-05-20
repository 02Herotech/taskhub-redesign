"use client";

import React, { useState } from "react";
// import { BsEye } from "react-icons/bs";
// import { PiWarningDiamond } from "react-icons/pi";

const ChangePassword = () => {
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  return (
    <main className="space-y-8 p-4 lg:p-8">
      {/* <p className=" flex items-center gap-2 rounded-xl bg-orange-normal p-5 font-normal text-white">
        <span>
          <PiWarningDiamond className="size-5" />
        </span>
        <span>
          Available funds to withdrawal: $0, minimum withdrawal request is $50
        </span>
      </p>

      {!isPasswordVerified ? (
        <form className="mx-auto flex w-full max-w-xl flex-col items-center gap-3  bg-violet-active p-3 lg:p-6 ">
          <label
            htmlFor="checkPassword"
            className="text-3xl font-bold text-violet-dark"
          >
            Current Password
          </label>
          <div className="relative">
            <button className="absolute right-2 top-1/2 -translate-y-1/2">
              {" "}
              <BsEye />{" "}
            </button>
            <input
              type="text"
              className="w-full rounded-xl p-3 outline-none  "
            />
          </div>
          <button className="w-full rounded-full bg-violet-normal px-4 py-2  ">
            Change Password
          </button>
        </form>
      ) : (
        <form className="mx-auto flex w-full max-w-xl flex-col items-center gap-3  bg-violet-active p-3 lg:p-6 ">
          <label htmlFor=""></label>
          <input type="text" className="w-full rounded-xl p-3 outline-none  " />
          <button className="w-full rounded-full bg-violet-normal px-4 py-2  ">
            ChangePassword
          </button>
        </form>
      )} */}
    </main>
  );
};

export default ChangePassword;

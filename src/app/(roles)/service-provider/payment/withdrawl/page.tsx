import React from "react";
import { PiWarningDiamond } from "react-icons/pi";

const page = () => {
  return (
    <main className="space-y-8 p-4 lg:p-8">
      <p className=" flex items-center gap-2 rounded-xl bg-orange-normal p-5 font-normal text-white">
        <span>
          <PiWarningDiamond className="size-5" />
        </span>
        <span>
          Available funds to withdrawal: $0, minimum withdrawal request is $50
        </span>
      </p>
      <form className="bg-violet-active rounded-xl p-3 lg:p-6">
        <div className="space-y-3 outline-none">
          <label
            htmlFor="method"
            className="text-3xl font-medium text-violet-normal"
          >
            Withdrawal Method
          </label>
          <select
            name="method"
            id="method"
            className="w-full rounded-md p-3 text-slate-700 outline-none"
          >
            <option>Select a method</option>
          </select>
        </div>

        {/* Various Payment Methods */}
        {/* <div className="flex flex-wrap gap-6">
          <div className="w-full min-w-96 flex-1">
            <label htmlFor=""></label>
          </div>
          <div className="w-full min-w-96 flex-1"></div>
        </div> */}
      </form>
    </main>
  );
};

export default page;

import React from "react";

const CompletionRate = () => {
  return (
    <section className="relative w-full md:h-64 flex flex-col gap-2 overflow-hidden rounded-xl bg-[#C1BADB] px-4 py-2 md:p-6 ">
      <h2 className="text-lg font-bold font-satoshiBold  md:text-3xl  text-[#381F8C]">
        Your Completion Rate
      </h2>
      <h4 className=" text-lg font-medium text-[#221354]">
        This is based on your service completion rate
      </h4>
      <div>
        <div className="relative my-4 mb-10 h-4 w-full rounded-full bg-[#F1F1F2]">
          <div className="h-4 w-[45%] rounded-full bg-[#FE9B07] transition-all"></div>
          <span className="absolute -bottom-6 left-0 text-sm font-medium text-[#221354]">
            Bad
          </span>
          <span className="absolute -bottom-6 left-[20%] text-sm font-bold font-satoshiBold text-[#221354]">
            Fair
          </span>
          <span className="absolute font-bold font-satoshiBold  -bottom-6 left-[40%] text-sm text-[#221354]">
            Good
          </span>
          <span className="absolute -bottom-6 left-[65%] text-sm font-bold font-satoshiBold text-[#221354]">
            Great
          </span>
          <span className="absolute -bottom-6 right-0 text-sm font-bold font-satoshiBold text-[#221354]">
            Excellent
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-[#221354] font-satoshiMedium max-md:hidden">
        Your rating is set to good upon signup to give you a leg up on this
        journey, Complete your tasks to increase ratings.
      </p>
      <p className="text-sm font-medium text-[#221354] font-satoshiMedium md:hidden ">
        Automatically set to Good upon signup to give you a legup on this journey
      </p>
    </section>
  );
};

export default CompletionRate;

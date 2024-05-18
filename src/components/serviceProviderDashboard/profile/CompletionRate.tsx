import React from "react";

const CompletionRate = () => {
  return (
    <section className="relative flex flex-col gap-2 overflow-hidden rounded-xl bg-[#C1BADB] p-6 ">
      <h2 className="text-3xl font-bold text-[#381F8C]">
        Your Completion Rate
      </h2>
      <h4 className=" text-lg font-medium text-[#221354] ">
        This is based on your service completion rate
      </h4>
      <div>
        <div className="relative my-4 mb-10 h-4 w-full rounded-full bg-[#F1F1F2]">
          <div className="h-4 w-[55%] rounded-full bg-yellow-500 transition-all"></div>
          <span className="absolute -bottom-6 left-0 text-sm font-medium text-[#221354]">
            Bad
          </span>
          <span className="absolute -bottom-6 left-[25%] text-sm font-medium text-[#221354]">
            Fair
          </span>
          <span className="absolute -bottom-6 left-[50%] text-sm font-medium text-[#221354]">
            Good
          </span>
          <span className="absolute -bottom-6 left-[70%] text-sm font-medium text-[#221354]">
            Great
          </span>
          <span className="absolute -bottom-6 right-0 text-sm font-medium text-[#221354]">
            Excellent
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-[#221354]">
        Your rating is set to good upon signup to give you a leg up on this
        journey, Complete your tasks to increase ratings.
      </p>
    </section>
  );
};

export default CompletionRate;

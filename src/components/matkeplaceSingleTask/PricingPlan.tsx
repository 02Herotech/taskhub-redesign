import React from "react";
import { BsTriangleFill } from "react-icons/bs";

const PricingPlan = () => {
  return (
    <article className="lg:col-span-5 lg:col-start-8 ">
      <div className="py-10 px-8 rounded-2xl border-2 border-[#381F8C] text-[#381F8C]">
        <div className="py-4 border-b-2 border-[#381F8C]">
          <h1 className="text-4xl font-extrabold">Pricing Details </h1>
        </div>

        <div className="py-6 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold  flex flex-col ">
              A$ 30
              <span className="text-slate-500 font-normal text-base  ">
                1.5 hours
              </span>
            </h2>
            <button className="py-3 px-6 rounded-full bg-[#381F8C] text-white hover:opacity-90 ">
              Book Task
            </button>
          </div>
          <button className="w-full font-normal flex text-slate-500 justify-between gap-2  ">
            Lorem ipsum dolor sit amet elit jkl aols ...
            <span className="pt-2">
              <BsTriangleFill
                size={12}
                fill="[#381F8C]"
                className="rotate-[60deg]"
              />
            </span>
          </button>
        </div>
        <div className="py-6 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold  flex flex-col ">
              A$ 30
              <span className="text-slate-500 font-normal text-base  ">
                1.5 hours
              </span>
            </h2>
            <button className="py-3 px-6 rounded-full bg-[#381F8C] text-white hover:opacity-90 ">
              Book Task
            </button>
          </div>
          <button className="w-full font-normal flex text-slate-500 justify-between gap-2  ">
            Lorem ipsum dolor sit amet elit jkl aols ...
            <span className="pt-2">
              <BsTriangleFill
                size={12}
                fill="[#381F8C]"
                className="rotate-[60deg]"
              />
            </span>
          </button>
        </div>
        <div className="py-4 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold  flex flex-col ">
              A$ 30
              <span className="text-slate-500 font-normal text-base  ">
                1.5 hours
              </span>
            </h2>
            <button className="py-3 px-6 rounded-full bg-[#381F8C] text-white hover:opacity-90 ">
              Book Task
            </button>
          </div>
          <button className="w-full font-normal flex text-slate-500 justify-between gap-2  ">
            Lorem ipsum dolor sit amet elit jkl aols ...
            <span className="pt-2">
              <BsTriangleFill
                size={12}
                fill="[#381F8C]"
                className="rotate-[60deg]"
              />
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default PricingPlan;

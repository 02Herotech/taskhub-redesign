import React, { useState } from "react";
import { BsTriangleFill } from "react-icons/bs";
import PricingModal from "./PricingModal";

const PricingPlan = () => {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <article className="relative lg:col-span-5 lg:col-start-8 ">
      <PricingModal
        setIsModalShown={setIsModalShown}
        isModalShown={isModalShown}
      />
      <div className=" rounded-2xl border-2 border-[#381F8C] p-2 text-[#381F8C] lg:p-8">
        <div className="border-b-2 border-[#381F8C] py-4">
          <h1 className="text-4xl font-extrabold">Pricing Details </h1>
        </div>

        <div className="space-y-2 py-6">
          <div className="flex items-center justify-between">
            <h2 className="flex flex-col  text-3xl font-extrabold ">
              A$ 30
              <span className="text-base font-normal text-slate-500  ">
                1.5 hours
              </span>
            </h2>
            <button
              onClick={() => setIsModalShown(true)}
              className="rounded-full bg-[#381F8C] px-6 py-3 text-white hover:opacity-90 "
            >
              Book Task
            </button>
          </div>
          <button
            onClick={() => setIsModalShown(true)}
            className="flex w-full justify-between gap-2 font-normal text-slate-500  "
          >
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
        <div className="space-y-2 py-6">
          <div className="flex items-center justify-between">
            <h2 className="flex flex-col  text-3xl font-extrabold ">
              A$ 30
              <span className="text-base font-normal text-slate-500  ">
                1.5 hours
              </span>
            </h2>
            <button
              onClick={() => setIsModalShown(true)}
              className="rounded-full bg-[#381F8C] px-6 py-3 text-white hover:opacity-90 "
            >
              Book Task
            </button>
          </div>
          <button className="flex w-full justify-between gap-2 font-normal text-slate-500  ">
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
        <div className="space-y-2 py-4">
          <div className="flex items-center justify-between">
            <h2 className="flex flex-col  text-3xl font-extrabold ">
              A$ 30
              <span className="text-base font-normal text-slate-500  ">
                1.5 hours
              </span>
            </h2>
            <button className="rounded-full bg-[#381F8C] px-6 py-3 text-white hover:opacity-90 ">
              Book Task
            </button>
          </div>
          <button className="flex w-full justify-between gap-2 font-normal text-slate-500  ">
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

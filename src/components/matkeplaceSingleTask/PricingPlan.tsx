import React, { useState } from "react";
import { BsTriangleFill } from "react-icons/bs";
import PricingModal from "./PricingModal";

interface PricingPlanProps {
  planOnePrice: number;
  planTwoPrice: number;
  planThreePrice: number;
  planOneDescription: string;
  planTwoDescription: string;
  planThreeDescription: string;
}

const PricingPlan = ({
  planOneDescription,
  planOnePrice,
  planTwoPrice,
  planTwoDescription,
  planThreePrice,
  planThreeDescription,
}: PricingPlanProps) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState({
    index: 1,
    state: false,
  });
  const [modalData, setModalData] = useState({ pricing: 0 });

  const handleExpandText = (index: number) => {
    if (isTextExpanded.index === index) {
      setIsTextExpanded({ index: index, state: !isTextExpanded.state });
    } else {
      setIsTextExpanded({ index: index, state: true });
    }
  };

  const handleShowModal = (pricing: number) => {
    setIsModalShown(true);
    setModalData((prev) => ({ ...prev, pricing }));
  };

  return (
    <article className="relative lg:col-span-5 lg:col-start-8 ">
      <PricingModal
        setIsModalShown={setIsModalShown}
        isModalShown={isModalShown}
        modalData={modalData}
      />
      <div className=" rounded-2xl border-2 border-[#381F8C] p-2 text-[#381F8C] lg:p-8">
        <div className="border-b-2 border-[#381F8C] py-4">
          <h1 className="text-4xl font-extrabold">Pricing Details </h1>
        </div>

        <div className="space-y-2 py-6">
          <div className="flex items-center justify-between">
            <h2 className="flex flex-col  text-3xl font-extrabold ">
              A$ {planOnePrice}
            </h2>
            <button
              onClick={() => setIsModalShown(true)}
              className="rounded-full bg-[#381F8C] px-6 py-3 text-white hover:opacity-90 "
            >
              Book Task
            </button>
          </div>
          <button
            onClick={() => handleExpandText(1)}
            className="flex w-full justify-between gap-2 font-normal text-slate-500  "
          >
            {isTextExpanded.index === 1 && isTextExpanded.state
              ? planOneDescription
              : planOneDescription.split(" ").slice(0, 20).join(" ") + "..."}

            <span className="pt-2">
              <BsTriangleFill
                size={12}
                fill="[#381F8C]"
                className="rotate-[60deg]"
              />
            </span>
          </button>
        </div>
        {/* <div className="space-y-2 py-6">
          <div className="flex items-center justify-between">
            <h2 className="flex flex-col  text-3xl font-extrabold ">
              A$ {planTwoPrice}
            </h2>
            <button
              onClick={() => setIsModalShown(true)}
              className="rounded-full bg-[#381F8C] px-6 py-3 text-white hover:opacity-90 "
            >
              Book Task
            </button>
          </div>
          <button
            onClick={() => handleExpandText(2)}
            className="flex w-full justify-between gap-2 font-normal text-slate-500  "
          >
            {isTextExpanded.index === 2 && isTextExpanded.state
              ? planTwoDescription
              : planTwoDescription.split(" ").slice(0, 20).join(" ") + "..."}
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
              A$ {planThreePrice}
            </h2>
            <button
              onClick={() => handleShowModal(planThreePrice)}
              className="rounded-full bg-[#381F8C] px-6 py-3 text-white hover:opacity-90 "
            >
              Book Task
            </button>
          </div>
          <button
            onClick={() => handleExpandText(3)}
            className="flex w-full justify-between gap-2 font-normal text-slate-500  "
          >
            {isTextExpanded.index === 1 && isTextExpanded.state
              ? planThreeDescription
              : planThreeDescription.split(" ").slice(0, 20).join(" ") + "..."}
            <span className="pt-2">
              <BsTriangleFill
                size={12}
                fill="[#381F8C]"
                className="rotate-[60deg]"
              />
            </span>
          </button>
        </div> */}
      </div>
    </article>
  );
};

export default PricingPlan;

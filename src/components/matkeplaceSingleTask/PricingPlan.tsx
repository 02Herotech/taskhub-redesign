"use client";
import React, { useState } from "react";
import { BsTriangleFill } from "react-icons/bs";
import PricingModal from "./PricingModal";
import { useSession } from "next-auth/react";

interface PricingPlanProps {
  planOnePrice: number;
  planTwoPrice: number | null;
  planThreePrice: number | null;
  planOneDescription: string;
  planTwoDescription: string | null;
  planThreeDescription: string | null;
  listingId: number;
}

const PricingPlan = ({
  planOneDescription,
  planOnePrice,
  planTwoPrice,
  planTwoDescription,
  planThreePrice,
  planThreeDescription,
  listingId,
}: PricingPlanProps) => {
  const session = useSession();
  const isAuthenticated = session?.data?.user?.accessToken;
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";

  const [isModalShown, setIsModalShown] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState({
    index: 1,
    state: false,
  });
  const [modalData, setModalData] = useState<{
    pricing: number;
    isAuthenticated: string | undefined;
    isServiceProvider: boolean;
    title: string;
  }>({
    pricing: 0,
    isAuthenticated,
    isServiceProvider,
    title: "",
  });

  const handleExpandText = (index: number) => {
    if (isTextExpanded.index === index) {
      setIsTextExpanded({ index: index, state: !isTextExpanded.state });
    } else {
      setIsTextExpanded({ index: index, state: true });
    }
  };

  const handleShowModal = ({
    pricing,
    title,
  }: {
    pricing: number | null;
    title: string | null;
  }) => {
    if (pricing && title) {
      setIsModalShown(true);
      setModalData((prev) => ({ ...prev, pricing, title }));
    }
  };

  return (
    <article className="relative lg:col-span-5 lg:col-start-8 ">
      <PricingModal
        setIsModalShown={setIsModalShown}
        isModalShown={isModalShown}
        modalData={modalData}
        listingId={listingId}
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
              onClick={() =>
                handleShowModal({
                  pricing: planOnePrice,
                  title: planOneDescription,
                })
              }
              className="rounded-full bg-[#381F8C] px-6 py-3 text-white hover:opacity-90 "
            >
              Book Task
            </button>
          </div>
          <button
            onClick={() => handleExpandText(1)}
            className="flex w-full justify-between gap-2 text-left font-normal text-slate-500  "
          >
            {isTextExpanded.index === 1 && isTextExpanded.state
              ? planOneDescription
              : planOneDescription.split(" ").slice(0, 5).join(" ") + "..."}

            <span className="pt-2">
              <BsTriangleFill
                size={12}
                fill="[#381F8C]"
                className="rotate-[60deg]"
              />
            </span>
          </button>
        </div>
        {planTwoDescription && (
          <div className="space-y-2 py-6">
            <div className="flex items-center justify-between">
              <h2 className="flex flex-col  text-3xl font-extrabold ">
                A$ {planTwoPrice}
              </h2>
              <button
                onClick={() =>
                  handleShowModal({
                    pricing: planTwoPrice,
                    title: planTwoDescription,
                  })
                }
                className="rounded-full bg-[#381F8C] px-6 py-3 text-white hover:opacity-90 "
              >
                Book Task
              </button>
            </div>
            <button
              onClick={() => handleExpandText(2)}
              className="flex w-full justify-between gap-2 text-left font-normal text-slate-500  "
            >
              {isTextExpanded.index === 2 && isTextExpanded.state
                ? planTwoDescription || "No description available"
                : (planTwoDescription
                    ? planTwoDescription.split(" ").slice(0, 5).join(" ")
                    : "No description available") + "..."}
              <span className="pt-2">
                <BsTriangleFill
                  size={12}
                  fill="[#381F8C]"
                  className="rotate-[60deg]"
                />
              </span>
            </button>
          </div>
        )}

        {planThreePrice && (
          <div className="space-y-2 py-4">
            <div className="flex items-center justify-between">
              <h2 className="flex flex-col  text-3xl font-extrabold ">
                A$ {planThreePrice}
              </h2>
              <button
                onClick={() =>
                  handleShowModal({
                    pricing: planThreePrice,
                    title: planThreeDescription,
                  })
                }
                className="rounded-full bg-[#381F8C] px-6 py-3 text-white hover:opacity-90 "
              >
                Book Task
              </button>
            </div>
            <button
              onClick={() => handleExpandText(3)}
              className="f text-leftont-normal flex w-full justify-between gap-2 text-slate-500  "
            >
              {isTextExpanded.index === 3 && isTextExpanded.state
                ? planTwoDescription || "No description available"
                : (planThreeDescription
                    ? planThreeDescription.split(" ").slice(0, 5).join(" ")
                    : "No description available") + "..."}
              <span className="pt-2">
                <BsTriangleFill
                  size={12}
                  fill="[#381F8C]"
                  className="rotate-[60deg]"
                />
              </span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default PricingPlan;

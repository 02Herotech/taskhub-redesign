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
  listingTitle: string | undefined;
  negotiable: boolean;
}

const PricingPlan = ({
  planOneDescription,
  planOnePrice,
  planTwoPrice,
  planTwoDescription,
  planThreePrice,
  planThreeDescription,
  listingId,
  listingTitle,
  negotiable,
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
    negotiable: boolean;
  }>({
    pricing: 0,
    isAuthenticated,
    isServiceProvider,
    title: listingTitle ?? "",
    negotiable,
  });

  const handleExpandText = (index: number) => {
    setIsTextExpanded((prev) => ({
      index,
      state: prev.index === index ? !prev.state : true,
    }));
  };

  const renderDescription = (description: string, index: number) => {
    const words = description.split(" ");
    const shouldShowEllipses = words.length > 4;

    if (isTextExpanded.index === index && isTextExpanded.state) {
      return description;
    }

    if (shouldShowEllipses) {
      return words.slice(0, 5).join(" ") + "...";
    }

    return description;
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
      setModalData((prev) => ({ ...prev, pricing, title: listingTitle ?? "" }));
    }
  };

  return (
    <article className="container relative pt-12 lg:col-span-5 lg:col-start-8  ">
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

          <div className="flex w-full items-start justify-between gap-2 text-slate-500">
            <p>{renderDescription(planOneDescription, 1)}</p>
            {planOneDescription.split(" ").length > 4 && (
              <button onClick={() => handleExpandText(1)}>
                <span className="whitespace-nowrap pt-2 text-sm font-bold text-violet-normal">
                  {isTextExpanded.index === 1 && isTextExpanded.state
                    ? "Read less"
                    : "Read more"}
                </span>
              </button>
            )}
          </div>
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
            <div className="flex w-full items-start justify-between gap-2 text-slate-500">
              <p>{renderDescription(planTwoDescription, 2)}</p>
              {planTwoDescription &&
                planTwoDescription.split(" ").length > 4 && (
                  <button onClick={() => handleExpandText(2)}>
                    <span className="whitespace-nowrap pt-2 text-sm font-bold text-violet-normal">
                      {isTextExpanded.index === 2 && isTextExpanded.state
                        ? "Read less"
                        : "Read more"}
                    </span>
                  </button>
                )}
            </div>
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
            <div className="flex w-full items-start justify-between gap-2 text-slate-500">
              <p>{renderDescription(planThreeDescription as string, 3)}</p>
              {planThreeDescription &&
                planThreeDescription.split(" ").length > 4 && (
                  <button onClick={() => handleExpandText(3)}>
                    <span className="pt-2 text-sm font-bold text-violet-normal">
                      {isTextExpanded.index === 3 && isTextExpanded.state
                        ? "Read less"
                        : "Read more"}
                    </span>
                  </button>
                )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default PricingPlan;

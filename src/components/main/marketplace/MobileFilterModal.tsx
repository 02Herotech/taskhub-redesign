"use client";

import { RootState } from "@/store";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import ReactSlider from "react-slider";

interface ModalProp {
  isMobileFilterModalShown: boolean;
  setIsMobileFilterModalShown: Dispatch<SetStateAction<boolean>>;
}

const MobileFilterModal = ({
  isMobileFilterModalShown,
  setIsMobileFilterModalShown,
}: ModalProp) => {
  const { categories } = useSelector((state: RootState) => state.market);
  const [filterState, setFilterState] = useState({
    availbleTask: false,
    taskWithNoOffers: false,
    category: "",
    type: "",
    pricing: {
      minPrice: 5,
      maxPrice: 1000,
    },
    highestToLowest: "",
    others: "",
  });

  const applyFilter = () => {
    setIsMobileFilterModalShown(false);
    setFilterState({
      availbleTask: false,
      taskWithNoOffers: false,
      category: "",
      type: "",
      pricing: {
        minPrice: 5,
        maxPrice: 1000,
      },
      highestToLowest: "",
      others: "",
    });
  };

  return (
    <section
      className={`fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 transition-all duration-300 ${isMobileFilterModalShown ? "pointer-events-auto opacity-100 " : " pointer-events-none opacity-0"} `}
    >
      <div
        className="absolute z-0 h-screen w-screen"
        onClick={() => setIsMobileFilterModalShown(false)}
      ></div>
      <div className="small-scrollbar relative z-10 my-4 h-[90vh] w-[80vw] space-y-4 overflow-y-auto rounded-md bg-white p-6 ">
        {/* Availability */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-violet-normal">
            Filter By
          </h2>
          <div className="space-y-2 px-4 ">
            <label className="flex items-center gap-2 font-medium text-violet-normal">
              <input
                type="checkbox"
                name="available"
                onChange={() =>
                  setFilterState({
                    ...filterState,
                    availbleTask: !filterState.availbleTask,
                  })
                }
              />
              Available task only
            </label>
            <label className="flex items-center gap-2 font-medium text-violet-normal">
              <input
                type="checkbox"
                name="available"
                onChange={() =>
                  setFilterState({
                    ...filterState,
                    taskWithNoOffers: !filterState.taskWithNoOffers,
                  })
                }
              />
              Tasks with no offers only
            </label>
          </div>
        </div>
        {/* Category */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-violet-normal">
            Services
          </h2>
          <div className="flex flex-col  gap-2">
            {categories &&
              categories.map((item) => (
                <button
                  key={item.id}
                  className={`flex w-fit items-center gap-2 rounded-md px-4 py-2 text-violet-normal transition-colors duration-300 ${filterState.category === item.categoryName ? "bg-violet-normal text-white" : "bg-transparent text-violet-normal"} `}
                  onClick={() => {
                    filterState.category === item.categoryName
                      ? setFilterState({
                          ...filterState,
                          category: "",
                        })
                      : setFilterState({
                          ...filterState,
                          category: item.categoryName,
                        });
                  }}
                >
                  <span className="h-fit w-fit rounded-full bg-orange-normal p-2 "></span>
                  {item.categoryName}
                </button>
              ))}
          </div>
        </div>

        {/* Type of service */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-violet-normal">
            Type of Service
          </h2>
          <div className="flex flex-col  gap-2">
            <button
              className={`flex w-fit items-center gap-2 rounded-md px-4 py-2 text-violet-normal transition-colors duration-300 ${filterState.type === "Physical" ? "bg-violet-normal text-white" : "bg-transparent text-violet-normal"} `}
              onClick={() => {
                {
                  filterState.type === "Physical"
                    ? setFilterState({ ...filterState, type: "" })
                    : setFilterState({ ...filterState, type: "Physical" });
                }
              }}
            >
              <span className="h-fit w-fit rounded-full bg-orange-normal p-2"></span>
              Physical
            </button>
            <button
              className={`flex w-fit items-center gap-2 rounded-md px-4 py-2 text-violet-normal transition-colors duration-300 ${filterState.type === "Remote" ? "bg-violet-normal text-white" : "bg-transparent text-violet-normal"} `}
              onClick={() => {
                {
                  filterState.type === "Physical"
                    ? setFilterState({ ...filterState, type: "" })
                    : setFilterState({ ...filterState, type: "Remote" });
                }
              }}
            >
              <span className="h-fit w-fit rounded-full bg-orange-normal p-2"></span>
              Remote
            </button>
          </div>
        </div>
        {/* Pricing */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-violet-normal">
            Type of Service
          </h2>
          <div className="flex flex-col  gap-2 px-4">
            <p className="text-sm text-violet-normal ">Price range</p>
            <div className="min-w-64 p-4">
              <p className="mb-6 text-center font-bold text-violet-normal">
                ${filterState.pricing.minPrice} - $
                {filterState.pricing.maxPrice}
              </p>
              <ReactSlider
                className="relative h-2 w-full rounded-md bg-[#FE9B07]"
                thumbClassName="absolute h-6 w-6 bg-[#FE9B07] rounded-full cursor-grab transform -translate-y-1/2 top-1/2"
                trackClassName="top-1/2 bg-[#FE9B07]"
                value={[
                  filterState.pricing.minPrice,
                  filterState.pricing.maxPrice,
                ]}
                min={5}
                max={1000}
                step={5}
                onChange={(newValues: number[]) =>
                  setFilterState({
                    ...filterState,
                    pricing: { minPrice: newValues[0], maxPrice: newValues[1] },
                  })
                }
              />
            </div>
            <button
              className={`flex w-fit items-center gap-2 rounded-md px-4 py-2 text-violet-normal transition-colors duration-300 ${filterState.highestToLowest === "true" ? "bg-violet-normal text-white" : "bg-transparent text-violet-normal"} `}
              onClick={() => {
                {
                  filterState.highestToLowest === "true"
                    ? setFilterState({ ...filterState, highestToLowest: "" })
                    : setFilterState({
                        ...filterState,
                        highestToLowest: "true",
                      });
                }
              }}
            >
              <span className="h-fit w-fit rounded-full bg-orange-normal p-2"></span>
              Highest to Lowest
            </button>
            <button
              className={`flex w-fit items-center gap-2 rounded-md px-4 py-2 text-violet-normal transition-colors duration-300 ${filterState.highestToLowest === "false" ? "bg-violet-normal text-white" : "bg-transparent text-violet-normal"} `}
              onClick={() => {
                {
                  filterState.highestToLowest === "false"
                    ? setFilterState({ ...filterState, highestToLowest: "" })
                    : setFilterState({
                        ...filterState,
                        highestToLowest: "false",
                      });
                }
              }}
            >
              <span className="h-fit w-fit rounded-full bg-orange-normal p-2"></span>
              Lowest to Highest
            </button>
          </div>
        </div>
        {/* Others */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-violet-normal">Others</h2>
          <div className="flex flex-col  gap-2 px-4">
            <button
              className={`flex w-fit items-center gap-2 rounded-md px-4 py-2 text-violet-normal transition-colors duration-300 ${filterState.others === "earliest" ? "bg-violet-normal text-white" : "bg-transparent text-violet-normal"} `}
              onClick={() => {
                {
                  filterState.others === "earliest"
                    ? setFilterState({ ...filterState, others: "" })
                    : setFilterState({
                        ...filterState,
                        others: "earliest",
                      });
                }
              }}
            >
              <span className="h-fit w-fit rounded-full bg-orange-normal p-2"></span>
              Earliest
            </button>
            <button
              className={`flex w-fit items-center gap-2 rounded-md px-4 py-2 text-violet-normal transition-colors duration-300 ${filterState.others === "new" ? "bg-violet-normal text-white" : "bg-transparent text-violet-normal"} `}
              onClick={() => {
                {
                  filterState.others === "new"
                    ? setFilterState({ ...filterState, others: "" })
                    : setFilterState({
                        ...filterState,
                        others: "new",
                      });
                }
              }}
            >
              <span className="h-fit w-fit rounded-full bg-orange-normal p-2"></span>
              New & Latest
            </button>
            <button
              className={`flex w-fit items-center gap-2 rounded-md px-4 py-2 text-violet-normal transition-colors duration-300 ${filterState.others === "oldest" ? "bg-violet-normal text-white" : "bg-transparent text-violet-normal"} `}
              onClick={() => {
                {
                  filterState.others === "oldest"
                    ? setFilterState({ ...filterState, others: "" })
                    : setFilterState({
                        ...filterState,
                        others: "oldest",
                      });
                }
              }}
            >
              <span className="h-fit w-fit rounded-full bg-orange-normal p-2"></span>
              Oldest
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="flex w-full items-center  justify-center rounded-full bg-violet-normal px-4 py-2 text-white transition-all duration-300 hover:opacity-90"
            onClick={applyFilter}
          >
            Apply
          </button>
        </div>
      </div>
    </section>
  );
};

export default MobileFilterModal;

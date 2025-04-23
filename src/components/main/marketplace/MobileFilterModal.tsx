"use client";

import { locationData, typeData } from "@/data/marketplace/data";
import React, { Dispatch, SetStateAction } from "react";
import ReactSlider from "react-slider";

interface ModalProp {
  isMobileFilterModalShown: boolean;
  categories?: CategoryType[];
  setIsMobileFilterModalShown: Dispatch<SetStateAction<boolean>>;
  setfilterDataStructure: Dispatch<SetStateAction<FilterDataStructure>>;
  filterDataStructure: FilterDataStructure;
}

const MobileFilterModal = ({
  categories,
  isMobileFilterModalShown,
  setIsMobileFilterModalShown,
  setfilterDataStructure,
  filterDataStructure,
}: ModalProp) => {
  return (
    <section
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 transition-all duration-300 ${isMobileFilterModalShown ? "pointer-events-auto opacity-100 " : " pointer-events-none opacity-0"} `}
    >
      <div
        className="absolute z-0 h-screen w-screen"
        onClick={() => setIsMobileFilterModalShown(false)}
      ></div>
      <div className="small-scrollbar relative z-10 my-4 h-[90vh] w-[90vw] space-y-4 overflow-y-auto rounded-md bg-white p-6 ">
        {/* Availability */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-violet-normal">
            Filter By
          </h2>
        </div>
        {/* Category */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-violet-normal">
            Services
          </h2>
          <div className="flex flex-col  gap-2">
            {categories &&
              categories?.map((item) => (
                <button
                  key={item.id}
                  className={`flex w-fit items-center gap-2 rounded-md px-4 py-2 text-violet-normal transition-colors duration-300 ${filterDataStructure?.category === item.categoryName ? "bg-violet-normal text-white" : "bg-transparent text-violet-normal"} `}
                  onClick={() => {
                    filterDataStructure?.category === item.categoryName
                      ? setfilterDataStructure((prev) => ({
                          ...prev,
                          category: "",
                        }))
                      : setfilterDataStructure((prev) => ({
                          ...prev,
                          category: item.categoryName,
                        }));
                  }}
                >
                  <span className="h-fit w-fit rounded-full bg-orange-normal p-2 "></span>
                  {item.categoryName}
                </button>
              ))}
          </div>
        </div>

        {/* location */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-violet-normal">
            Location
          </h2>
          <div className="flex flex-col  gap-2">
            {locationData.map((item) => (
              <button
                key={item}
                className={`flex w-fit items-center gap-2 rounded-md px-4 py-2 text-violet-normal transition-colors duration-300 ${filterDataStructure?.location === item ? "bg-violet-normal text-white" : "bg-transparent text-violet-normal"} `}
                onClick={() => {
                  filterDataStructure.location === item
                    ? setfilterDataStructure((prev) => ({
                        ...prev,
                        location: "",
                      }))
                    : setfilterDataStructure((prev) => ({
                        ...prev,
                        location: item,
                      }));
                }}
              >
                <span className="h-fit w-fit rounded-full bg-orange-normal p-2 "></span>
                {item}
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
            {typeData.map((item) => (
              <button
                key={item.value}
                className={`flex w-fit items-center gap-2 rounded-md px-4 py-2 text-violet-normal transition-colors duration-300 ${item.label === filterDataStructure?.typeOfServiceDisplay ? "bg-violet-normal text-white" : "bg-transparent text-violet-normal"} `}
                onClick={() => {
                  {
                    filterDataStructure.typeOfServiceDisplay === item.label
                      ? setfilterDataStructure((prev) => ({
                          ...prev,
                          typeOfServiceDisplay: "",
                          typeOfService: "",
                        }))
                      : setfilterDataStructure((prev) => ({
                          ...prev,
                          typeOfServiceDisplay: item.label,
                          typeOfService: item.value,
                        }));
                  }
                }}
              >
                <span className="h-fit w-fit rounded-full bg-orange-normal p-2"></span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        {/* Pricing */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-violet-normal">Pricing</h2>
          <div className="flex flex-col  gap-2 px-4">
            <p className="text-sm text-violet-normal ">Price range</p>
            <div className="min-w-64 p-4">
              <p className="mb-6 text-center font-bold text-violet-normal">
                ${filterDataStructure?.minPrice} - $
                {filterDataStructure?.maxPrice}
              </p>
              <ReactSlider
                className="relative h-2 w-full rounded-md bg-[#FE9B07]"
                thumbClassName="absolute h-6 w-6 bg-[#FE9B07] rounded-full cursor-grab transform -translate-y-1/2 top-1/2"
                trackClassName="top-1/2 bg-[#FE9B07]"
                value={[
                  filterDataStructure?.minPrice,
                  filterDataStructure?.maxPrice,
                ]}
                min={5}
                max={1000}
                step={5}
                onChange={(newValues: number[]) =>
                  setfilterDataStructure((prev) => ({
                    ...prev,
                    minPrice: newValues[0],
                    maxPrice: newValues[1],
                  }))
                }
              />
            </div>
            {/* <input
              type="number"
              className="my-1 w-full rounded-full border border-orange-normal p-3 text-center outline-none "
              max={99999}
              min={5}
              onChange={(event) =>
                setfilterDataStructure((prev) => ({
                  ...prev,
                  minPrice: Number(event.target.value),
                  maxPrice: Number(event.target.value),
                }))
              }
            /> */}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="flex w-full items-center  justify-center rounded-full bg-violet-normal px-4 py-2 text-white transition-all duration-300 hover:opacity-90"
            onClick={() => setIsMobileFilterModalShown(false)}
          >
            Apply
          </button>
        </div>
      </div>
    </section>
  );
};

export default MobileFilterModal;

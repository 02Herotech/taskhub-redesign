"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";

interface ModalProps {
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
  isModalShown: boolean;
  modalData: { pricing: number };
}

const PricingModal = ({ isModalShown, setIsModalShown }: ModalProps) => {
  const [first, setfirst] = useState<Date | null>(new Date());

  return (
    <section
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${isModalShown ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
    >
      <div
        className="absolute inset-0 h-screen w-screen"
        onClick={() => setIsModalShown(false)}
      ></div>
      <form className=" w-[90vw] max-w-lg space-y-6 rounded-xl bg-violet-active p-3 lg:space-y-4 lg:p-6 ">
        <div className="">
          <h1 className="text-3xl font-bold text-violet-dark">Book Task</h1>
          <p className="text-violet-dark">
            Please fill in a little details so you can get a quick response
          </p>
        </div>
        <div className="grid w-full grid-cols-2  items-end justify-end gap-4 ">
          <div className="flex flex-col justify-between space-y-1">
            <label htmlFor="" className="font-medium text-violet-dark">
              Date
            </label>
            <input
              type="date"
              className="w-full  rounded-lg p-3 outline-none"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="" className="font-medium text-violet-dark">
              Time
            </label>
            <input
              type="time"
              className="w-full  rounded-lg p-3 outline-none"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="" className="font-medium text-violet-dark">
              Location
            </label>
            <input
              type="text"
              placeholder="Postcode"
              className="w-full max-w-60 rounded-lg p-3 outline-none"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <input
              placeholder="City/Suburb"
              type="text"
              className="w-full max-w-60 rounded-lg p-3 outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="" className="font-medium text-violet-dark">
            Price
          </label>
          <input
            placeholder="Select/Type you budget"
            type="text"
            className="w-full  rounded-lg p-3 outline-none"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="" className="font-medium text-violet-dark">
            Description
          </label>
          <textarea
            placeholder="Write a little details about why you need the service..."
            className="w-full rounded-lg p-3 outline-none"
          />
        </div>
        <button className="w-full rounded-lg bg-violet-normal p-3 text-white">
          Continue / Send enquiry
        </button>
      </form>
    </section>
  );
};

export default PricingModal;

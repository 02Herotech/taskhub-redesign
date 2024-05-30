import React, { Dispatch, SetStateAction } from "react";
import { BiXCircle } from "react-icons/bi";

interface ModalPropType {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Invoice = ({ isModalOpen, setIsModalOpen }: ModalPropType) => {
  return (
    <section
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${isModalOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
    >
      <form className=" relative w-[90vw] max-w-xl  space-y-6 rounded-xl bg-white p-3 py-10 lg:p-6">
        <div>
          <h1 className="font-clashBold text-3xl font-extrabold text-violet-dark">
            Paid Invoice
          </h1>
          <p className="text-sm text-slate-500 ">Plumber Needed</p>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex-grow rounded-lg bg-violet-light p-4 py-2 font-bold ">
            <span className="text-[#716F78]">Amount</span>
            <div className="flex w-full items-center gap-1">
              <p>$</p>
              <input
                type="text"
                className="w-full bg-violet-light outline-none"
              />
            </div>
          </label>
          <label className="flex-grow rounded-lg bg-violet-light p-4 py-2 font-bold ">
            <span className="text-[#716F78]">Start Date</span>
            <p>3 Days Ago</p>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-5 rounded-lg bg-violet-active p-3 py-8 text-violet-normal">
          <div className="space-y-5">
            <div>
              <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                2024-05-15
              </p>
              <p className="text-slate-600 ">Issued On</p>
            </div>
            <div>
              <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                Bill From
              </p>
              <p>John Doe</p>
            </div>
            <div>
              <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                $48
              </p>
              <p>GST @10%</p>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                2024-05-15
              </p>
              <p>Due On</p>
            </div>
            <div>
              <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                Bill To
              </p>
              <p className=" ">John Doe</p>
            </div>
            <div>
              <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                Service Charge
              </p>
              <p>10</p>
            </div>
            <div>
              <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                Total
              </p>
              <p>10</p>
            </div>
          </div>
        </div>
        <button
          className="absolute right-4 top-4"
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <BiXCircle className="size-8 text-violet-normal" />
        </button>
        <div className="flex gap-2">
          <button className="rounded-full bg-violet-normal px-4 py-2 font-medium text-white">
            Done
          </button>
          <button className=" rounded-full px-4 py-2 font-medium text-violet-normal">
            Back
          </button>
        </div>
      </form>
    </section>
  );
};

export default Invoice;

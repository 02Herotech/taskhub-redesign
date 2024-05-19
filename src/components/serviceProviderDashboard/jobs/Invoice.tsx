import React, { Dispatch, SetStateAction } from "react";
import { BiXCircle } from "react-icons/bi";

interface ModalPropType {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Invoice = ({ isModalOpen, setIsModalOpen }: ModalPropType) => {
  return (
    <section
      className={`fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${isModalOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
    >
      <form className=" relative w-[90vw] max-w-xl  space-y-6 rounded-xl bg-white p-3 py-10 lg:p-6">
        <div>
          <h1 className="font-clashDisplay text-3xl font-extralight text-violet-dark">
            Invoice
          </h1>
          <p className="text-sm text-slate-500 ">Plumber Needed</p>
        </div>

        <div>
          <input
            type="text"
            className="w-full rounded-xl bg-violet-light p-3"
          />
        </div>
        <div className="bg-violet-active grid grid-cols-2 gap-5 rounded-lg p-3 py-8 text-violet-normal">
          <div className="space-y-5">
            <div>
              <p className=" font-bold text-violet-dark  ">2024-05-15</p>
              <p className="text-slate-600">Issued On</p>
            </div>
            <div>
              <p className=" font-bold text-violet-dark  ">Bill From</p>
              <p>John Doe</p>
            </div>
            <div>
              <p className=" font-bold text-violet-dark  ">$48</p>
              <p>GST @10%</p>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <p className=" font-bold text-violet-dark  ">2024-05-15</p>
              <p>Issued On</p>
            </div>
            <div>
              <p className="text-lg font-bold text-violet-dark  ">Bill From</p>
              <p className=" ">John Doe</p>
            </div>
            <div>
              <p className=" font-bold text-violet-dark  ">$48</p>
              <p>GST @10%</p>
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

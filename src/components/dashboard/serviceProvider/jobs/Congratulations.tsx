"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface ModalData {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  showCongratulations: boolean;
  setShowCongratulations: Dispatch<SetStateAction<boolean>>;
}

const Congratulations = ({
  setIsModalOpen,
  showCongratulations,
  setShowCongratulations,
}: ModalData) => {
  const handleShowInvoice = () => {
    setShowCongratulations(false);
    setIsModalOpen(true);
  };
  return (
    <section
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 transition-all duration-300 ${showCongratulations ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
    >
      <div
        className="absolute left-0 top-0 z-0 h-screen w-screen"
        onClick={() => setShowCongratulations(false)}
      ></div>
      <div className="relative z-10 flex max-w-md flex-col items-center justify-center gap-4 rounded-lg bg-violet-light p-5 ">
        <div className="size-10 rounded-full bg-violet-darker p-2">
          <Image
            src={"/assets/images/serviceProvider/jobs/checkicon.png"}
            alt="checkicon"
            width={80}
            height={80}
            className="h-full w-full"
          />
        </div>
        <h2 className="font-satoshiBold text-2xl font-bold text-violet-normal">
          Task Accepted
        </h2>
        <p className="text-center">
          Great! You have accepted this customer’s task. please click on
          generate invoice to send the invoice to the customer
        </p>
        <div className="flex  items-center justify-center gap-10">
          <button
            onClick={() => setShowCongratulations(false)}
            className="rounded-full bg-violet-active px-4 py-2 font-semibold text-violet-normal transition-opacity duration-300 hover:opacity-90"
          >
            Cancel
          </button>
          <button
            onClick={handleShowInvoice}
            className="rounded-full bg-violet-normal px-4 py-2 font-semibold text-white transition-opacity duration-300 hover:opacity-90"
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </section>
  );
};

export default Congratulations;

"use client";

import { notificationData } from "@/app/data/service-provider/notification";
import Button from "@/components/global/Button";
import Popup from "@/components/global/Popup";
import Image from "next/image";
import React, { useState } from "react";

const ServiceNotification = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [invoicePopup, setInvoicePopup] = useState(false);

  const handleChangeCategory = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <>
      {invoicePopup && (
        <Popup isOpen={invoicePopup} onClose={() => setInvoicePopup(false)}>
          <div className="relative min-h-[200px] rounded-2xl bg-[#EBE9F4] p-5 font-satoshi lg:w-[577px] lg:p-10">
            <h3 className="font-clashSemiBold text-3xl text-[#060D1F]">
              Paid Invoice
            </h3>
          </div>
        </Popup>
      )}
      <main className="mt-20 space-y-8 p-4 lg:p-8">
        <div className="mb-8 mt-14 space-y-8">
          <h4 className="font-satoshiBold text-3xl font-bold text-[#140B31] lg:text-5xl">
            My Notifications
          </h4>
          <div className="border-2 border-primary" />
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            className={`min-w-20 rounded-md  px-4 py-2 transition-all duration-300 hover:opacity-90 ${currentCategory === "All" ? "bg-violet-normal text-white" : "bg-violet-light text-violet-normal hover:bg-violet-200 "} `}
            onClick={() => handleChangeCategory("All")}
          >
            All
          </button>
          <button
            className={`min-w-20 rounded-md  px-4 py-2 transition-all duration-300 hover:opacity-90 ${currentCategory === "Recent" ? "bg-violet-normal text-white" : "bg-violet-light text-violet-normal hover:bg-violet-200 "} `}
            onClick={() => handleChangeCategory("Recent")}
          >
            Recent
          </button>
          <button
            className={`min-w-20 rounded-md  px-4 py-2 transition-all duration-300 hover:opacity-90 ${currentCategory === "Old" ? "bg-violet-normal text-white" : "bg-violet-light text-violet-normal hover:bg-violet-200 "} `}
            onClick={() => handleChangeCategory("Old")}
          >
            Old
          </button>
        </div>

        <div className="flex flex-col gap-8 pb-4 ">
          {notificationData.map((item, index) => (
            <div
              key={index}
              className="pointer-events-auto flex w-full flex-1 cursor-pointer items-center justify-between transition-shadow duration-300"
            >
              <div className="flex items-center justify-between gap-x-3 py-2">
                <Image
                  src={item.image || "/assets/images/placeholder.jpeg"}
                  alt={item.jobLabel}
                  width={100}
                  height={100}
                  className="size-16 rounded-full"
                />
                <div>
                  <p className="cursor-pointer font-bold text-violet-normal">
                    {item.description}
                  </p>
                  <p className="cursor-pointer text-sm text-slate-500">
                    {item.jobLabel}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="col-span-3 cursor-pointer text-sm text-slate-500">
                  {item.time}
                </p>
                {item.type === "Invoice" && (
                  <Button
                    className="rounded-full"
                    size="sm"
                    onClick={() => setInvoicePopup(true)}
                  >
                    View Invoice
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default ServiceNotification;

"use client";
import { notificationData } from "@/app/data/service-provider/notification";
import Image from "next/image";
import React, { useState } from "react";

const ServiceNotification = () => {
  const [currentCategory, setCurrentCategory] = useState("All");

  const handleChangeCategory = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <main className="space-y-8 p-4 lg:p-8 mt-20">
      <div className="mt-14 mb-8 space-y-8">
        <h4 className='text-[#140B31] font-satoshiBold font-bold text-3xl lg:text-5xl'>My Notifications</h4>
        <div className='border-2 border-primary' />
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
            className="pointer-events-auto grid w-full cursor-pointer grid-cols-12 items-center gap-4 transition-shadow duration-300"
          >
            <div className="col-span-9 flex items-center gap-2">
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
            <p className="col-span-3 cursor-pointer text-sm text-slate-500">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ServiceNotification;
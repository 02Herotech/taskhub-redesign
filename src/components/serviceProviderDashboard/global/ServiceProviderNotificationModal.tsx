import { notificationData } from "@/app/data/service-provider/notification";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { BiXCircle } from "react-icons/bi";
import { BsTriangle, BsTriangleFill } from "react-icons/bs";

interface ModalPropsType {
  setIsNotificationOpen: Dispatch<SetStateAction<boolean>>;
  isNotificationOpen: boolean;
}

const ServiceProviderNotificationModal = ({
  isNotificationOpen,
  setIsNotificationOpen,
}: ModalPropsType) => {
  return (
    <div>
      <div
        className={`fixed inset-0 h-screen w-screen  ${isNotificationOpen ? "pointer-events-auto inline-block" : "pointer-events-none hidden "} `}
        onClick={() => setIsNotificationOpen((prev) => !prev)}
      ></div>
      <section
        className={`absolute right-[calc(100%-3rem)] top-[calc(100%+0.5rem)] w-[80vw] max-w-sm rounded-lg bg-violet-light p-3 opacity-0 transition-all duration-300 max-sm:right-[calc(100%-6rem)] ${isNotificationOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"} `}
      >
        <h2 className="pb-4 text-2xl font-bold text-violet-normal">
          Notification
        </h2>
        <div className="flex h-screen max-h-80 flex-col gap-4 overflow-y-auto pb-4 ">
          {notificationData.length > 0 ? (
            notificationData.map((item, index) => (
              <Link
                href="/service-provider/dashboard/notification"
                key={index}
                className="grid w-full cursor-pointer grid-cols-12 gap-4 transition-shadow duration-300 hover:shadow-md"
                onClick={() => setIsNotificationOpen((prev) => !prev)}
              >
                <div className="col-span-9 flex gap-2">
                  <Image
                    src={item.image}
                    alt={item.jobLabel}
                    width={40}
                    height={40}
                    className="size-8 rounded-full"
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
              </Link>
            ))
          ) : (
            <div className="no-scrollbar flex min-h-20 items-center justify-center">
              <h2 className="text-violet-normal">No current Notification</h2>
            </div>
          )}
        </div>
        <button
          className="absolute right-4 top-4"
          onClick={() => setIsNotificationOpen((prev) => !prev)}
        >
          <BiXCircle className="size-6 text-violet-normal " />
        </button>
        <span className="absolute -top-4 right-4 max-sm:hidden">
          <BsTriangleFill className="size-6 text-violet-light" />
        </span>
      </section>
    </div>
  );
};

export default ServiceProviderNotificationModal;

"use client";
import {
  formatDateFromNumberArrayToRelativeDate,
  formatRelativeDate,
} from "@/utils";
import Image from "next/image";
import React, { useState } from "react";

interface AcceptedServicesPropsType {
  setModalData: React.Dispatch<React.SetStateAction<ModalDataType>>;
  jobs: JobsType[];
  handleReportservice: (id: number) => Promise<void>;
  customerDetails: UserProfileTypes[] | null | undefined;
  allBookings: BookingType[];
}

const InspectionServices = ({
  setModalData,
  jobs,
  handleReportservice,
  allBookings,

  customerDetails,
}: AcceptedServicesPropsType) => {
  return (
    <div className="flex flex-col gap-8  pb-4">
      {jobs
        .filter((job) => job.jobStatus === "INSPECTION")
        .map((item, index) => {
          if (!allBookings) return;

          const customer = allBookings.find(
            (booking) => booking.id === item.bookingId,
          );

          return (
            <div
              key={index}
              className=" flex gap-3 border-b border-slate-200  lg:grid lg:grid-cols-12 lg:items-center lg:px-8 lg:py-4"
            >
              <div className="col-span-2 size-16 flex-shrink-0 overflow-hidden rounded-full border border-violet-normal lg:size-24">
                <Image
                  src={
                    customer?.customer.user.profileImage ??
                    "/assets/images/serviceProvider/user.jpg"
                  }
                  alt={customer?.customer.user.fullName ?? ""}
                  width={200}
                  height={200}
                  quality={100}
                  className="h-full w-full object-cover "
                />
              </div>
              <div className="col-span-10 w-full space-y-4">
                <div className="flex flex-wrap justify-between gap-2 ">
                  <div>
                    <p className="text-lg font-semibold text-violet-normal ">
                      {formatRelativeDate(item.jobEnd) || ""}
                    </p>
                    <p className="text-violet-normal">{item.jobTitle}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-orange-normal first-letter:uppercase">
                      <p>
                        {formatDateFromNumberArrayToRelativeDate(item.jobEnd) ||
                          ""}
                      </p>
                    </p>
                    <p className=" font-bold text-[#28272A]">
                      Total Cost ${item.total}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-3">
                    {/* <Link
                  href={"/service-provider/jobs/" + item.id}
                  className="rounded-full border border-violet-normal bg-violet-light px-6 py-3 text-sm font-medium text-violet-normal transition-colors duration-300 hover:bg-violet-200 max-md:px-4 max-md:py-2 max-md:text-sm "
                >
                  View Enquiry
                </Link> */}
                    {/* <button
                      onClick={() => handleCompleteService(item.id)}
                      className="rounded-full bg-violet-normal px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:px-4 max-md:py-2 max-md:text-sm"
                    >
                      Complete
                    </button> */}
                  </div>

                  <button
                    className="rounded-full  px-4 py-2 text-xl font-bold text-red-500 transition-colors duration-300 hover:bg-red-100 max-md:px-3 max-md:py-1 max-md:text-xs "
                    onClick={() => handleReportservice(item.id)}
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default InspectionServices;

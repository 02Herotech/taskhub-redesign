"use client";
import { RootState } from "@/store";
import { formatDateFromNumberArrayToRelativeDate } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import JobCard from "../jobs/JobCard";

interface AcceptedServicesPropsType {
  setModalData: React.Dispatch<React.SetStateAction<ModalDataType>>;
  acceptedBookingData: BookingType[];
  handleReportservice: (id: number) => Promise<void>;
}

const AcceptedServices = ({
  setModalData,
  acceptedBookingData,
  handleReportservice,
}: AcceptedServicesPropsType) => {
  const [startJobState, setStartJobState] = useState({
    id: 0,
    loading: false,
  });

  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const handleStartService = async (id: number) => {
    try {
      setStartJobState((prev) => ({ ...prev, loading: true, id }));
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/booking/start-task?jobId=" +
        id;
      const body = { jobId: id };
      const { data } = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModalData((prev) => ({
        ...prev,
        isModalShown: true,
        message: data.message,
        isStartService: true,
      }));
    } catch (error: any) {
      console.log(error.response.data);
      setModalData((prev) => ({
        ...prev,
        isModalShown: true,
        isStartService: true,
        message: "Customer has not paid for this service!!!",
      }));
    } finally {
      setStartJobState((prev) => ({ ...prev, loading: false, id: 0 }));
    }
  };

  return (
    <div className="flex flex-col gap-8  pb-4">
      {acceptedBookingData.map((item, index) => (
        <div key={index}>
          <JobCard
            imageUrl={item?.customer?.user?.profileImage}
            fullName={item?.customer?.user?.fullName}
            itemId={item.id}
            viewJob={true}
            title={item.bookingTitle}
            startDate={item.startDate}
            price={item.price}
          />
          {/* <div
            key={index}
            className=" flex gap-3 border-b border-slate-200  lg:grid lg:grid-cols-12 lg:items-center lg:px-8 lg:py-4"
          >
            <div className="col-span-2 size-16 flex-shrink-0 overflow-hidden rounded-full border border-violet-normal lg:size-24">
              <Image
                src={
                  item?.customer?.user?.profileImage ??
                  "/assets/images/serviceProvider/user.jpg"
                }
                alt={item?.customer?.user?.fullName}
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
                    {item?.customer?.user?.fullName}
                  </p>
                  <p className="text-violet-normal">{item.bookingTitle}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-bold text-orange-normal first-letter:uppercase">
                    <p>
                      {formatDateFromNumberArrayToRelativeDate(item.startDate)}
                    </p>
                  </p>
                  <p className=" font-bold text-[#28272A]">
                    Total Cost ${item.price}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center">
                <Link
                  href={"/service-provider/jobs/" + item.id}
                  className="mb-2 rounded-full border border-violet-normal bg-violet-light px-6 py-3 text-center text-sm font-medium text-violet-normal transition-colors duration-300 hover:bg-violet-200 max-md:w-full  max-md:text-xs "
                >
                  View Enquiry
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default AcceptedServices;

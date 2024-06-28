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

interface AcceptedServicesPropsType {
  setModalData: React.Dispatch<React.SetStateAction<ModalDataType>>;
  jobs: JobsType[];
  handleReportservice: (id: number) => Promise<void>;
  customerDetails: UserProfileTypes[] | null | undefined;
}

const PaidServices = ({
  setModalData,
  jobs,
  handleReportservice,
  customerDetails,
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
      {jobs
        .filter((job) => job.jobStatus === "PENDING")
        .map((item, index) => {
          if (!customerDetails) return;

          const customer = customerDetails.find(
            (customer) => customer.id === item.customerId,
          );

          return (
            <div
              key={index}
              className=" flex gap-3 border-b border-slate-200  lg:grid lg:grid-cols-12 lg:items-center lg:px-8 lg:py-4"
            >
              <div className="col-span-2 size-16 flex-shrink-0 overflow-hidden rounded-full border border-violet-normal lg:size-24">
                <Image
                  src={
                    customer?.profileImage ??
                    "/assets/images/serviceProvider/user.jpg"
                  }
                  alt={customer?.firstName ?? ""}
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
                      {customer?.firstName} {customer?.lastName}
                    </p>
                    <p className="text-violet-normal">{item.jobTitle}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-orange-normal first-letter:uppercase">
                      <p>
                        {/* {formatDateFromNumberArrayToRelativeDate(item.jobStart)} */}
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
                    <button
                      onClick={() => handleStartService(item.id)}
                      disabled={startJobState.loading}
                      className="rounded-full border border-violet-normal bg-violet-normal px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:px-3 max-md:py-1 max-md:text-xs"
                    >
                      {startJobState.loading && startJobState.id === item.id ? (
                        <BeatLoader
                          loading={
                            startJobState.loading &&
                            startJobState.id === item.id
                          }
                          color="white"
                          size={20}
                        />
                      ) : (
                        "Start Service"
                      )}
                    </button>
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

export default PaidServices;

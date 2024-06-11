"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiCalendarWeek, BiCheck } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { CiClock1 } from "react-icons/ci";
import Link from "next/link";
import AllServices from "@/components/dashboard/serviceProvider/services/AllServices";
import { useSession } from "next-auth/react";
import axios from "axios";
import { formatDateFromNumberArrayToRelativeDate } from "@/utils";
import { BeatLoader } from "react-spinners";
import OngoingServiceModal from "@/components/dashboard/serviceProvider/services/OngoingServiceModal";

const ServicesPage = () => {
  const [currentCategory, setCurrentCategory] = useState("services");
  const [ongoingBookingData, setOngoingBookingData] = useState<BookingType[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [startJobState, setStartJobState] = useState({
    id: 0,
    loading: false,
  });

  const [modalData, setModalData] = useState<ModalDataType>({
    isModalShown: false,
    message: "",
    isStartService: false,
    isCompleteService: false,
    isReportService: false,
    error: "",
  });

  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const fetchOngoingBookings = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/booking/service-provider";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: BookingType[] = response.data;
      const filteredData = data.filter(
        (item) =>
          item.bookingStage !== "PROPOSED" && item.bookingStage !== "REJECTED",
      );
      setOngoingBookingData(filteredData);
    } catch (error) {
      console.error("An error occurred while fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOngoingBookings();
    // eslint-disable-next-line
  }, [token]);

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
  const handleCompleteService = async (id: number) => {
    setModalData((prev) => ({
      ...prev,
      isModalShown: true,
      message: id,
      isCompleteService: true,
    }));
  };
  const handleReportervice = async (id: number) => {
    setModalData((prev) => ({
      ...prev,
      isModalShown: true,
      message: id,
      isReportService: true,
    }));
  };

  return (
    <main className=" relative space-y-8 p-4 lg:p-8">
      <OngoingServiceModal modalData={modalData} setModalData={setModalData} />
      <div className="flex flex-wrap gap-2 lg:gap-6">
        <button
          className={` rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:opacity-90 max-md:text-sm lg:px-8 lg:py-3 ${currentCategory === "services" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("services")}
        >
          My Services
        </button>
        <button
          className={` rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:opacity-90 lg:px-8 lg:py-3 ${currentCategory === "ongoing" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("ongoing")}
        >
          My Ongoing Services
        </button>
        <button
          className={` rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:opacity-90 lg:px-8 lg:py-3 ${currentCategory === "completed" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("completed")}
        >
          My Completed Services
        </button>
      </div>
      {currentCategory === "services" ? (
        <AllServices />
      ) : currentCategory === "ongoing" ? (
        <div className="flex flex-col gap-8  pb-4">
          {ongoingBookingData.map((item, index) => (
            <div
              key={index}
              className=" flex gap-3 border-b border-slate-200 p-4 lg:grid lg:grid-cols-12 lg:items-center lg:px-8 lg:py-4"
            >
              <div className="col-span-2 size-20 flex-shrink-0 overflow-hidden rounded-full border border-violet-normal lg:size-24">
                <Image
                  src={
                    item?.user?.profileImage ??
                    "/assets/images/serviceProvider/user.jpg"
                  }
                  alt={item?.user.fullName}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover "
                />
              </div>
              <div className="col-span-10 w-full space-y-4">
                <div className="flex flex-wrap justify-between gap-2 ">
                  <div>
                    <p className="text-lg font-semibold text-violet-normal ">
                      {item.user.fullName}
                    </p>
                    <p className="text-violet-normal">{item.bookingTitle}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-orange-normal">
                      <p>
                        {formatDateFromNumberArrayToRelativeDate(
                          item.startDate,
                        )}
                      </p>
                    </p>
                    <p className=" font-bold text-[#28272A]">
                      Total Cost ${item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={"/service-provider/jobs/" + item.id}
                      className="rounded-full border border-violet-normal bg-violet-light px-6 py-3 text-sm font-medium text-violet-normal transition-colors duration-300 hover:bg-violet-200 max-md:px-4 max-md:py-2 max-md:text-sm "
                    >
                      View Enquiry
                    </Link>
                    <button
                      onClick={() => handleStartService(item.id)}
                      disabled={startJobState.loading}
                      className="rounded-full bg-violet-normal px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:px-4 max-md:py-2 max-md:text-sm"
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
                    className="rounded-full  px-4 py-2 text-xl font-bold text-red-500 transition-colors duration-300 hover:bg-red-100 "
                    onClick={() => handleReportervice(item.id)}
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8  pb-4">
          <article className="round-md w-fit flex-grow-0 space-y-2 rounded-lg bg-violet-light p-4">
            <div className="flex justify-between gap-16 py-2">
              <h2 className="text-3xl font-bold text-violet-normal">
                Babysitting
              </h2>
              <span className="flex items-center gap-2 rounded-full border border-green-500 bg-green-100 px-3 py-[1px] text-xs text-green-500">
                <BiCheck />
                Done
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-slate-700">
                <HiLocationMarker /> Brisbane
              </span>
              <span className="flex items-center gap-2 text-slate-700 ">
                Midday <CiClock1 />
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-slate-700">
                <BiCalendarWeek /> On Sat, June 8th
              </span>
              <span className="text-xl font-bold text-violet-normal">$200</span>
            </div>
          </article>
        </div>
      )}
    </main>
  );
};

export default ServicesPage;

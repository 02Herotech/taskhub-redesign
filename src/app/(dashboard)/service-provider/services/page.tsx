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
import AcceptedServices from "@/components/dashboard/serviceProvider/services/AcceptedServices";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import PaidServices from "@/components/dashboard/serviceProvider/services/PaidServices";
import OngoingServies from "@/components/dashboard/serviceProvider/services/OngoingServices";
import CompletedServices from "@/components/dashboard/serviceProvider/services/CompletedServices";

const ServicesPage = () => {
  const [currentCategory, setCurrentCategory] = useState("services");
  const [ongoingBookingData, setOngoingBookingData] = useState<BookingType[]>(
    [],
  );
  const [acceptedBookingData, setAcceptedBookingData] = useState<BookingType[]>(
    [],
  );
  const [jobs, setJobs] = useState<JobsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<
    UserProfileTypes[] | null
  >();

  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );

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

  const fetchBookings = async () => {
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
      const filteredAcceptedData = data.filter(
        (item) => item.bookingStage === "ACCEPTED",
      );

      const filteredOngoingData = data.filter(
        (item) =>
          item.bookingStage === "PAID" || item.bookingStage === "STARTED",
      );
      setOngoingBookingData(filteredOngoingData);
      setAcceptedBookingData(filteredAcceptedData);
    } catch (error) {
      console.error("An error occurred while fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/booking/job/service-provider/" +
        user?.serviceProviderId;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setJobs(data);
    } catch (error: any) {
      console.error(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerDetails = async () => {
    try {
      setLoading(true);
      const promises = jobs.map(async (job) => {
        const url =
          "https://smp.jacinthsolutions.com.au/api/v1/user/user-profile/1";
        const { data } = await axios.get(url);
        return data;
      });
      const customerArray = await Promise.all(promises);
      setCustomerDetails(customerArray);
    } catch (error: any) {
      console.error(error.response?.data || error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
    fetchJobs();
    // eslint-disable-next-line
  }, [token, user]);

  useEffect(() => {
    if (jobs) {
      fetchCustomerDetails();
    }
  }, [jobs]);

  const handleReportService = async (id: number) => {
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
          className={` rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 max-md:text-sm lg:px-8 lg:py-3 ${currentCategory === "services" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("services")}
        >
          My Services
        </button>
        <button
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 lg:px-8 lg:py-3 ${currentCategory === "accepted" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("accepted")}
        >
          Accepted
        </button>
        <button
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 lg:px-8 lg:py-3 ${currentCategory === "paid" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("paid")}
        >
          Paid
        </button>
        <button
          className={` rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 lg:px-8 lg:py-3 ${currentCategory === "ongoing" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={` rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 lg:px-8 lg:py-3 ${currentCategory === "completed" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("completed")}
        >
          Completed
        </button>
      </div>
      {currentCategory === "services" ? (
        <AllServices />
      ) : currentCategory === "accepted" ? (
        <AcceptedServices
          setModalData={setModalData}
          acceptedBookingData={acceptedBookingData}
          handleReportservice={handleReportService}
        />
      ) : currentCategory === "paid" ? (
        <PaidServices
          jobs={jobs}
          setModalData={setModalData}
          customerDetails={customerDetails}
          handleReportservice={handleReportService}
        />
      ) : currentCategory === "ongoing" ? (
        <OngoingServies
          jobs={jobs}
          setModalData={setModalData}
          customerDetails={customerDetails}
          handleReportservice={handleReportService}
        />
      ) : (
        <CompletedServices />
      )}
    </main>
  );
};

export default ServicesPage;

//  onClick={() => handleCompleteService(item.id)}

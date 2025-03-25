"use client";
import React, { useEffect, useState } from "react";
import AllServices from "@/components/dashboard/serviceProvider/services/AllServices";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import PaidServices from "@/components/dashboard/serviceProvider/services/PaidServices";
import OngoingServies from "@/components/dashboard/serviceProvider/services/OngoingServices";
import CompletedServices from "@/components/dashboard/serviceProvider/services/CompletedServices";
import InspectionServices from "@/components/dashboard/serviceProvider/services/Inspection";
import OngoingServiceModal from "@/components/dashboard/serviceProvider/services/OngoingServiceModal";
import AcceptedServices from "@/components/dashboard/serviceProvider/services/AcceptedServices";
import useAxios from "@/hooks/useAxios";

const ServicesPage = () => {
  const [currentCategory, setCurrentCategory] = useState("services");
  const [acceptedBookingData, setAcceptedBookingData] = useState<BookingType[]>(
    [],
  );
  const [allBookings, setAllBookings] = useState<BookingType[]>([]);
  const [jobs, setJobs] = useState<JobsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
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
  const authInstance = useAxios()

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await authInstance.get("booking/service-provider");
      const data: BookingType[] = response.data;
      setAllBookings(data);
      const filteredAcceptedData = data.filter(
        (item) => item.bookingStage === "ACCEPTED",
      );
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
      const url = `booking/job/service-provider/` + user?.serviceProviderId;
      const { data } = await authInstance.get(url);
      setJobs(data);
    } catch (error: any) {
      console.error(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handlefetches = async () => {
      await fetchBookings();
      await fetchJobs();
    };

    handlefetches();
    // eslint-disable-next-line
  }, [user, refresh]);

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
      <OngoingServiceModal
        modalData={modalData}
        setModalData={setModalData}
        setRefresh={setRefresh}
      />
      <div className="flex gap-2 overflow-auto py-2 lg:flex-wrap lg:gap-6">
        <button
          className={` flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 max-md:text-sm lg:px-8 lg:py-3 ${currentCategory === "services" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("services")}
        >
          My Services
        </button>
        <button
          className={`flex-shrink-0  rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 lg:px-8 lg:py-3 ${currentCategory === "accepted" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("accepted")}
        >
          Accepted
        </button>
        <button
          className={`flex-shrink-0  rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 lg:px-8 lg:py-3 ${currentCategory === "paid" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("paid")}
        >
          Paid
        </button>
        <button
          className={`flex-shrink-0  rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 lg:px-8 lg:py-3 ${currentCategory === "ongoing" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={`flex-shrink-0  rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 lg:px-8 lg:py-3 ${currentCategory === "inspection" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("inspection")}
        >
          On inspection
        </button>
        <button
          className={`flex-shrink-0  rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 lg:px-8 lg:py-3 ${currentCategory === "completed" ? "bg-[#381F8C] text-white" : "bg-[#E1DDEE] text-[#381F8C] "} `}
          onClick={() => setCurrentCategory("completed")}
        >
          Completed
        </button>
      </div>
      {currentCategory === "services" ? (
        <AllServices />
      ) : currentCategory === "accepted" && jobs ? (
        <AcceptedServices acceptedBookingData={acceptedBookingData} />
      ) : currentCategory === "paid" && jobs ? (
        <PaidServices
          jobs={jobs}
          setModalData={setModalData}
          allBookings={allBookings}
          handleReportService={handleReportService}
          loading={loading}
          setRefresh={setRefresh}
        />
      ) : currentCategory === "ongoing" && jobs ? (
        <OngoingServies
          jobs={jobs}
          allBookings={allBookings}
          setModalData={setModalData}
          handleReportservice={handleReportService}
        />
      ) : currentCategory === "inspection" && jobs ? (
        <InspectionServices
          jobs={jobs}
          allBookings={allBookings}
          handleReportservice={handleReportService}
        />
      ) : (
        jobs && <CompletedServices jobs={jobs} allBookings={allBookings} />
      )}
    </main>
  );
};

export default ServicesPage;

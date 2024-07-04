"use client";
import React from "react";
import JobCard from "../jobs/JobCard";

interface AcceptedServicesPropsType {
  setModalData: React.Dispatch<React.SetStateAction<ModalDataType>>;
  jobs: JobsType[];
  handleReportservice: (id: number) => Promise<void>;
  allBookings: BookingType[];
}

const OngoingServies = ({
  setModalData,
  jobs,
  handleReportservice,
  allBookings,
}: AcceptedServicesPropsType) => {
  const handleCompleteService = async (id: number) => {
    setModalData((prev) => ({
      ...prev,
      isModalShown: true,
      message: id,
      isCompleteService: true,
    }));
  };

  return (
    <div className="flex flex-col gap-8  pb-4">
      {jobs
        .filter((job) => job.jobStatus === "IN_PROGRESS")
        .map((item, index) => {
          if (!allBookings) return;
          const customer = allBookings.find(
            (booking) => booking.id === item.bookingId,
          );
          return (
            <JobCard
              key={index}
              imageUrl={customer?.customer.user.profileImage as string}
              fullName={customer?.customer.user.fullName as string}
              itemId={item.id}
              title={item.jobTitle}
              startDate={item.jobEnd}
              completeJob={() => handleCompleteService(item.id)}
              reportJob={() => handleReportservice(item.id)}
              price={item.total}
            />
          );
        })}
    </div>
  );
};

export default OngoingServies;

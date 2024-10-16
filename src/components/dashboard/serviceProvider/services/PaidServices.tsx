"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import JobCard from "../jobs/JobCard";
import axios from "axios";
import Loading from "@/shared/loading";

interface PaidServicesPropsType {
  setModalData: React.Dispatch<React.SetStateAction<ModalDataType>>;
  jobs: JobsType[];
  allBookings: BookingType[];
  handleReportService: (id: number) => Promise<void>;
  loading: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaidServices = ({
  setModalData,
  jobs,
  allBookings,
  handleReportService,
  loading,
  setRefresh,
}: PaidServicesPropsType) => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/booking/start-task?jobId=` +
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
      setRefresh((prev) => !prev);
    } catch (error: any) {
      console.log(error.response.data);
      setModalData((prev) => ({
        ...prev,
        isModalShown: true,
        isStartService: true,
        message:
          error.response?.data?.message ??
          "Customer has not paid for this service!!!",
      }));
    } finally {
      setStartJobState((prev) => ({ ...prev, loading: false, id: 0 }));
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex min-h-80 items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col gap-8  pb-4">
          {jobs
            .filter((job) => job.jobStatus === "PENDING")
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
                  startDate={item.jobStart}
                  startJob={() => handleStartService(item.id)}
                  reportJob={() => handleReportService(item.id)}
                  price={item.total}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default PaidServices;

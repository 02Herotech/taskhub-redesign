"use client";
import JobCard from "@/components/dashboard/serviceProvider/jobs/JobCard";
import { marketPlaceModalIcon } from "@/lib/svgIcons";
import Loading from "@/shared/loading";
import React, { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";

const Jobs = () => {
  const [bookingData, setBookingData] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);
  const authInstance = useAxios()

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const response = await authInstance.get("booking/service-provider");
      const data: BookingType[] = response.data;
      const filteredData = data.filter(
        (item) => item.bookingStage === "PROPOSED",
      );
      setBookingData(filteredData);
    } catch (error) {
      console.error("An error occurred while fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <main className="space-y-8 p-4 lg:p-8">
        {loading ? (
          <div className="flex min-h-96 items-center justify-center">
            <Loading />
          </div>
        ) : (
          <section className="mx-auto max-w-screen-lg space-y-3 ">
            {bookingData.length === 0 ? (
              <div className="flex min-h-96 w-full flex-col items-center justify-center gap-4 p-4 ">
                <span className="size-64">{marketPlaceModalIcon}</span>
                <p className="text-xl font-medium text-violet-normal">
                  No active Listing
                </p>
              </div>
            ) : (
              bookingData.map((item, index) => (
                <div key={index}>
                  <JobCard
                    imageUrl={item?.customer?.user?.profileImage}
                    fullName={item?.customer?.user?.fullName}
                    itemId={item.id}
                    viewJob={true}
                    title={item.bookingTitle}
                    startDate={item.startDate}
                    price={item.price}
                    sendMessage={{
                      recipientId: item.customer.user.id.toString(),
                      recipientName: item.customer.user.fullName,
                      message: "Chat With Customer",
                      className: "max-md:w-full",
                    }}
                  />
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </>
  );
};

export default Jobs;

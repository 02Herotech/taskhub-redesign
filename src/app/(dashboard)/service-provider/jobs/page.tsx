"use client";

import { marketPlaceModalIcon } from "@/lib/svgIcons";
import Loading from "@/shared/loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Jobs = () => {
  const [bookingData, setBookingData] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const fetchAllBookings = async () => {
    if (!token) {
      console.error("No token available");
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching all bookings");
      console.log(token);
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/booking/service-provider";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetch completed");
      const data = response.data;
      setBookingData(data);
    } catch (error) {
      console.error("An error occurred while fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
    // eslint-disable-next-line
  }, [token]);

  const truncateText = (text: string) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= 5) return text;
    return words.slice(0, 5).join(" ") + " ...";
  };

  const handleFetchSingleBooking = async (id: number) => {
    localStorage.setItem("bookingDetails", JSON.stringify(id));
    router.push("/service-provider/jobs/" + id);
  };

  return (
    <>
      <main className="space-y-8 p-4 lg:p-8">
        {/* <button className="rounded-full bg-orange-normal px-6 py-3 text-white transition-all duration-300 hover:opacity-90">
        View Jobs
      </button> */}
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
                  <div className="col-span-10 w-full space-y-6">
                    <div className="flex flex-wrap justify-between gap-2 ">
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-violet-normal ">
                          {item.user.fullName}
                        </p>
                        <p className="text-violet-normal">
                          {truncateText(item.bookingTitle)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-orange-normal">
                          {item.startDate[0]}
                        </p>
                        <p className=" text-slate-700">
                          Total Cost ${item.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleFetchSingleBooking(item.id)}
                        className="rounded-full border border-violet-normal bg-violet-light px-6 py-3 text-sm font-medium text-violet-normal transition-colors duration-300 hover:bg-violet-200 max-md:px-4 max-md:py-2 max-md:text-sm "
                      >
                        View Enquiry
                      </button>
                      <button className="rounded-full bg-violet-normal px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:px-4 max-md:py-2 max-md:text-sm">
                        Chat With Customer
                      </button>
                    </div>
                  </div>
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

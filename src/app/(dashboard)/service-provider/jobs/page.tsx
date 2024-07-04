"use client";

import MessageButton from "@/components/global/MessageButton";
import { marketPlaceModalIcon } from "@/lib/svgIcons";
import Loading from "@/shared/loading";
import { formatDateFromNumberArrayToRelativeDate } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const Jobs = () => {
  const [bookingData, setBookingData] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const fetchAllBookings = async () => {
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
  }, [token]);

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
                <div
                  key={index}
                  className=" flex gap-3 border-b border-slate-200 p-2  lg:grid lg:grid-cols-12 lg:items-center lg:px-8 lg:py-4"
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
                      className="h-full w-full object-cover "
                    />
                  </div>
                  <div className="col-span-10 w-full space-y-4">
                    <div className="flex flex-wrap justify-between gap-2 ">
                      <div>
                        <p className="text-lg font-semibold text-violet-normal ">
                          {item?.customer?.user?.fullName}
                        </p>
                        <p className="text-violet-normal">
                          {item.bookingTitle}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-orange-normal first-letter:uppercase">
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
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={"/service-provider/jobs/" + item.id}
                        className="rounded-full border border-violet-normal bg-violet-light px-6 py-3 text-sm font-medium text-violet-normal transition-colors duration-300 hover:bg-violet-200 max-md:px-3 max-md:py-1 max-md:text-xs "
                      >
                        View Enquiry
                      </Link>
                      <MessageButton
                        recipientId={item.customer.user.id.toString()}
                        recipientName={item.customer.user.fullName}
                        message="Chat With Customer"
                      />
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

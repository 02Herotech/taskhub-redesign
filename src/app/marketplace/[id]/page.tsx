"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiCalendar, BiLocationPlus, BiStar } from "react-icons/bi";
import { BsArrowUp, BsTriangleFill } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

import PricingPlan from "@/components/matkeplaceSingleTask/PricingPlan";
import Reviews from "@/components/matkeplaceSingleTask/Reviews";
import { useParams } from "next/navigation";
import axios from "axios";
import Loading from "@/shared/loading";

const Page = () => {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [displayData, setDisplayData] = useState<ListingDataType2>();
  const [error, setError] = useState("");

  // marketplaceDummyData;

  const params = useParams();
  const id = params.listingId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsDataFetched(false);
        const url = "https://smp.jacinthsolutions.com.au/api/v1/listing/1";
        const { data } = await axios.get(url);
        setDisplayData(data);
      } catch (error) {
        setError("Error Fetching Data");
      } finally {
        setIsDataFetched(true);
      }
    };

    fetchData();
  }, []);

  console.log(displayData);

  function formatDate(dateArray: number[]) {
    const [year, month, day] = dateArray;
    const date = new Date(year, month - 1, day); // month is zero-based in JavaScript Date

    // Helper functions
    const getDayName = (date: Date) => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return days[date.getDay()];
    };

    const getMonthName = (date: Date) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[date.getMonth()];
    };

    const getDayWithSuffix = (day: number) => {
      if (day > 3 && day < 21) return `${day}th`; // Handle 11th, 12th, 13th
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    const dayName = getDayName(date);
    const monthName = getMonthName(date);
    const dayWithSuffix = getDayWithSuffix(day);

    return `On ${dayName}, ${monthName} ${dayWithSuffix}`;
  }

  return (
    <>
      {isDataFetched ? (
        error ? (
          <div className="h-screen items-center justify-center text-lg text-red-600">
            <p className="italic">Check your connection</p>
          </div>
        ) : displayData ? (
          <main className="pt-16 text-[#221354]">
            <header className=" mx-auto bg-slate-200  p-4 lg:rounded-bl-[5rem] lg:rounded-br-[5rem] lg:px-10 lg:py-10 ">
              <Image
                src={
                  displayData?.businessPictures[0] ??
                  "/images/marketplace/singleTask/marketPlace banner.png"
                }
                alt="banner"
                width={800}
                height={500}
                className="mx-auto max-h-[400px] w-full max-w-screen-xl object-cover lg:rounded-bl-[5rem] lg:rounded-br-[5rem] "
              />
            </header>
            <section className="mx-auto grid max-w-screen-xl gap-4 p-4 lg:grid-cols-12 lg:gap-16 lg:p-10 ">
              <article className="space-y-4 lg:col-span-6">
                <p className="font-medium">Recently Added</p>
                <h3 className="text-4xl font-extrabold">
                  {displayData?.listingTitle}
                </h3>
                <p className="font-medium underline">Service Purpose</p>
                <p className="font-medium">{displayData?.listingDescription}</p>
                <h4 className="text-3xl font-extrabold">Location</h4>
                <p className="flex items-center gap-2 text-slate-500 ">
                  <span>
                    <BiLocationPlus />
                  </span>
                  <span>{displayData?.suburb}</span>
                </p>
                <p className="flex items-center gap-2 text-sm underline ">
                  View Maps <BsArrowUp className="rotate-45" />
                </p>
                <h4 className="text-3xl font-extrabold">Date and Time</h4>
                <p className="flex items-center gap-2 text-slate-500 ">
                  <span>
                    <BiCalendar />
                  </span>
                  <span>
                    {" "}
                    {displayData?.createdAt &&
                      formatDate(displayData.createdAt)}{" "}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-slate-500 ">
                  <span>
                    <CiClock2 />
                  </span>
                  <span>
                    {displayData?.availableDays.map((item) => `${item}, `)}
                  </span>
                </p>
                <div className="space-y-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/assets/images/serviceProvider/user.jpg"
                        alt="User"
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <div className="space-y-2">
                        <p className="text-xl font-medium">Daniels Oluchi</p>
                        <div>
                          <p className="text-xs text-slate-300 "> 4.5 </p>
                          <div className="flex items-center gap-2">
                            <FaStar fill="gold" />
                            <FaStar fill="gold" />
                            <FaStar fill="gold" />
                            <FaStar fill="gold" />
                            <FaStar
                              fill="rgb(203 213 225)"
                              color="rgb(203 213 225)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="rounded-full bg-[#381F8C] px-6 py-3 text-white">
                      Message
                    </button>
                  </div>
                  <p className="font-medium">
                    {displayData?.listingDescription}
                  </p>
                </div>
              </article>
              {/* ----------------- pricing plan ---------------- */}
              <PricingPlan
                planOnePrice={displayData?.planOnePrice}
                planTwoPrice={displayData?.planTwoPrice}
                planThreePrice={displayData?.planThreePrice}
                planOneDescription={displayData?.planOneDescription}
                planTwoDescription={displayData?.planTwoDescription}
                planThreeDescription={displayData?.planThreeDescription}
              />
            </section>
            <section className="mx-auto p-4 lg:p-10 ">
              <Image
                src="/assets/images/marketplace/singleTask/googlemap.png"
                alt="googlemap"
                width={800}
                height={500}
                className="w-full max-w-screen-xl "
              />
            </section>

            <Reviews />
          </main>
        ) : (
          <div className="h-screen items-center justify-center text-red-600">
            <p className="italic">Check your connection</p>
          </div>
        )
      ) : (
        <div className="flex h-screen items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Page;

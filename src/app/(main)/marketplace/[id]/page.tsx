"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiCalendar, BiLocationPlus, BiStar } from "react-icons/bi";
import { BsArrowUp, BsTriangleFill } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

import PricingPlan from "@/components/matkeplaceSingleTask/PricingPlan";
import Reviews from "@/components/matkeplaceSingleTask/Reviews";
import axios from "axios";
import Loading from "@/shared/loading";
import { formatDate } from "@/lib/utils";

const Page = () => {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [displayData, setDisplayData] = useState<ListingDataType>();
  const [error, setError] = useState("");
  const [listingId, setListingId] = useState(0);

  // const displayData = {
  //   id: 7,
  //   state: "Queensland",
  //   planOneDescription: "For a decoration service",
  //   planOnePrice: 600,
  //   planTwoDescription: "Catering service",
  //   planTwoPrice: 800,
  //   planThreeDescription: "Photography service",
  //   planThreePrice: 500,
  //   listingDescription:
  //     "Offering Professional Event Planning Services Tailored To Meet All Your Special Occasion Needs. Whether For Weddings, Corporate Events, Or Private Parties, Our Expertise In Venue Selection, Décor, Catering, And Entertainment Ensures A Memorable And Seamlessly Organized Event. Let Us Handle The Details While You Enjoy Your Event Stress-free. Contact Us To Transform Your Vision Into A Perfectly Executed Reality.",
  //   postCode: "4220",
  //   suburb: "Burleigh Waters",
  //   serviceProvider: {
  //     id: 9,
  //   },
  //   category: {
  //     id: 4,
  //     categoryName: "Events",
  //   },
  //   listingTitle: "Amyi Event Hub",
  //   stripeId: "prod_QCXlmBDPPKBswE",
  //   availableDays: ["THURSDAY", "WEDNESDAY", "TUESDAY", "MONDAY", "FRIDAY"],
  //   taskType: "PHYSICAL_SERVICE",
  //   businessPictures: [
  //     "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1717074348/x7u3ebw2qb4dszrszthv.jpg",
  //     "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1717074349/e6iyychykqzncku6uske.jpg",
  //     "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1717074349/q59i5gld2ievpsduiua4.jpg",
  //     "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1717074350/lcw4moxxp4npk360hvc8.jpg",
  //   ],
  //   reviews: [],
  //   subCategory: {
  //     name: "Hair vendors",
  //     id: 4,
  //   },
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempList = localStorage.getItem("content");
        if (tempList) {
          const content: ListingDataType = JSON.parse(tempList);
          setDisplayData(content);
        }
      } catch (error) {
        setError("Error Fetching Data");
      } finally {
        setIsDataFetched(true);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="  pt-16 text-[#221354]">
        <section className=" grid gap-4 lg:grid-cols-12 lg:gap-4">
          {/* left handside */}
          <article className="space-y-4 lg:col-span-7">
            <header className=" mx-auto bg-slate-200  p-4 lg:rounded-br-[2rem] lg:rounded-tr-[2rem] lg:px-10 lg:py-10 ">
              <div className="flex items-center   ">
                <Image
                  src={
                    displayData?.businessPictures[0] ??
                    "/images/marketplace/singleTask/marketPlace banner.png"
                  }
                  alt="bannerImage"
                  width={800}
                  height={500}
                  className="mx-auto max-h-[400px] min-h-64 w-full max-w-screen-xl  rounded-lg object-cover "
                />
              </div>
            </header>

            {/* content */}
            <div className="container space-y-4 ">
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
                  {/* {displayData?.createdAt &&
                      // @ts-ignore
                      formatDate(displayData.createdAt)} */}
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
                      src={
                        // displayData?.serviceProvider?.user.profileImage ??
                        "/assets/images/serviceProvider/user.jpg"
                      }
                      alt="User"
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div className="space-y-2">
                      <p className="text-xl font-medium">
                        {/* {displayData?.serviceProvider?.user?.profileImage} */}
                      </p>
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
                <p className="font-medium">{displayData?.listingDescription}</p>
              </div>
            </div>
          </article>
          {/* ----------------- pricing plan ---------------- */}
          <PricingPlan
            planOnePrice={displayData?.planOnePrice ?? 0}
            planTwoPrice={displayData?.planTwoPrice ?? null}
            planThreePrice={displayData?.planThreePrice ?? null}
            planOneDescription={displayData?.planOneDescription ?? ""}
            planTwoDescription={displayData?.planTwoDescription ?? null}
            planThreeDescription={displayData?.planThreeDescription ?? null}
            listingId={listingId}
          />
        </section>

        {/* Portfolio */}
        <section className="mx-auto w-full space-y-4 p-4  lg:p-16 ">
          <h1 className="text-3xl font-bold text-violet-darkHover max-md:text-xl">
            Portfolio
          </h1>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12">
            <Image
              src="/assets/images/marketplace/singleTask/Frame 1000003666.png"
              alt="googlemap"
              width={800}
              height={500}
              className="mx-auto h-96 w-full rounded-xl  object-cover lg:col-span-6 "
            />
            <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:col-span-6">
              <Image
                src="/assets/images/marketplace/singleTask/Frame 1000003666.png"
                alt="googlemap"
                width={800}
                height={500}
                className="mx-auto h-44 w-full rounded-xl object-cover "
              />
              <Image
                src="/assets/images/marketplace/singleTask/Frame 1000003665.png"
                alt="googlemap"
                width={800}
                height={500}
                className="mx-auto h-44 w-full rounded-xl object-cover"
              />
              <Image
                src="/assets/images/marketplace/singleTask/Frame 1000003666.png"
                alt="googlemap"
                width={800}
                height={500}
                className="mx-auto h-44 w-full rounded-xl object-cover "
              />
              <Image
                src="/assets/images/marketplace/singleTask/Frame 1000003665.png"
                alt="googlemap"
                width={800}
                height={500}
                className="mx-auto h-44 w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        <Reviews />
      </main>
    </>
  );
};

export default Page;

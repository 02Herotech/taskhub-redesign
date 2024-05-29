"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";
import { notificationData } from "@/app/data/service-provider/notification";
import { BiCalendarWeek, BiCheck } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { CiClock1 } from "react-icons/ci";
import Link from "next/link";
import { jobsData } from "../jobs/page";

const myservices = [
  {
    Jobimage: "/assets/images/serviceProvider/plumbing.png",
    category: "Plumbing",
    rating: "4.5",
    profileImage: "/assets/images/marketplace/singleTask/oluchi.png",
    profileName: "Daniels Oluchi",
    price: 100,
  },
  {
    Jobimage: "/assets/images/serviceProvider/gasfilling.png",
    category: "Gas Fitting",
    rating: "4.5",
    profileImage: "/assets/images/marketplace/singleTask/oluchi.png",
    profileName: "Daniels Oluchi",
    price: 100,
  },
  {
    Jobimage: "/assets/images/serviceProvider/plumbing.png",
    category: "Plumbing",
    rating: "4.5",
    profileImage: "/assets/images/marketplace/singleTask/oluchi.png",
    profileName: "Drain Inspection",
    price: 100,
  },
];

const ServicesPage = () => {
  const [currentCategory, setCurrentCategory] = useState("services");
  const rounter = useRouter();

  console.log(currentCategory);

  const handleNavigateCard = (index: number) => {
    const route = "/service-provider/services/" + index;
    rounter.push(route);
  };

  return (
    <main className="space-y-8 p-4 lg:p-8">
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
        <section className="flex flex-wrap gap-4">
          {myservices.map((item, index) => (
            <motion.div
              key={index}
              className="mx-auto cursor-pointer space-y-8 rounded-xl bg-[#EBE9F4] p-2"
              // onClick={() => handleNavigateCard(index)}
              initial={{ opacity: 0, translateY: "5rem" }}
              whileInView={{ opacity: 1, translateY: "0" }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <div className="h-52 w-72 overflow-hidden rounded-xl">
                  <Image
                    src={item.Jobimage}
                    width={400}
                    height={400}
                    alt={item.category}
                    className=" h-full w-full object-cover "
                  />
                </div>
                <p className="px-2 text-3xl font-bold text-[#190E3F] ">
                  {item.category}
                </p>

                <div className="px-2">
                  <p className="text-xs"> {item.rating} </p>
                  <div className="flex items-center gap-1">
                    <FaStar size={10} color="gold" />
                    <FaStar size={10} color="gold" />
                    <FaStar size={10} color="gold" />
                    <FaStar size={10} color="gold" />
                    <FaStar size={10} color="grey" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 py-3">
                      <Image
                        src={item.profileImage}
                        alt={item.profileName}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <p className="text-xs"> {item.profileName} </p>
                    </div>
                    <p className="font-bold text-[#381F8C] ">
                      From ${item.price}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      ) : currentCategory === "ongoing" ? (
        <div className="flex flex-col gap-8  pb-4">
          {jobsData.map((item, index) => (
            <div
              key={index}
              className=" flex gap-3 border-b border-slate-200 p-4 lg:grid lg:grid-cols-12 lg:items-center lg:px-8 lg:py-4"
            >
              <div className="col-span-2 size-20 flex-shrink-0 overflow-hidden rounded-full border border-violet-normal lg:size-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover "
                />
              </div>
              <div className="col-span-10 w-full space-y-6">
                <div className="flex flex-wrap justify-between gap-2 ">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-violet-normal ">
                      {item.name}
                    </p>
                    <p className="text-violet-normal"> {item.description} </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-orange-normal">
                      {item.time}
                    </p>
                    <p className=" text-slate-700">Total Cost ${item.price}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={"/service-provider/dashboard/jobs/" + item.id}
                    className="rounded-full border border-violet-normal bg-violet-light px-6 py-3 text-sm font-medium text-violet-normal transition-colors duration-300 hover:bg-violet-200 max-md:px-4 max-md:py-2 max-md:text-sm "
                  >
                    View Enquiry
                  </Link>
                  <button className="rounded-full bg-violet-normal px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:px-4 max-md:py-2 max-md:text-sm">
                    Chat With Customer
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

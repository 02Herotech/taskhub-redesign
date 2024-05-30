"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const JobsData = [
export const jobsDatas = [
  {
    id: "1",
    name: "Kelly Jane",
    description: "Request for drain blockage fix service",
    image: "/assets/images/serviceProvider/jobs/joe.png",
    price: 450,
    time: "Yesterday",
  },
  {
    id: "2",
    name: "Kelly Jane",
    description: "Request for drain blockage fix service",
    image: "/assets/images/serviceProvider/jobs/kelly.png",
    price: 450,
    time: "Yesterday",
  },
  {
    id: "3",
    name: "Kelly Jane",
    description: "Request for drain blockage fix service",
    image: "/assets/images/serviceProvider/jobs/man.png",
    price: 450,
    time: "Yesterday",
  },
  {
    id: "3",
    name: "Kelly Jane",
    description: "Request for drain blockage fix service",
    image: "/assets/images/serviceProvider/jobs/woman.png",
    price: 450,
    time: "Yesterday",
  },
];

const Jobs = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const fetchAllServices = async () => {
    try {
      setLoading(true);
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/booking/service-provider";
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      if (!data.content) {
        throw new Error("Response content is missing");
      }
      console.log(data);
      setBookingData(data.content);
    } catch (error) {
      console.error("An error occurred while fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="space-y-8 p-4 lg:p-8">
      <button className="rounded-full bg-orange-normal px-6 py-3 text-white transition-all duration-300 hover:opacity-90">
        View Jobs
      </button>
      <section className="mx-auto max-w-screen-lg space-y-3 ">
        {jobsDatas.map((item, index) => (
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
                  <p className=" text-slate-700"> Total Cost ${item.price} </p>
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
      </section>
    </main>
  );
};

export default Jobs;

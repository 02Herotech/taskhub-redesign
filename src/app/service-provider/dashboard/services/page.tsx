"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";

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

  const handleNavigateCard = (index: number) => {
    const route = "/service-provider/dashboard/services/" + index;
    console.log(route);
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

      <section className="flex flex-wrap gap-4">
        {myservices.map((item, index) => (
          <motion.div
            key={index}
            className="mx-auto cursor-pointer space-y-8 rounded-xl bg-[#EBE9F4] p-2"
            onClick={() => handleNavigateCard(index)}
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
    </main>
  );
};

export default ServicesPage;

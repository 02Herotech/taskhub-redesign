"use client";

import Invoice from "@/components/serviceProviderDashboard/jobs/Invoice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

const ViewJobs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(isModalOpen);

  return (
    <main className=" relative flex min-h-[70vh] items-center justify-center space-y-8 p-4 lg:p-8">
      <Invoice isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <section className="w-[90vw] max-w-2xl space-y-4 rounded-xl bg-violet-light p-4 lg:p-8 ">
        <div className="flex justify-between gap-2">
          <div className="space-y-8 text-violet-normal">
            <p>A Catering Service Wanted:</p>
            <div>
              <p className="text-lg font-bold uppercase">Posted by:</p>
              <p className=" text-orange-normal">Kelly Jane</p>
            </div>
            <div>
              <p>Total cost </p>
              <p>Est. Budget: $480 </p>
            </div>
            <div>
              <p className="text-lg font-medium uppercase">To be done:</p>
              <p>Within 3days</p>
            </div>
          </div>
          <div>
            <div className="rounded-full border border-[#14782F] p-2">
              <Image
                src="/assets/images/serviceProvider/use4.png"
                alt="user"
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        {/* --- */}
        <div className="space-y-4">
          <p className="flex items-center gap-2 text-sm text-violet-dark">
            <span>
              <IoLocationOutline />
            </span>
            <span>TASMAIA, AUSTRALIA</span>
          </p>
          <p className="uppercase text-violet-dark">Job Description:</p>
          <p className="text-violet-normal">
            Seeking an experienced Catering Service Provider on Taskhub to
            deliver exceptional culinary experiences for events. Must excel in
            menu planning, food preparation, presentation, and customer service.
            Ensure seamless event catering, exceeding client expectations.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="rounded-full bg-violet-normal px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:px-4 max-md:py-2 max-md:text-sm"
            >
              Confirm
            </button>
            <button className="rounded-full border border-violet-normal bg-violet-light px-6 py-3 text-sm font-medium  text-violet-normal transition-colors duration-300 hover:bg-violet-200 max-md:px-4 max-md:py-2 max-md:text-sm ">
              Cancel
            </button>
            <Link
              href={{ pathname: "/service-provider/message/1", query: "id=1" }}
              className="rounded-full px-6 py-3 font-medium transition-colors duration-300 hover:bg-violet-900 max-md:px-4  max-md:py-2 max-md:text-sm"
            >
              Chat with Customer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ViewJobs;

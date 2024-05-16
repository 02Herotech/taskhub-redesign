import PageHeader from "@/components/matkeplaceSingleTask/PageHeader";
import PricingPlan from "@/components/matkeplaceSingleTask/PricingPlan";
import Reviews from "@/components/matkeplaceSingleTask/Reviews";
import ServiceDescription from "@/components/matkeplaceSingleTask/ServiceDescription";
import Image from "next/image";
import React from "react";
import { BiCalendar, BiLocationPlus, BiStar } from "react-icons/bi";
import { BsArrowUp, BsTriangleFill } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const page = () => {
  return (
    <main className="pt-16 text-[#221354]   ">
      <PageHeader />
      <section className="grid lg:grid-cols-12  gap-16 py-10  mx-auto  px-10 max-w-screen-xl ">
        <ServiceDescription />
        <PricingPlan />
      </section>
      <section className="py-10  mx-auto px-10 ">
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
  );
};

export default page;

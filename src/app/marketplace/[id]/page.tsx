"use client"

import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { BiCalendar, BiLocationPlus, BiStar } from "react-icons/bi";
import { BsArrowUp, BsTriangleFill } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

import PageHeader from "@/components/matkeplaceSingleTask/PageHeader";
import PricingPlan from "@/components/matkeplaceSingleTask/PricingPlan";
import Reviews from "@/components/matkeplaceSingleTask/Reviews";
import ServiceDescription from "@/components/matkeplaceSingleTask/ServiceDescription";


interface listingData {
  id: number;
  posterId: number;
  businessName: string;
  serviceCategory: string;
  subCategory: string;
  serviceDescription: string;
  serviceName: string;
  pricing: number;
  availableDays: [string];
  available: boolean;
  startHour: number;
  closeMinute: number;
  closeHour: number;
  startMinute: number;
  availableFrom: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  availableTo: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  userAddress: {
    id: number;
    streetNumber: string;
    streetName: string;
    unitNumber: string;
    suburb: string;
    state: string;
    postCode: string;
  };
  deleted: boolean;
  stripeId: string;
  businessPictures: string[];
}

const page = () => {

  const router = useRouter()
  const { id } = router.query


  const [listingData, setListingData] = useState<listingData | null>(null);



  return (
    <main className="pt-16 text-[#221354]">
      <p>{id}</p>
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

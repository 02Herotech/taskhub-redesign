"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BiCalendar, BiLocationPlus, BiStar } from "react-icons/bi";
import { BsArrowUp, BsTriangleFill } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

import PageHeader from "@/components/matkeplaceSingleTask/PageHeader";
import PricingPlan from "@/components/matkeplaceSingleTask/PricingPlan";
import Reviews from "@/components/matkeplaceSingleTask/Reviews";
import ServiceDescription from "@/components/matkeplaceSingleTask/ServiceDescription";
import { signOut, useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { fetchListingById } from "@/lib/serviceproviderutil";

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

const Page = () => {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const session = useSession();
  const token = session?.data?.user?.refreshToken;

  const param = useParams();
  const id = param.id[0];

  // if (token && !isDataFetched) {
  //   const fetchData = async () => {
  //     try {
  //       if (token) {
  //         const data = await fetchListingById(id, token);
  //         console.log(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  //   setIsDataFetched(true);
  // }

  return (
    <main className="pt-16 text-[#221354]">
      <PageHeader />
      <section className="mx-auto grid  max-w-screen-xl gap-4 p-4 lg:grid-cols-12 lg:gap-16 lg:p-10 ">
        <ServiceDescription />
        <PricingPlan />
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
  );
};

export default Page;

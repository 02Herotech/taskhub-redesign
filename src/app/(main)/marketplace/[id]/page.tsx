/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiCalendar, BiCalendarCheck, BiLocationPlus } from "react-icons/bi";
import PricingPlan from "@/components/matkeplaceSingleTask/PricingPlan";
import Reviews from "@/components/matkeplaceSingleTask/Reviews";
import { formatDateFromNumberArray } from "@/utils";
import axios from "axios";
import ImageModal from "@/components/main/marketplace/ImageModal";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MessageButton from "@/components/global/MessageButton";
import Link from "next/link";

const Page = () => {
  const [displayData, setDisplayData] = useState<ListingDataType>();
  const [currentListing, setCurrentListing] = useState<ListingDataType>();
  const [showImageModal, setShowImageModal] = useState({
    state: false,
    image: "",
  });
  const route = useRouter();
  const { id } = useParams();

  const { userProfileAuth: auth } = useSelector(
    (state: RootState) => state.userProfile,
  );

  useEffect(() => {
    const tempList = localStorage.getItem("content");
    if (tempList) {
      const content: ListingDataType = JSON.parse(tempList);
      setDisplayData(content);
    }
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        if (!displayData) return;
        const url = "https://smp.jacinthsolutions.com.au/api/v1/listing/" + id;
        const { data } = await axios.get(url);
        setCurrentListing(data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    };
    fetchListing();
  }, [displayData]);

  return (
    <>
      <main className=" relative  pt-16 font-satoshiMedium text-[#221354] ">
        <ImageModal
          showImageModal={showImageModal}
          setShowImageModal={setShowImageModal}
        />
        <section className=" grid gap-4 lg:grid-cols-12 lg:gap-4">
          {/* left handside */}
          <article className="space-y-4 lg:col-span-7">
            <header className=" mx-auto bg-slate-200  p-4 lg:rounded-br-[2rem] lg:rounded-tr-[2rem] lg:px-10 lg:py-10 ">
              <div className="flex items-center   ">
                <Image
                  src={displayData?.businessPictures[0] ?? ""}
                  alt={displayData?.businessPictures[0] ?? ""}
                  width={1600}
                  height={1600}
                  quality={100}
                  onClick={() =>
                    setShowImageModal({
                      state: true,
                      image: displayData?.businessPictures[0] ?? "",
                    })
                  }
                  className="mx-auto max-h-[400px] w-full max-w-screen-xl cursor-pointer  rounded-lg object-cover "
                />
              </div>
            </header>

            {/* content */}
            <div className="container space-y-4 ">
              {/* <p className="font-medium">Recently Added</p> */}
              <h3 className="lgtext-4xl font-satoshiMedium text-3xl font-bold first-letter:uppercase ">
                {displayData?.listingTitle}
              </h3>
              <p className="font-satoshiMedium text-xl font-medium">
                Service Purpose
              </p>
              <p className="font-satoshiMedium">
                {displayData?.listingDescription}
              </p>
              {displayData?.suburb && (
                <div>
                  <h4 className="text-3xl font-extrabold">Location</h4>
                  <p className="flex items-center gap-2 text-slate-500 ">
                    <span>
                      <BiLocationPlus />
                    </span>
                    <span>{displayData?.suburb}</span>
                  </p>
                </div>
              )}
              {/* <p className="flex items-center gap-2 text-sm underline ">
                View Maps <BsArrowUp className="rotate-45" />
              </p> */}
              <h4 className="text-3xl font-extrabold">Date and Days</h4>
              <p className="flex items-center gap-2 text-slate-500 ">
                <span>
                  <BiCalendar />
                </span>
                <span>
                  {displayData?.createdAt &&
                    formatDateFromNumberArray(displayData.createdAt)}
                </span>
              </p>
              <p className="flex items-center gap-2 text-slate-500 ">
                <span>
                  <BiCalendarCheck />
                </span>
                <span>
                  {displayData?.availableDays.map((item) => `${item}, `)}
                </span>
              </p>
              <div className="space-y-6 py-4">
                <h1 className="font-satoshiBold text-3xl font-bold">
                  About the provider
                </h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    
                    <Image
                      src={
                        displayData?.serviceProvider?.user.profileImage ??
                        "/assets/images/serviceProvider/user.jpg"
                      }
                      alt="User"
                      width={80}
                      height={80}
                      quality={100}
                      className="size-20 rounded-full object-cover "
                      />
                    <div className="space-y-2">
                      <p className="text-xl font-medium">
                        {displayData?.serviceProvider?.user?.fullName}
                      </p>
                    <div>
                      <Link href={`/marketplace/${id}/about`} className="cursor-pointer">
                          <p className="text-xl font-medium text-[#e58c06] underline cursor-pointer">View Profile</p>
                        </Link>
                        {/* <div className="flex items-center gap-2">
                          <FaStar
                            fill="rgb(203 213 225)"
                            color="rgb(203 213 225)"
                          />
                          <FaStar
                            fill="rgb(203 213 225)"
                            color="rgb(203 213 225)"
                          />
                          <FaStar
                            fill="rgb(203 213 225)"
                            color="rgb(203 213 225)"
                          />
                          <FaStar
                            fill="rgb(203 213 225)"
                            color="rgb(203 213 225)"
                          />
                          <FaStar
                            fill="rgb(203 213 225)"
                            color="rgb(203 213 225)"
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {currentListing &&
                    auth.token &&
                    auth.role?.[0] === "CUSTOMER" && (
                      <MessageButton
                        recipientId={currentListing.serviceProvider.user.id.toString()}
                        recipientName={
                          currentListing?.serviceProvider.user.fullName
                        }
                      
                      />
                    )}
                </div>
                <p className="font-medium">
                  {/* @ts-ignore */}
                  {currentListing?.serviceProvider.bio}
                </p>
              </div>
            </div>
          </article>
          {/* ----------------- pricing plan ---------------- */}
          {currentListing && displayData && (
            <PricingPlan
              planOnePrice={displayData.planOnePrice}
              planTwoPrice={displayData.planTwoPrice}
              planThreePrice={displayData.planThreePrice}
              planOneDescription={displayData.planOneDescription}
              planTwoDescription={displayData.planTwoDescription}
              planThreeDescription={displayData.planThreeDescription}
              listingId={displayData.id}
              listingTitle={displayData.listingTitle}
              negotiable={currentListing.negotiable}
            />
          )}
        </section>

        {/* Portfolio
        <section className="mx-auto w-full space-y-4 p-4  py-8 lg:p-16 ">
          <h1 className="text-3xl font-bold text-violet-darkHover">
            Portfolio
          </h1>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12">
            <Image
              src={displayData?.businessPictures[0] ?? ""}
              alt={displayData?.businessPictures[0] ?? ""}
              width={1600}
              height={1600}
              quality={100}
              onClick={() =>
                setShowImageModal({
                  state: true,
                  image: displayData?.businessPictures[0] ?? "",
                })
              }
              className="mx-auto h-96 w-full rounded-xl  object-cover lg:col-span-6 "
            />
            <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:col-span-6">
              {displayData?.businessPictures
                .slice(1, 4)
                .map((item, index) => (
                  <Image
                    key={item}
                    src={item}
                    alt={item}
                    width={1600}
                    height={1600}
                    quality={100}
                    onClick={() =>
                      setShowImageModal({ state: true, image: item })
                    }
                    className={`mx-auto h-44 w-full rounded-xl object-cover ${index === 0 && "md:col-span-2"} `}
                  />
                ))}
            </div>
          </div>
        </section> */}
        <Reviews />
      </main>
    </>
  );
};

export default Page;

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
        const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/` + id;
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
      <main className=" relative  py-16 font-satoshiMedium text-[#221354] ">
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

            <div className="space-y-8 p-6">
              {/* Main Service Information */}
              <div className="p-6">
                <div className="pb-4 mb-6">
                  <h3 className="text-2xl lg:text-3xl font-satoshiBold font-bold first-letter:uppercase">
                    {displayData?.listingTitle}
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Service Description */}
                  <div className="space-y-3">
                    <h4 className="font-satoshiMedium text-lg font-semibold underline underline-offset-4">
                      Service Description
                    </h4>
                    <p className="font-satoshiMedium text-gray-700 leading-relaxed">
                      {displayData?.listingDescription}
                    </p>
                  </div>

                  {/* Location Section */}
                  {displayData?.suburb && (
                    <div className="space-y-2  pt-4">
                      <h4 className="text-xl lg:text-2xl font-satoshiBold font-semibold">
                        Location
                      </h4>
                      <div className="flex items-center gap-x-2 text-slate-600">
                        <BiLocationPlus className="text-xl" />
                        <span>{displayData.suburb}</span>
                      </div>
                    </div>
                  )}

                  {/* Date and Availability */}
                  <div className="space-y-4  pt-4">
                    <h4 className="text-xl lg:text-2xl font-satoshiBold font-semibold">
                      Date and Availability
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-x-2 text-slate-600">
                        <BiCalendar className="text-xl" />
                        <span>
                          {displayData?.createdAt &&
                            formatDateFromNumberArray(displayData.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-2 text-slate-600">
                        <BiCalendarCheck className="text-xl" />
                        <span>
                          {displayData?.availableDays?.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Provider Information */}
              <div className="p-6">
                <div className="pb-4 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-satoshiBold font-bold">
                    About the Provider
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={
                            displayData?.serviceProvider?.user.profileImage ??
                            "/assets/images/serviceProvider/user.jpg"
                          }
                          alt="Provider Profile"
                          width={80}
                          height={80}
                          quality={100}
                          className="size-20 rounded-full object-cover ring-2 ring-gray-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xl font-satoshiBold">
                          {displayData?.serviceProvider?.user?.fullName}
                        </p>
                        <Link
                          href={`/marketplace/${displayData?.id}/about`}
                          className="inline-block text-[#e58c06] hover:text-[#cc7c05] underline font-medium transition-colors"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>

                    {currentListing &&
                      auth?.token &&
                      auth?.role?.[0] === "CUSTOMER" && (
                        <div className="md:self-start">
                          <MessageButton
                            recipientId={currentListing.serviceProvider.user.id.toString()}
                            recipientName={currentListing?.serviceProvider.user.fullName}
                          />
                        </div>
                      )}
                  </div>

                  {/* @ts-ignore */}
                  {currentListing?.serviceProvider?.bio && (
                    <div className=" pt-4">
                      <p className="font-medium text-gray-700 leading-relaxed">
                        {/* @ts-ignore */}
                        {currentListing?.serviceProvider.bio}
                      </p>
                    </div>
                  )}
                </div>
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
      </main>
    </>
  );
};

export default Page;

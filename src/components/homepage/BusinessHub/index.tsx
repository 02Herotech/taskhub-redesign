"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CheckSignOrange from "../../../../public/assets/images/homepage/businessHub/CheckSignOrange.png";
import CheckSignBlue from "../../../../public/assets/images/homepage/businessHub/CheckSignBlue.png";

import image1 from "../../../../public/assets/images/homepage/businessHub/01.png";
import image2 from "../../../../public/assets/images/homepage/businessHub/02.png";
import image3 from "../../../../public/assets/images/homepage/businessHub/03.png";
import image4 from "../../../../public/assets/images/homepage/businessHub/04.png";
import image5 from "../../../../public/assets/images/homepage/businessHub/05.png";

const BusinesHub = () => {
  const BusinessHubData = [
    {
      id: 1,
      title: "Financial Literacy",
      icon: CheckSignOrange,
      details: (
        <>
          Understand how to manage your finances <br /> and access capital.
        </>
      ),
      bgColour: "2A1769",
    },

    {
      id: 2,
      title: "Business 101",
      icon: CheckSignBlue,
      details: (
        <>
          Learn the fundamentals of starting and <br /> running a successful
          business
        </>
      ),
      bgColour: "E58C06",
    },

    {
      id: 3,
      title: "Personalized Learning",
      icon: CheckSignOrange,
      details: (
        <>
          Get tailored guidance with our AI-powered <br /> platform.
        </>
      ),
      bgColour: "rgba(144, 35, 181, 1)",
    },

    {
      id: 4,
      title: "Expert Support",
      icon: CheckSignOrange,
      details: (
        <>
          Access valuable insights and support from <br /> our community.
        </>
      ),
      bgColour: "rgba(80, 49, 2, 1)",
    },
  ];

  const MobileBusinessHubData = [
    {
      id: 1,
      title: "Financial Literacy",
      icon: CheckSignOrange,
      details: <>Understand how to manage your finances and access capital.</>,
      bgColour: "2A1769",
    },

    {
      id: 2,
      title: "Business 101",
      icon: CheckSignBlue,
      details: (
        <>
          Learn the fundamentals of starting and running a successful business
        </>
      ),
      bgColour: "E58C06",
    },

    {
      id: 3,
      title: "Personalized Learning",
      icon: CheckSignOrange,
      details: <>Get tailored guidance with our AI- powered platform.</>,
      bgColour: "rgba(144, 35, 181, 1)",
    },

    {
      id: 4,
      title: "Expert Support",
      icon: CheckSignOrange,
      details: <>Access valuable insights and support from our community.</>,
      bgColour: "rgba(80, 49, 2, 1)",
    },
  ];

  const useImageTransition = (images: any, transitionDuration: any) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, transitionDuration);
      return () => clearInterval(interval);
    }, [images.length, transitionDuration]);
    return currentImageIndex;
  };

  const images = [image1, image2, image3, image4, image5];
  const currentImageIndex = useImageTransition(images, 2000);

  return (
    <div className="py-10 pb-56 lg:mb-0 lg:h-auto lg:pb-40">
      <div className=" mx-auto w-[90%] lg:max-w-7xl">
        <div className="right-0 my-10 flex h-[450px] w-[95%] items-center rounded-l-2xl bg-[#E7E4F1] lg:hidden">
          <div className="relative mx-auto h-[400px] w-[85%] rounded-[15px] ">
            <Image
              src={images[currentImageIndex]}
              alt=""
              fill
              className="absolute rounded-[15px] object-cover"
            />
          </div>
        </div>
        <div className="mx-auto w-[85%] ">
          <div className="space-y-5">
            <h2 className="hidden text-center font-clashSemiBold text-2xl text-[#2A1769] lg:block xl:text-[32px]">
              “90% of businesses fail within 12 <br /> months of being
              operational due to <br /> lack of business acumen”
            </h2>

            <h2 className="text-center font-clashSemiBold text-2xl text-[#2A1769] lg:hidden">
              “90% of businesses fail <br /> within 12 months of being <br />{" "}
              operational due to lack of <br /> business acumen”
            </h2>

            <p className="text-center font-satoshi text-[16px] font-[700]  text-[#5B556E] lg:text-[24px] xl:text-[28px]">
              Thrive with our business hub <br className="lg:hidden" /> where
              you learn:
            </p>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="relative hidden py-10 lg:block lg:pl-[80px] xl:pl-[120px]">
        <div className="space-y-5">
          {BusinessHubData.map((eachData, index) => (
            <div
              key={index}
              className={`flex items-center gap-5 rounded-3xl border-2 border-[#C3C4DE] px-5 lg:h-[130px] lg:w-[55%] xl:h-[120px] xl:w-[45%] `}
            >
              <div className="flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-[#C1BADB]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.75 1.339L12.363 0L13.9555 2.46567L16.887 2.613L17.0343 5.5445L19.5 7.137L18.161 9.75L19.5 12.363L17.0343 13.9555L16.887 16.887L13.9555 17.0343L12.363 19.5L9.75 18.161L7.137 19.5L5.5445 17.0343L2.613 16.887L2.46567 13.9555L0 12.363L1.339 9.75L0 7.137L2.46567 5.5445L2.613 2.613L5.5445 2.46567L7.137 0L9.75 1.339Z"
                    fill="white"
                  />
                  <path
                    d="M8.69959 12.6684L5.68359 9.76722L6.43326 8.98722L8.69743 11.1626L13.2626 6.73389L14.0166 7.51172L8.69959 12.6684Z"
                    fill="#381F8C"
                  />
                </svg>
              </div>

              <div className="lg:space-y-3 xl:space-y-2">
                <h2 className=" text-center font-satoshiBold text-[22px] font-bold text-primary xl:text-[25px] ">
                  {eachData.title}
                </h2>

                <p className="text-center font-satoshiMedium text-[15px] text-primary xl:text-[16px]">
                  {eachData.details}
                </p>
              </div>
            </div>
          ))}
          <Link
            href="/business-hub"
            className="mt-10 flex w-max items-center gap-1 rounded-full border border-[#381F8C] bg-[#EBE9F4] px-4 py-2 font-satoshiBold font-bold text-[#381F8C]"
          >
            View Business Resources
          </Link>
        </div>

        <div className="absolute right-0 top-0 mt-10 hidden w-[45%] items-center rounded-l-2xl bg-[#E7E4F1] pl-10 lg:flex lg:h-[580px] xl:h-[540px]  ">
          <div className="relative h-[450px] rounded-[15px] lg:w-[80%] xl:w-[70%] ">
            <Image
              src={images[currentImageIndex]}
              alt=""
              fill
              className="absolute rounded-[15px]"
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="pt-10 lg:hidden">
        <div className="mx-auto w-[90%] space-y-5">
          {MobileBusinessHubData.map((eachData, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-3xl border-2 border-[#C3C4DE] px-4 py-5"
            >
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-[#C1BADB]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.75 1.986L12.162 0.75L13.632 3.026L16.338 3.162L16.474 5.868L18.75 7.338L17.514 9.75L18.75 12.162L16.474 13.632L16.338 16.338L13.632 16.474L12.162 18.75L9.75 17.514L7.338 18.75L5.868 16.474L3.162 16.338L3.026 13.632L0.75 12.162L1.986 9.75L0.75 7.338L3.026 5.868L3.162 3.162L5.868 3.026L7.338 0.75L9.75 1.986Z"
                    fill="white"
                  />
                  <path
                    d="M8.784 12.4438L6 9.76582L6.692 9.04582L8.782 11.0538L12.996 6.96582L13.692 7.68382L8.784 12.4438Z"
                    fill="#381F8C"
                  />
                </svg>
              </div>

              <div className="w-[75%] space-y-2">
                <h2 className="font-satoshiBold text-lg font-bold text-primary">
                  {eachData.title}
                </h2>

                <p className="font-satoshiMedium text-sm text-primary">
                  {eachData.details}
                </p>
              </div>
            </div>
          ))}
          <Link
            href="/business-hub"
            className="mt-14 flex w-full items-center justify-center gap-1 rounded-full border border-[#381F8C] bg-[#EBE9F4] px-4 py-2 text-center font-satoshiBold font-bold text-[#381F8C] sm:w-max"
          >
            View Business Resources
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinesHub;

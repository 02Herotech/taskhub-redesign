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
    <div className="h-[1520px] py-10 pb-32 lg:h-auto">
      <div className=" mx-auto w-[90%] lg:max-w-7xl">
        <div className="mx-auto w-[85%] ">
          <div className="space-y-5">
            <h2 className="hidden text-center font-clashSemiBold text-[28px] text-[#2A1769]  lg:block xl:text-[32px]">
              “90% of businesses fail within 12 <br /> months of being
              operational due to <br /> lack of business acumen”
            </h2>

            <h2 className="text-center  font-clashSemiBold text-[24px]  text-[#2A1769] lg:hidden">
              “90% of <br /> businesses fail <br /> within 12 months of <br />{" "}
              being operational <br />
              due to lack of <br /> business acumen”
            </h2>

            <p className="text-center font-satoshi text-[16px] font-[700]  text-[#5B556E] lg:text-[24px] xl:text-[28px]">
              Thrive with our business hub <br className="lg:hidden" /> where
              you learn:
            </p>
          </div>
        </div>
      </div>

      {/* desktop */}
      <div className="relative hidden py-10 lg:block lg:pl-[80px] xl:pl-[120px]">
        <div className="space-y-5">
          {BusinessHubData.map((eachData, index) => (
            <div
              key={index}
              style={{ backgroundColor: eachData.bgColour }}
              className={`bg-[#${eachData.bgColour}] flex items-center gap-5 rounded-3xl px-5 lg:h-[130px] lg:w-[55%] xl:h-[120px] xl:w-[45%] `}
            >
              <div className="flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-[#ECECF4]">
                <Image src={eachData.icon} alt="" />
              </div>

              <div className="lg:space-y-3 xl:space-y-2">
                <h2 className=" font-satoshi text-[22px] font-[700]  text-[#ECECF4] xl:text-[25px] ">
                  {eachData.title}
                </h2>

                <p className="font-satoshi text-[15px] font-[500]  text-[#ECECF4] xl:text-[16px] ">
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

        <div className="absolute right-0 top-0 mt-10 flex w-[45%] items-center rounded-l-2xl bg-primary pl-10 lg:h-[580px] xl:h-[540px]  ">
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

      {/* mobile */}
      <div className="relative py-10 lg:hidden  ">
        <div className="mx-auto w-[90%] space-y-5  ">
          {MobileBusinessHubData.map((eachData, index) => (
            <div
              key={index}
              style={{ backgroundColor: eachData.bgColour }}
              className={`bg-[#${eachData.bgColour}] 
                            flex items-center gap-4 rounded-3xl px-4 py-5 `}
            >
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-[#ECECF4]">
                <Image src={eachData.icon} alt="" />
              </div>

              <div className="w-[75%] space-y-2 text-center ">
                <h2 className=" font-satoshi text-[20px] font-[700]  text-[#ECECF4] ">
                  {eachData.title}
                </h2>

                <p className="] font-satoshi text-[14px]  font-[500] text-[#ECECF4] ">
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

        <div className="absolute right-0 mt-10 flex h-[450px]  w-[95%] items-center rounded-l-2xl bg-primary   ">
          <div className="relative mx-auto h-[400px] w-[85%] rounded-[15px] ">
            <Image
              src={images[currentImageIndex]}
              alt=""
              fill
              className="absolute rounded-[15px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinesHub;

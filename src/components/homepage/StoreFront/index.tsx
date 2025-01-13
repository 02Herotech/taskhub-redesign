"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CheckSign from "../../../../public/assets/images/homepage/storeFront/CheckSign.png";
import clsx from "clsx";
import manage from "../../../../public/assets/images/homepage/storeFront/1-manage.png";
import product from "../../../../public/assets/images/homepage/storeFront/2-product.png";
import theme from "../../../../public/assets/images/homepage/storeFront/3-theme.png";
import domain from "../../../../public/assets/images/homepage/storeFront/4-domain.png";
import launch from "../../../../public/assets/images/homepage/storeFront/5-launch.png";
import Link from "next/link";
import MobileStoreFront from "./MobileStoreFront";

const StoreFront = () => {
  const storeData = [
    {
      data: (
        <>
          Easily set up <br /> your storefront
        </>
      ),
    },

    {
      data: (
        <>
          Custom Built
          <br /> Solutions
        </>
      ),
    },

    {
      data: (
        <>
          Overcome Visa and <br />
          Residency Challenges
        </>
      ),
    },

    {
      data: (
        <>
          Organic <br /> Leads
        </>
      ),
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

  const images = [manage, product, theme, domain, launch];
  const currentImageIndex = useImageTransition(images, 2000);

  return (
    <div className="bg-[#E1DDEE]">
      <div className="mx-auto hidden max-w-7xl lg:block">
        <div className="mx-auto w-[85%] py-10 ">
          <div className="space-y-5">
            <h2 className="text-center font-clashSemiBold text-[32px] text-[#140B31] xl:text-[40px]">
              Get your personalized digital storefront
            </h2>

            <p className="text-left font-satoshi text-[30px] font-[900] text-[#381F8C]">
              Own your virtual store front hassel free
            </p>

            <div className="flex justify-between  py-5">
              {storeData.map((eachData, index) => (
                <div
                  className={clsx(
                    "flex w-1/4 items-center space-x-4",
                    index === 3 && "pl-12 xl:pl-16",
                  )}
                  key={index}
                >
                  <div className="relative h-[28px] w-[28px] flex-shrink-0">
                    <Image
                      alt="CheckSign"
                      src={CheckSign}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <p className="font-satoshi text-[18px] font-[700] text-[#140B31] xl:text-[20px] ">
                    {eachData.data}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="my-5 ml-[4%]  flex  h-[650px] w-[90%] items-center justify-center rounded-[30px] bg-primary ">
            <div className="relative  mx-auto h-[550px]  w-[85%]  rounded-[15px] ">
              <Image
                src={images[currentImageIndex]}
                alt=""
                fill
                className="absolute rounded-[15px]"
              />
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              className="w-[130px] rounded-[50px] bg-primary p-3 font-satoshi
                                text-[16px] font-[700] text-[#EBE9F4] hover:bg-[#25135f]"
            >
              <Link href="/coming-soon">Rent a Shop</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <MobileStoreFront />
      </div>
    </div>
  );
};

export default StoreFront;

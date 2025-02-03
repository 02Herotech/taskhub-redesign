"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import CheckSign from "../../../../public/assets/images/homepage/YouCan/CheckSign.png";
import clsx from "clsx";
import Link from "next/link";
import Task1 from "../../../../public/assets/images/homepage/YouCan/task1.png";
import Task2 from "../../../../public/assets/images/homepage/YouCan/task2.png";
import aiAssist from "../../../../public/assets/images/homepage/YouCan/aiAssist.png";
import service1 from "../../../../public/assets/images/homepage/howTaskhubWorks/service-provider/service1.png";
import service2 from "../../../../public/assets/images/homepage/howTaskhubWorks/service-provider/service2.png";
import MobileYouCan from "./MobileYouCan";

const YouCan = () => {
  const YouCanData = [
    {
      data: (
        <>
          Find the right professional <br /> in one place.
        </>
      ),
    },

    {
      data: (
        <>
          Choose from a range of
          <br /> services and experts.
        </>
      ),
    },

    {
      data: (
        <>
          Save time and money with <br />
          multiple bids.
        </>
      ),
    },
  ];

  const serviceProviderParams = new URLSearchParams({
    userType: "Service Provider",
  });

  const session = useSession();
  const router = useRouter();
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";

  const handleBecomeSP = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      );

      await signOut({
        redirect: false,
      });

      console.log("Sign Out: ", response);

      if (response.status === 200) {
        router.push(`/auth/sign-up?${serviceProviderParams.toString()}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      );
      console.log("Sign Out: ", response);

      if (response.status === 200) {
        await signOut({
          redirect: false,
        });
        router.push("/customer/add-task");
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const images = [Task1, Task2];
  const currentImageIndex = useImageTransition(images, 2000);

  const SpImages = [service1, service2];
  const currentSpImageIndex = useImageTransition(SpImages, 3000);

  return (
    <div className="bg-[#EBE9F4]">
      <div className=" mx-auto hidden max-w-7xl lg:block">
        <div className="mx-auto w-[85%] py-10 ">
          <div className="space-y-5">
            <h2 className="text-center font-clashSemiBold text-[32px] text-[#2A1769] xl:text-[40px]">
              {" "}
              With Oló<span className="text-tc-orange">jà</span>, you can:
            </h2>

            <div className="flex justify-between  py-5">
              {YouCanData.map((eachData, index) => (
                <div
                  className={clsx(
                    "flex w-1/3 items-center space-x-4",
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

            <div className="flex justify-between">
              <div className="flex w-1/3 flex-col items-center gap-16">
                <div className="mx-auto flex  h-[350px] w-full items-center justify-center rounded-[30px] bg-[#2A1769] ">
                  <div className="relative mx-auto h-[300px]  w-[85%]  rounded-[15px] ">
                    <Image
                      src={images[currentImageIndex]}
                      alt=""
                      fill
                      className="absolute rounded-[15px]"
                    />
                  </div>
                </div>

                <Image
                  src={aiAssist}
                  alt="Ai assist"
                  height={150}
                  width={150}
                />
              </div>

              <div className="w-1/3">
                <div className="pl-4 pt-20">
                  <span className="hidden xl:block">
                    <svg
                      width="340"
                      height="226"
                      viewBox="0 0 409 266"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M158.14 125.535L158.227 126.531L158.14 125.535ZM407.579 261.434C408.075 261.191 408.281 260.593 408.038 260.096L404.09 252.009C403.848 251.512 403.249 251.307 402.752 251.549C402.256 251.791 402.05 252.39 402.293 252.886L405.802 260.075L398.613 263.585C398.117 263.827 397.911 264.426 398.154 264.922C398.396 265.419 398.995 265.625 399.491 265.382L407.579 261.434ZM1.13975 1.53505C0.752603 2.45707 0.753557 2.45747 0.755541 2.4583C0.757581 2.45916 0.760596 2.46043 0.764664 2.46214C0.7728 2.46556 0.785039 2.4707 0.801342 2.47756C0.833949 2.49128 0.88281 2.51185 0.947614 2.53917C1.07722 2.59381 1.2706 2.67545 1.52523 2.78325C2.0345 2.99886 2.7888 3.31912 3.76807 3.73739C5.72663 4.57393 8.58502 5.80247 12.1827 7.3698C19.3783 10.5045 29.5307 14.9941 41.356 20.4129C65.0103 31.2522 95.3431 45.8024 122.092 60.6593C135.467 68.088 147.931 75.5856 158.211 82.7274C168.509 89.8822 176.543 96.6317 181.122 102.553C183.412 105.515 184.777 108.193 185.184 110.548C185.581 112.852 185.072 114.882 183.512 116.681C181.914 118.523 179.156 120.185 174.939 121.543C170.735 122.896 165.167 123.918 158.053 124.539L158.227 126.531C165.425 125.903 171.154 124.862 175.552 123.446C179.937 122.035 183.087 120.223 185.023 117.991C186.997 115.715 187.649 113.071 187.155 110.208C186.669 107.397 185.09 104.415 182.704 101.33C177.931 95.1571 169.688 88.266 159.352 81.0849C148.997 73.8908 136.469 66.3571 123.063 58.9108C96.2488 44.0177 65.8629 29.4429 42.1891 18.5947C30.3504 13.1697 20.1863 8.67497 12.9815 5.53624C9.37905 3.96685 6.51625 2.7364 4.55366 1.89814C3.57236 1.47901 2.8161 1.15791 2.30496 0.94151C2.04938 0.83331 1.85509 0.751281 1.72457 0.696258C1.65932 0.668746 1.61001 0.647986 1.57696 0.63408C1.56043 0.627127 1.54797 0.621888 1.53961 0.618376C1.53544 0.61662 1.53226 0.615284 1.53016 0.614405C1.52801 0.613503 1.5269 0.613032 1.13975 1.53505ZM158.053 124.539C150.858 125.167 145.455 126.253 141.693 127.772C137.955 129.281 135.611 131.317 134.991 133.98C134.377 136.619 135.557 139.457 137.815 142.325C140.095 145.223 143.627 148.352 148.152 151.655C166.235 164.858 201.043 181.461 239.312 197.706C277.614 213.965 319.491 229.909 351.787 241.786C367.936 247.725 381.692 252.649 391.411 256.087C396.27 257.806 400.121 259.155 402.756 260.073C404.074 260.532 405.089 260.884 405.773 261.121C406.116 261.24 406.376 261.33 406.551 261.39C406.638 261.42 406.704 261.443 406.748 261.458C406.77 261.465 406.787 261.471 406.798 261.475C406.803 261.477 406.808 261.478 406.81 261.479C406.813 261.48 406.815 261.481 407.14 260.535C407.465 259.589 407.464 259.589 407.461 259.588C407.458 259.587 407.454 259.586 407.449 259.584C407.438 259.58 407.421 259.574 407.399 259.567C407.355 259.552 407.29 259.529 407.203 259.499C407.029 259.439 406.769 259.349 406.428 259.231C405.744 258.995 404.731 258.643 403.414 258.184C400.781 257.267 396.934 255.92 392.078 254.202C382.365 250.765 368.617 245.845 352.477 239.909C320.195 228.037 278.353 212.105 240.093 195.865C201.799 179.609 167.201 163.087 149.331 150.04C144.867 146.781 141.502 143.777 139.386 141.089C137.248 138.371 136.535 136.17 136.939 134.434C137.337 132.722 138.925 131.047 142.442 129.626C145.934 128.216 151.109 127.153 158.227 126.531L158.053 124.539Z"
                        fill="#381F8C"
                      />
                    </svg>
                  </span>

                  <span className="block xl:hidden">
                    <svg
                      width="280"
                      height="190"
                      viewBox="0 0 409 266"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M158.14 125.535L158.227 126.531L158.14 125.535ZM407.579 261.434C408.075 261.191 408.281 260.593 408.038 260.096L404.09 252.009C403.848 251.512 403.249 251.307 402.752 251.549C402.256 251.791 402.05 252.39 402.293 252.886L405.802 260.075L398.613 263.585C398.117 263.827 397.911 264.426 398.154 264.922C398.396 265.419 398.995 265.625 399.491 265.382L407.579 261.434ZM1.13975 1.53505C0.752603 2.45707 0.753557 2.45747 0.755541 2.4583C0.757581 2.45916 0.760596 2.46043 0.764664 2.46214C0.7728 2.46556 0.785039 2.4707 0.801342 2.47756C0.833949 2.49128 0.88281 2.51185 0.947614 2.53917C1.07722 2.59381 1.2706 2.67545 1.52523 2.78325C2.0345 2.99886 2.7888 3.31912 3.76807 3.73739C5.72663 4.57393 8.58502 5.80247 12.1827 7.3698C19.3783 10.5045 29.5307 14.9941 41.356 20.4129C65.0103 31.2522 95.3431 45.8024 122.092 60.6593C135.467 68.088 147.931 75.5856 158.211 82.7274C168.509 89.8822 176.543 96.6317 181.122 102.553C183.412 105.515 184.777 108.193 185.184 110.548C185.581 112.852 185.072 114.882 183.512 116.681C181.914 118.523 179.156 120.185 174.939 121.543C170.735 122.896 165.167 123.918 158.053 124.539L158.227 126.531C165.425 125.903 171.154 124.862 175.552 123.446C179.937 122.035 183.087 120.223 185.023 117.991C186.997 115.715 187.649 113.071 187.155 110.208C186.669 107.397 185.09 104.415 182.704 101.33C177.931 95.1571 169.688 88.266 159.352 81.0849C148.997 73.8908 136.469 66.3571 123.063 58.9108C96.2488 44.0177 65.8629 29.4429 42.1891 18.5947C30.3504 13.1697 20.1863 8.67497 12.9815 5.53624C9.37905 3.96685 6.51625 2.7364 4.55366 1.89814C3.57236 1.47901 2.8161 1.15791 2.30496 0.94151C2.04938 0.83331 1.85509 0.751281 1.72457 0.696258C1.65932 0.668746 1.61001 0.647986 1.57696 0.63408C1.56043 0.627127 1.54797 0.621888 1.53961 0.618376C1.53544 0.61662 1.53226 0.615284 1.53016 0.614405C1.52801 0.613503 1.5269 0.613032 1.13975 1.53505ZM158.053 124.539C150.858 125.167 145.455 126.253 141.693 127.772C137.955 129.281 135.611 131.317 134.991 133.98C134.377 136.619 135.557 139.457 137.815 142.325C140.095 145.223 143.627 148.352 148.152 151.655C166.235 164.858 201.043 181.461 239.312 197.706C277.614 213.965 319.491 229.909 351.787 241.786C367.936 247.725 381.692 252.649 391.411 256.087C396.27 257.806 400.121 259.155 402.756 260.073C404.074 260.532 405.089 260.884 405.773 261.121C406.116 261.24 406.376 261.33 406.551 261.39C406.638 261.42 406.704 261.443 406.748 261.458C406.77 261.465 406.787 261.471 406.798 261.475C406.803 261.477 406.808 261.478 406.81 261.479C406.813 261.48 406.815 261.481 407.14 260.535C407.465 259.589 407.464 259.589 407.461 259.588C407.458 259.587 407.454 259.586 407.449 259.584C407.438 259.58 407.421 259.574 407.399 259.567C407.355 259.552 407.29 259.529 407.203 259.499C407.029 259.439 406.769 259.349 406.428 259.231C405.744 258.995 404.731 258.643 403.414 258.184C400.781 257.267 396.934 255.92 392.078 254.202C382.365 250.765 368.617 245.845 352.477 239.909C320.195 228.037 278.353 212.105 240.093 195.865C201.799 179.609 167.201 163.087 149.331 150.04C144.867 146.781 141.502 143.777 139.386 141.089C137.248 138.371 136.535 136.17 136.939 134.434C137.337 132.722 138.925 131.047 142.442 129.626C145.934 128.216 151.109 127.153 158.227 126.531L158.053 124.539Z"
                        fill="#381F8C"
                      />
                    </svg>
                  </span>
                </div>

                <div className="space-y-14 pl-4 lg:mt-[-160px] xl:mt-[-200px] xl:space-y-12">
                  <div className="space-y-14 xl:space-y-12">
                    <h2 className="text-left font-clashSemiBold text-[28px] font-[700] text-tc-orange xl:text-[32px]">
                      POST A TASK IN <br /> FEW STEPS
                    </h2>

                    <button className="w-[250px] rounded-[50px] bg-tc-orange p-3 font-satoshi text-[16px] font-[500] text-white hover:bg-[#e79823] lg:w-[175px] xl:w-[190px]">
                      {isServiceProvider ? (
                        <p onClick={handlePostTask}>Post a task for free</p>
                      ) : (
                        <Link href="/customer/add-task">
                          Post a task for free
                        </Link>
                      )}
                    </button>
                  </div>

                  <div className="space-y-14 pl-14 xl:space-y-12 xl:pl-24">
                    <h2 className="text-left font-clashSemiBold text-[24px] font-[700] text-primary xl:text-[28px]">
                      LIST YOUR <br /> SERVICE WITH AI <br /> ASSISTANCE
                    </h2>

                    <button className="w-[130px] rounded-[50px] bg-primary p-3 font-satoshi text-[16px] font-[500] text-white hover:bg-[#25135f]">
                      {!isServiceProvider ? (
                        <div
                          onClick={handleBecomeSP}
                          className="flex items-center justify-center"
                        >
                          <p className="font-satoshiMedium">Post listing</p>
                        </div>
                      ) : (
                        <Link
                          href={`/provide-service`}
                          className="flex items-center justify-center"
                        >
                          <p className="">Post listing</p>
                        </Link>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-1/3 pt-36">
                <div className="mx-auto  flex h-[420px] w-[90%] items-center justify-center rounded-[30px] bg-tc-orange ">
                  <div className="relative mx-auto h-[380px] w-[85%] rounded-[15px] ">
                    <Image
                      src={SpImages[currentSpImageIndex]}
                      alt=""
                      fill
                      className="absolute rounded-[15px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <MobileYouCan />
      </div>
    </div>
  );
};

export default YouCan;

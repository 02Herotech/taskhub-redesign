"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import heroImage1 from "../../../../public/assets/images/homepage/hero/1.png";
import heroImage1a from "../../../../public/assets/images/homepage/hero/1a.png";
import heroImage2 from "../../../../public/assets/images/homepage/hero/2.png";
import heroImage2a from "../../../../public/assets/images/homepage/hero/2a.png";
import heroImage3 from "../../../../public/assets/images/homepage/hero/3.png";
import heroImage3a from "../../../../public/assets/images/homepage/hero/3a.png";
import heroImage4 from "../../../../public/assets/images/homepage/hero/4.png";
import heroImage4a from "../../../../public/assets/images/homepage/hero/4a.png";
import icon1 from "../../../../public/assets/images/homepage/hero/customer.png";
import icon2 from "../../../../public/assets/images/homepage/hero/done.png";
import icon3 from "../../../../public/assets/images/homepage/hero/review.png";
import tested from "../../../../public/assets/images/homepage/hero/tested.jpg";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const useImageTransition = (images: any, transitionDuration: any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Change image after the specified duration
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, transitionDuration);

    return () => clearInterval(interval); // Cleanup function to clear interval
  }, [images.length, transitionDuration]);

  return currentImageIndex;
};

interface searchListing {
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
  businessPictures: [""];
}

const HeroSection = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const customerParams = new URLSearchParams({ userType: "customer" });
  const serviceProviderParams = new URLSearchParams({ userType: "serviceProvider" });

  // Image1 transition
  const images1 = [heroImage1, heroImage1a];
  const currentImageIndex1 = useImageTransition(images1, 3000);

  // Image2 transition
  const images2 = [heroImage2, heroImage2a];
  const currentImageIndex2 = useImageTransition(images2, 3000);

  // Image3 transition
  const images3 = [heroImage3, heroImage3a];
  const currentImageIndex3 = useImageTransition(images3, 3000);

  // Image4 transition
  const images4 = [heroImage4, heroImage4a];
  const currentImageIndex4 = useImageTransition(images4, 3000);

  return (
    <div
      className={` w-full bg-gradient-to-b from-[#f3dcfc] via-[#f5f1f7] to-[#FFFFFF] m-0`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center lg:justify-between justify-center gap-5 p-5 lg:pb-20 pt-[100px] lg:px-12 xl:px-8  `}
      >
        <div className={`flex lg:w-[45%] flex-col justify-around text-black `}>
          <div className={`flex flex-col`}>
          <h1
              className={ `hidden lg:block text-primary font-medium mb-5 lg:mt-[3rem] text-center lg:text-left lg:text-[65px] text-[35px]  leading-tight lg:w-[500px] w-full !font-clashDisplay
             `}
            >
              <span className="flex items-center gap-4">FIND <div className="rounded-full w-2 h-2 bg-primary "></div></span>


              <span className="flex items-center gap-4">CONNECT <div className="rounded-full w-2 h-2 bg-primary "></div></span>

              <span className="flex items-center gap-4">GET IT DONE <div className="rounded-full w-2 h-2 bg-primary "></div></span>
            </h1>

            <h1
              className={`lg:hidden text-primary font-medium mb-5 lg:mt-[3rem] text-center lg:text-left lg:text-[65px] text-[35px]  leading-tight lg:w-[500px] w-full !font-clashDisplay
             flex flex-col justify-center items-center`}
            >
              <span className="flex items-center gap-4">FIND <div className="rounded-full w-2 h-2 bg-primary "></div></span>


              <span className="flex items-center gap-4">CONNECT <div className="rounded-full w-2 h-2 bg-primary "></div></span>

              <span className="flex items-center gap-4">GET IT DONE <div className="rounded-full w-2 h-2 bg-primary "></div></span>
            </h1>



            <p className={` text-center lg:text-left lg:w-[400px] font-[500] lg:text-[20px] text-[15px] text-[#190E3F] `}
            >
              Our user-friendly platform ensures a seamless
              experience, allowing you to effortlessly find,
              connect, and engage with the perfect service
              professionals.<br className="lg:hidden"/>  <span className="border-[1px] border-[#FE9B07] text-[#FE9B07] bg-[#FFF5E6] rounded-[50px] text-[10px] px-3 py-1"> Beta Version</span>
            </p>
          </div>

          <div className="flex flex-col  items-center justify-center lg:justify-start lg:items-start">
            <div className={`lg:my-10 my-5 flex lg:flex-row lg:space-x-3 lg:space-y-0 space-y-4 flex-col items-center justify-center`}>
              <div className="">
                <button
                  className=" rounded-[50px] bg-primary xl:text-[16px]
           xl:px-7 lg:px-3 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] lg:w-[155px]  "
                >
                
                  <Link href="/customer/add-task">
                      Post your first task
                    </Link>
                
                </button>
              </div>

              <div>
                <button
                  className=" rounded-[50px] w-[250px] bg-[#FE9B07] text-[#FFF5E6] xl:text-[16px] 
                          px-3 py-2    hover:bg-[#e79823]  "
                >
                    <Link
                    href={`/auth/sign-up?${serviceProviderParams.toString()}`}
                      className="flex items-center justify-center"
                    >
                      <p className="">Become a Service Provider</p>

                    </Link>
             
                </button>
              </div>


            </div>

            <div className="flex gap-3">
              <span>
                <Image src={tested} height={25} width={25} alt="tested"/>
              </span>
              <p className=" text-[#321C7E] font-medium ">
              Tested and Trusted.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col xl:w-[50%] space-y-4">
          <div className=" justify-center flex xl:justify-between">
            <div className="flex flex-col">
              <div className="">
                <Image
                  src={images1[currentImageIndex1]}
                  alt=""
                  className={`w-[270px] xl:w-[310px] opacity-0 transition-opacity duration-1000 ease-in-out`}
                  onLoadingComplete={(image) =>
                    image.classList.remove("opacity-0")
                  }
                />
              </div>
              <div className="">
                <Image
                  src={images3[currentImageIndex3]}
                  alt=""
                  className={`w-[270px] xl:w-[310px] opacity-0 transition-opacity duration-1000 ease-in-out`}
                  onLoadingComplete={(image) =>
                    image.classList.remove("opacity-0")
                  }
                />
              </div>
            </div>
            <div className="flex flex-col  ">
              <div>
                <Image
                  src={images2[currentImageIndex2]}
                  alt=""
                  className={`w-[270px] xl:w-[310px] opacity-0 transition-opacity duration-1000 ease-in-out `}
                  onLoadingComplete={(image) =>
                    image.classList.remove("opacity-0")
                  }
                />
              </div>
              <div>
                <Image
                  src={images4[currentImageIndex4]}
                  alt="img"
                  className={`w-[270px] xl:w-[310px] opacity-0 transition-opacity duration-1000 ease-in-out`}
                  onLoadingComplete={(image) =>
                    image.classList.remove("opacity-0")
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HeroSection;

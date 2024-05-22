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
        router.push("/auth");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            router.push("/auth");
        }
    } catch (error) {
        console.error(error);
    }
};

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
              className={`mb-5 lg:mt-[3rem] text-center lg:text-left lg:text-[50px] text-[35px] font-[600] leading-tight lg:w-[500px] w-full !font-clashDisplay`}
            >
              Get Quick
              <br />
              And <span className={`font-[800] text-primary  bg-gradient-to-b from-[#1612C1] to-[#2E095DF2] via-[#32204A59] !bg-clip-text text-transparent`}>Efficient</span> <br /> Services

            </h1>



            <p className={` text-center lg:text-left lg:w-[400px] font-[500] lg:text-[20px] text-[15px] text-[#190E3F] `}
            >
              Our user-friendly platform ensures a seamless
              experience, allowing you to effortlessly find,
              connect, and engage with the perfect service
              professionals.
            </p>
          </div>

          <div className="flex lg:flex-col flex-col-reverse items-center justify-center lg:justify-start lg:items-start">
            <div className={`lg:my-10 my-5 flex lg:flex-row lg:space-x-3 lg:space-y-0 space-y-4 flex-col items-center justify-center`}>
              <div className="">
                <button
                  className=" rounded-[50px] bg-primary xl:text-[16px]
           xl:px-7 lg:px-3 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] lg:w-[155px]  "
                >
                  {/* {session?.user?.user?.roles[0] === "SERVICE_PROVIDER" ? (
                    <p onClick={handlePostTask}>Post your first task</p>
                  ) : ( */}
                  <Link href={`/auth/sign-up?${customerParams.toString()}`}>
                      Post your first task
                    </Link>
                  {/* )}   */}
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
                  {/* )} */}
                </button>
              </div>


            </div>

            <div className="lg:w-[500px] mt-5 lg:mt-0 w-[250px] flex items-center justify-between rounded-xl border-[1.5px] border-grey3 bg-white px-8 py-4 ">
              <div className="relative w-[30%] ">
                <p className="text-[#381F8C]  font-bold lg:text-[18px] text-[9px]">
                  1k+ <br /> customers
                </p>
                <span className="lg:block hidden absolute right-10 top-[1px] text-[#FE9B07] lg:text-[18px] text-[9px]">
                  <Image src={icon1} width={25} alt=""></Image>
                </span>


                <span className="lg:hidden absolute  left-8 top-[-3px]  text-[#FE9B07]  text-[9px]">

                  <Image src={icon1} width={15} alt="" className=" lg:hidden"></Image>
                </span>
              </div>


              <div className="relative  w-[30%]">
                <p className="text-[#381F8C]  font-bold lg:text-[18px] text-[9px]">
                  2.5k <br /> tasks done
                </p>

                <span className="lg:block hidden absolute right-10 top-[-2px] text-[#FE9B07] lg:text-[18px] text-[9px]">
                  <Image src={icon2} width={20} alt=""></Image>
                </span>


                <span className="lg:hidden absolute  left-8 top-[-3px]  text-[#FE9B07]  text-[9px]">

                  <Image src={icon2} width={10} alt="" className=" lg:hidden"></Image>
                </span>
              </div>
              <div className="relative  w-[33%]">
                <p className="lg:text-[18px] text-[9px]  font-bold text-[#381F8C] ">
                  4k+ <br /> user reviews
                </p>

                <span className="lg:block hidden absolute right-10 top-[-3px] text-[#FE9B07] lg:text-[18px] text-[9px]">
                  <Image src={icon3} width={25} alt=""></Image>
                </span>


                <span className="lg:hidden absolute  left-8 top-[-3px]  text-[#FE9B07]  text-[9px]">

                  <Image src={icon3} width={15} alt="" className=" lg:hidden"></Image>
                </span>

              </div>
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

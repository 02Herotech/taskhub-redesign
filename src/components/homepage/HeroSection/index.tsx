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
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

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

const HeroSection = () => {

  const serviceProviderParams = new URLSearchParams({ userType: "serviceProvider" });

  const session = useSession();
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";

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

  let find = ['F', 'I', 'N', 'D']
  let connect = ['C', 'O', 'N', 'N', 'E', 'C', 'T']
  let get = ['G', 'E', 'T']
  let it = ['I', 'T']
  let done = ['D', 'O', 'N', 'E']

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
              className={`hidden lg:block text-primary font-medium mb-5 lg:mt-[3rem] text-center lg:text-left lg:text-[65px] text-[35px]  leading-tight lg:w-[500px] w-full font-clashMedium
             `}
            >
              <span className="flex">
                {find.map((eachLetter, i) => (
                  <motion.span className="flex items-center gap-4"
                    key={i}
                    initial={{ opacity: 0, translateY: 100 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}>

                    {eachLetter}

                  </motion.span>
                ))}
              </span>


              <span className="flex">
                {connect.map((eachLetter, i) => (
                  <motion.span className="flex items-center gap-4"
                    key={i}
                    initial={{ opacity: 0, translateY: 100 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 + 1 }}>

                    {eachLetter}

                  </motion.span>
                ))}
              </span>

              <span className="flex space-x-3 xl:space-x-4">
                <span className="flex">
                  {get.map((eachLetter, i) => (
                    <motion.span className="flex items-center gap-4"
                      key={i}
                      initial={{ opacity: 0, translateY: 100 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 + 2 }}>

                      {eachLetter}

                    </motion.span>
                  ))}
                </span>
                <span className="flex">   {it.map((eachLetter, i) => (
                  <motion.span className="flex items-center gap-4"
                    key={i}
                    initial={{ opacity: 0, translateY: 100 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 + 2.2 }}>

                    {eachLetter}

                  </motion.span>
                ))}</span>
                <span className="flex">
                  {done.map((eachLetter, i) => (
                    <motion.span className="flex items-center gap-4"
                      key={i}
                      initial={{ opacity: 0, translateY: 100 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 + 2.3 }}>

                      {eachLetter}

                    </motion.span>
                  ))}
                </span>
              </span>
            </h1>

            <h1
              className={`lg:hidden text-primary font-medium mb-5 lg:mt-[3rem] text-center lg:text-left lg:text-[65px] text-[35px]  leading-tight lg:w-[500px] w-full !font-clashMedium
             flex flex-col justify-center items-center`}
            >
              <span className="flex">
                {find.map((eachLetter, i) => (
                  <motion.span className="flex items-center gap-4"
                    key={i}
                    initial={{ opacity: 0, translateY: 100 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}>

                    {eachLetter}

                  </motion.span>
                ))}
              </span>

              <span className="flex">
                {connect.map((eachLetter, i) => (
                  <motion.span className="flex items-center gap-4"
                    key={i}
                    initial={{ opacity: 0, translateY: 100 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 + 1 }}>

                    {eachLetter}

                  </motion.span>
                ))}
              </span>

              <span className="flex space-x-2">
                <span className="flex">
                  {get.map((eachLetter, i) => (
                    <motion.span className="flex items-center gap-4"
                      key={i}
                      initial={{ opacity: 0, translateY: 100 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 + 2 }}>

                      {eachLetter}

                    </motion.span>
                  ))}
                </span>
                <span className="flex">   {it.map((eachLetter, i) => (
                  <motion.span className="flex items-center gap-4"
                    key={i}
                    initial={{ opacity: 0, translateY: 100 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 + 2.2 }}>

                    {eachLetter}

                  </motion.span>
                ))}</span>
                <span className="flex">
                  {done.map((eachLetter, i) => (
                    <motion.span className="flex items-center gap-4"
                      key={i}
                      initial={{ opacity: 0, translateY: 100 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 + 2.3 }}>

                      {eachLetter}

                    </motion.span>
                  ))}
                </span>
              </span>
            </h1>



            <p className={` text-center lg:text-left lg:w-[400px] font-[500] lg:text-[20px] text-[15px] text-[#190E3F] font-satoshiMedium `}
            >
              Our user-friendly <span className="text-[#FE9B07]">AI</span> enabled platform ensures a seamless experience, allowing you to effortlessly find, connect and engage with the perfect service professionals.<br className="lg:hidden" />  <span className=" text-[#ffffff] bg-[#4CAF50] rounded-[50px] text-[10px] px-3 py-1 font-satoshiMedium"> Beta</span>
            </p>
          </div>

          <div className="flex flex-col  items-center justify-center lg:justify-start lg:items-start">
            <div className={`lg:my-10 my-5 flex lg:flex-row lg:space-x-3 lg:space-y-0 space-y-4 flex-col items-center justify-center`}>
              <div className="">
                <button
                  className=" rounded-[50px] bg-primary xl:text-[16px]
                  xl:px-3   lg:px-3 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] lg:w-[175px]  "
                >

                  <Link href="/customer/add-task">
                    Post at no cost today
                  </Link>


                </button>
              </div>

              <div>
                <button
                  className=" rounded-[50px] w-[250px] lg:w-[230px] xl:w-[250px] bg-[#FE9B07] text-[#FFF5E6] xl:text-[16px] 
                      lg:px-2    px-3 py-2    hover:bg-[#e79823]  "
                >

                  {!isServiceProvider ? (<Link
                    href={`/auth/sign-up?${serviceProviderParams.toString()}`}
                    className="flex items-center justify-center"
                  >
                    <p className="">Become a Service Provider</p>

                  </Link>) : (<Link
                    href={`/service-provider/profile`}
                    className="flex items-center justify-center"
                  >
                    <p className="">Become a Service Provider</p>

                  </Link>)}





                </button>
              </div>


            </div>

            <Link href={'how-taskhub-works/customer'}>
              <p className="text-[#FE9B07] hover:underline text-[16px]  font-bold flex items-center lg:pl-4 lg:mb-6 space-x-2 mb-3 font-satoshiMedium "><span>Learn how Taskhub works</span>
                <span className="-rotate-45"> <FaArrowRight size={15} /></span>
              </p>
            </Link>

            <div className="flex gap-3">
              <span>
                <Image src={tested} height={25} width={25} alt="tested" />
              </span>
              <p className=" text-[#321C7E] font-medium font-clashMedium ">
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

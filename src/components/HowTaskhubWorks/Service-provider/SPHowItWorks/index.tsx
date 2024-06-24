'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ServiceProvider1 from "../../../../../public/assets/images/homepage/howTaskhubWorks/service-provider/service-provider1.jpg";
import ServiceProvider2 from "../../../../../public/assets/images/homepage/howTaskhubWorks/service-provider/service-provider2.jpg";
import ServiceProvider3 from "../../../../../public/assets/images/homepage/howTaskhubWorks/service-provider/service-provider3.jpg";


import icon1 from "../../../../../public/assets/images/homepage/howTaskhubWorks/service-provider/getStartedIcon1.png";

import service1 from "../../../../../public/assets/images/homepage/howTaskhubWorks/service-provider/service1.png";
import service2 from "../../../../../public/assets/images/homepage/howTaskhubWorks/service-provider/service2.png";


const SPHowItWorks = () => {
  const serviceProviderParams = new URLSearchParams({ userType: "serviceProvider" });


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

  const images1 = [service1, service2];
  const currentImageIndex1 = useImageTransition(images1, 2000);

  return (
    <div >

      <div className='flex flex-col items-center'>
        <h2 className='text-center lg:text-[35px] text-[20px] font-[600] font-clashMedium text-tc-orange'>
          How  it works ?
        </h2>

        <p className='text-center lg:text-[35px] text-[20px] font-[600] font-clashMedium text-primary xl:w-[60%] lg:w-[85%] my-6'>
          Earn your way to Financial <br /> freedom as a <span className='text-tc-orange'>Service provider</span>   on <br className='md:block hidden'/> TaskHub
        </p>
      </div>


      <div className='lg:flex justify-between mt-5 '>

        <div className='lg:w-[50%] space-y-4'>
          <p className='text-primary lg:text-[32px] text-[18px] font-[600] font-clashMedium'>
            Tell us your service details  &  Upload your service image.
          </p>

          <div className='flex  space-x-3'>
            <div className='rounded-[100%] h-2 w-2 bg-primary lg:mt-3 mt-2'>

            </div>
            <p className='text-primary lg:text-[20px] text-[16px] font-satoshiMedium w-[95%]'>Choose your service name, find the best category and subcategory for your service and proceed to give a detailed description. The best part is, we make it easy for you with our AI Assistance.</p>
          </div>

          <div className='flex justify-between ml-6'>
            <div className='relative w-[48%] rounded-[30px] lg:h-[250px] h-[180px]'>
              <Image
                src={ServiceProvider1}
                alt="Customer 2"
                fill
                className="absolute rounded-[30px]"
              />
            </div>
            <div className='relative w-[48%] rounded-[30px] lg:h-[250px] h-[180px]'>
              <Image
                src={ServiceProvider2}
                alt="Customer 3"
                fill
                className="absolute rounded-[30px]"
              />
            </div>
          </div>

          <div className='flex  space-x-3'>
            <div className='rounded-[100%] h-2 w-2 bg-primary lg:mt-3 mt-2'>

            </div>
            <p className='text-primary lg:text-[20px] text-[16px] font-satoshiMedium w-[95%]'>Input details of your pricing plans, choose a service type, physical or remote.</p>
          </div>

          <div className='flex  space-x-3'>
            <div className='rounded-[100%] h-2 w-2 bg-primary lg:mt-3 mt-2'>

            </div>
            <p className='text-primary lg:text-[20px] text-[16px] font-satoshiMedium w-[95%]'>Add information about your availability (days and time), Then upload service images or generate with AI and you’re all done.</p>
          </div>

          <div className='hidden lg:block'>
            <button
              className=" rounded-[50px] lg:w-[230px] xl:w-[250px] bg-[#FE9B07] text-[#FFF5E6] xl:text-[16px] 
                      lg:px-2    px-3 py-2 font-satoshiMedium  hover:bg-[#e79823]  "
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

        <div className='lg:w-[40%]  flex flex-col space-y-6 lg:mt-0 mt-10'>

          <div className='relative w-full lg:flex-none flex items-center justify-center'>
            <div className='relative lg:w-full w-[90%] mx-auto lg:h-[300px] h-[250px] rounded-[30px]'>
              <Image
                src={ServiceProvider3}
                alt="Customer 1"
                fill
                className="absolute rounded-[30px]"
              />

            </div>

            <div className="flex space-x-2 shadow-md items-center text-[12px] bg-[#EEE5FC] rounded-xl px-4 py-2 absolute lg:-left-20 -top-[20px] ">
              <Image src={icon1} width={25} alt="hand & dollar"></Image>
              <p className="font-bold text-primary text-[14px8">Payment has been made</p>
              <p className="text-[#969696] text-[14px8">2mins ago</p>
            </div>
          </div>

          <div className='h-[420px] lg:w-full w-[90%] mx-auto bg-tc-orange rounded-[30px] flex items-center justify-center '>
            <div className='relative h-[380px] w-[85%] mx-auto xl:w-[350px] rounded-[15px] ' >
              <Image
                src={images1[currentImageIndex1]}
                alt=""
                fill
                className="absolute rounded-[15px]"
              />
            </div>
          </div>

          <div className='lg:hidden flex items-center justify-center'>
            <button
              className=" rounded-[50px] w-[250px] bg-[#FE9B07] text-[#FFF5E6]
                         px-3 py-2 font-satoshiMedium text-[16px]    hover:bg-[#e79823]  "
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
      </div>
    </div>
  )
}

export default SPHowItWorks
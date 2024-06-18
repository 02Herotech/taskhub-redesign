'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import bannerImage from "../../../../public/assets/images/homepage/howTaskhubWorks/header-banner.jpg";
import Link from 'next/link';
import Image1 from "../../../../public/assets/images/homepage/howTaskhubWorks/image1.jpg";
import Image2 from "../../../../public/assets/images/homepage/howTaskhubWorks/image2.jpg";
import Image3 from "../../../../public/assets/images/homepage/howTaskhubWorks/image3.jpg";

import HeaderImage1 from "../../../../public/assets/images/homepage/howTaskhubWorks/headerImage1.jpg";
import HeaderImage2 from "../../../../public/assets/images/homepage/howTaskhubWorks/headerImage2.jpg";
import HeaderImage3 from "../../../../public/assets/images/homepage/howTaskhubWorks/headerImage3.jpg";


const Header = () => {
    const customerParams = new URLSearchParams({ userType: "customer" });

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

    const images1 = [HeaderImage1, HeaderImage2, HeaderImage3];
    const currentImageIndex1 = useImageTransition(images1, 3000);

    const images2 = [HeaderImage2, HeaderImage3, HeaderImage1];
    const currentImageIndex2 = useImageTransition(images2, 3000);

    const images3 = [HeaderImage3, HeaderImage1, HeaderImage2];
    const currentImageIndex3 = useImageTransition(images3, 3000);

    return (
        <div className='header1 lg:h-[600px] h-[450px] rounded-[25px] mx-auto w-[90%] lg:w-full  flex justify-between items-center !mt-20 mb-10 lg:mb-0'>

            <style jsx>{`
              .header1 {
                background-image: url(${bannerImage.src});
                background-size: cover;
                background-repeat: no-repeat;
              }

              @media (max-width: 468px) {
                .header1 {
                }
              }
            `}</style>


            <div className='hidden lg:flex justify-between items-center px-20'>
                <div className='xl:text-[65px] text-[35px] w-[50%] '>

                    <h2 className='text-[#EBE9F4] font-clashMedium'>
                        GET IT DONE!
                    </h2>

                    <p className='text-[24px] text-[#F8ECFD] font-satoshiMedium'>
                        A place where you can share task and connect with service providers.
                    </p>

                    <div className="">
                        <button
                            className=" rounded-[50px] bg-[#EBE9F4] text-[17px]
xl:px-7 lg:px-1 py-2 text-primary font-satoshi font-[900] hover:bg-[#e4e0f7]  xl:w-[200px] lg:w-[175px] h-[50px]  "
                        >

                            <Link href="/customer/add-task">
                                Post your first task
                            </Link>


                        </button>
                    </div>


               
                </div>

                <div className=''>

                    <div className='relative  w-[180px] z-10 mb-[-110px] ml-[-30px]'>


                        <div className="h-[150px] w-[150px] ml-[10px] bg-[#FE9B07] rounded-[15px] ">

                        </div>

                        <div className='absolute h-[150px] w-[150px] rounded-[15px] mt-[-160px] ' >
                            <Image
                                src={images1[currentImageIndex1]}
                                alt=""
                                fill
                                className=" rounded-[15px]"
                            />
                        </div>

                    </div>

                    <div className='relative xl:h-[389px] xl:w-[420px] h-[349px] w-[380px] rounded-[40px]' >
                        <Image
                            src={images2[currentImageIndex2]}
                            alt=""
                            fill
                            className=" rounded-[40px]"
                        />
                    </div>

                    <div className='relative mt-[-100px] left-[70%] w-[180px]'>
                        <div className="h-[150px] w-[140px] bg-[#FE9B07] rounded-[15px]">

                        </div>
                        <div className='absolute h-[150px] w-[150px] rounded-[15px] ml-[10px] !mt-[-140px]' >
                            <Image
                                src={images3[currentImageIndex3]}
                                alt=""
                                fill
                                className=" rounded-[15px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='lg:hidden md:mx-auto   flex flex-col justify-between items-center  h-[330px] '>


                <div className=''>

                    <div className='relative  w-[60px] z-10 mb-[-30px] ml-[-30px]'>


                        <div className="h-[52px] w-[57px] ml-[5px] bg-[#FE9B07] rounded-[10px] ">

                        </div>

                        <div className='absolute h-[52px] w-[57px] rounded-[10px] mt-[-58px] ' >
                            <Image
                                src={images1[currentImageIndex1]}
                                alt=""
                                fill
                                className=" rounded-[10px]"
                            />
                        </div>

                    </div>

                    <div className='relative md:w-[266px] md:h-[157px] w-[226px] h-[117px] rounded-[15px]' >
                        <Image
                            src={images2[currentImageIndex2]}
                            alt=""
                            fill
                            className=" rounded-[15px]"
                        />
                    </div>

                    <div className='relative  w-[60px] md:left-[85%] left-[75%] z-10 mt-[-35px]  '>


                        <div className="h-[52px] w-[57px] ml-[10px] bg-[#FE9B07] rounded-[10px] ">

                        </div>

                        <div className='absolute h-[52px] w-[57px] rounded-[10px] ml-[15px] !mt-[-47px] ' >
                            <Image
                                src={images3[currentImageIndex3]}
                                alt=""
                                fill
                                className=" rounded-[10px]"
                            />
                        </div>

                    </div>

                </div>



                <div className=' font-medium space-y-3 px-5  text-[20px]  '>

                    <h2 className='text-[#EBE9F4] font-clashMedium'>
                        GET IT DONE!
                    </h2>

                    <p className='text-[16px] w-[80%] text-[#F8ECFD] font-satoshiMedium'>
                        A place where you can share task and connect with service providers.
                    </p>

                    <div className="flex justify-center items-center">
                        <button
                            className=" rounded-[50px] bg-[#EBE9F4] text-[16px]
 py-2 text-primary font-satoshi font-[700] hover:bg-[#e4e0f7] w-[180px] px-4    "
                        >

                            <Link href="/customer/add-task">
                                Post your first task
                            </Link>

                        </button>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Header
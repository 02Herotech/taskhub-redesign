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
        <div className='relative lg:h-[600px] h-[450px] rounded-[25px] mx-auto w-[90%] lg:w-full  flex justify-between items-center  my-20 mt-20'>

            <Image
                src={bannerImage}
                alt="Banner Image"
                fill
                className="object-cover rounded-[25px]"
            />

            <div className='absolute  '>
                <div className='hidden lg:flex justify-between items-center px-20'>
                    <div className='text-white font-medium  xl:text-[65px] text-[35px] w-[50%] '>

                        <h2>
                            GET IT DONE!
                        </h2>

                        <p className='text-[24px]'>
                            A place where you can share task and connect with service providers.
                        </p>

                        <div className="">
                            <button
                                className=" rounded-[50px] bg-[#FE9B07] text-[16px]
xl:px-7 lg:px-1 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] lg:w-[165px]  "
                            >

                                <Link href={`/auth/sign-up?${customerParams.toString()}`}>
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

                <div className='lg:hidden absolute flex flex-col justify-between items-center   '>

                    {/* <div className='relative'>
                        <div className='absolute px-[28px]'>

                            <div className='relative  w-[110px] z-10 mb-[-80px] ml-[-30px]'>


                                <div className="h-[100px] w-[100px] ml-[10px] bg-[#FE9B07] rounded-[15px] ">

                                </div>

                                <div className='absolute h-[100px] w-[100px] rounded-[15px] mt-[-110px] ' >
                                    <Image
                                        src={images1[currentImageIndex1]}
                                        alt=""
                                        fill
                                        className=" rounded-[15px]"
                                    />
                                </div>

                            </div>

                            <div className='relative  w-[360px] h-[200px] rounded-[15px]' >
                                <Image
                                    src={images2[currentImageIndex2]}
                                    alt=""
                                    fill
                                    className=" rounded-[15px]"
                                />
                            </div>

                            <div className='relative  w-[110px] left-[75%] z-10  '>


                                <div className="h-[100px] w-[100px] ml-[10px] bg-[#FE9B07] rounded-[15px] ">

                                </div>

                                <div className='absolute h-[100px] w-[100px] rounded-[15px] ml-[15px] !mt-[-110px] ' >
                                    <Image
                                        src={images3[currentImageIndex3]}
                                        alt=""
                                        fill
                                        className=" rounded-[15px]"
                                    />
                                </div>

                            </div>

                        </div>
                    </div> */}


                    <div className='text-white font-medium space-y-3   text-[20px]  '>

                        <h2>
                            GET IT DONE!
                        </h2>

                        <p className='text-[16px] w-full'>
                            A place where you can share task and connect with service providers.
                        </p>

                        <div className="">
                            <button
                                className=" rounded-[50px] bg-[#FE9B07] text-[16px]
xl:px-7 lg:px-1 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] lg:w-[165px]  "
                            >

                                <Link href={`/auth/sign-up?${customerParams.toString()}`}>
                                    Post your first task
                                </Link>

                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Header
'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import CheckSign from "../../../../public/assets/images/homepage/storeFront/CheckSign.png";
import clsx from 'clsx';

import manage from "../../../../public/assets/images/homepage/storeFront/1-manage.png";
import product from "../../../../public/assets/images/homepage/storeFront/2-product.png";
import theme from "../../../../public/assets/images/homepage/storeFront/3-theme.png";
import domain from "../../../../public/assets/images/homepage/storeFront/4-domain.png";
import launch from "../../../../public/assets/images/homepage/storeFront/5-launch.png";
import Link from 'next/link';


const StoreFront = () => {
    const storeData = [

        {
            data: (
                <>
                    Easily set up <br /> your storefront
                </>
            )
        },

        {
            data: (
                <>
                    Custom Built<br /> Solutions
                </>
            )
        },

        {
            data: (
                <>
                    Overcome Visa and <br />Residency Challenges
                </>
            )
        },

        {
            data: (
                <>
                    Organic <br /> Leads
                </>
            )
        },
    ]

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
        <div className='bg-[#E1DDEE]'>

            <div className='mx-auto max-w-7xl'>
                <div className='w-[85%] mx-auto py-10 '>


                    <div className='space-y-5'>
                        <h2 className='xl:text-[40px] text-[32px] font-clashSemiBold text-[#140B31] text-center'>Get your personalized digital storefront</h2>

                        <p className='text-left font-satoshiMedium text-[30px] font-[500] text-[#381F8C]'>
                            Own your virtual store front hassel free
                        </p>

                        <div className='flex justify-between  py-5'>
                            {
                                storeData.map((eachData, index) => (
                                    <div className={clsx("flex items-center space-x-4 w-1/4",
                                        index === 3 && 'xl:pl-16 pl-12'
                                    )} key={index}>
                                        <div className="relative h-[28px] w-[28px] flex-shrink-0">
                                            <Image
                                                alt="CheckSign"
                                                src={CheckSign}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                        <p className='text-[#140B31] font-satoshi font-[700] xl:text-[20px] text-[18px] '>
                                            {eachData.data}
                                        </p>

                                    </div>
                                ))
                            }

                        </div>


                    </div>

                    <div className='h-[650px] ml-[4%]  w-[90%]  bg-primary rounded-[30px] flex items-center justify-center my-5 '>
                        <div className='relative  w-[85%] h-[550px]  mx-auto  rounded-[15px] ' >
                            <Image
                                src={images[currentImageIndex]}
                                alt=""
                                fill

                                className="absolute rounded-[15px]"
                            />
                        </div>
                    </div>

                    <div className='flex justify-center mt-10'>
                        

                        <button
                            className="rounded-[50px] bg-primary text-[16px] font-satoshi font-[700]
                                p-3 text-white hover:bg-[#25135f] w-[130px]"
                        >
                            <Link href="">
                                Rent a Shop
                            </Link>
                        </button>
                    </div>


                </div>

            </div>


        </div>
    )
}

export default StoreFront
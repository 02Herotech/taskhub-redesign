'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import CheckSign from "../../../../../public/assets/images/homepage/storeFront/CheckSign.png";
import clsx from 'clsx';
import manage from "../../../../../public/assets/images/homepage/storeFront/1-MobileManage.png";
import product from "../../../../../public/assets/images/homepage/storeFront/1-MobileManage.png";
import theme from "../../../../../public/assets/images/homepage/storeFront/1-MobileManage.png";
import domain from "../../../../../public/assets/images/homepage/storeFront/1-MobileManage.png";
import launch from "../../../../../public/assets/images/homepage/storeFront/1-MobileManage.png";
import Link from 'next/link';

const MobileStoreFront = () => {
    const storeData = [

        {
            data: (
                <>
                    Easily set up  your storefront
                </>
            )
        },

        {
            data: (
                <>
                    Custom Built Solutions
                </>
            )
        },

        {
            data: (
                <>
                    Overcome Visa and Residency <br /> Challenges
                </>
            )
        },

        {
            data: (
                <>
                    Organic Leads
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
        <div className='w-[90%] mx-auto py-10'>

            <h2 className=' text-[28px] font-clashBold text-[#2A1769] text-center'>Get your <br /> Personalized  <br /> Digital Storefront</h2>

            <p className='text-center font-satoshi text-[18px] font-[700] text-[#381F8C]'>
                Own your virtual store front <br /> hassel free
            </p>

            <div className='  py-5 space-y-5 w-[80%] mx-auto'>
                {
                    storeData.map((eachData, index) => (
                        <div className={clsx("flex items-center space-x-4",

                        )} key={index}>
                            <div className="relative h-[20px] w-[20px] flex-shrink-0">
                                <Image
                                    alt="CheckSign"
                                    src={CheckSign}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <p className='text-[#140B31] font-satoshi font-[800] text-[16px] '>
                                {eachData.data}
                            </p>

                        </div>
                    ))
                }

            </div>

            <Image
                src={images[currentImageIndex]}
                alt=''
                width={800}
                height={400}
                className='py-4'
            />

            <div className='flex justify-center mt-10'>
                <button
                    className="rounded-[50px] bg-primary text-[12px] font-satoshi font-[700]
        p-3 text-[#EBE9F4] hover:bg-[#25135f] w-[110px]"
                >
                    <Link href="">
                        Rent a Shop
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default MobileStoreFront
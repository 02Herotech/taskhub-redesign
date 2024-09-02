'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import CheckSign from "../../../../../public/assets/images/homepage/YouCan/CheckSign.png";
import clsx from 'clsx';
import Link from 'next/link';


import Task1 from "../../../../../public/assets/images/homepage/YouCan/task1.png";
import Task2 from "../../../../../public/assets/images/homepage/YouCan/task2.png";
import aiAssist from "../../../../../public/assets/images/homepage/YouCan/aiAssist.png";
import service1 from "../../../../../public/assets/images/homepage/howTaskhubWorks/service-provider/service1.png";
import service2 from "../../../../../public/assets/images/homepage/howTaskhubWorks/service-provider/service2.png";



const MobileYouCan = () => {
    const YouCanData = [

        {
            data: (
                <>
                    Find the right professional  in one place.
                </>
            )
        },

        {
            data: (
                <>
                    Choose from a range of services and experts.
                </>
            )
        },

        {
            data: (
                <>
                    Save time and money with multiple bids.
                </>
            )
        },


    ]

    const serviceProviderParams = new URLSearchParams({ userType: "Service Provider" });

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
        <div className='w-[90%] mx-auto py-10'>

            <h2 className=' text-[28px] font-clashBold text-[#2A1769] text-center'>
                With Oló<span className='text-tc-orange'>jà</span>, you can:</h2>


            <div className='  py-5 space-y-5 w-[80%] mx-auto'>
                {
                    YouCanData.map((eachData, index) => (
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

            <div>

                <div className='flex flex-col items-center'>

                    <div className='h-[300px] w-[85%]  mx-auto bg-[#2A1769] rounded-[30px] flex items-center justify-center '>
                        <div className='relative h-[250px] w-[85%]  mx-auto  rounded-[15px] ' >
                            <Image
                                src={images[currentImageIndex]}
                                alt=""
                                fill
                                className="absolute rounded-[15px]"
                            />
                        </div>
                    </div>

                    <button
                        className="rounded-[50px] bg-tc-orange text-[14px] font-satoshi font-[700]
p-2 text-white hover:bg-[#e79823] w-[150px] -mt-5"
                    >
                        {isServiceProvider ? (
                            <p onClick={handlePostTask}>Add a task for free</p>
                        ) : (
                            <Link href="/customer/add-task">
                                Add a task for free
                            </Link>
                        )}
                    </button>

                </div>



                <div className='relative pb-20'>

                    <div className='flex  items-center w-[90%] mx-auto'>


                        <Image
                            src={aiAssist}
                            alt='Ai assist'
                            height={140}
                            width={140}

                        />


                        <div className='w-1/2 py-5'>
                            <svg width="70" className='ml-1' height="169" viewBox="0 0 70 169" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M51.627 74.2715L51.3079 73.3238L51.627 74.2715ZM2.29983 168.587C1.7483 168.616 1.27769 168.192 1.24868 167.641L0.775967 158.653C0.74696 158.102 1.17054 157.631 1.72206 157.602C2.27358 157.573 2.7442 157.997 2.7732 158.548L3.1934 166.537L11.1824 166.117C11.7339 166.088 12.2045 166.511 12.2335 167.063C12.2625 167.615 11.8389 168.085 11.2874 168.114L2.29983 168.587ZM68.2213 1.30763C69.0257 1.90183 69.0255 1.90207 69.0251 1.90264C69.0246 1.90329 69.0239 1.90421 69.0229 1.9055C69.021 1.90808 69.0181 1.91202 69.0142 1.91731C69.0064 1.92787 68.9947 1.94382 68.9791 1.96505C68.9479 2.00751 68.9012 2.0711 68.8397 2.15508C68.7167 2.32305 68.5347 2.57257 68.299 2.89765C67.8278 3.54782 67.1424 4.50019 66.2872 5.70691C64.5768 8.12051 62.1881 11.5508 59.4764 15.615C54.0494 23.7488 47.3438 34.3999 42.1914 44.5147C39.6148 49.573 37.4382 54.4749 36.0029 58.8464C34.5595 63.2427 33.9025 66.9956 34.2601 69.7996C34.4369 71.1863 34.8561 72.2941 35.5075 73.1362C36.1516 73.969 37.0699 74.6038 38.3594 74.9773C40.9971 75.7413 45.1489 75.3977 51.3079 73.3238L51.9461 75.2192C45.6893 77.3261 41.0477 77.8381 37.803 76.8983C36.1512 76.4199 34.8561 75.563 33.9255 74.3599C33.0022 73.1662 32.4854 71.6941 32.2761 70.0526C31.8614 66.8001 32.6315 62.7033 34.1027 58.2225C35.582 53.7169 37.8077 48.7144 40.4093 43.607C45.6135 33.3904 52.3683 22.6649 57.8127 14.505C60.5367 10.4223 62.9363 6.97637 64.6554 4.55053C65.515 3.33753 66.2046 2.37935 66.6797 1.72391C66.9172 1.39618 67.1011 1.14413 67.2259 0.973721C67.2882 0.888518 67.3358 0.823727 67.3679 0.780096C67.384 0.758281 67.3961 0.741755 67.4043 0.730613C67.4084 0.725042 67.4116 0.720817 67.4137 0.717949C67.4147 0.716516 67.4156 0.715386 67.4161 0.714668C67.4167 0.713879 67.417 0.713431 68.2213 1.30763ZM51.3079 73.3238C54.4569 72.2634 57.0743 71.6848 59.2005 71.5652C61.3175 71.446 63.0541 71.7765 64.3313 72.6562C65.6441 73.5606 66.3172 74.9368 66.5052 76.558C66.6898 78.1499 66.4169 80.0223 65.8238 82.0747C64.6364 86.1841 62.0757 91.3114 58.6852 96.9628C55.2858 102.629 51.0168 108.88 46.3687 115.248C37.0719 127.986 26.2261 141.239 17.7101 151.302C13.451 156.335 9.77214 160.572 7.15776 163.552C5.85053 165.042 4.80933 166.218 4.09465 167.021C3.73731 167.423 3.46159 167.732 3.27506 167.94C3.18179 168.044 3.11082 168.123 3.06309 168.177C3.03923 168.203 3.02118 168.223 3.00905 168.237C3.00299 168.243 2.9984 168.249 2.99532 168.252C2.99378 168.254 2.99259 168.255 2.99182 168.256C2.99101 168.257 2.99057 168.257 2.2473 167.588C1.50403 166.919 1.50436 166.919 1.50505 166.918C1.50578 166.917 1.50686 166.916 1.50832 166.915C1.51126 166.911 1.51568 166.906 1.52159 166.9C1.53341 166.887 1.55116 166.867 1.5747 166.841C1.6218 166.788 1.69214 166.71 1.78476 166.606C1.96999 166.399 2.24436 166.092 2.60031 165.692C3.3122 164.892 4.35038 163.719 5.65436 162.233C8.2624 159.26 11.9333 155.032 16.1835 150.01C24.6861 139.963 35.4971 126.751 44.7532 114.069C49.3814 107.728 53.6128 101.53 56.9702 95.9339C60.3363 90.3231 62.7885 85.3745 63.9024 81.5195C64.4601 79.5895 64.6599 78.0076 64.5185 76.7885C64.3805 75.5987 63.9286 74.8074 63.1968 74.3033C62.4292 73.7746 61.2012 73.4557 59.3129 73.562C57.4338 73.6677 55.005 74.1892 51.9461 75.2192L51.3079 73.3238Z" fill="#381F8C" />
                            </svg>

                        </div>

                    </div>

                    <h2 className=' text-[16px] ml-[150px] -mt-[130px] font-clashSemiBold text-tc-orange text-left font-[700]'>
                        ADD A TASK <br /> IN  FEW STEPS
                    </h2>
                </div>


                <div className='flex flex-col items-center'>

                    <div className='h-[350px] w-[85%]  mx-auto bg-tc-orange rounded-[30px] flex items-center justify-center '>
                        <div className='relative h-[300px] w-[85%]  mx-auto  rounded-[15px] ' >
                            <Image
                                src={SpImages[currentSpImageIndex]}
                                alt=""
                                fill
                                className="absolute rounded-[15px]"
                            />
                        </div>
                    </div>

                    <button
                        className="rounded-[50px] bg-primary text-[14px] font-satoshi font-[600]
    p-2 text-white hover:bg-[#25135f] w-[110px] -mt-5"
                    >
                        {!isServiceProvider ? (<div
                            onClick={handleBecomeSP}
                            className="flex items-center justify-center"
                        >
                            <p className="font-satoshiMedium">Post listing</p>
                        </div>) : (<Link
                            href={`/provide-service`}
                            className="flex items-center justify-center"
                        >
                            <p className="">Post listing</p>

                        </Link>)}
                    </button>

                </div>

                <h2 className='text-[20px] font-clash text-primary text-left font-[700] w-[85%] mx-auto pt-5'>
                    LIST YOUR  SERVICE <br /> WITH AI  ASSISTANCE
                </h2>


            </div>


        </div>
    )
}

export default MobileYouCan
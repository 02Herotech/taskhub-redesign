'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Customer1 from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/customer1.jpg";
import Customer2 from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/customer2.jpg";
import Customer3 from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/customer3.jpg";
import icon1 from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/getStartedIcon2.png";
import Task1 from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/task1.png";
import Task2 from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/task2.png";


const HowItWorks = () => {

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

    const images1 = [Task1, Task2];
    const currentImageIndex1 = useImageTransition(images1, 2000);
    return (
        <div>
            <div className='flex flex-col items-center'>
                <h2 className='text-center lg:text-[35px] text-[20px] font-[600] font-clashMedium text-tc-orange'>
                    How  it works ?
                </h2>

                <p className='text-center lg:text-[35px] text-[20px] font-[600] font-clashMedium text-primary xl:w-1/2 lg:w-[65%] my-6'>
                    Get your Task posted in few steps as a <span className='text-tc-orange'>Customer</span> with TaskHub
                </p>
            </div>

            <div className='lg:flex justify-between mt-5 '>
                <div className='lg:w-[40%] flex flex-col lg:space-y-14 space-y-10'>

                    <div className='relative w-full lg:flex-none flex items-center justify-center'>
                        <div className='relative lg:w-full w-[90%] mx-auto lg:h-[300px] h-[250px] rounded-[30px]'>
                            <Image
                                src={Customer1}
                                alt="Customer 1"
                                fill
                                className="absolute rounded-[30px]"
                            />

                        </div>

                        <div className="flex space-x-2 shadow-md items-center text-[12px] bg-[#EEE5FC] rounded-xl px-4 py-2 absolute lg:-right-16 -top-4">
                            <Image src={icon1} width={25} alt="hand shake"></Image>
                            <p className="font-bold">Task completed</p>
                            <p className="text-[#969696]">Just now</p>
                        </div>
                    </div>

                    <div className='h-[400px] lg:w-full w-[90%] mx-auto bg-[#2A1769] rounded-[30px] flex items-center justify-center '>
                        <div className='relative h-[300px] w-[85%] mx-auto lg:w-[350px] rounded-[15px] ' >
                            <Image
                                src={images1[currentImageIndex1]}
                                alt=""
                                fill
                                className="absolute rounded-[15px]"
                            />
                        </div>
                    </div>
                </div>

                <div className='lg:w-[50%] space-y-6'>
                    <p className='text-tc-orange lg:text-[32px] text-[18px] font-[600] font-clashMedium  lg:mt-0 mt-10'>
                        Input your Task details & Briefly tell us what task you need done.
                    </p>

                    <div className='flex  space-x-3'>
                        <div className='rounded-[100%] h-2 w-2 bg-primary lg:mt-5 mt-3'>

                        </div>
                        <p className='text-primary lg:text-[20px] text-[16px] font-satoshiMedium w-[95%]'>In a short sentence, tell us what you need to get done. Use simple and short words to get the best result.</p>
                    </div>

                    <div className='flex justify-between ml-6'>
                        <div className='relative w-[45%] rounded-[30px] lg:h-[330px] h-[180px]'>
                            <Image
                                src={Customer2}
                                alt="Customer 2"
                                fill
                                className="absolute rounded-[30px]"
                            />
                        </div>


                        <div className='w-[45%]'>
                            <div className='relative w-full lg:h-[330px] h-[180px]'>
                                <Image
                                    src={Customer3}
                                    alt="Customer 3"
                                    fill
                                    className="absolute rounded-[30px]"
                                />
                            </div>
                        </div>
                    </div>



                    <div className='flex  space-x-4'>
                        <div className='rounded-[100%] h-2 w-2 bg-primary lg:mt-5 mt-3'>

                        </div>
                        <p className='text-primary lg:text-[20px] text-[16px] font-satoshiMedium w-[95%]'>Choose your service type; remotely or in person. Add in your location details and budget and your first task has been created!</p>
                    </div>

                    <div className="lg:hidden flex items-center justify-center">
                        <button
                            className=" rounded-[50px] bg-primary xl:text-[16px] font-satoshiMedium
                  xl:px-3   lg:px-3 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] lg:w-[175px]  "
                        >

                            <Link href="/customer/add-task">
                                Post your first task
                            </Link>


                        </button>
                    </div>


                    <div className="lg:block hidden">
                        <button
                            className=" rounded-[50px] bg-primary xl:text-[16px] font-satoshiMedium
                  xl:px-3   lg:px-3 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] lg:w-[175px]  "
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

export default HowItWorks
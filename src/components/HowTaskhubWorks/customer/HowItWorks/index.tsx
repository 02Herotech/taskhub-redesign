import React from 'react'
import PostTasks from '../../PostTasks'
import PostService from '../../PostService'
import Experiences from '../../Experience/indes'
import Link from 'next/link'
import Image from 'next/image'
import Customer1 from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/customer1.jpg";
import Customer2 from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/customer2.jpg";
import Customer3 from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/customer3.jpg";
import icon1 from "../../../../../public/assets/images/homepage/howTaskhubWorks/customer/getStartedIcon2.png";


const HowItWorks = () => {
    return (
        <div>
            <div className='flex flex-col items-center'>
                <h2 className='text-center text-[35px] font-clashMedium text-tc-orange'>
                    How  it works ?
                </h2>

                <p className='text-center text-[35px] font-clashMedium text-primary w-1/2 my-6'>
                    Get your Task posted in few steps as a <span className='text-tc-orange'>Customer</span> with TaskHub
                </p>
            </div>

            <div className='flex justify-between '>
                <div className='w-[46%] flex flex-col justify-between'>

                    <div className='relative w-full'>
                        <div className='relative w-full h-[300px] rounded-[30px]'>
                            <Image
                                src={Customer1}
                                alt="Customer 1"
                                fill
                                className="absolute rounded-[30px]"
                            />

                        </div>

                        <div className="flex space-x-2 shadow-md items-center text-[12px] bg-[#EEE5FC] rounded-xl px-4 py-2 absolute -right-16 -top-4">
                            <Image src={icon1} width={25} alt="hand shake"></Image>
                            <p className="font-bold">Task completed</p>
                            <p className="text-[#969696]">Just now</p>
                        </div>
                    </div>

                    <div className='h-[400px] w-full bg-[#2A1769] rounded-[30px] '>

                    </div>

                </div>

                <div className='w-[46%] space-y-5'>
                    <p className='text-tc-orange text-[32px] font-clashMedium'>
                        Input your Task details & Briefly tell us what task you need done.
                    </p>

                    <div className='flex  space-x-4'>
                        <div className='rounded-[100%] h-3 w-6 bg-primary mt-5'>

                        </div>
                        <p className='text-primary text-[25px] font-satoshiMedium'>In a short sentence, tell us what you need to get done. Use simple and short words to get the best result.</p>
                    </div>

                    <div className='flex justify-between ml-6'>
                        <div className='relative w-[45%] rounded-[30px] h-[300px]'>
                            <Image
                                src={Customer2}
                                alt="Customer 2"
                                fill


                                className="absolute rounded-[30px]"
                            />
                        </div>


                        <div className='w-[45%]'>
                            <div className='relative w-full h-[300px] rounded-[30px]'>
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
                        <div className='rounded-[100%] h-3 w-6 bg-primary mt-5'>

                        </div>
                        <p className='text-primary text-[25px] font-satoshiMedium'>Choose your service type; remotely or in person. Add in your location details and budget and your first task has been created!</p>
                    </div>

                    <div className="">
                        <button
                            className=" rounded-[50px] bg-primary xl:text-[16px]
                  xl:px-3   lg:px-3 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] lg:w-[175px]  "
                        >

                            <Link href="/customer/add-task">
                                Post your first task
                            </Link>


                        </button>
                    </div>

                </div>

            </div>

            <PostTasks />
            <PostService />
            <Experiences />
        </div>
    )
}

export default HowItWorks
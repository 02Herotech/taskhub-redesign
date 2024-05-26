import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import Task1 from "../../../../public/assets/images/homepage/howTaskhubWorks/task1.png";
import Task2 from "../../../../public/assets/images/homepage/howTaskhubWorks/task2.png";

import MobileTask1 from "../../../../public/assets/images/homepage/howTaskhubWorks/mobileTask1.jpg";
import MobileTask2 from "../../../../public/assets/images/homepage/howTaskhubWorks/mobileTask2.jpg";


const PostTasks = () => {
    const customerParams = new URLSearchParams({ userType: "customer" });

    return (
        <div className='md:w-[90%] mx-auto lg:w-full'>

            <h2 className='hidden md:block text-[35px] lg:text-[40px] font-semibold xl:w-[40%] lg:w-[50%] md:w-[60%] text-primary'>
                Get your Task posted in few steps as a <span className='text-[#FE9B07]'>Customer</span> with TaskHub
            </h2>

            <h2 className='md:hidden  text-[20px] font-semibold mx-auto w-[80%] text-primary'>
                Get your Task posted in few steps as a <span className='text-[#FE9B07]'>Customer</span> with TaskHub
            </h2>

            <div>
                <div className='md:flex justify-between items-center my-10 md:w-full w-[80%] m-auto'>

                    <div className='hidden md:block md:w-[38%]'>
                        <Image
                            src={Task1}
                            alt="Post a task"
                            height={417}
                            width={451}
                            className=""
                        />
                    </div>

                    <div className='md:hidden'>
                        <Image
                            src={MobileTask1}
                            alt="Post a task"
                            height={417}
                            width={451}
                            className=""
                        />
                    </div>

                    <div className='md:w-[55%] space-y-3'>

                        <h2 className='xl:text-[35px] lg:text-[30px] md:text-[25px] text-[20px] font-semibold text-primary mt-5'>
                            Briefly tell us what task you need done
                        </h2>
                        <p className='text-[#2A1769] xl:text-[28px] lg:text-[25px] 20:text-[25px] text-[16px] font-medium pb-5'>
                            In a short sentence, tell us what you need to get done. Use simple and short words to get the best result.
                        </p>

                        <div className="md:hidden flex md:flex-none justify-center items-center">
                            <button
                                className=" rounded-[50px] bg-primary text-[16px]
xl:px-7 md:px-1 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] md:w-[165px]  "
                            >

                                <Link href={`/auth/sign-up?${customerParams.toString()}`}>
                                    Post your first task
                                </Link>

                            </button>
                        </div>


                        <div className="hidden md:block">
                            <button
                                className=" rounded-[50px] bg-primary text-[16px]
xl:px-7 md:px-1 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] md:w-[165px]  "
                            >

                                <Link href={`/auth/sign-up?${customerParams.toString()}`}>
                                    Post your first task
                                </Link>

                            </button>
                        </div>
                    </div>
                </div>

                <div className='md:flex justify-between items-center my-10 md:w-full w-[80%] m-auto'>

                    <div className='md:hidden'>
                        <Image
                            src={MobileTask2}
                            alt="Post a task"
                            height={417}
                            width={451}
                            className=""
                        />
                    </div>

                    <div className='md:w-[55%] xl:space-y-4 space-y-3'>


                        <h2 className='xl:text-[35px] lg:text-[30px] md:text-[25px] text-[20px] font-semibold text-primary mt-5'>
                            Input your Task details.
                        </h2>
                        <p className='text-[#2A1769] xl:text-[28px] lg:text-[25px] 20:text-[25px] text-[16px] font-medium pb-5'>
                            Choose your service type; remotely or in person. Add in your location details and budget and your first task has been created!
                        </p>





                        <div className="md:hidden flex md:flex-none justify-center items-center">
                            <button
                                className=" rounded-[50px] bg-primary text-[16px]
xl:px-7 md:px-1 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] md:w-[165px]  "
                            >

                                <Link href={`/auth/sign-up?${customerParams.toString()}`}>
                                    Post your first task
                                </Link>

                            </button>
                        </div>


                        <div className="hidden md:block">
                            <button
                                className=" rounded-[50px] bg-primary text-[16px]
xl:px-7 md:px-1 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] md:w-[165px]  "
                            >

                                <Link href={`/auth/sign-up?${customerParams.toString()}`}>
                                    Post your first task
                                </Link>

                            </button>
                        </div>
                    </div>
                    <div className='hidden md:block w-[38%]'>
                        <Image
                            src={Task2}
                            alt="Post a task"
                            height={417}
                            width={451}
                            className=""
                        />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default PostTasks
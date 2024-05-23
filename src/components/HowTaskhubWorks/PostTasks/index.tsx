import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import Task1 from "../../../../public/assets/images/homepage/howTaskhubWorks/task1.png";
import Task2 from "../../../../public/assets/images/homepage/howTaskhubWorks/task2.png";


const PostTasks = () => {
    const customerParams = new URLSearchParams({ userType: "customer" });

    return (
        <div>

            <h2 className='text-[40px] font-semibold xl:w-[40%] lg:w-[50%] text-primary'>
                Get your Task posted in few steps as a <span className='text-[#FE9B07]'>Customer</span> with TaskHub
            </h2>

            <div>
                <div className='flex justify-between items-center my-10'>
                    <div className='w-[38%]'>
                        <Image
                            src={Task1}
                            alt="Post a task"
                            height={417}
                            width={451}
                            className=""
                        />
                    </div>

                    <div className='w-[55%] space-y-3'>
                        <h2 className='xl:text-[35px] text-[30px] font-semibold text-primary'>
                            Briefly tell us what task you need done
                        </h2>
                        <p className='text-[#2A1769] xl:text-[28px] text-[25px] font-medium pb-5'>
                            In a short sentence, tell us what you need to get done. Use simple and short words to get the best result.
                        </p>

                        <div className="">
                            <button
                                className=" rounded-[50px] bg-primary text-[16px]
xl:px-7 lg:px-1 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] lg:w-[165px]  "
                            >

                                <Link href={`/auth/sign-up?${customerParams.toString()}`}>
                                    Post your first task
                                </Link>

                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between items-center my-10'>
                    <div className='w-[55%] xl:space-y-4 space-y-3'>
                        <h2 className='xl:text-[35px] text-[30px] font-semibold text-primary'>
                            Input your Task details.
                        </h2>
                        <p className='text-[#2A1769] xl:text-[28px] text-[25px] font-medium pb-5'>
                            Choose your service type; remotely or in person. Add in your location details and budget and your first task has been created!
                        </p>

                        <div className="mt-12">
                            <button
                                className=" rounded-[50px] bg-primary text-[16px]
xl:px-7 lg:px-1 py-2 text-[#EBE9F4] hover:bg-[#25135f] w-[250px] xl:w-[190px] lg:w-[165px]  "
                            >

                                <Link href={`/auth/sign-up?${customerParams.toString()}`}>
                                    Post your first task
                                </Link>

                            </button>
                        </div>
                    </div>
                    <div className='w-[38%]'>
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
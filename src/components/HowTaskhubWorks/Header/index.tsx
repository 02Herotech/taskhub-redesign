import React from 'react'
import Image from 'next/image'
import bannerImage from "../../../../public/assets/images/homepage/howTaskhubWorks/header-banner.jpg";
import Link from 'next/link';
import Image1 from "../../../../public/assets/images/homepage/howTaskhubWorks/image1.jpg";
import Image2 from "../../../../public/assets/images/homepage/howTaskhubWorks/image2.jpg";
import Image3 from "../../../../public/assets/images/homepage/howTaskhubWorks/image3.jpg";


const Header = () => {
    const customerParams = new URLSearchParams({ userType: "customer" });
    return (
        <div className='relative h-[600px] rounded-[25px] mx-auto flex justify-between items-center  my-20 mt-20'>

            <Image
                src={bannerImage}
                alt="Banner Image"
                fill
                className="object-cover rounded-[25px]"
            />

            <div className='absolute '>
                <div className='flex justify-between items-center px-20 '>
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
                                    src={Image2}
                                    alt=""
                                    fill
                                    className=" rounded-[15px]"
                                />
                            </div>

                        </div>

                        <div className='relative xl:h-[389px] xl:w-[420px] h-[349px] w-[380px] rounded-[40px]' >
                            <Image
                                src={Image1}
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
                                    src={Image3}
                                    alt=""
                                    fill
                                    className=" rounded-[15px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
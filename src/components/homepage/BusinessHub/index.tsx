'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CheckSignOrange from "../../../../public/assets/images/homepage/businessHub/CheckSignOrange.png";
import CheckSignBlue from "../../../../public/assets/images/homepage/businessHub/CheckSignBlue.png";

import image1 from "../../../../public/assets/images/homepage/businessHub/01.png";
import image2 from "../../../../public/assets/images/homepage/businessHub/02.png";
import image3 from "../../../../public/assets/images/homepage/businessHub/03.png";
import image4 from "../../../../public/assets/images/homepage/businessHub/04.png";
import image5 from "../../../../public/assets/images/homepage/businessHub/05.png";


const BusinesHub = () => {
    const BusinessHubData = [
        {
            id: 1,
            title: 'Financial Literacy',
            // icon: <Image alt='' src={CheckSignOrange} fill className='absolute object-contain' />,
            icon: CheckSignOrange,
            details: (
                <>
                    Understand how to manage your finances  <br />  and access capital.
                </>
            ),
            bgColour: '2A1769'
        },

        {
            id: 2,
            title: 'Business 101',
            icon: CheckSignBlue,
            details: (
                <>
                    Learn the fundamentals of starting and  <br />  running a successful business
                </>
            ),
            bgColour: 'E58C06'
        },


        {
            id: 3,
            title: 'Personalized Learning',
            // icon: <Image alt='' src={CheckSignOrange} fill className='absolute object-contain' />,
            icon: CheckSignOrange,
            details: (
                <>
                    Get tailored guidance with our AI-powered  <br /> platform.
                </>
            ),
            bgColour: 'rgba(144, 35, 181, 1)'
        },

        {
            id: 4,
            title: 'Expert Support',
            // icon: <Image alt='' src={CheckSignOrange} fill className='absolute object-contain' />,
            icon: CheckSignOrange,
            details: (
                <>
                    Access valuable insights and support from   <br /> our community.
                </>
            ),
            bgColour: 'rgba(80, 49, 2, 1)'
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

    const images = [image1, image2, image3, image4, image5];
    const currentImageIndex = useImageTransition(images, 2000);


    return (
        <div className='py-10 '>
            <div className=' mx-auto max-w-7xl '>
                <div className='w-[85%] mx-auto '>

                    <div className='space-y-5'>
                        <h2 className='xl:text-[32px] text-[28px] font-clashSemiBold  text-[#2A1769] text-center'>
                            “90% of businesses fail within 12 months of being operational <br />
                            due to lack of business acumen”
                        </h2>

                        <p className='text-center text-[#2A1769] font-satoshi font-[700]  xl:text-[28px] text-[24px] '>
                            Thrive with our business hub where you learn:
                        </p>

                    </div>

                </div>
            </div>

            <div className='xl:pl-[150px] pl-[100px] relative py-10  '>
                <div className='space-y-5 '>
                    {
                        BusinessHubData.map((eachData, index) => (
                            <div key={index} style={{ backgroundColor: eachData.bgColour }} className={`bg-[#${eachData.bgColour}] flex items-center justify-around xl:h-[120px] lg:h-[130px] xl:w-[35%] lg:w-[45%] rounded-3xl `}>

                                <div className='rounded-2xl bg-[#ECECF4] flex items-center justify-center h-[70px] w-[70px]'>
                                    <Image
                                        src={eachData.icon}
                                        alt='' />

                                </div>

                                <div className='text-center xl:space-y-2 lg:space-y-3'>
                                    <h2 className=' text-[#ECECF4] font-satoshi font-[700]  xl:text-[25px] text-[22px] '>
                                        {eachData.title}
                                    </h2>

                                    <p className='text-[#ECECF4] font-satoshi font-[500]  xl:text-[16px] text-[15px] '>
                                        {eachData.details}
                                    </p>

                                </div>



                            </div>
                        ))
                    }

                </div>

                <div className='xl:h-[540px] lg:h-[580px] w-[45%] mt-10 bg-primary absolute top-0 right-0 rounded-l-2xl flex items-center pl-10  '>

                    <div className='relative h-[450px] xl:w-[70%] lg:w-[80%] rounded-[15px] ' >
                        <Image
                            src={images[currentImageIndex]}
                            alt=""
                            fill
                            className="absolute rounded-[15px]"
                        />
                    </div>

                </div>
            </div>



        </div>
    )
}

export default BusinesHub
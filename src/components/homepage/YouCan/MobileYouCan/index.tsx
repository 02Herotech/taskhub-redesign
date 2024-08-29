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
                    Find the right professional  in  <br /> one place.
                </>
            )
        },

        {
            data: (
                <>
                    Choose from a range of<br /> services and experts.
                </>
            )
        },

        {
            data: (
                <>
                    Save time and money with  <br />multiple bids.
                </>
            )
        },


    ]

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

        </div>
    )
}

export default MobileYouCan
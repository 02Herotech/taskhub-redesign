'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import marketplace from "../../../../../public/assets/images/homepage/pillarStructure/mobileMarket.png";
import businessHub from "../../../../../public/assets/images/homepage/pillarStructure/mobileBusHub.png";
import rentAShop from "../../../../../public/assets/images/homepage/pillarStructure/mobileRent.png";

import clsx from 'clsx';

const MobilePillarStructure = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const content = [
        {
            title: 'Marketplace',
            text: 'Buy & Sell Products, Get Tasks Done, Post Your Services: All at Your Convenience.',
            btnText: 'Explore our marketplace',
            btnBgColor: 'E58C06',
            btnTextColor: 'FFFFF',
            img: marketplace,
            label: 'Marketplace',
            link: '/marketplace'
        },
        {
            title: 'Business Hub',
            text: 'We offer information on both financial and business literacy, empowering you with business 101 skills and setting you up for success.',
            btnText: 'View resources',
            btnBgColor: 'F8E9FE',
            btnTextColor: '2A1769',
            img: businessHub,
            label: 'BusinessHub',
            link: '/'
        },
        {
            title: 'Rent a shop',
            text: 'Own a personalized virtual shop for your business and get access to 5000+ potential customers from our community.',
            btnText: 'Rent a shop',
            btnBgColor: '381F8C',
            btnTextColor: 'FFFFF',
            img: rentAShop,
            label: 'Rent a shop',
            link: '/'
        }
    ];

    useEffect(() => {
        if (!isHovering) {
            const interval = setInterval(() => {
                setActiveIndex((prevIndex) => (prevIndex + 1) % content.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [isHovering, content.length]);

    return (

        <div className='mx-auto w-[90%]'>
            <div className=' py-12'>
                <div className='w-full flex justify-center'>

                    <button
                        className={clsx('rounded-[50px]  text-[20px] font-clash font-[700] py-3 px-2 w-[190px]',
                            activeIndex === 0 && 'bg-[#E58C06] text-white',
                            activeIndex === 1 && 'bg-[#F8E9FE] text-[#2A1769]',
                            activeIndex === 2 && 'bg-[#381F8C] text-white',
                        )}
                    >
                        <Link href={`${content[activeIndex].link}`}>
                            {content[activeIndex].label}
                        </Link>
                    </button>

                </div>



                <div className='text-white space-y-3 my-8 '>
                    <h2 className='text-[28px] font-clashSemiBold transition-all duration-500 ease-in-out text-left'>{content[activeIndex].title}</h2>

                    <p className='text-left font-satoshiMedium text-[20px] font-[500] min-h-[150px] transition-all duration-500 ease-in-out'>
                        {content[activeIndex].text}
                    </p>

                    <button
                        className={clsx('rounded-[50px]  text-[15px] font-satoshi font-[700] p-3 px-4 min-w-[150px]',
                            activeIndex === 0 && 'bg-[#E58C06] text-white',
                            activeIndex === 1 && 'bg-[#F8E9FE] text-[#2A1769]',
                            activeIndex === 2 && 'bg-[#381F8C] text-white',
                        )}
                    >
                        <Link href={`${content[activeIndex].link}`}>
                            {content[activeIndex].btnText}
                        </Link>
                    </button>
                </div>


                <Image
                    src={content[activeIndex].img}
                    alt={content[activeIndex].title}
                    width={800}
                    height={400}
                />
            </div>


            {/* Dots Navigation */}
            <div className='flex items-center justify-center  space-x-2 pb-10'>
                {content.map((each, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={clsx(' rounded-full', activeIndex === index ? `w-4 h-4 bg-[#${each.btnBgColor}]` : 'bg-[#EBE9F4] w-3 h-3')}
                    />
                ))}
            </div>
        </div>

    );
}

export default MobilePillarStructure;
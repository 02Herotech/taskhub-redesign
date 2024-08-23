'use client'

import React, { useEffect, useState } from 'react'
import HubBackground from "../../../../public/assets/images/homepage/pillarStructure/hub-bg.jpeg";
import Link from 'next/link';
import Image from 'next/image';
import marketplace from "../../../../public/assets/images/homepage/pillarStructure/marketplace.png";
import businessHub from "../../../../public/assets/images/homepage/pillarStructure/businessHub.png";
import rentAShop from "../../../../public/assets/images/homepage/pillarStructure/rent.png";


import clsx from 'clsx';

const MiniNavbar = ({ activeIndex, onNavChange, setIsHovering }: any) => {
    const links = [{
        link: 'marketplace',
        label: 'Marketplace',
        textColor: 'FFFFFF',
        bgColor: 'E58C06'
    },
    {
        link: 'BusinessHub',
        label: 'BusinessHub',
        textColor: '2A1769',
        bgColor: 'F8E9FE'
    },
    {
        link: 'Shop',
        label: 'Rent a shop',
        textColor: 'FFFFFF',
        bgColor: '381F8C'
    }
    ]

    return (
        <div className='flex space-x-5  p-4 '>
            {links.map((link, index) => (
                <button
                    key={index}
                    onClick={() => onNavChange(index)}
                    onMouseEnter={() => {
                        onNavChange(index)
                        setIsHovering(true)
                    }}
                    onMouseLeave={() => setIsHovering(false)}

                    className={`px-4 py-2 rounded-[40px] font-clashMedium font-[600] text-[20px] ${activeIndex === index ? 'underline' : ''}`}
                    style={{
                        backgroundColor: `#${link.bgColor}`,
                        color: `#${link.textColor}`,
                    }}
                >
                    {link.label}
                </button>
            ))}
        </div>
    );
}


const PillarStructure = () => {
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
            link: '/marketplace'
        },
        {
            title: 'Business Hub',
            text: 'We offer information on both financial and business literacy, empowering you with business 101 skills and setting you up for success.',
            btnText: 'View resources',
            btnBgColor: 'F8E9FE',
            btnTextColor: '2A1769',
            img: businessHub,
            link: '/'
        },

        {
            title: 'Rent a shop',
            text: 'Own a personalized virtual shop for your business and get access to 5000+ potential customers from our community.',
            btnText: 'Rent a sho[p',
            btnBgColor: '381F8C',
            btnTextColor: 'FFFFF',
            img: rentAShop,
            link: '/'
        }
    ]

    useEffect(() => {
        if (!isHovering) {
            const interval = setInterval(() => {
                setActiveIndex((prevIndex) => (prevIndex + 1) % content.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [isHovering, content.length]);

    return (
        <div
            className='xl:h-[600px] lg:h-[680px]  bg-cover bg-center'
            style={{
                backgroundImage: `url(${HubBackground.src})`,
            }}
        >
            <div className='mx-auto max-w-7xl'>
                <div className='w-[85%] mx-auto '>
                    <div className='flex justify-center py-10'>
                        <MiniNavbar activeIndex={activeIndex} onNavChange={setActiveIndex} setIsHovering={setIsHovering} />
                    </div>

                    <div className='flex justify-between pb-14'>
                        <div className='w-[35%] text-white flex flex-col space-y-6'>
                            <h2 className='xl:text-[40px] text-[32px] font-clashSemiBold transition-all duration-500 ease-in-out'>{content[activeIndex].title}</h2>

                            <p className='text-left font-satoshiMedium text-[30px] font-[500] transition-all duration-500 ease-in-out'>
                                {content[activeIndex].text}
                            </p>

                            <button
                                className={clsx('rounded-[50px]  text-[16px] font-satoshi font-[700] p-3 w-[250px]',
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
                            width={600}
                            height={400}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PillarStructure
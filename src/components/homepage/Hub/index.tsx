'use client'

import React, { useEffect, useState } from 'react'
import HubBackground from "../../../../public/assets/images/homepage/hub/hub-bg.jpeg";
import Link from 'next/link';
import Image from 'next/image';

import marketplace from "../../../../public/assets/images/homepage/hub/marketplace.png";

const MiniNavbar = ({ activeIndex, onNavChange }: any) => {
    const links = [{
        link: 'matketplace',
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


const Hub = () => {
    const [activeIndex, setActiveIndex] = useState(0);



    const content = [
        {
            title: 'Marketplace',
            text: 'Buy & Sell Products, Get Tasks Done, Post Your Services: All at Your Convenience.',
            btnText: 'Explore our marketplace',
            btnBgColor: 'E58C06',
            btnTextColor: 'FFFFF',
            img: marketplace
        },
        {
            title: 'Business Hub',
            text: 'We offer information on both financial and business literacy, empowering you with business 101 skills and setting you up for success.',
            btnText: 'View resources',
            btnBgColor: 'F8E9FE',
            btnTextColor: '2A1769',
            img: marketplace
        },

        {
            title: 'Rent a shop',
            text: 'Own a personalized virtual shop for your business and get access to 5000+ potential customers from our community.',
            btnText: 'Rent a sho[p',
            btnBgColor: '381F8C',
            btnTextColor: 'FFFFF',
            img: marketplace
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % content.length);
        }, 5000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [content.length]);


    return (
        <div
            className=' min-h-screen bg-cover bg-center'
            style={{
                backgroundImage: `url(${HubBackground.src})`,
            }}
        >

            <div className='mx-auto max-w-7xl'>
                <div className='w-[85%] mx-auto '>


                    <div className='flex justify-center py-10'>
                        <MiniNavbar activeIndex={activeIndex} onNavChange={setActiveIndex} />
                    </div>

                    <div className='flex justify-between'>
                        <div className='w-[35%] text-white flex flex-col space-y-6'>
                            <h2 className='xl:text-[40px] text-[32px] font-clashSemiBold'>{content[activeIndex].title}</h2>

                            <p className='text-left font-satoshiMedium text-[30px] font-[500]'>
                                {content[activeIndex].text}
                            </p>

                            <button
                                className="rounded-[50px]  text-[16px] font-satoshi font-[700] p-3 w-[250px] "
                                style={{
                                    backgroundColor: `#${content[activeIndex].btnBgColor}`,
                                    color: `#${content[activeIndex].btnTextColor}`,
                                }}
                            >
                                <Link href="">
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

export default Hub
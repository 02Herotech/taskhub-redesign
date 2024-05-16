import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Newsletter from '@/components/newsletter/Newsletter';

const MobileFooter = () => {
    const links1 = [
        {
            groupName: "Company",
            links: [
                {
                    label: "About Us",
                    url: "/about",
                },
              
                {
                    label: "Policy",
                    url: "/policy",
                }

            ],
        },

        {
            groupName: "Other",
            links: [
                {
                    label: "FAQs",
                    url: "/faqs",
                },
                {
                    label: "Contact Us",
                    url: "/contact",
                },
                {
                    label: "Terms and Conditions",
                    url: "/terms-and-conditions",
                },
                {
                    label: "Privacy",
                    url: "/privacy",
                },
            ],
        },
    ];

    const links2 = [{
        groupName: "Marketplace",
        links: [
            {
                url: "/services/automotive",
                label: "Automotive Services",
            },
            {
                url: "/services/health-fitness",
                label: "Health & Fitness",
            },
            {
                url: "/services/real-estate",
                label: "Real Estate Services",
            },
            {
                url: "/services/delivery-logistics",
                label: "Delivery & Logistics",
            },
            {
                url: "/services/art-creativity",
                label: "Art & Creativity",
            },
            {
                url: "/services/travel-adventure",
                label: "Travel & Adventure",
            },
            {
                url: "/services/childcare-babysitting",
                label: "Childcare & Babysitting",
            },
            {
                url: "/services/education-tutoring",
                label: "Education & Tutoring",
            }
        ],
    },]

    const currentYear = new Date().getFullYear();

    return (
        <div className='px-5 '>
            <div className={`  space-y-5`}>
                <div className={`  w-[170px]  flex justify-start`}>
                    <Link href="/" className={`flex py-1 px-2 items-center`}>
                        <Image src={"/assets/images/logo.png"} width={120} height={45} alt="" />
                    </Link>
                </div>
                <div className={` text-[14px] text-primary pl-[5px] text-left font-semibold`}>
                    <p>
                    Need Help? If you have any questions or encounter issues, our support team is here to assist you. Reach out to us at info@taskhub.org.au
Stay Connected: Follow us on Instagram, facebook, and X for updates, tips, and community discussions.
Thank you for choosing TaskHub! We look forward to enhancing your user experience.
                    </p>
                </div>

            </div>

            <div className='flex justify-between pt-10'>
                <div className='md:flex md:w-[57%] justify-between  space-y-5'>

                    {links1.map((group, index) => {
                        return (
                            <ul key={index} className='space-y-5'>
                                <h3 className='text-primary text-base font-bold'>
                                    {group.groupName}
                                </h3>
                                {group.links.map((link, index) => {
                                    return (
                                        <li key={index} className='text-primary font-medium hover:underline text-sm lg:text-base'>
                                            <Link href={link.url}>{link.label}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        );
                    })}

                </div>

                <div className={`flex flex-col space-y-2 `}>

                    {links2.map((group, index) => {
                        return (
                            <ul key={index} className='space-y-5'>
                                <h3 className='text-primary text-base font-bold'>
                                    {group.groupName}
                                </h3>
                                {group.links.map((link, index) => {
                                    return (
                                        <li key={index} className='text-primary font-medium hover:underline text-sm lg:text-base'>
                                            <Link href={link.url}>{link.label}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        );
                    })}
                </div>
            </div>

            <div className="mt-10 md:mt-[-40px] space-y-5">
                <Newsletter />

                <div className={`text-[14px]  `}>
                    <h2>   {currentYear} TaskHub. All Rights Reserved.</h2>
                </div>
            </div>
        </div>
    )
}

export default MobileFooter
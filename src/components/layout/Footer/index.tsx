"use client";

import Image from "next/image";
import Link from "next/link";
import MobileFooter from "./MobileFooter";
import Newsletter from "@/components/newsletter/Newsletter";
import Logo from "../Logo";

const Footer = () => {
    const links = [
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

    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className='pt-10 lg:pt-20 bg-status-lightViolet font-satoshi hidden lg:block'>
                <div className='container w-full grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20 pb-10 '>
                    <div className='grid lg:col-span-2'>
                        <Link href='/marketplace' className='w-[67px] h-[50px] lg:w-[109px] relative'>
                            <Logo />
                        </Link>
                        <div className=" xl:mt-0 lg:mt-[-100px] font-satoshi">
                            <p className="text-primary font-medium max-lg:text-[13px] mt-5 font-satoshi ">Need Help? If you have any questions or encounter issues, our support team is here to assist you. 
                            Reach out to us at {' '}
                                <a href="mailto:info@taskhub.org.au" className="text-primary underline">
                                    info@taskhub.org.au
                                </a>.
                                Stay Connected: Follow us on Instagram, facebook, and X for updates, tips, and community discussions.
                                Thank you for choosing TaskHub! We look forward to enhancing your user experience.</p>
                            <div className="mt-[70px]">
                                <Newsletter />

                                <div className=' py-5 text-black text-left text-sm lg:text-base'>
                                    {currentYear} TaskHub. All Rights Reserved.
                                </div>
                            </div>

                        </div>

                    </div>
                    {links.map((group, index) => {
                        return (
                            <ul key={index} className='space-y-5'>
                                <h3 className='text-primary text-base font-extrabold'>
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

            </footer>
            <div className="block lg:hidden bg-status-lightViolet py-10">
                <MobileFooter />
            </div>

        </>
    );
};

export default Footer;
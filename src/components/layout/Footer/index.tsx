"use client";

import Image from "next/image";
import Link from "next/link";
import MobileFooter from "./MobileFooter";

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
                    label: "Companies",
                    url: "/companies",
                },
                {
                    label: "Pricing",
                    url: "/pricing",
                }

            ],
        },
        {
            groupName: "Services",
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
        <footer className='pt-10 lg:pt-24 bg-status-lightViolet font-satoshi hidden lg:block'>
            <div className='container w-full grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20 pb-10 lg:pb-24'>
                <div className='grid lg:col-span-2'>
                    <Link href='/' className='w-[67px] h-[50px] lg:w-[109px] relative'>
                        <Image src="/assets/images/logo.png" fill alt="Logo" />
                    </Link>
                    <p className="text-primary font-medium max-lg:text-[13px]">Online platform that connects Service Provider  with Customers who are seeking various services. The platform offers a wide range of services.</p>
                </div>
                {links.map((group, index) => {
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
            <div className='container py-5 text-black text-center text-sm lg:text-base'>
                {currentYear} TaskHub. All Rights Reserved.
            </div>
        </footer>

        <div className="lg:hidden bg-status-lightViolet py-10">
        <MobileFooter />
      </div>

        </>
    );
};

export default Footer;
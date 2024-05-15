"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import MobileNavigation from "../MobileNavigation";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BsChat } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { RiMenu3Fill } from "react-icons/ri";

const Navigation = () => {
    const router = useRouter();
    const [showMobileNav, setShowMobileNav] = useState(false);

    const pathname = usePathname();

    const links = [
        {
            label: "Add a task",
            url: "/add-task",
        },
        {
            label: "Explore Tasks",
            url: "/explore",
        },
        {
            label: "Marketplace",
            url: "/marketplace",
        },
        {
            label: "Provider a service",
            url: "/provider-service",
        }
    ];

    return (
        <>
            <nav className='bg-white z-50 fixed top-0 left-0 right-0 w-full drop-shadow-sm'>
                <div className='container py-4 lg:py-5 px-7 lg:px-14 flex items-center justify-between'>
                    <Link href='/' className='w-[67px] h-[50px] lg:w-[109px] relative'>
                        <Image src="/assets/images/logo.png" fill alt="Logo" />
                    </Link>
                    <button
                        onClick={() => setShowMobileNav((state) => !state)}
                        className='lg:hidden'>
                        <RiMenu3Fill className="text-primary w-9 h-9" />
                    </button>
                    <ul className='hidden lg:flex items-center space-x-8'>
                        {links.map((link) => {
                            return (
                                <li key={link.url} className="relative">
                                    <Link href={link.url as string} className={cn("text-primary text-xl font-semibold", {
                                        "text-tc-orange":
                                            link.url === "/" && pathname === "/"
                                                ? true
                                                : link.url !== "/" && pathname.includes(link.url)
                                                    ? true
                                                    : false,
                                    })}>
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className='hidden lg:flex items-center space-x-5'>
                        <div className="relative">
                            <BsChat className="size-[22px] text-black" />
                            <div className="bg-tc-orange absolute size-5 flex items-center justify-center text-xs -top-1 -right-1 rounded-full text-white">2</div>
                        </div>
                        <div className="relative">
                            <IoMdNotificationsOutline className="size-[24px] text-black" />
                            <div className="bg-tc-orange absolute size-5 flex items-center justify-center text-xs -top-1 -right-1 rounded-full text-white">2</div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="relative size-[46px] rounded-full border">
                                <Image src="/assets/images/logo.png" fill alt="Logo" className="object-contain" />
                            </div>
                            <BiChevronDown className="size-6" />
                        </div>
                    </div>
                </div>
            </nav>
            <AnimatePresence initial={false}>
                {showMobileNav && (
                    <MobileNavigation
                        setShowMobileNav={setShowMobileNav}
                        showMobileNav={showMobileNav}
                        links={links}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;

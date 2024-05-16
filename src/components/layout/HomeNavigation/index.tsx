"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BsChat } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { RiMenu3Fill } from "react-icons/ri";
import HomeMobileNavigation from "../HomeMobileNavigation";
import Button from "@/components/global/Button";

const HomeNavigation = () => {
    const router = useRouter();
    const [showMobileNav, setShowMobileNav] = useState(false);

    const pathname = usePathname();

    const links = [
        {
            label: "Home",
            url: "/",
        },
        {
            label: "About",
            url: "/about",
        },
        {
            label: "Marketplace",
            url: "/marketplace",
        },
        {
            label: "Contact Us",
            url: "/contact",
        },

    ];

    return (
        <>
            <nav className="bg-[#F5E2FC] z-50 fixed top-0 left-0 right-0 w-full">
                <div className='container py-4 lg:py-5 px-7 lg:px-12 flex items-center justify-between'>
                    <Link href='/' className='w-[67px] h-[50px] lg:w-[109px] relative'>
                        <Image src="/assets/images/logo.png" fill alt="Logo" />
                    </Link>
                    <button
                        onClick={() => setShowMobileNav((state) => !state)}
                        className='lg:hidden'>
                        <RiMenu3Fill className="text-primary w-9 h-9" />
                    </button>
                    <ul className='hidden lg:flex items-center space-x-20'>
                        {links.map((link) => {
                            return (
                                <li key={link.url} className="relative">
                                    <Link href={link.url as string} className={cn("text-balck text-md", {
                                        "font-semibold":
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
                        <Link href='/auth'>
                            <Button className="rounded-full">
                                Sign Up
                            </Button>
                        </Link>
                        <Link href='/auth/login'>
                            <Button theme='outline' className="rounded-full bg-transparent">
                                Log in
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
            <AnimatePresence initial={false}>
                {showMobileNav && (
                    <HomeMobileNavigation
                        setShowMobileNav={setShowMobileNav}
                        showMobileNav={showMobileNav}
                        links={links}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default HomeNavigation;

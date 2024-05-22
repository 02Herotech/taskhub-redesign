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
import Logo from "../Logo";
import { useSession } from "next-auth/react";
import ServiceProviderUserNav from "@/components/serviceProviderDashboard/global/ServiceProviderUserNav";

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
  const session = useSession();
  const userRole: string[] | undefined = session?.data?.user?.user?.roles;

  const isServiceProvider = userRole && userRole[0] === "SERVICE_PROVIDER";
  const isCustomer = userRole && userRole[0] === "CUSTOMER";

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 w-full bg-[#F5E2FC]">
        <div className="container flex items-center justify-between px-7 py-4 lg:px-12 lg:py-5">
          <Logo />
          <ul className="hidden items-center space-x-20 lg:flex">
            {links.map((link) => {
              return (
                <li key={link.url} className="relative">
                  <Link
                    href={link.url as string}
                    className={cn("text-balck text-md", {
                      "font-semibold":
                        link.url === "/" && pathname === "/"
                          ? true
                          : link.url !== "/" && pathname.includes(link.url)
                            ? true
                            : false,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {isServiceProvider ? (
            <ServiceProviderUserNav />
          ) : (
            <div className="hidden items-center space-x-5 lg:flex">
              <Link href="/auth">
                <Button className="rounded-full">Sign Up</Button>
              </Link>
              <Link href="/auth/login">
                <Button theme="outline" className="rounded-full bg-transparent">
                  Log in
                </Button>
              </Link>
            </div>
          )}
          <button
            onClick={() => setShowMobileNav((state) => !state)}
            className="lg:hidden"
          >
            <RiMenu3Fill className="h-9 w-9 text-primary" />
          </button>
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

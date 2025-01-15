"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { RiMenu3Fill } from "react-icons/ri";
import HomeMobileNavigation from "../HomeMobileNavigation";
import Button from "@/components/global/Button";
import Logo from "../Logo";
import SmallLogo from "../SmallLogo";

const HomeNavigation = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const pathname = usePathname();

  const links = [
    {
      label: "Home",
      url: "/home",
    },

    {
      label: "Marketplace",
      url: "/marketplace",
    },
    {
      label: "Business Hub",
      url: "/business-hub",
    },
    {
      label: "How Olója Works",
      url: "/",
    },

    // {
    //   label: "Blog",
    //   url: "/blog",
    // },
    // {
    //   label: "Contact Us",
    //   url: "/contact",
    // },
  ];
  // container
  // lg:px-12 xl:px-12
  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 w-full bg-[#EBE9F4]">
        <div className="max-w-7xl flex mx-auto items-center justify-between px-7 py-4 lg:py-5">
          <Link href="/" className="max-sm:hidden">
            <Logo />
          </Link>
          <Link href="/" className="lg:hidden">
            <SmallLogo />
          </Link>
          <ul className="hidden items-center space-x-8 lg:flex">
            {links.map((link) => {
              return (
                <li key={link.url} className="relative">
                  <Link
                    href={link.url as string}
                    className={cn("text-md font-clashMedium text-[#140B31]", {
                      "font-semibold text-primary":
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

          <div className="hidden items-center space-x-5 lg:flex">
            <Link href="/auth">
              <Button theme="outline" className="rounded-full bg-transparent">
                Sign Up
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button theme="outline" className="rounded-full bg-transparent">
                Login
              </Button>
            </Link>

            <Link href="/">
              <Button theme="secondary" className="rounded-full">
                Monetize your skills
              </Button>
            </Link>
          </div>
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

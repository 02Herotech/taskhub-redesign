"use client";
import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { links: { title: string; slug: string }[] };

function BlogNavbar({ links }: Props) {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const pathname = usePathname();
  const categorySlug = pathname.split("/").filter(Boolean);
  return (
    <div className="mx-auto mt-16 max-w-7xl sm:mt-20 md:mt-[86px]">
      <nav className="hidden items-center gap-2 border-b border-t px-5 md:block md:px-20">
        <ul className="flex w-full items-center gap-7 py-3 font-satoshiMedium">
          {/* <li className="text-lg">
            <Link href="/blog">Home</Link>
          </li> */}
          {links.map((link) => (
            <li className="text-lg" key={link.slug}>
              <Link href={"/business-hub/" + link.slug}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Nav mobile  */}
      <nav className="">
        <header className="flex items-center justify-between border bg-[#fafafa] px-5 py-2 md:px-20 md:py-4">
          <h3 className="font-clashMedium text-xl md:text-3xl">
            {links.find((link) => link.slug === categorySlug[1])?.title}
          </h3>
          <button
            className="inline md:hidden"
            onClick={() => setShowMobileNav((prev) => !prev)}
          >
            <IoChevronDownOutline size={25} />
          </button>
        </header>

        {showMobileNav && (
          <ul className="w-full space-y-4 border bg-[#fafafa] px-4 py-2 font-medium md:hidden md:px-10 md:py-4">
            {/* <Link href="/business-hub">Home</Link> */}
            {links.map((link) => (
              <li
                key={Math.random() * 12345}
                onClick={() => setShowMobileNav((prev) => !prev)}
              >
                <Link href={"/business-hub/" + link.slug} className="text-lg">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}

export default BlogNavbar;

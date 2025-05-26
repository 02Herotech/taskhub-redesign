"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { url: "/customer/payment-new/update/make", text: "Make payments" },
  { url: "/customer/payment-new/update/receive", text: "Receive payments" },
];

function Navigation() {
  const pathname = usePathname();
  return (
    <div className="mb-6 flex w-max rounded-2xl bg-[#F5F4F4]">
      <Link
        className={
          "block h-full rounded-2xl px-5 py-2 font-medium sm:px-12 " +
          (pathname.includes("make") ? "bg-primary text-white" : "text-primary")
        }
        href={links[0].url}
      >
        {links[0].text}
      </Link>
      <Link
        className={
          "block h-full rounded-2xl px-5 py-2 font-medium sm:px-12 " +
          (pathname.includes("receive")
            ? "bg-primary text-white"
            : "text-primary")
        }
        href={links[1].url}
      >
        {links[1].text}
      </Link>
    </div>
  );
}

export default Navigation;

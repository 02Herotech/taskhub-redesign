"use client";
import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";

const headerLinks: { url: string; text: string }[] = [
  { url: "/customer/payment-new/wallet", text: "Wallet" },
  {
    url: "/customer/payment-new/history",
    text: "Payment history",
  },
  {
    url: "/customer/payment-new/update",
    text: "Update payment methods",
  },
];

function PaymentHeader() {
  const router = useRouter();
  const { links, header } = useSelector(
    (state: RootState) => state.breadcrumbs,
  );
  const pathname = usePathname();
  return (
    <div>
      <h2 className="mb-2 hidden text-3xl font-semibold text-[#2A1769] sm:block">
        Payment
      </h2>

      {/* Header with back navigation for mobile */}
      <div className="relative mb-4 flex justify-center sm:hidden">
        <FaChevronLeft
          size={18}
          className="absolute left-1 top-1/2 -translate-y-1/2"
          color="black"
          onClick={router.back}
        />
        <p className="text-xl font-bold text-[#2A1769]">{header}</p>
      </div>

      {/* Breadcrumbs  */}
      <div className="mb-3 hidden items-center gap-3 md:flex">
        <button
          onClick={router.back}
          className="flex cursor-pointer items-center gap-1 py-2 pr-2"
        >
          <FaChevronLeft size={14} />
          <span>Back</span>
        </button>
        <div className="h-6 w-[1px] bg-black" />
        <>
          {links?.map((link, i, { length }) => (
            <div key={Math.random() * 1234}>
              <Link href={link.url} className="pr-4">
                {link.text}
              </Link>
              {length > 1 && i !== length - 1 && <span>/</span>}
            </div>
          ))}
        </>
      </div>

      {/* Navigation  */}
      <nav className="mt-7 overflow-x-auto border-b border-[#0000001F] md:mt-0">
        <ul className="flex min-w-[450px] items-center gap-3">
          {headerLinks.map((link) => (
            <li
              className={
                "border-[#FE9B07] px-2 " +
                (pathname == link.url ? "border-b text-[#FE9B07]" : "")
              }
              key={Math.random() * 4562278}
            >
              <Link href={link.url} className="text-lg">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default PaymentHeader;

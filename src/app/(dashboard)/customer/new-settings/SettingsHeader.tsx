"use client";
import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import Link from "next/link";
import { Doughnut } from "react-chartjs-2";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  options,
  useCustomerProfileCompletion,
} from "@/hooks/useUserProfileCompletion";

function SettingsHeader() {
  const router = useRouter();
  const { links, header } = useSelector(
    (state: RootState) => state.breadcrumbs,
  );
  const { data, completionPercentage } = useCustomerProfileCompletion();
  return (
    <div>
      <h2 className="mb-2 hidden text-3xl font-semibold text-[#2A1769] sm:block">
        Settings
      </h2>

      {/* Header with back navigation for mobile */}
      <div className="relative mb-4 flex justify-center sm:hidden">
        <FaChevronLeft
          size={14}
          className="absolute left-1 top-1/2 -translate-y-1/2"
          color="black"
          onClick={router.back}
        />
        <p className="font-bold text-[#2A1769]">{header}</p>
      </div>

      {/* Profile completion for mobile */}
      <div className="flex items-center gap-3 pl-2 sm:hidden">
        <div className="relative flex max-w-[50px] items-center justify-center">
          <Doughnut data={data} options={options} />
          {/* Animate this with motion.div after reducing cutout */}
          <div className="absolute flex size-[16px] items-center justify-center rounded-full bg-white">
            <p className="text-[10px] font-semibold text-[#503102]">
              {completionPercentage}%
            </p>
          </div>
        </div>
        <p className="text-sm font-medium text-[#E58C06]">
          Complete your profile
        </p>
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
      <nav className="hidden border-b border-[#0000001F] sm:block">
        <ul className="flex items-center gap-3">
          <li className="border-b border-[#FE9B07] px-2">
            <Link href="#">Profile</Link>
          </li>
          <li className="px-2">
            <Link href="/customer/new-settings/notification-settings">
              Notification preference
            </Link>
          </li>
          <li className="px-2">
            <Link href="/customer/new-settings/password">Change password</Link>
          </li>
          <li className="px-2">
            <Link href="#">My badge</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SettingsHeader;

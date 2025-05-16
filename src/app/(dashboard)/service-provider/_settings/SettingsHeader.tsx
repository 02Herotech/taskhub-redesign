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
  useServiceProviderProfileCompletion,
} from "@/hooks/useUserProfileCompletion";
import { usePathname } from "next/navigation";

const headerLinks: { url: string; text: string }[] = [
  { url: "/service-provider/settings/profile", text: "Profile" },
  {
    url: "/service-provider/settings/notification-settings",
    text: "Notification preference",
  },
  {
    url: "/service-provider/settings/password",
    text: "Change password",
  },
  {
    url: "#",
    text: "My Badge",
  },
];

function SettingsHeader() {
  const router = useRouter();
  const { links, header } = useSelector(
    (state: RootState) => state.breadcrumbs,
  );
  const { data, completionPercentage } = useServiceProviderProfileCompletion();
  const pathname = usePathname();

  const shouldRender =
    pathname == "/service-provider/settings/profile" ||
    pathname == "/service-provider/settings/profile/public-profile" ||
    pathname == "/service-provider/settings/profile/private-profile";
  return (
    <div>
      <h2 className="mb-2 hidden text-3xl font-semibold text-[#2A1769] sm:block">
        Settings
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

      {/* Profile completion for mobile */}
      {shouldRender && (
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
          <p className="text-lg font-medium text-[#E58C06]">
            Complete your profile
          </p>
        </div>
      )}

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
      <nav className="mt-7 overflow-x-auto border-b border-[#0000001F] pb-2 md:mt-0">
        <ul className="flex min-w-[550px] items-center gap-3">
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

export default SettingsHeader;

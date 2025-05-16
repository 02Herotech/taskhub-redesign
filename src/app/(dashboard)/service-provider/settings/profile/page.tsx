"use client";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";
import { useEffect } from "react";

function Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadCrumbs({
        header: "Profile",
        links: [{ url: "#", text: "Settings" }],
      }),
    );
  }, []);
  return (
    <div className="max-h-[300px] flex-grow space-y-2 rounded-xl bg-[#EBE9F4] p-2">
      <Link
        href="/service-provider/settings/profile/public-profile"
        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 font-medium"
      >
        <span className="text-lg md:text-xl">Public profile</span>
        <FaChevronRight size={16} color="#381F8C" />
      </Link>
      <Link
        href="/service-provider/settings/profile/private-profile"
        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 font-medium"
      >
        <span className="text-lg md:text-xl">
          Update personal profile information
        </span>
        <FaChevronRight size={16} color="#381F8C" />
      </Link>
    </div>
  );
}

export default Page;

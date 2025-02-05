import React from "react";
import Popup from "./PopupTwo";
import Link from "next/link";
import Image from "next/image";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProfileIncomplete({ isOpen, onClose }: PopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="relative max-h-[700px] min-w-[320px] max-w-[700px] bg-white p-5 sm:min-w-[560px]">
        <h3 className="mb-7 mt-4 text-center font-clashSemiBold text-2xl text-[#2A1769] sm:text-4xl">
          Profile Update Needed.
        </h3>
        <p className="mx-auto mb-10 max-w-[383px] text-center font-satoshiMedium text-base text-[#140B31] sm:text-lg md:text-xl">
          Level up your profile and unlock new opportunities! ✨ Update your
          profile to connect with clients, make offers and start getting paid
        </p>
        <div className="flex justify-center gap-5">
          <button
            onClick={onClose}
            className="rounded-full border-[0.5px] border-primary bg-[#EBE9F4] px-5 py-2 font-bold text-primary"
          >
            Back
          </button>
          <Link
            href="/service-provider/profile"
            className="rounded-full bg-[#381F8C] px-5 py-2 font-bold text-[#EBE9F4]"
          >
            Go To Profile
          </Link>
        </div>
        <Image
          src="/assets/icons/popup-design.png"
          width={263}
          height={626}
          alt="Icon"
          className="absolute -left-10 top-5 h-full w-3/12 sm:left-0"
        />
        <Image
          src="/assets/icons/popup-design.png"
          width={263}
          height={626}
          alt="Icon"
          className="absolute -right-10 top-5 aspect-auto h-full w-3/12 scale-x-[-1] sm:right-0"
        />
      </div>
    </Popup>
  );
}

export default ProfileIncomplete;

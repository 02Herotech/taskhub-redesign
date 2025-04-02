import React from "react";
import Popup from "@/components/global/Popup/PopupTwo";
import Image from "next/image";
import Link from "next/link";

function SuccessPopup({ email }) {
  return (
    <Popup isOpen={false} onClose={() => {}}>
      <div className="relative mt-6 max-h-[700px] min-w-[320px] max-w-[700px] bg-white p-5 sm:min-w-[500px]">
        <Image
          src="/assets/images/onboarding/new-mail.png"
          alt="New mail"
          width={486}
          height={370}
          className="mx-auto mb-5 w-2/3 object-cover sm:w-1/2"
        />
        <h3 className="mb-3 text-center font-clashMedium text-2xl md:text-4xl">
          You’ve got mail!
        </h3>
        <p className="mb-5 max-w-[600px] text-center text-base font-medium text-[#55535A] md:text-2xl">
          A link has been sent to{" "}
          <span className="text-[#FE9B07]">{email}</span>, click on the link to
          verify or{" "}
          <Link
            href="/auth/sign-up?action=change-email"
            className="text-primary underline"
          >
            Change email
          </Link>
        </p>

        <button className="mx-auto block w-max rounded-full bg-[#381F8C] px-6 py-2 font-bold text-white">
          Resend email
        </button>
      </div>
    </Popup>
  );
}

export default SuccessPopup;

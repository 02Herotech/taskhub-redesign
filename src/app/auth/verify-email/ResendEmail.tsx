"use client";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Popup from "@/components/global/Popup/PopupTwo";
import Link from "next/link";
import Image from "next/image";

const fadeAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function ResendEmail({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const resendEmail = async (email: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/re-send/verification-mail`;
    try {
      setIsLoading(true);
      setMessage("");
      setError("");
      const { data } = await axios.post(
        `${url}?email=${email}&requestTypeActivation=REGISTRATION`,
      );
      setMessage(data.message);
      setError("");
    } catch (error: any) {
      console.error(error);
      setMessage("");
      setError("Verification mail cannot be sent to this email");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <p className="mb-3 text-sm font-bold text-[#55535A] md:text-lg">
        If you did not receive an email,{" "}
        <button
          onClick={() => resendEmail(email)}
          disabled={isLoading}
          className={
            "underline " + (isLoading ? "text-[#D3D2D5]" : "text-primary")
          }
        >
          {isLoading ? "resending." : "resend email."}
        </button>
      </p>
      {error && (
        <AnimatePresence>
          <motion.p {...fadeAnimationProps} className="text-red-300">
            {error}
          </motion.p>
        </AnimatePresence>
      )}
      <Popup isOpen={Boolean(message)} onClose={() => setMessage("")}>
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
            <span className="text-[#FE9B07]">{email}</span>, click on the link
            to verify or{" "}
            <Link
              href="/auth/sign-up?action=change-email"
              className="text-primary underline"
            >
              Change email
            </Link>
          </p>

          <button
            onClick={() => resendEmail(email)}
            className="mx-auto block w-max rounded-full bg-[#381F8C] px-6 py-2 font-bold text-white"
          >
            Resend email
          </button>
        </div>
      </Popup>
    </>
  );
}

export default ResendEmail;

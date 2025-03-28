"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Button from "@/components/global/Button";

const fadeAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function ResendEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const abn = searchParams.get("abn");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const resendEmail = async (email: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/re-send/verification-mail`;
    try {
      setIsLoading(true);
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
      <p className="mb-5 text-sm font-medium text-[#444248] md:text-xl">
        A {message ? "new link" : "link"} has been sent to{" "}
        <span className="text-[#FE9B07]">{email}</span>, click on the link to
        verify email{" "}
        {abn === "false" && (
          <span>
            or{" "}
            <Link
              href="/auth/sign-up?action=change-email"
              className="text-primary underline"
            >
              Change email
            </Link>
          </span>
        )}
      </p>
      <Button
        loading={isLoading}
        disabled={isLoading}
        onClick={() => resendEmail(email)}
        className="my-4 rounded-full bg-primary px-10 py-2 font-satoshiBold font-bold text-white"
      >
        Resend email
      </Button>
      {error && (
        <AnimatePresence>
          <motion.p {...fadeAnimationProps} className="text-red-300">
            {error}
          </motion.p>
        </AnimatePresence>
      )}
    </>
  );
}

export default ResendEmail;

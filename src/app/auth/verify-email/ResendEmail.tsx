"use client";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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
      {message && (
        <AnimatePresence>
          <motion.p {...fadeAnimationProps} className="text-[#55535A]">
            {message}
          </motion.p>
        </AnimatePresence>
      )}
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

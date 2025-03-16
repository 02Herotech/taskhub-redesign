"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//Todo Re-directing to login from here would help to identify to show the appropriate popup
const VerifyEmailForm = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("t");
  const email = searchParams.get("e");
  const router = useRouter();

  const verifyUserEmail = async () => {
    if (!token || !email) return;
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/verify?t=${token}&e=${email}`,
      );
      // toast.success("Email verified successfully");
      router.push("/auth/login");
    } catch (error) {
      console.error("Error verifying email:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUserEmail();
  }, []);

  return (
    <section className="mx-auto flex h-[60vh] w-full items-center justify-center max-lg:p-10 xl:w-[600px]">
      <div className="space-y-4">
        <h1 className="text-center text-3xl font-medium text-[#190E3F] lg:text-5xl">
          Email Address verified 🎉
        </h1>
        <p className="font-medium text-tc-gray lg:text-[15px]"></p>
        <h3 className="text-center text-xl font-bold">
          Please
          <Link href="/auth/login" className="text-primary underline">
            {" "}
            Login{" "}
          </Link>
          to continue
        </h3>
      </div>
    </section>
  );
};

export default VerifyEmailForm;

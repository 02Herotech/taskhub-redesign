"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function RedirectLink() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace("/auth/login?onboarding=true");
    }, 2500);
  }, []);
  return (
    <Link
      href="/auth/login?onboarding=true"
      className="rounded-full bg-primary px-10 py-3 font-satoshiBold font-bold text-white"
    >
      Login
    </Link>
  );
}

export default RedirectLink;

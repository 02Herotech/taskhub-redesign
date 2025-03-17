"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AccountType() {
  const [userType, setUserType] = useState<"Customer" | "Service Provider">(
    "Customer",
  );
  const router = useRouter();

  const params = new URLSearchParams({ userType });

  return (
    <section className="mx-auto flex h-full w-full items-center justify-center p-5 lg:p-10 xl:w-[554px]">
      <div className="space-y-10">
        <div className="font-clashDisplay space-y-4">
          <h1 className="text-2xl font-medium text-[#190E3F] lg:text-4xl">
            Create Account
          </h1>
          <p className="text-xl font-medium text-tc-gray lg:text-2xl">
            Join us for exclusive access to our services
          </p>
        </div>

        <div className="space-y-10 font-satoshi">
          <h2 className="font-bold text-primary lg:text-2xl">Sign up as a:</h2>
          <div className="flex w-full items-center space-x-8 max-lg:justify-center">
            <button
              onClick={() => setUserType("Customer")}
              className={`h-[48px] w-[120px] lg:h-[70px] lg:w-[210px] ${userType === "Customer" ? "border border-primary bg-primary text-white" : "border-none bg-status-lightViolet text-primary"} rounded-2xl text-sm font-bold lg:text-2xl`}
            >
              Customer
            </button>
            <button
              onClick={() => setUserType("Service Provider")}
              className={`h-[48px] w-[120px] lg:h-[70px] lg:w-[210px] ${userType === "Service Provider" ? "border border-primary bg-primary text-white" : "border-none bg-status-lightViolet text-primary"} rounded-2xl text-sm font-bold lg:text-2xl`}
            >
              Service Provider
            </button>
          </div>

          <div className="max-lg:flex max-lg:items-center max-lg:justify-center">
            <button
              className="h-[40px] w-[170px] rounded-full bg-primary font-normal text-white"
              onClick={() => router.push(`/auth/sign-up?${params.toString()}`)}
            >
              Next
            </button>
          </div>

          <h3 className="text-xl font-bold text-[#190E3F] max-lg:text-center">
            Have an existing account?
            <Link href="/auth/login" className="text-primary">
              {" "}
              Login
            </Link>
          </h3>
        </div>
      </div>
    </section>
  );
}

export default AccountType;

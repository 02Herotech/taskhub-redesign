"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthForm = () => {
    const [userType, setUserType] = useState<"Customer" | "Service Provider">("Customer");
    const router = useRouter();

    const params = new URLSearchParams({ userType });

    return (
        <section className='w-full xl:w-[554px] h-full flex items-center justify-center mx-auto p-5 lg:p-10'>
            <div className='space-y-10'>
                <div className="space-y-4 font-clashDisplay">
                    <h1 className='text-2xl lg:text-4xl text-[#190E3F] font-medium'>
                        Create Account
                    </h1>
                    <p className='text-xl lg:text-2xl text-tc-gray font-medium'>
                        Join us for exclusive access to our services
                    </p>
                </div>

                <div className="space-y-10 font-satoshi">
                    <h2 className="text-primary lg:text-2xl font-bold">Sign up as a:</h2>
                    <div className='flex items-center max-lg:justify-center space-x-8 w-full'>
                        <button
                            onClick={() => setUserType("Customer")}
                            className={`h-[48px] w-[120px] lg:w-[210px] lg:h-[70px] bg-status-lightViolet rounded-2xl font-bold text-sm lg:text-2xl text-primary ${userType === "Customer" ? "border border-primary" : "border-none"}`}
                        >
                            Customer
                        </button>
                        <button
                            onClick={() => setUserType("Service Provider")}
                            className={`h-[48px] w-[120px] lg:w-[210px] lg:h-[70px] bg-status-lightViolet rounded-2xl font-bold text-sm lg:text-2xl text-primary ${userType === "Service Provider" ? "border border-primary" : "border-none"}`}
                        >
                            Service Provider
                        </button>
                    </div>

                    <div className="max-lg:flex max-lg:items-center max-lg:justify-center">
                        <button
                            className='w-[170px] h-[40px] rounded-full font-normal bg-primary text-white'
                            onClick={() => router.push(`/auth/sign-up?${params.toString()}`)}
                        >
                            Next
                        </button>
                    </div>

                    <h3 className="text-xl font-bold max-lg:text-center text-[#190E3F]">
                        Have an existing account?
                        <Link href="/auth/login" className="text-primary"> Login</Link>
                    </h3>
                </div>
            </div>
        </section>
    );
};

export default AuthForm;

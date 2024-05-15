"use client"

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const AuthForm = () => {
    const [userType, setUserType] = useState<"Customer" | "Service Provider">("Customer");
    const router = useRouter();

    return (
        <section className='w-full xl:w-[554px] h-full flex items-center justify-center mx-auto max-lg:p-10'>
            <div className='space-y-10'>
                <div className="space-y-4 font-clashDisplay">
                    <h1 className='text-2xl lg:text-4xl text-black font-medium'>
                        Create Account
                    </h1>
                    <p className='text-xl lg:text-2xl text-tc-gray font-medium'>
                        Join us for exclusive access to our services
                    </p>
                </div>

                <div className="space-y-10 font-satoshi">
                    <h2 className="text-primary lg:text-2xl font-bold">Sign up as a:</h2>
                    <div className='flex items-center space-x-4'>
                        <Button
                            theme= "outline"
                            onClick={() => setUserType("Customer")}
                            className={userType === "Customer" ? "border border-primary" : "border-none"}
                            size="xl"
                        >
                            Customer
                        </Button>
                        <Button
                            theme="outline"
                            onClick={() => setUserType("Service Provider")}
                            className={userType === "Service Provider" ? "border border-primary" : "border-none"}
                            size="xl"
                        >
                            Service Provider
                        </Button>
                    </div>

                    <Button
                        className='w-full lg:w-[170px] rounded-full font-normal'
                        onClick={() => router.push("/auth/sign-up")}
                    >
                        Next
                    </Button>

                    <h3 className="text-xl font-bold">Have an existing account?
                        <Link href="/auth/login" className="text-primary"> Log In</Link>
                    </h3>

                </div>
            </div>
        </section>
    );
};

export default AuthForm;

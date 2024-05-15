"use client"

import { usePathname, useSearchParams } from 'next/navigation'
import Button from "@/components/global/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Suspense } from 'react'
import { taskhubToast } from '@/lib/TaskhubToast';

const VerifyEmailForm = ({ email }: { email: string }) => {
    const router = useRouter()

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    const resendOtp = async (): Promise<void> => {
        try {
            setIsLoading2(true);
            const response = await axios.post(
                `https://syncskills-api.onrender.com/api/learning-mgt/v1/auth/resend-verify-login-otp/${email}`
            );
            toast.success("OTP Resent Successfully");
            setIsLoading2(false);
        } catch (error: any) {
            console.log(error.response);
            toast.error("Something went wrong");
            setIsLoading2(false);
        }
    };


    return (
        <Suspense>
            <section className='w-full xl:w-[554px] mx-auto max-lg:p-10 flex items-center justify-center'>
                <div className='space-y-10'>
                    <div className="space-y-4">
                        <h1 className='text-2xl lg:text-4xl text-black font-medium'>
                            Verify Email Address
                        </h1>
                        <p className='text-xl lg:text-2xl text-tc-gray font-medium'>
                            {`A link has been sent to ${email}, click on the link to verify email`} <Link href="/auth/sign-up" className="text-primary"> Change Email</Link>
                        </p>
                        <h3 className="text-xl font-bold">Have an existing account?
                            <Link href="/auth/login" className="text-primary"> Log In</Link>
                        </h3>
                    </div>

                  
                </div>
            </section>
        </Suspense>
    )
}

export default VerifyEmailForm
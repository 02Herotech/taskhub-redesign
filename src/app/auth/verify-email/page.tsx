"use client"

import { useSearchParams } from 'next/navigation'
import Button from "@/components/global/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Suspense } from 'react'

const VerifyEmail = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;


    const requestOTP = async (e: any) => {
        const verifyOTP = otp.join("");
        e.preventDefault();

        try {
            router.push("/auth/login")
            toast.success(
                "OTP Verified Successfully"
            );
            setIsLoading(false);
        } catch (error: any) {
            toast.error("Something went wrong");
            // console.log(error.response.data.message);
            setIsLoading(false);
        }
    };

    // const clearOtp = () => {
    //     setOtp([...otp.map((v) => "")]);
    //     if (inputRefs.current[0]) {
    //         inputRefs.current[0].current!.focus();
    //     }
    // };

    // const searchParams = useSearchParams()
    const email = "searchParams.get('email')"

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

    const useInputRefs = (length: number) => {
        const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);

        useEffect(() => {
            inputRefs.current = Array(length)
                .fill(null)
                .map(() => React.createRef<HTMLInputElement>());
        }, [length]);

        return inputRefs;
    };

    const inputRefs = useInputRefs(6);


    const handleChange = (element: any, index: any) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (event.key === "Backspace" || event.key === "Delete") {
            if (event.currentTarget.value === "") {
                if (inputRefs.current[index - 1]) {
                    inputRefs.current[index - 1].current!.focus();
                }
            }
        }
    };

    useEffect(() => {
        // update refs when OTP changes
        inputRefs.current.forEach((ref, index) => {
            if (ref.current) {
                ref.current.value = otp[index];
            }
        });
    }, [otp, inputRefs]);

    const clearOtp = () => {
        setOtp([...otp.map((v) => "")]);
        if (inputRefs.current[0]) {
            inputRefs.current[0].current!.focus();
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pasteData = event.clipboardData.getData("text/plain");
        if (!pasteData) return;
        const newOtp = pasteData.split("").slice(0, 6);
        setOtp([...newOtp, ...otp.slice(newOtp.length, 6)]);
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
                            {`A code has been sent to ${email}`} <Link href="/auth/sign-up" className="text-primary"> Change Email</Link>
                        </p>
                    </div>

                    <form onSubmit={requestOTP}>
                        <div>
                            <span className='w-full flex items-center space-x-2 text-sm text-left leading-5 mb-2'>
                                <label htmlFor="" className='capitalize text-[#5B5B66]'>Enter verification code</label>
                            </span>
                            <div className="flex items-center justify-center space-x-4 pb-8">
                                {otp.map((data, index) => (
                                    <input
                                        type="text"
                                        name="otp"
                                        maxLength={1}
                                        value={data}
                                        key={index}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onFocus={(e) => e.target.select()}
                                        onKeyDown={(event) => handleKeyDown(event, index)}
                                        ref={inputRefs.current[index]}
                                        onPaste={handlePaste}
                                        className="border border-[#E9ECF1] p-4 w-full rounded-xl text-center text-lg font-bold outline-none flex justify-center"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='pt-1 space-y-5'>
                            <Button
                                type='submit'
                                loading={isLoading}
                                className='w-full lg:w-[170px] rounded-full font-normal'
                            >
                                Verify
                            </Button>
                            <h3 className="text-xl font-medium">If you did not receive a code?
                                <Button theme='plain' onClick={() => resendOtp()} className="text-primary"> Resend code</Button>
                            </h3>
                        </div>
                    </form>
                </div>
            </section>
        </Suspense>
    )
}

export default VerifyEmail
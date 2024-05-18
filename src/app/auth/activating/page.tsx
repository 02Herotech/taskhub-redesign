"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const VerifyEmailForm = () => {
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams()
    const token = searchParams.get('t')
    const email = searchParams.get('e')
    const router = useRouter()

    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/user/verify?t=${token}&e=${email}`
            );
            toast.success("Email verified successfully");
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
        <section className='w-full xl:w-[554px] mx-auto max-lg:p-10 h-[60vh] flex items-center justify-center'>
            <div className="space-y-4">
                <h1 className='text-3xl lg:text-5xl text-black font-medium'>
                    Email Address verified 🎉
                </h1>
                <p className='lg:text-[15px] text-tc-gray font-medium'>
                </p>
                <h3 className="text-xl font-bold text-center">Please
                    <Link href="/auth/login" className="text-primary underline"> Log In </Link>
                    to continue
                </h3>
            </div>
        </section>
    )
}

export default VerifyEmailForm
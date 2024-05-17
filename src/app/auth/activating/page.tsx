"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const VerifyEmailForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('t')

    return (
        <section className='w-full xl:w-[554px] mx-auto max-lg:p-10 h-[60vh] flex items-center justify-center'>
            <div className="space-y-4">
                <h1 className='text-2xl lg:text-4xl text-black font-medium'>
                    Email Address verified 🎉
                </h1>
                <p className='lg:text-[15px] text-tc-gray font-medium'>
                </p>
                <h3 className="text-xl font-bold">Please
                    <Link href="/auth/login" className="text-primary"> Log In</Link>
                    to continue
                </h3>
            </div>
        </section>
    )
}

export default VerifyEmailForm
"use client"

import Link from "next/link";
import { Suspense } from 'react'

const VerifyEmailForm = ({ email }: { email: string }) => {

    return (
        <Suspense>
            <section className='w-full xl:w-[554px] mx-auto max-lg:p-5 h-[60vh] flex items-center justify-center'>
                <div className="space-y-4">
                    <h1 className='text-2xl lg:text-4xl text-[#190E3F] font-clashSemiBold'>
                        Verify Email Address
                    </h1>
                    <p className='lg:text-[15px] text-tc-gray font-satoshi'>
                        {`A link has been sent to ${email}, click on the link to verify email or`} <Link href="/auth/sign-up" className="text-primary underline"> Change Email</Link>
                    </p>
                    <h3 className="text-xl font-satoshiMedium">Have an existing account?
                        <Link href="/auth/login" className="text-primary"> Login</Link>
                    </h3>
                </div>
            </section>
        </Suspense>
    )
}

export default VerifyEmailForm
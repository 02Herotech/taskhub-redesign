"use client"

import VerifyEmailForm from "@/components/auth/VerifyEmailForm"
import { useSearchParams } from "next/navigation"
import { getCookie } from 'cookies-next';

const VerifyEmailPage = () => {

    const searchParams = useSearchParams()
    const email = searchParams.get('email') || getCookie('email')

    return (
        <VerifyEmailForm email={email!} />
    )
}

export default VerifyEmailPage
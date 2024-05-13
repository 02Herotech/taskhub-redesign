"use client"

import VerifyEmailForm from "@/components/auth/VerifyEmailForm"
import { useSearchParams } from "next/navigation"

const VerifyEmailPage = () => {

    const searchParams = useSearchParams()
    const email = searchParams.get('email')

    return (
        <VerifyEmailForm email={email!} />
    )
}

export default VerifyEmailPage
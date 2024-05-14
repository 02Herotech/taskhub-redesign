"use client"

import PasswordConfirmationForm from "@/components/auth/ForgotPasswordConfirmation"
import { useSearchParams } from "next/navigation"

const ForgotPasswordConfirmation = () => {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')

    return <PasswordConfirmationForm email={email as string} />
}

export default ForgotPasswordConfirmation
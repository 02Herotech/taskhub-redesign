"use client"

import { SessionProvider } from "next-auth/react"

export const AuthSessionProvider = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
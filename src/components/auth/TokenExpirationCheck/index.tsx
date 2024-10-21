"use client"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { checkTokenExpiration } from '@/utils/auth'

export function TokenExpirationCheck({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const checkAuth = async () => {
            // Skip token check for public routes
            const publicPaths = ['/auth/login', '/auth/signup', '/forgot-password']
            if (publicPaths.includes(pathname)) return

            // Check token on initial load
            await checkTokenExpiration()

            // Set up interval to check periodically (every minute)
            const interval = setInterval(async () => {
                await checkTokenExpiration()
            }, 60000)

            return () => clearInterval(interval)
        }

        checkAuth()
    }, [pathname]) // Updated dependency array to use pathname

    return <>{children}</>
}
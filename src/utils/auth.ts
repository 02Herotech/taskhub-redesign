import { getSession, signOut } from "next-auth/react"

export const checkTokenExpiration = async () => {
    const session = await getSession()

    if (!session?.user?.exp) return false

    // Convert exp (in seconds) to milliseconds for Date comparison
    const expirationTime = session.user.exp * 1000
    const now = Date.now()

    // Check if token is expired
    if (expirationTime < now) {
        await signOut({ redirect: true, callbackUrl: '/login' })
        return false
    }

    return true
}
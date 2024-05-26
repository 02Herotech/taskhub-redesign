"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
    const router = useRouter();
    const session = useSession();
    const isAuthorized = session?.status === "authenticated";

    useEffect(() => {
        if (!isAuthorized){
            router.push("/home");
        } else {
            router.push("/marketplace");
        }

    }, []);
    return <main className=''></main>;
}

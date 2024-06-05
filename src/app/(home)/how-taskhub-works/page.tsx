
'use client'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'
const HowTaskhubWorks = () => {
    const router = useRouter()
    useEffect(() => {
        router.push('how-taskhub-works/customer')
    })
    return (
        <main></main>
    )
}

export default HowTaskhubWorks
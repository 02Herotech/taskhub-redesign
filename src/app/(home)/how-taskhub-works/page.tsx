
'use client'
import Header from '@/components/HowTaskhubWorks/Header'
import PostTasks from '@/components/HowTaskhubWorks/PostTasks'
import React, { useEffect } from 'react'
import PostService from '@/components/HowTaskhubWorks/PostService'
import Experiences from '@/components/HowTaskhubWorks/Experience/indes'
import { useRouter } from 'next/navigation'
const HowTaskhubWorks = () => {
    const router = useRouter()
    useEffect(() => {
        router.push('how-taskhub-works/customer')
    })

    return (
        // <div className='py-10 bg-white lg:bg-gradient-to-b from-[#f3dcfc]  via-[#FFFFFF] to-[#F5DDFD]'>

        //     <div className='mx-auto max-w-7xl xl:mx-[120px] lg:mx-[48px] m-[20px] my-0'>

        //         <PostTasks />
        //         <PostService/>
        //         <Experiences/>
        //     </div>
        // </div>
        <span></span>
    )
}

export default HowTaskhubWorks
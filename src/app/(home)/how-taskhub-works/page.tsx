
import Header from '@/components/HowTaskhubWorks/Header'
import PostTasks from '@/components/HowTaskhubWorks/PostTasks'
import React from 'react'
import PostService from '@/components/HowTaskhubWorks/PostService'
import Experiences from '@/components/HowTaskhubWorks/Experience/indes'

const HowTaskhubWorks = () => {
    return (
        <div className='py-10 bg-gradient-to-b from-[#f3dcfc]  via-[#FFFFFF] to-[#F5DDFD]'>

            <div className='mx-auto max-w-7xl xl:mx-[120px] lg:mx-[48px]'>
                <Header />
                <PostTasks />
                <PostService/>
                 <Experiences/>
            </div>



        </div>
    )
}

export default HowTaskhubWorks
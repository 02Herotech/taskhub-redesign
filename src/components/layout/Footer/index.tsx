'use client'
import React, { useState } from 'react'

import NewsLetter from '@/components/newsletter'

const Footer = () => {


    return (
        <footer className='h-[600px] relative '>


            <div className='h-[400px] bg-[#895404]'>Footer</div>

            <div className='absolute -top-24 w-full h-[200px] overflow-hidden'>
                <NewsLetter />
            </div>



        </footer>
    )
}

export default Footer
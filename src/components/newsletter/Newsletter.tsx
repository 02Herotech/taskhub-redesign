/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { AiOutlineCheckCircle } from "react-icons/ai";

import styles from './newsletter.module.css'

const Newsletter = () => {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)


    const handleEmailChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setEmail(e.target.value)
    }

    const isAllFieldsFilled = () => {
        const requiredField = ['email'];
        return requiredField.every(() => email !== '');
    }

    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setSubmitted(!submitted)
        console.log(email)
    }

    return (
        <div className={`flex justify-center flex-col space-y-2 `}>
            <div className={` text-purpleBase`}>
                <h1 className={`font-clashSemiBold text-base text-[#2E095DF2]`}>Subscribe to our Newsletter</h1>
            </div>

            {submitted ? 
                <div className={`flex items-center ${styles.animation}`}>
                    <span className='text-md text-primary'><AiOutlineCheckCircle/></span>
                    <p className='text-[12px] ml-2'>Thank you for Subscribing</p>
                </div> :
                
                <form className={`w-[320px] flex items-center -space-x-5 `} onSubmit={onSubmit}>
                    <input type="email" placeholder="Your Email..." className={`px-5 text-left  text-[12px] text-[#381F8C] outline-none h-[36px] w-[250px] bg-white rounded-xl `} value={email} onChange={handleEmailChange} />
                    <button className={`bg-primary hover:bg-purple5 h-[35px] flex items-center justify-center text-white text-[30px] w-[50px] rounded-[18px] ${isAllFieldsFilled() ? '' : 'opacity-80'}`} type='submit'
                        disabled={!isAllFieldsFilled()} >
                        <MdKeyboardArrowRight />
                    </button>
                </form>
            
            }
            
        </div>
    )
}

export default Newsletter
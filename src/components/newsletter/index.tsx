'use client'
import React, { useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import styles from './newsletter.module.css'

const NewsLetter = () => {
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
       
            <div className='mx-auto z-50 xl:w-[53%] lg:w-[70%] overflow-hidden h-full'>
                <div className='bg-[#140B31] px-10 py-10 rounded-3xl z-10'>

                    <div className='flex gap-[5%] items-center'>
                        <div className='flex flex-col w-[40%]' >
                            <h2 className='xl:text-[32px] text-[28px] font-clashSemiBold  text-white text-left'>
                                Newsletter
                            </h2>

                            <p className='font-satoshi text-[12px] text-white'>
                                Join our newsletter for an exclusive pass to the
                                latest breaking news, in-depth analysis,
                                and insider perspectives delivered straight to your inbox.
                            </p>
                        </div>

                        <div className='w-[55%]'>
                            {
                                submitted ?
                                    <div className={`flex items-center ${styles.animation} text-[#EEEEEF]`}>
                                        <span className='text-[15px] '><AiOutlineCheckCircle /></span>
                                        <p className='text-[15px] ml-2'>Thank you for Subscribing</p>
                                    </div> :
                                    <form className={`w-full bg-white rounded-[60px] flex justify-between  items-center px-2   `} onSubmit={onSubmit}>
                                        <input type="email" placeholder="Enter your email" className={`px-5 rounded-[60px] text-left  text-[12px] text-[#381F8C] outline-none h-[50px] w-[70%]  `} value={email} onChange={handleEmailChange} />
                                        <button className={`bg-[#E58C06]   font-satoshi text-[17px] px-3 text-[#EEEEEF] font-[600] rounded-[60px] h-[40px] w-[100px] ${isAllFieldsFilled() ? '' : 'opacity-80 cursor-not-allowed'}`} type='submit'
                                            disabled={!isAllFieldsFilled()} >
                                            Subscribe
                                        </button>
                                    </form>
                            }

                        </div>

                    </div>

                </div>
                <div className='mt-[-200px] !overflow-hidden flex justify-between'>
                    <svg width="391" height="200" viewBox="0 0 391 207" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M61.2185 59.3549C10.1179 38.9515 -6.75186 85.4965 -8.79918 111.319C-11.3509 159.754 15.7118 141.397 31.0403 181.946C46.3688 222.495 55.8798 182.868 80.72 177.001C105.56 171.134 90.9645 225.91 136.38 214.018C181.795 202.126 187.752 116.101 128.842 146.351C69.9312 176.601 125.094 84.859 61.2185 59.3549Z" stroke="white" stroke-opacity="0.3" stroke-width="2" />
                        <path d="M65.893 76.8159C26.5258 61.1188 13.5318 96.922 11.9557 116.786C9.99203 154.043 30.8395 139.923 42.6498 171.116C54.4601 202.308 61.7854 171.826 80.9213 167.314C100.057 162.802 88.8154 204.937 123.801 195.791C158.787 186.645 163.373 120.472 117.991 143.739C72.6099 167.005 115.102 96.4372 65.893 76.8159Z" stroke="white" stroke-opacity="0.3" stroke-width="2" />
                        <path d="M56.8438 43.1852C-5.2347 18.42 -25.7264 74.9098 -28.2124 106.25C-31.3102 165.034 1.56511 142.756 20.1881 191.97C38.8111 241.184 50.3635 193.09 80.5395 185.97C110.716 178.851 92.9866 245.331 148.157 230.9C203.327 216.468 210.561 112.062 138.997 148.773C67.433 185.484 134.442 74.1417 56.8438 43.1852Z" stroke="white" stroke-opacity="0.3" stroke-width="2" />
                        <path d="M53.2231 29.6039C-17.9388 1.17992 -41.4325 66.0249 -44.2842 102C-47.8386 169.477 -10.151 143.903 11.1945 200.394C32.54 256.884 45.7858 201.678 80.3783 193.504C114.971 185.329 94.6436 261.642 157.889 245.073C221.134 228.505 229.431 108.658 147.393 150.802C65.3538 192.946 142.175 65.134 53.2231 29.6039Z" stroke="white" stroke-opacity="0.3" stroke-width="2" />
                        <path d="M47.9308 10.1992C-36.4813 -23.4619 -64.3437 53.3161 -67.7233 95.9128C-71.9343 175.809 -27.2324 145.53 -1.90862 212.42C23.4152 279.31 39.1225 213.943 80.1544 204.267C121.186 194.591 97.0808 284.948 172.099 265.334C247.117 245.721 256.95 103.817 159.641 153.711C62.3328 203.606 153.446 52.2756 47.9308 10.1992Z" stroke="white" stroke-opacity="0.3" stroke-width="2" />
                        <path d="M41.7347 -12.4426C-58.1999 -52.216 -91.1778 38.4832 -95.1749 88.8045C-100.153 183.189 -47.2349 147.424 -17.249 226.446C12.7368 305.469 31.326 228.249 79.9007 216.823C128.476 205.396 99.9466 312.136 188.755 288.973C277.563 265.81 289.191 98.1726 173.997 157.106C58.8025 216.039 166.653 37.2742 41.7347 -12.4426Z" stroke="white" stroke-opacity="0.3" stroke-width="2" />
                    </svg>

                    <svg width="381" height="200" viewBox="0 0 381 207" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M314.303 29.8719C363.438 5.1049 384.288 50.0077 388.572 75.555C395.323 123.584 366.768 107.649 355.021 149.377C343.275 191.104 330.356 152.454 305.1 148.768C279.844 145.082 299.145 198.382 252.868 190.482C206.591 182.581 193.18 97.3999 254.497 122.416C315.813 147.431 252.886 60.8307 314.303 29.8719Z" stroke="white" stroke-opacity="0.3" stroke-width="2" />
                        <path d="M311.164 47.6732C349.018 28.6143 365.074 63.1528 368.371 82.8044C373.565 119.75 351.569 107.496 342.514 139.596C333.46 171.697 323.513 141.967 304.057 139.135C284.602 136.303 299.463 177.302 263.814 171.231C228.166 165.16 217.847 99.6359 265.079 118.871C312.311 138.105 263.847 71.4967 311.164 47.6732Z" stroke="white" stroke-opacity="0.3" stroke-width="2" />
                        <path d="M317.257 13.3825C376.948 -16.6839 402.271 37.8114 407.472 68.8173C415.666 127.109 380.979 107.773 366.704 158.419C352.428 209.065 336.74 162.157 306.059 157.687C275.379 153.217 298.818 217.904 242.602 208.322C186.386 198.74 170.107 95.3577 244.591 125.71C319.074 156.063 242.642 50.9655 317.257 13.3825Z" stroke="white" stroke-opacity="0.3" stroke-width="2" />
                        <path d="M319.684 -0.461601C388.106 -34.9624 417.146 27.5956 423.114 63.1872C432.519 130.1 392.751 107.897 376.396 166.029C360.04 224.162 342.047 170.315 306.875 165.178C271.703 160.041 298.585 234.298 234.139 223.288C169.694 212.279 151.012 93.6068 236.403 128.462C321.794 163.317 234.156 42.6644 319.684 -0.461601Z" stroke="white" stroke-opacity="0.3" stroke-width="2" />
                        <path d="M323.269 -20.2532C404.436 -61.1228 438.866 12.9434 445.934 55.0852C457.073 134.313 409.909 108.034 390.494 176.871C371.079 245.708 349.75 181.954 308.033 175.881C266.315 169.807 298.182 257.727 221.743 244.707C145.305 231.688 123.177 91.1754 224.453 132.424C325.729 173.673 221.81 30.8338 323.269 -20.2532Z" stroke="white" stroke-opacity="0.3" stroke-width="2" />
                        <path d="M327.474 -43.348C423.574 -91.6557 464.31 -4.1656 472.665 45.6179C485.826 139.213 430.001 108.182 406.996 189.511C383.991 270.841 358.761 195.529 309.377 188.367C259.993 181.205 297.69 285.062 207.205 269.704C116.719 254.346 90.5674 88.3539 210.447 137.053C330.327 185.753 207.349 17.0368 327.474 -43.348Z" stroke="white" stroke-opacity="0.3" stroke-width="2" />
                    </svg>


                </div>
            </div>

       


    )
}

export default NewsLetter
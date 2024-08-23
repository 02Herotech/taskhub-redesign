'use client'
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleFAQ = (index: any) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const faqData = [
        {
            question: "What is Olójà?",
            answer:
                "Olójà is an AI-driven platform that transcends boundaries, connecting diverse communities with a world of authentic products and services.",
        },
        {
            question: "Are there fees for using Olójà?",
            answer: "Olójà Hub charges fees for renting a shop and service listings.",
        },
        {
            question: "Are my transactions safe?",
            answer:
                "Yes, your transactions are safe. We use industry-standard encryption and secure payment processing to protect your data. Our payment system is PCI compliant, and we regularly monitor and update our security measures to ensure your information remains secure.",
        },
        {
            question: "Can I list all my products on Olójà?",
            answer:
                "Yes, you can showcase your entire range of legally permitted products on Olójà Hub via your personalized virtual store.",
        },
        {
            question: "Are there ways to verify service providers on your platform?",
            answer: "Yes, we verify the service providers on Olójà.",
        },
    ];

    return (
        <div className='bg-[#E1DDEE] py-10 xl:h-[700px] lg:h-[720px]'>

            <div className='mx-auto max-w-7xl'>
                <div className='mx-auto w-[85%]'>

                    <h2 className='xl:text-[32px] text-[28px] font-satoshiBold font-[700]  text-[#2A1769] text-center lg:pt-10'>
                        Frequently asked questions
                    </h2>

                    <div className='w-full max-w-3xl mx-auto my-10 space-y-5'>
                        {
                            faqData.map((item, index) => (
                                <div key={index} className='border border-[#E58C06] rounded-lg bg-[#FBEEDA] p-4 transition-all duration-300 ease-in-out'
                                    style={{
                                        boxShadow: openIndex === index ? '0 4px 6px rgba(0,0,0, 0.1)' : ''
                                    }}
                                >
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleFAQ(index)}>

                                        <h3 className='xl:text-[20px] text-[24px] text-black font-satoshiBold font-[700]'>
                                            {item.question}
                                        </h3>
                                        <FaChevronDown
                                            className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'
                                                }`}
                                        />

                                    </div>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40' : 'max-h-0'
                                            }`}
                                    >
                                        <p className="font-satoshiMedium mt-2 pr-4 text-black">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ
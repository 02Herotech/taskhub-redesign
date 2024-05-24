"use client"

import Button from "@/components/global/Button"
import { FaLocationDot, FaEnvelope } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";

const ContactUsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    const subjectCategoriesData = [
        "General Inquiry",
        "Technical Support",
        "Billing",
        "Feedback",
        "Other",
    ];

    const topicCategoriesData = [
        "Account",
        "Billing",
        "Technical Support",
        "Feedback",
        "Other",
    ];

    return (
        <div className="">
            <section className='bg-cover bg-center bg-no-repeat background max-lg:mt-20 h-[157px] lg:h-[378px] flex items-center justify-center bg-[url("/assets/images/contact/contactBanner.png")]'>
                <h1 className='max-lg:text-3xl lg:text-5xl font-bold lg:max-w-[757px] text-white font-clashDisplay'>
                    Contact us
                </h1>
            </section>
            <div className="bg-white lg:bg-gradient-to-b from-[#F8E9FE] via-[#FFFFFF] to-[#FBEAFF] w-full">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-10 max-lg:py-14 max-lg:px-5 lg:p-14 font-satoshi container">
                    <div className="w-full lg:w-[70%] max-lg:mb-10">
                        <form className="lg:space-y-10">
                            <div className="mb-4 lg:flex items-center">
                                <label className="lg:text-black text-[#333236] font-medium lg:font-bold text-sm lg:text-xl lg:w-[25%]">Subject category:</label>
                                <select
                                    className="w-full mt-2 py-3 px-5 placeholder:text-[#D3D2D5] border border-gray-300 rounded-2xl bg-white"
                                    value={selectedCategory || ""}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="" disabled>Enter subject category</option>
                                    {subjectCategoriesData.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 lg:flex items-center">
                                <label className="lg:text-black text-[#333236] font-medium lg:font-bold text-sm lg:text-xl lg:w-[25%]">Full name:</label>
                                <input type="text" className="w-full mt-2 p-3 border border-gray-300 rounded-2xl placeholder:text-[#D3D2D5]" placeholder="Enter full name" />
                            </div>
                            <div className="mb-4 lg:flex items-center">
                                <label className="lg:text-black text-[#333236] font-medium lg:font-bold text-sm lg:text-xl lg:w-[25%]">Email address:</label>
                                <input type="email" className="w-full mt-2 p-3 border border-gray-300 rounded-2xl placeholder:text-[#D3D2D5]" placeholder="JohnDoe@gmail.com" />
                            </div>
                            <div className="mb-4 lg:flex items-center">
                                <label className="lg:text-black text-[#333236] font-medium lg:font-bold text-sm lg:text-xl lg:w-[25%]">Topic category:</label>
                                <select
                                    className="w-full mt-2 py-3 px-5 placeholder:text-[#D3D2D5] border border-gray-300 rounded-2xl bg-white"
                                    value={selectedTopic || ""}
                                    onChange={(e) => setSelectedTopic(e.target.value)}
                                >
                                    <option value="" disabled>Enter topic category</option>
                                    {topicCategoriesData.map((topic, index) => (
                                        <option key={index} value={topic}>
                                            {topic}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 lg:flex items-start">
                                <label className="lg:text-black text-[#333236] font-medium lg:font-bold text-sm lg:text-xl lg:w-[25%]">Message:</label>
                                <textarea className="w-full mt-2 p-3 border border-gray-300 rounded-2xl placeholder:text-[#D3D2D5]" placeholder="Write your message here..." rows={8}></textarea>
                            </div>
                            <div className="flex items-center justify-center lg:justify-end mt-8">
                                <Button type="submit" className="w-full lg:w-[231px] font-medium py-6 text-xl rounded-full">Send message</Button>
                            </div>
                        </form>
                    </div>
                    <div className="w-full lg:w-1/3 p-8 space-y-5 font-satoshi drop-shadow-xl bg-white rounded-[20px]">
                        <h3 className="text-xs lg:text-base font-medium text-primary">Let us know how we can help you</h3>
                        <h2 className="text-[33px] lg:text-[45px] text-primary font-bold">Get in <span className="text-tc-orange">Touch.</span></h2>
                        <p className="text-[#190E3F] text-xs lg:text-lg">Use the form below to send a message to Taskhub. We aim to answer all inquiries within 1-2 days, depending on the nature of the inquiry.</p>

                        <div className="flex items-center space-x-3">
                            <FaLocationDot className="text-tc-orange w-[29px] h-[39px] lg:w-[35px] lg:h-[46px]" />
                            <div className="">
                                <h4 className="font-bold text-base lg:text-xl text-primary">Sydney Australia</h4>
                                <p className="text-[#190E3F] text-xs lg:text-base font-medium">290 Maryam Springs 260, Courbevoie</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <IoCallSharp className="text-tc-orange w-[29px] h-[39px] lg:w-[35px] lg:h-[46px]" />
                            <div className="">
                                <h4 className="font-bold text-base lg:text-xl text-primary">Call Us</h4>
                                <p className="text-[#190E3F] text-xs lg:text-base font-medium">(+61) 245-673-890</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-tc-orange w-[29px] h-[39px] lg:w-[35px] lg:h-[46px]" />
                            <div className="">
                                <h4 className="font-bold text-base lg:text-xl text-primary">Send us an Email</h4>
                                <a href="mailto:privacy@taskhub.com.au" className="text-[#190E3F] hover:underline text-xs lg:text-base font-medium">privacy@taskhub.com.au</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUsPage

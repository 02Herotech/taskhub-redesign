"use client";

import Button from "@/components/global/Button";
import { FaLocationDot, FaEnvelope } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
    id: number;
    categoryName: string;
};

const ContactUsPage = () => {
    const [categoriesData, setCategoriesData] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [fullName, setFullName] = useState<string>('');
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/util/all-categories`,
                );
                setCategoriesData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategoriesData();
    }, []);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedCategory === null) {
            setErrorMessage('Please select a subject category.');
            return;
        }

        if (fullName === '') {
            setErrorMessage('Please enter your full name.');
            return;
        }

        if (emailAddress === '') {
            setErrorMessage('Please enter your email address.');
            return;
        }

        if (message === '') {
            setErrorMessage('Please enter a message.');
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/util/contact-us`,
                {
                    subjectCategoryId: selectedCategory,
                    fullName,
                    emailAddress,
                    message,
                }
            );
            setSuccessMessage('Form submitted successfully');
            setErrorMessage('');
            console.log('Form submitted', response.data);
            // Reset the form fields
            setSelectedCategory(null);
            setFullName('');
            setEmailAddress('');
            setMessage('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
            <section className='bg-cover bg-center bg-no-repeat background max-lg:mt-[4rem] h-[157px] lg:h-[378px] flex items-center justify-center bg-[url("/assets/images/contact/contactBanner.png")]'>
                <h1 className='max-lg:text-3xl lg:text-5xl font-bold lg:max-w-[757px] text-white font-clashSemiBold'>
                    Contact us
                </h1>
            </section>
            <div className="bg-white lg:bg-gradient-to-b from-[#F8E9FE] via-[#FFFFFF] to-[#FBEAFF] w-full">
                <div className="flex flex-col lg:grid lg:grid-cols-3 lg:justify-between lg:space-x-20 max-lg:py-14 max-lg:px-5 lg:p-28 font-satoshi">
                    <div className="w-full lg:col-span-2 max-lg:mb-10">
                        <form className="lg:space-y-10" onSubmit={handleFormSubmit}>
                            <div className="mb-4 lg:flex items-center">
                                <label className="lg:text-black text-[#333236] font-medium lg:font-bold text-sm lg:text-xl lg:w-[25%]">Subject category:</label>
                                <select
                                    className="w-full mt-2 py-3 px-5 placeholder:text-[#D3D2D5] border border-gray-300 rounded-2xl bg-white"
                                    value={selectedCategory ?? ''}
                                    onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
                                >
                                    <option value="" disabled className="text-[#D3D2D5]">Enter subject category</option>
                                    {categoriesData.map((category, index) => (
                                        <option key={index} value={category.id}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 lg:flex items-center">
                                <label className="lg:text-black text-[#333236] font-medium lg:font-bold text-sm lg:text-xl lg:w-[25%]">Full name:</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-2xl placeholder:text-[#D3D2D5]"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div className="mb-4 lg:flex items-center">
                                <label className="lg:text-black text-[#333236] font-medium lg:font-bold text-sm lg:text-xl lg:w-[25%]">Email address:</label>
                                <input
                                    type="email"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-2xl placeholder:text-[#D3D2D5]"
                                    value={emailAddress}
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                    placeholder="Johndoe@gmail.com"
                                />
                            </div>
                            <div className="mb-4 lg:flex items-start">
                                <label className="lg:text-black text-[#333236] font-medium lg:font-bold text-sm lg:text-xl lg:w-[25%]">Message:</label>
                                <textarea
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-2xl placeholder:text-[#D3D2D5]"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write your message here..."
                                    rows={8}
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-end">
                                <Button type="submit" className="w-full lg:w-[231px] font-medium py-6 text-xl rounded-full">Send message</Button>
                            </div>
                            {errorMessage && <p className="text-md text-red-500 my-2 lg:text-center lg:text-base">{errorMessage}</p>}
                            {successMessage && <p className="text-md text-green-500 my-2 lg:text-center lg:text-base">{successMessage}</p>}
                        </form>
                    </div>
                    <div className="w-full lg:col-span-1 p-8 space-y-5 font-satoshi drop-shadow-xl bg-white rounded-[20px]">
                        <h3 className="text-xs lg:text-base font-medium text-primary">How we can help you</h3>
                        <h2 className="text-[33px] lg:text-[45px] text-primary font-bold">Get in <span className="text-tc-orange">Touch.</span></h2>
                        {/* <p className="text-[#190E3F] text-xs lg:text-lg">Use the form below to send a message to Taskhub. We aim to answer all inquiries within 1-2 days, depending on the nature of the inquiry.</p> */}

                        <div className="flex items-center space-x-3">
                            <FaLocationDot className="text-tc-orange w-[29px] h-[39px] lg:w-[35px] lg:h-[46px]" />
                            <div className="">
                                <h4 className="font-bold text-base lg:text-xl text-primary">Sydney Australia</h4>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=290+Maryam+Springs+260%2C+Courbevoie%2C+Sydney+Australia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#190E3F] text-xs lg:text-base font-medium hover:underline"
                                >
                                    290 Maryam Springs 260, Courbevoie
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <IoCallSharp className="text-tc-orange w-[29px] h-[39px] lg:w-[35px] lg:h-[46px]" />
                            <div className="">
                                <h4 className="font-bold text-base lg:text-xl text-primary">Call Us</h4>
                                <a href="tel:+61245673890" className="text-[#190E3F] text-xs lg:text-base font-medium">(+61) 245-673-890</a>
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
    );
}

export default ContactUsPage;

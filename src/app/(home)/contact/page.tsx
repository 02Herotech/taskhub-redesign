"use client";

import Button from "@/components/global/Button";
import { FaLocationDot, FaEnvelope } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
    id: number | null;
    subjectCategoryName: string;
};

const ContactUsPage = () => {
    const [categoriesData, setCategoriesData] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>({
        id: null,
        subjectCategoryName: '',
    });
    const [fullName, setFullName] = useState<string>('');
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/util/all-subject-categories`,
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
                    subjectCategoryId: selectedCategory.id,
                    fullName,
                    emailAddress,
                    message,
                }
            );
            setSuccessMessage('Form submitted successfully');
            setErrorMessage('');
            console.log('Form submitted', response.data);
            // Reset the form fields
            setSelectedCategory({
                id: null,
                subjectCategoryName: '',
            });
            setFullName('');
            setEmailAddress('');
            setMessage('');
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="mt-20">
            <section className='bg-cover bg-center bg-no-repeat background h-[157px] lg:h-[378px] flex items-center justify-center bg-[url("/assets/images/contact/contactBanner.png")]'>
                <h1 className='max-lg:text-3xl lg:text-5xl font-bold lg:max-w-[757px] text-white font-clashSemiBold'>
                    Contact us
                </h1>
            </section>
            <div className="bg-white lg:bg-gradient-to-b from-[#F8E9FE] via-[#FFFFFF] to-[#FBEAFF] w-full">
                <div className="flex flex-col lg:grid lg:grid-cols-3 lg:justify-between lg:space-x-20 max-lg:py-14 max-lg:px-5 lg:p-28 font-satoshi">
                    <div className="w-full lg:col-span-2 max-lg:mb-10 gap-x-10">
                        <form className="lg:space-y-10 w-[90%]" onSubmit={handleFormSubmit}>
                            <div className="mb-4 flex flex-col lg:flex-row lg:items-center w-full">
                                <label className="lg:text-black text-[#333236] font-satoshiMedium lg:font-bold text-sm lg:text-xl lg:w-[18rem] mb-2 lg:mb-0">
                                    Subject category:
                                </label>
                                <div className="w-full">
                                    <div className="relative w-full">
                                        <span
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="block w-full mt-2 p-3 border border-gray-300 bg-white rounded-2xl text-[#333236] cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between">
                                                <h4 className={`${selectedCategory.categoryName ? 'text-black' : 'text-[#D3D2D5]'}`}>
                                                    {selectedCategory.subjectCategoryName ? `${selectedCategory.subjectCategoryName}` : 'Enter subject category'}
                                                </h4>
                                                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.2365 5.68091L8.88456 0.994324C8.95978 0.894089 8.99958 0.780446 9 0.6647C9.00042 0.548953 8.96145 0.43514 8.88696 0.334582C8.81248 0.234024 8.70508 0.150227 8.57544 0.0915275C8.44581 0.0328279 8.29846 0.00127172 8.14806 0L0.85194 0C0.701538 0.00127172 0.55419 0.0328279 0.424556 0.0915275C0.294922 0.150227 0.18752 0.234024 0.113036 0.334582C0.0385523 0.43514 -0.000418663 0.548953 2.86102e-06 0.6647C0.000424385 0.780446 0.0402222 0.894089 0.115437 0.994324L3.7635 5.68091C3.84028 5.77832 3.94839 5.85885 4.0774 5.91474C4.2064 5.97064 4.35195 6 4.5 6C4.64805 6 4.7936 5.97064 4.9226 5.91474C5.05161 5.85885 5.15972 5.77832 5.2365 5.68091Z" fill="#190E3F" />
                                                </svg>
                                            </div>
                                        </span>
                                        <div
                                            className={`small-scrollbar right-0 absolute top-[calc(100%+0.2rem)] flex w-full flex-col rounded-md bg-white transition-all duration-300 ${isDropdownOpen
                                                ? "max-h-64 overflow-y-auto border-[1.5px] border-[#E9ECF1]"
                                                : "max-h-0 overflow-hidden"
                                                }`}
                                        >
                                            <div className="p-5 space-y-3 w-full">
                                                {categoriesData.map((category, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => {
                                                            setSelectedCategory(category)
                                                            setIsDropdownOpen(false)
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        {category.subjectCategoryName}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 lg:flex items-center">
                                <label className="lg:text-black text-[#333236] font-satoshiMedium lg:font-bold text-sm lg:text-xl lg:w-[18rem]">Full name:</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-2xl placeholder:text-[#D3D2D5]"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div className="mb-4 lg:flex items-center">
                                <label className="lg:text-black text-[#333236] font-satoshiMedium lg:font-bold text-sm lg:text-xl lg:w-[18rem]">Email address:</label>
                                <input
                                    type="email"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-2xl placeholder:text-[#D3D2D5]"
                                    value={emailAddress}
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                    placeholder="Johndoe@gmail.com"
                                />
                            </div>
                            <div className="mb-4 lg:flex items-start">
                                <label className="lg:text-black text-[#333236] font-satoshiMedium lg:font-bold text-sm lg:text-xl lg:w-[18rem]">Message:</label>
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
                        <h3 className="text-xs lg:text-base font-satoshiMedium text-primary">How we can help you</h3>
                        <h2 className="text-[33px] lg:text-[45px] text-primary font-bold">Get in <span className="text-tc-orange">Touch.</span></h2>
                        {/* <p className="text-[#190E3F] text-xs lg:text-lg">Use the form below to send a message to Taskhub. We aim to answer all inquiries within 1-2 days, depending on the nature of the inquiry.</p> */}

                        <div className="flex items-center space-x-5">
                            <svg width="35" height="47" viewBox="0 0 35 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.7015 45.5719C2.4582 26.6473 0 24.7051 0 17.75C0 8.22306 7.83499 0.5 17.5 0.5C27.165 0.5 35 8.22306 35 17.75C35 24.7051 32.5418 26.6473 19.2985 45.5719C18.4294 46.8094 16.5705 46.8093 15.7015 45.5719ZM17.5 24.9375C21.5271 24.9375 24.7917 21.7196 24.7917 17.75C24.7917 13.7804 21.5271 10.5625 17.5 10.5625C13.4729 10.5625 10.2083 13.7804 10.2083 17.75C10.2083 21.7196 13.4729 24.9375 17.5 24.9375Z" fill="#FE9B07" />
                            </svg>
                            <div className="">
                                <h4 className="font-bold text-base lg:text-xl text-primary">Queensland Australia</h4>
                                <a
                                    href="https://maps.app.goo.gl/KqruzJD5MuJ9bFEA7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#190E3F] text-xs lg:text-base font-medium hover:underline"
                                >
                                    Liberty drive, Flagstone 4280
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-5 lg:!my-8">
                            <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.30779 2.23041L8.62014 0.542947C9.41465 0.360138 10.2303 0.774973 10.5537 1.52027L13.9286 9.3951C14.2239 10.0842 14.0271 10.8927 13.4435 11.3638L9.18263 14.8512C11.7138 20.2441 16.1364 24.7299 21.6417 27.3104L25.1292 23.0495C25.6073 22.4659 26.4088 22.2691 27.0979 22.5644L34.9727 25.9393C35.7251 26.2697 36.1399 27.0854 35.9571 27.8799L34.2696 35.1922C34.0938 35.9516 33.4189 36.5 32.6243 36.5C14.6177 36.5 0 21.9105 0 3.87569C0 3.08821 0.541397 2.40619 1.30779 2.23041Z" fill="#FE9B07" />
                            </svg>
                            <div className="">
                                <h4 className="font-bold text-base lg:text-xl text-primary">Call Us</h4>
                                <a href="tel:+61426131854" className="text-[#190E3F] text-xs lg:text-base font-medium">(+61) 426131854</a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-5">
                            <svg width="41" height="33" viewBox="0 0 41 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M40.2232 11.0667C40.5355 10.8083 41 11.05 41 11.4583V28.5C41 30.7083 39.2783 32.5 37.1562 32.5H3.84375C1.72168 32.5 0 30.7083 0 28.5V11.4667C0 11.05 0.456445 10.8167 0.776758 11.075C2.57051 12.525 4.94883 14.3667 13.1168 20.5417C14.8064 21.825 17.6572 24.525 20.5 24.5083C23.3588 24.5333 26.2656 21.775 27.8912 20.5417C36.0592 14.3667 38.4295 12.5167 40.2232 11.0667ZM20.5 21.8333C22.3578 21.8667 25.0324 19.4 26.3777 18.3833C37.0041 10.3583 37.8129 9.65833 40.2633 7.65833C40.7277 7.28333 41 6.7 41 6.08333V4.5C41 2.29167 39.2783 0.5 37.1562 0.5H3.84375C1.72168 0.5 0 2.29167 0 4.5V6.08333C0 6.7 0.272266 7.275 0.736719 7.65833C3.18711 9.65 3.9959 10.3583 14.6223 18.3833C15.9676 19.4 18.6422 21.8667 20.5 21.8333Z" fill="#FE9B07" />
                            </svg>
                            <div className="">
                                <h4 className="font-bold text-base lg:text-xl text-primary">Send us an Email</h4>
                                <a href="mailto:olojahub@jacinthsolutions.com.au" className="text-[#190E3F] hover:underline text-xs lg:text-base font-medium">olojahub@jacinthsolutions.com.au</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUsPage;

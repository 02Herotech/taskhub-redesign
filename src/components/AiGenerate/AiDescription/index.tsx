"use client"

import Button from '@/components/global/Button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { BeatLoader } from "react-spinners";
import icon3 from "../../../../public/assets/images/serviceProvider/AiButton.jpg";

interface Message {
    type: 'user' | 'ai';
    text: string;
}

interface FormData {
    lisitingTitle: string;
    availability: string;
    
    listingDescription: string;
    planDetails: string;
    planDetails1: string;
    planDetails2: string;
    taskImage: File | defaultImage | null;
    taskImage1?: File | defaultImage | null;
    taskImage2?: File | defaultImage | null;
    taskImage3?: File | defaultImage | null;
    taskType: string;
    price: string;
    price1: string;
    price2: string;
    userAddress: string[];
    categoryId: number | null;
    subCategoryId: number | null;
  }

type defaultImage = string;
interface AiGenerateProps {
    setTask: React.Dispatch<React.SetStateAction<FormData>> | any;
    task: FormData;
}

const AiDesciption: React.FC<AiGenerateProps> = ({ task, setTask }) => {
    const session = useSession();
    const userName = session?.data?.user?.user?.firstName

    const [aiQuery, setAiQuery] = useState('')
    const [currentQuery, setCurrentQuery] = useState('')
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setAiQuery(event.target.value);
        setCurrentQuery(event.target.value);
    };

    const [aiChatView, showAiChatView] = useState(false)
    const AiChatView = () => {
        showAiChatView(!aiChatView)
    }

    const [conversation, setConversation] = useState<Message[]>([]);
    const [AiLoading, setAiLoading] = useState(false);
    const [emptyQuerryField, setEmptyQuerryField] = useState(false)

    const handleAiChatView = async (e: any) => {
        e.preventDefault()
        if (aiQuery === '') {
            setEmptyQuerryField(true)
            return
        } else {
            setEmptyQuerryField(false)
        }
        setAiLoading(true)
        const newConversation: Message[] = [
            ...conversation,
            { type: 'user', text: aiQuery }
        ];
        setConversation(newConversation);
        try {

            const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/create-listing/category/content-generate?category=${encodeURIComponent(aiQuery)}`;
            const response = await axios.get(
                url
            );
            const data = await response.data[0]?.message?.content;
            setConversation([...newConversation, { type: 'ai', text: data }]);      
        } catch (error) {
            console.error('Error fetching AI response:', error);
        } finally {
            setAiQuery('');
            setAiLoading(false)     
        }
    }

    const conversationEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (conversationEndRef.current) {
            conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation]);

    const setServiceDetails = (index: any) => {
        const description = conversation[index]?.text
        setTask({ ...task, listingDescription: description })
        AiChatView()
    }


    const getMoreSuggestions = async () => {
        setAiLoading(true)
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/create-listing/category/content-generate?category=${encodeURIComponent(currentQuery)}`;
            const response = await axios.get(
                url
            );
            const data = await response.data[0]?.message?.content;
            const newConversation: Message[] = [
                ...conversation,
                { type: 'ai', text: data }
            ];
            setConversation(newConversation);
        } catch (error) {
            console.error('Error fetching AI response:', error);
        } finally {
            setAiLoading(false)
        }
    }

    return (
        <div>
            <div className="flex flex-col space-y-6 p-4 bg-[#381F8C] mb-5 rounded-[20px]">

                <h2 className="text-lg font-extrabold text-white">
                    Get personalized AI help
                </h2>
                <p className="text-white">
                    Recommended for you , Get an automated content prompt for your
                    service description by clicking on{" "}
                    <span className="text-[#FE9B07]">Generate with AI</span>{" "}
                    button.
                </p>
                <span>
                    <button
                        onClick={AiChatView} type="button"
                        className={` text-10px p-2 px-4 transition-transform duration-300  w-[160px]
       ease-in-out transform hover:scale-110 bg-[#FE9B07] text-white rounded-[20px]
      `}
                    >
                        {/* <Image alt='' src={icon3} width={10} height={10}/>  */}
                        Generate with AI
                    </button> </span>
            </div>

            {aiChatView && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-84 z-50">
                    <div className=' w-[90%] mx-auto md:w-[60%] lg:w-[50%] bg-[#140B31] h-[90%] p-10 text-white rounded-[16px]'>
                        <div className=' flex justify-end'>
                            <div className='rounded-full bg-white h-[30px] w-[30px] flex items-center justify-center hover:cursor-pointer'
                                onClick={AiChatView}>
                                <IoCloseCircleOutline color='#4E5158' size={20} className='' />
                            </div>
                        </div>
                        <div>
                            <h2 className='text-[25px]'>
                                Hello, {userName}
                            </h2>
                            <p className='text-[#716F78] text-[16px] pb-3'>
                                How can I help you?
                            </p>
                        </div>

                        <div className="conversation lg:h-[65%] h-[65%] overflow-y-scroll space-y-4 ">
                            {conversation.map((entry, index) => (
                                <div key={index}>
                                    <div key={index} className={` ${entry.type === 'user' ? 'flex justify-end' : ''}`}>
                                        <p className={` text-[15px] p-2 ${entry.type === 'user' ? 'bg-white text-[#2A1769] rounded-[12px] mr-[5%] lg:w-[50%] ' : 'w-[85%]'}`}>
                                            {entry.text}
                                        </p>
                                    </div>

                                    <p className={` ${entry.type === 'user' ? 'hidden' : 'my-2'}`}>
                                        <span className='text-[15px] font-bold'>
                                            Are you happy with this suggestion? you can</span> {' '}
                                        <span
                                            onClick={() => setServiceDetails(index)} className='bg-[#FE9B07] text-[14px] px-4 text-white lg:p-2 py-1 lg:mt-0 mt-5 rounded-[20px] hover:cursor-pointer'>
                                            USE
                                        </span> {' '}
                                        <span
                                            onClick={getMoreSuggestions}
                                            className='text-[12px] underline hover:cursor-pointer'>
                                            or  get more suggestions
                                        </span>
                                    </p>
                                </div>
                            ))}

                            <div>

                            </div>
                            <div ref={conversationEndRef} />
                        </div>

                        <p className='h-[15px] '>
                            {AiLoading ? (
                                <BeatLoader color={'white'} size={12} />
                            ) : ''}
                        </p>
                        <div className=" font-medium  rounded-[20px] pt-2 px-4 lg:pb-2 pb-7 relative">

                            <form onSubmit={handleAiChatView}>

                                <textarea
                                    name='aiQuery'
                                    placeholder='Enter request here'
                                    onChange={handleInputChange}
                                    value={aiQuery}
                                    className='text-[16px] font-normal bg-transparent border-[2px] border-[#716F78] text-white 
w-full text-wrap h-[50px] rounded-[12px] px-3 pt-3 overflow-hidden'
                                    required
                                />
                                <div className='hidden lg:block absolute lg:right-[5%] right-[10%] lg:top-[25%]  top-[20%] '>
                                    <button type="submit" > <BiSend color='white' size={26} className='hover:cursor-pointer hover:scale-110 ease-in-out transform' /></button>

                                </div>

                                <div className='lg:hidden absolute lg:right-[5%] right-[10%] lg:top-[25%]  top-[20%]'
                                    onClick={handleAiChatView}>
                                    <span>
                                        <BiSend color='white' size={26} className='hover:cursor-pointer hover:scale-110 ease-in-out transform' />
                                    </span>
                                </div>
                            </form>
                            {emptyQuerryField && (<p className='text-red-500 font-clashDisplay text-center'>Kindly enter your request</p>)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default AiDesciption;

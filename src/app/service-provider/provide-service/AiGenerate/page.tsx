"use client"

import Button from '@/components/global/Button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { BeatLoader } from "react-spinners";

interface Message {
    type: 'user' | 'ai';
    text: string;
}

interface Task {
    serviceDetails: string;
    briefDescription: string;
    physicalService: boolean;
    remoteService: boolean;
    termsAccepted: boolean;
    picture?: File | null;
    workDaysTime: string;
    describe: string;
    address: string;
    Suite: string;
    postalCode: string;
    category: string;
    subCategory: string;
    budget: string;
    time: string;
}

interface AiGenerateProps {
    setTask: React.Dispatch<React.SetStateAction<Task>>;
    task: Task;
}

const AiGeneratedDesc: React.FC<AiGenerateProps> = ({ task, setTask }) => {
    const session = useSession();
    const userName = session?.data?.user?.user?.firstName

    const [showAiInput, setShowAiInput] = useState(false)
    const toggleAiInput = () => {
        setShowAiInput(true)
    }

    const [aiQuery, setAiQuery] = useState('')
    const [currentQuery, setCurrentQuery] = useState('')
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setAiQuery(event.target.value);
        setCurrentQuery(event.target.value);
    };

    const [aiChatView, showAiChatView] = useState(false)
    const closeAiChatView = () => {
        showAiChatView(false)
    }

    const [conversation, setConversation] = useState<Message[]>([]);
    const [AiLoading, setAiLoading] = useState(false);

    const handleAiChatView = async (e: any) => {
        e.preventDefault()
        showAiChatView(true)
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
            newConversation.push({ type: 'ai', text: data });
        } catch (error) {
            console.error('Error fetching AI response:', error);
        } finally {
            setConversation(newConversation);
            setAiQuery('');
            setAiLoading(false)
            // scrollChatToBottom()
        }
    }

    const conversationEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (conversationEndRef.current) {
            // conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
            conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation]);

    // const scrollChatToBottom = () => {
    //     if (conversationEndRef.current) {
    //         conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }


    const setServiceDetails = () => {
        const descriptionIndex = conversation?.length - 1
        const description = conversation[descriptionIndex]?.text
        setTask({ ...task, serviceDetails: description })
        closeAiChatView()
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
                        onClick={toggleAiInput} type="button"
                        className={` text-10px p-2 px-4 transition-transform duration-300  w-[160px]
       ease-in-out transform hover:scale-110 bg-[#333236] text-white rounded-[20px]
      `}
                    >
                        Generate with AI
                    </button> </span>
            </div>

            {showAiInput && (
                <div>
                    <div className="bg-[#2A1769] font-medium min-h-[200px] rounded-[20px] p-4">
                        <form onSubmit={handleAiChatView}>

                            <textarea
                                name='aiQuery'
                                placeholder='Give a service description for a makeup artist who only does sfx makeup'
                                onChange={handleInputChange}
                                value={aiQuery}
                                className='text-[18px] font-normal bg-transparent border-none text-white 
w-full text-wrap h-[180px]'
                                required
                            />
                            <div className='flex justify-end'>
                                <button type="submit" > <BiSend color='white' size={26} className='hover:cursor-pointer hover:scale-110 ease-in-out transform' /></button>

                            </div>

                        </form>

                    </div>





                </div>

            )}

            {aiChatView && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-84 z-50">
                    <div className=' w-[90%] md:w-[60%] lg:w-[50%] bg-[#140B31] h-[90%] p-10 text-white rounded-[16px]'>
                        <div className=' flex justify-end'>
                            <div className='rounded-full bg-white h-[30px] w-[30px] flex items-center justify-center hover:cursor-pointer'
                                onClick={closeAiChatView}>
                                <IoCloseCircleOutline color='#4E5158' size={20} className='' />
                            </div>
                        </div>
                        <div>
                            <h2 className='text-[25px]'>
                                Hello, {userName}
                            </h2>
                            <p className='text-[#716F78] text-[16px]'>
                                How can I help you?
                            </p>
                        </div>

                        <div className="conversation h-[70%] overflow-y-scroll space-y-4">
                            {conversation.map((entry, index) => (
                                <div key={index} className={` ${entry.type === 'user' ? 'flex justify-end' : ''}`}>
                                    <p className={` text-[15px] p-2 ${entry.type === 'user' ? 'bg-white text-[#2A1769] rounded-[12px] mr-[5%] lg:w-[50%] ' : 'w-[85%]'}`}>
                                        {entry.text}
                                    </p>
                                </div>
                            ))}

                            <div ref={conversationEndRef}>
                                <p >
                                    <span className='text-[15px] font-bold'>
                                        Are you happy with this suggestion? you can</span> {' '}

                                    <span
                                        onClick={setServiceDetails} className='bg-[#FE9B07] text-[14px] px-4 text-white p-2 rounded-[20px] hover:cursor-pointer'>
                                        USE
                                    </span> {' '}
                                    <span
                                        onClick={getMoreSuggestions}
                                        className='text-[12px] underline hover:cursor-pointer'>
                                        or  get more suggestions
                                    </span>


                                </p>
                            </div>
                            <div ref={conversationEndRef} />
                        </div>

                        <p className='h-[30px]'>
                            {AiLoading ? (
                                <BeatLoader color={'white'} size={12} />
                            ) : ''}
                        </p>
                        <div className=" font-medium  rounded-[20px] p-4 relative">

                            <form onSubmit={handleAiChatView}>

                                <textarea
                                    name='aiQuery'
                                    placeholder='Enter request here'
                                    onChange={handleInputChange}
                                    value={aiQuery}
                                    className='text-[16px] font-normal bg-transparent border-[2px] border-[#716F78] text-white 
w-full text-wrap h-[50px] rounded-[16px] p-2'
                                    required
                                />
                                <div className='absolute right-[5%] top-[35%] '>
                                    <button type="submit" > <BiSend color='white' size={26} className='hover:cursor-pointer hover:scale-110 ease-in-out transform' /></button>

                                </div>

                            </form>

                        </div>

                    </div>
                </div>
            )}
        </div>
    )
};

export default AiGeneratedDesc;

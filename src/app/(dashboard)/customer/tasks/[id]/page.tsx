"use client"

import Image from 'next/image';
import Button from '@/components/global/Button'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FiCalendar, FiClock } from "react-icons/fi";
import { useGetTaskByIdQuery } from '@/services/tasks';
import { dayOfWeekNames, formatAmount, monthNames, suffixes } from '@/lib/utils';
import Loading from '@/shared/loading';
import { useEffect, useRef, useState } from 'react';
import AssignOfferForm from '@/components/main/explore/AssignOfferForm';

const NewTaskDetails = ({ params }: { params: { id: string } }) => {
    const [showOfferForm, setShowOfferForm] = useState(false);
    const offerButtonRef = useRef<HTMLDivElement>(null);
    const id = params.id;
    const { data: task, isLoading } = useGetTaskByIdQuery(id as unknown as number);

    const [showAssignForm, setShowAssignForm] = useState(false);

    const handleAssign = (offerId: string) => {
        console.log(`Assigning task to offer: ${offerId}`);
        // Implement your assignment logic here
        // You might want to find the user associated with this offer and use their details
        const assignedOffer = offers.find(o => o.id === offerId);
        if (assignedOffer) {
            console.log(`Assigned to: ${assignedOffer.user.name}`);
        }
    };

    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    const handleReply = (offerId: string) => {
        setReplyingTo(offerId);
        setReplyText('');
    };

    const handleSubmitReply = (offerId: string) => {
        console.log(`Reply to offer ${offerId}: ${replyText}`);
        // Here you would typically send the reply to your backend
        setReplyingTo(null);
        setReplyText('');
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (offerButtonRef.current && !offerButtonRef.current.contains(event.target as Node)) {
                setShowOfferForm(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!task) {
        return (
            <div className="w-full flex items-center justify-center h-[full]">
                <Loading />
            </div>
        )
    }

    const handleMakeOffer = () => {
        setShowOfferForm(true);
    };

    const handleCloseOfferForm = () => {
        setShowOfferForm(false);
    };

    const handleSubmitOffer = (offerAmount: string) => {
        console.log(`Offer submitted: ${offerAmount}`);
        // Handle offer submission logic here
    };

    const date = task?.taskDate ? new Date(task.taskDate[0], task.taskDate[1] - 1, task.taskDate[2]) : new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const monthName = monthNames[month];
    const dayOfWeek = date.getDay();
    const dayOfWeekName = dayOfWeekNames[dayOfWeek];
    let daySuffix;
    if (day === 11 || day === 12 || day === 13) {
        daySuffix = "th";
    } else {
        daySuffix = suffixes[day % 10] || suffixes[0]; // Default to "th" if suffix is undefined
    }
    const formattedDate = `${dayOfWeekName}, ${monthName} ${day}${daySuffix}`;
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let formattedTime;
    if (hours >= 12) {
        formattedTime = `${hours === 12 ? 12 : hours - 12}:${(minutes < 10 ? '0' : '') + minutes} PM`;
    } else {
        formattedTime = `${hours === 0 ? 12 : hours}:${(minutes < 10 ? '0' : '') + minutes} AM`;
    }

    const offers = [
        {
            id: '1',
            user: {
                name: 'Daniel Oluchi',
                avatar: '/path/to/avatar1.jpg',
            },
            message: 'I can do it for $2000',
            timestamp: '10 mins ago',
        },
        {
            id: '2',
            user: {
                name: 'Jane Doe',
                avatar: '/path/to/avatar2.jpg',
            },
            message: 'Can I get more information on the kind of pipes you use?',
            timestamp: '8 mins ago',
        },
        {
            id: '3',
            user: {
                name: 'John West',
                avatar: '/path/to/avatar1.jpg',
            },
            message: 'I can do it for $2000',
            timestamp: '10 mins ago',
        },
        {
            id: '4',
            user: {
                name: 'John West',
                avatar: '/path/to/avatar1.jpg',
            },
            message: 'I can do it for $200',
            timestamp: '10 mins ago',
        },
        {
            id: '5',
            user: {
                name: 'John West',
                avatar: '/path/to/avatar1.jpg',
            },
            message: 'I can do it for $4500',
            timestamp: '10 mins ago',
        },
        // ... more offers
    ]

    return (
        <section className="py-5 lg:py-14 lg:px-10 font-satoshi">
            {isLoading ? (
                <div className="w-full flex items-center justify-center h-[full]">
                    <Image src="/assets/images/marketplace/taskhub-newloader.gif" alt="loader" height={300} width={300} />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:space-x-5 w-full mt-10">
                        <div className="space-y-7 lg:space-y-10 font-satoshi">
                            <h2 className="text-lg lg:text-4xl font-black text-primary">{task?.taskBriefDescription}</h2>
                            <div className="space-y-3">
                                <h2 className='text-primary lg:text-2xl font-satoshiMedium font-bold'>Task Description</h2>
                                <p className='text-[#221354] font-satoshiMedium font-medium text-xl'>{task?.taskDescription}</p>
                            </div>
                            <div className="space-y-5">
                                <h4 className='text-primary lg:text-2xl font-satoshiMedium font-bold'>Location</h4>
                                <div className="flex items-center space-x-2 w-full text-[#716F78]">
                                    <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
                                    <h5 className="text-[15px] lg:text-xl font-satoshiMedium font-medium">{task.state ? `${task.postCode}, ${task.suburb}, ${task.state}` : "Remote"}</h5>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <h4 className='text-primary lg:text-2xl font-satoshiMedium font-bold'>Date and Time</h4>
                                <div className="max-lg:text-xs flex items-center space-x-3 text-[#716F78]">
                                    <FiCalendar className="h-6 w-6" />
                                    <h5 className='text-[15px] lg:text-xl font-satoshiMedium font-medium'>On {formattedDate}</h5>
                                </div>
                                <div className="max-lg:text-xs flex items-center space-x-3 text-[#716F78]">
                                    <FiClock className="h-6 w-6" />
                                    <h5 className='text-[15px] lg:text-xl font-satoshiMedium font-medium'>{task.taskTime || "Flexible"}</h5>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-7 lg:space-y-10'>
                            <div className="px-5 py-8 rounded-[20px] border-primary border-2">
                                <h2 className='text-lg lg:text-3xl font-satoshi text-primary font-bold'>Budget Details</h2>
                                <div className="border-primary border-2 mb-6 mt-4" />
                                <div className="flex items-center justify-between w-full">
                                    <h2 className='text-lg lg:text-3xl font-satoshi text-primary font-bold'>
                                        AUD {formatAmount(task?.customerBudget!, "USD", false)}
                                    </h2>
                                    <Button
                                        onClick={() => setShowAssignForm(true)}
                                        className='rounded-full'
                                    >
                                        Assign Task
                                    </Button>
                                </div>
                            </div>
                            <h2 className='text-primary font-bold text-lg lg:text-xl'>Reference Images</h2>
                            {task.taskImage ? <Image src={task.taskImage} width={200} height={100} alt="Explore task" className='object-cover h-52' /> : <p>No image available</p>}
                        </div>
                    </div>
                </>
            )}
            <div className="max-h-96 overflow-y-scroll small-scrollbar pr-5 mt-14">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#E58C06] lg:text-3xl">Offers</h2>
                    <button className="text-lg font-bold text-[#E58C06] lg:text-2xl">View all</button>
                </div>
                <div className="space-y-5">
                    {offers.map((offer) => (
                        <div key={offer.id} className="flex flex-col">
                            <div className={`flex justify-start w-full`}>
                                <div className={`w-full`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <Image
                                                src={offer.user.avatar}
                                                alt={offer.user.name}
                                                width={32}
                                                height={32}
                                                className="rounded-full mr-2"
                                            />
                                            <span className="font-semibold">{offer.user.name}</span>
                                        </div>
                                        <span className="text-primary font-semibold">{offer.timestamp}</span>
                                    </div>
                                    <div className="p-3 rounded-lg bg-gray-100">
                                        <p>{offer.message}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 flex justify-start">
                                <div
                                    onClick={() => handleReply(offer.id)}
                                    className="text-sm text-primary font-semibold py-1 cursor-pointer"
                                >
                                    Reply
                                </div>
                            </div>
                            {replyingTo === offer.id && (
                                <div className="mt-2">
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        rows={3}
                                        placeholder="Type your reply here..."
                                    ></textarea>
                                    <div className="mt-2 flex justify-end space-x-2">
                                        <div
                                            onClick={() => setReplyingTo(null)}
                                            className="text-sm py-1 font-semibold text-rose-600 cursor-pointer"
                                        >
                                            Cancel
                                        </div>
                                        <div
                                            onClick={() => handleSubmitReply(offer.id)}
                                            className="text-sm py-1 text-primary font-semibold cursor-pointer"
                                        >
                                            Send Reply
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {showAssignForm && (
                <AssignOfferForm
                    onClose={() => setShowAssignForm(false)}
                    onAssign={handleAssign}
                    offers={offers}
                />
            )}
        </section>
    )
}

export default NewTaskDetails
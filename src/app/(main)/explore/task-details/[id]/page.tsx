"use client"

import Image from 'next/image';
import Button from '@/components/global/Button'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FiCalendar, FiClock } from "react-icons/fi";
import { useGetTaskByIdQuery, useGetTasksOffersQuery } from '@/services/tasks';
import { dayOfWeekNames, formatAmount, monthNames, suffixes } from '@/lib/utils';
import Loading from '@/shared/loading';
import TaskOffers from '@/components/main/explore/TaskOffers';
import { useRef, useState } from 'react';
import OfferForm from '@/components/main/explore/OfferForm';
import { useSelector } from 'react-redux';
import { RootState } from "@/store";
import { connectSocket } from "@/lib/socket";

const TaskDetailsPage = ({ params }: { params: { id: string } }) => {
    const [showOfferForm, setShowOfferForm] = useState(false);
    const offerButtonRef = useRef<HTMLDivElement>(null);
    const id = params.id;
    const { data: task, isLoading } = useGetTaskByIdQuery(id as unknown as number);
    const { data: offers, refetch} = useGetTasksOffersQuery(id as unknown as number);
    const { profile: user } = useSelector(
        (state: RootState) => state.userProfile,
    );

    const handleSubmitOffer = async (message: string) => {
        const socket = connectSocket(id as unknown as number);

        const data = {
            taskId: id,
            customerId: task?.posterId,
            serviceProviderId: user?.serviceProviderId,
            fullName: user?.firstName + " " + user?.lastName,
            message,
        };

        if (user && socket) {
            try {
                socket.emit("offer", data, () => {});
                refetch();
            } catch (error) {
                console.error('Error submitting offer:', error);
            }
        } else {
            console.error('Socket not connected or user not logged in');
        }

        handleCloseOfferForm();
    };

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

    return (
        <section className="py-20 container font-satoshi">
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
                                    <div className="relative" ref={offerButtonRef}>
                                        <Button
                                            onClick={handleMakeOffer}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    handleMakeOffer();
                                                }
                                            }}
                                            aria-expanded={showOfferForm}
                                            aria-haspopup="true"
                                            className='rounded-full'
                                        >
                                            Make an offer
                                        </Button>

                                        {showOfferForm && (
                                            <OfferForm
                                                onClose={handleCloseOfferForm}
                                                onSubmit={handleSubmitOffer}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <h2 className='text-primary font-bold text-lg lg:text-xl'>Reference Images</h2>
                            {task.taskImage ? <Image src={task.taskImage} width={200} height={100} alt="Explore task" className='object-cover h-52' /> : <p>No image available</p>}
                        </div>
                    </div>
                </>
            )}
            {offers && offers.length > 0 && (
                <TaskOffers posterId={task?.posterId} currentUserId={user?.id!} taskId={Number(id)} />
            )}
        </section>
    )
}

export default TaskDetailsPage
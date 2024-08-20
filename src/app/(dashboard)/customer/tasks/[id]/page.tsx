"use client"

import Image from 'next/image';
import Button from '@/components/global/Button'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FiCalendar, FiClock } from "react-icons/fi";
import { useGetTaskByIdQuery, useGetTasksOffersQuery } from '@/services/tasks';
import { dayOfWeekNames, formatAmount, monthNames, suffixes } from '@/lib/utils';
import Loading from '@/shared/loading';
import { useEffect, useRef, useState } from 'react';
import AssignOfferForm from '@/components/dashboard/customer/AssignOfferForm';
import CustomerTaskOffers from '@/components/dashboard/customer/CustomerTaskOffers';

const NewTaskDetails = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const { data: task, isLoading } = useGetTaskByIdQuery(id as unknown as number);
    const { data: offers, refetch } = useGetTasksOffersQuery(id as unknown as number);

    const [showAssignForm, setShowAssignForm] = useState(false);

    const handleAssign = (offerId: string) => {
        console.log(`Assigning task to offer: ${offerId}`);
    };

    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;

        const intervalId = setInterval(() => {
            if (isMounted.current) {
                refetch();
            }
        }, 10000);

        return () => {
            isMounted.current = false;
            clearInterval(intervalId);
        };
    }, [refetch]);

    if (!task) {
        return (
            <div className="w-full flex items-center justify-center h-[full]">
                <Loading />
            </div>
        )
    }

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

    const isAssigned = task?.taskStatus === 'ASSIGNED';

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
                                        disabled={isAssigned}
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
            {offers && offers.length > 0 && (
                <CustomerTaskOffers taskId={Number(id)} />
            )}
            {showAssignForm && (
                <AssignOfferForm
                    onClose={() => setShowAssignForm(false)}
                    onAssign={handleAssign}
                    offers={offers || []}
                    taskId={Number(id)}
                />
            )}
        </section>
    )
}

export default NewTaskDetails
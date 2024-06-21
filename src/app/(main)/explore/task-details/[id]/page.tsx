"use client"

import Button from '@/components/global/Button'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FiCalendar, FiClock } from "react-icons/fi";
import Image from 'next/image';
import { useGetTaskByIdQuery } from '@/services/tasks';
import { dayOfWeekNames, formatAmount, monthNames, suffixes } from '@/lib/utils';
import Loading from '@/shared/loading';

const TaskDetailsPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const { data: task, isLoading } = useGetTaskByIdQuery(id as unknown as number);

    if (!task) {
        return (
            <div className="w-full flex items-center justify-center h-[full]">
                <Loading />
            </div>
        )
    }

    const availability = task.active ? "Available" : "Unavailable";
    const date = task?.taskDate ? new Date(task.taskDate[0], task.taskDate[1] - 1, task.taskDate[2]) : new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const monthName = monthNames[month];
    const dayOfWeek = date.getDay();
    const dayOfWeekName = dayOfWeekNames[dayOfWeek];
    // Determine the correct suffix for the day
    let daySuffix;
    if (day === 11 || day === 12 || day === 13) {
        daySuffix = "th";
    } else {
        daySuffix = suffixes[day % 10] || suffixes[0]; // Default to "th" if suffix is undefined
    }
    // const daySuffix = suffixes[day % 10] || suffixes[0]; // Default to "th" if suffix is undefined
    const formattedDate = `${dayOfWeekName}, ${monthName} ${day}${daySuffix}`;

    // Get hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Construct the formatted time string
    let formattedTime;
    if (hours >= 12) {
        formattedTime = `${hours === 12 ? 12 : hours - 12}:${(minutes < 10 ? '0' : '') + minutes} PM`;
    } else {
        formattedTime = `${hours === 0 ? 12 : hours}:${(minutes < 10 ? '0' : '') + minutes} AM`;
    }

    // function transformHubTime(hubTime: string): string {
    //     if (typeof hubTime !== 'string') {
    //         return 'No time specified';
    //     }

    //     return hubTime
    //         .toLowerCase()
    //         .split('_')
    //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    //         .join(' ');
    // }

    return (
        <section className="py-20 container font-satoshi">
            {/* <Link href="/explore" className="flex items-center space-x-5 lg:space-x-10 text-primary mb-2">
                <FaChevronLeft />
                <h2 className='font-bold text-lg lg:text-2xl font-clashDisplay'>Job Details</h2>
            </Link>
            <hr /> */}
            {isLoading ? (
                <div className="w-full flex items-center justify-center h-[full]">
                    <Image src="/assets/images/marketplace/taskhub-newloader.gif" alt="loader" height={300} width={300} />
                </div>
            ) : (
                <>
                    <div className="flex items-center space-x-3 font-satoshi">
                        <div className="w-6 h-6 rounded-full border mr-3 border-[#34A853] flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-[#34A853] p-1" />
                        </div>
                        <p className='text-sm lg:text-[18px] font-bold'>
                            {availability}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 space-x-5 w-full mt-10">
                        <div className="space-y-7 lg:space-y-10 font-satoshi">
                            <h2 className="text-lg lg:text-4xl font-black text-primary">{task?.taskBriefDescription}</h2>
                            <div className="space-y-3 text-xs lg:text-xl">
                                <h2 className='text-primary lg:text-2xl font-satoshiMedium font-bold'>Service purpose</h2>
                                <p className='text-[#221354] font-satoshiMedium font-medium text-xl'>{task?.taskDescription}</p>
                            </div>
                            <div className="space-y-5">
                                <h4 className='text-primary lg:text-2xl font-satoshiMedium font-bold'>Location</h4>
                                <div className="flex items-center space-x-2 w-full text-[#716F78]">
                                    <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
                                    <h5 className="text-[15px] lg:text-xl font-satoshiMedium font-medium">{task?.taskAddress || "Location unavailable"}</h5>
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
                                    <Button className='rounded-full text-sm lg:text-lg'>
                                        Make an offer
                                    </Button>
                                </div>
                            </div>
                            <h2 className='text-primary font-bold text-lg lg:text-xl'>Reference Images</h2>
                            {task.taskImage ? <Image src={task.taskImage} width={200} height={100} alt="Explore task" className='object-cover' /> : <p>No image available</p>}
                        </div>
                    </div>
                </>
            )}

        </section>
    )
}

export default TaskDetailsPage
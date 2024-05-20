"use client"

import Button from '@/components/global/Button'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FiCalendar, FiClock } from "react-icons/fi";
import Image from 'next/image';
import { useGetTaskByIdQuery } from '@/services/tasks';
import { formatAmount } from '@/lib/utils';

const TaskDetailsPage = ({ params }: { params: { id: string } }) => {

    const id = params.id;
    const { data: task, isLoading } = useGetTaskByIdQuery(id as unknown as number);

    if (!task) {
        return (
            <div className="w-full flex items-center justify-center h-[full]">
                <Image src="/assets/images/marketplace/taskhub-newloader.gif" alt="loader" height={300} width={300} />
            </div>
        )
    }

    const availability = task.active ? "Available" : "Unavailable";
    const currentDateTime = new Date();
    const dateArray = task?.taskDate || [currentDateTime.getFullYear(), currentDateTime.getMonth() + 1, currentDateTime.getDate()];
    const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

    // Define suffixes for day
    const suffixes = ["st", "nd", "rd", "th"];
    const day = date.getDate();
    const daySuffix = suffixes[(day - 1) % 10] || suffixes[3];

    // Define month names
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = date.getMonth();
    const monthName = monthNames[month];

    // Define day of the week names
    const dayOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = date.getDay();
    const dayOfWeekName = dayOfWeekNames[dayOfWeek];

    const formattedDate = `On ${dayOfWeekName}, ${monthName} ${day}${daySuffix}`;

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

    function transformHubTime(hubTime: string): string {
        if (typeof hubTime !== 'string') {
            return 'No time specified';
        }

        return hubTime
            .toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const hubTime = transformHubTime(task.hubTime);

    return (
        <section className="py-28 container">
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
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full border mr-3 border-[#34A853] flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-[#34A853] p-1" />
                        </div>
                        <p className='text-sm lg:text-[20px] font-bold'>
                            {availability}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 space-x-5 w-full mt-10">
                        <div className="space-y-7 lg:space-y-20">
                            <h2 className="text-lg lg:text-[39px] font-satoshi text-status-darkViolet font-black leading-tight">{task?.taskDescription}</h2>
                            <div className="space-y-3 text-xs lg:text-xl">
                                <h2 className='text-primary underline font-bold'>Service purpose</h2>
                                <p className='text-status-darkViolet'>{task?.taskDescription}</p>
                            </div>
                            <div className="space-y-8">
                                <h4 className='text-lg lg:text-[39px] font-bold text-status-darkViolet'>Location</h4>
                                <div className="flex items-center space-x-2 w-full text-[#716F78]">
                                    <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
                                    <h5 className="max-lg:text-[9px] text-[15px] lg:text-xl">{task?.taskAddress || "Location unavailable"}</h5>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h4 className='text-lg lg:text-[39px] font-bold text-status-darkViolet'>Date and Time</h4>
                                <div className="max-lg:text-xs flex items-center space-x-3 text-[#716F78]">
                                    <FiCalendar className="h-6 w-6" />
                                    <h5>{formattedDate}</h5>
                                </div>
                                <div className="max-lg:text-xs flex items-center space-x-3 text-[#716F78]">
                                    <FiClock className="h-6 w-6" />
                                    <h5>{hubTime}</h5>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-7 lg:space-y-10'>
                            <div className="px-5 py-10 rounded-[20px] border-primary border-2">
                                <h2 className='text-lg lg:text-[39px] font-satoshi text-primary font-black'>Budget Details</h2>
                                <div className="border-primary border-2 my-8" />
                                <div className="flex items-center justify-between w-full">
                                    <h2 className='text-lg lg:text-[39px] font-satoshi text-primary font-bold'>
                                        AUD {formatAmount(task?.customerBudget!, "USD", false)}
                                    </h2>
                                    <Button className='rounded-full text-sm lg:text-lg'>
                                        Make an offer
                                    </Button>
                                </div>
                            </div>
                            <h2 className='text-primary font-bold text-lg lg:text-2xl'>Reference Images</h2>
                            <Image src={task?.taskImage || ""} width={200} height={100} alt="Explore task" className='object-cover' />
                        </div>
                    </div>
                </>
            )}

        </section>
    )
}

export default TaskDetailsPage
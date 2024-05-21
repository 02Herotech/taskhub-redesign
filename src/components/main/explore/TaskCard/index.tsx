"use client"

import { formatAmount } from "@/lib/utils";
import { Task } from "@/types/services/tasks";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { motion } from 'framer-motion';

interface TaskCardProps {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
    const router = useRouter();

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
        <motion.div
            className="bg-[#EBE9F4] p-5 rounded-xl lg:rounded-4xl cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => router.push(`/explore/task-details/${task.id}`)}
        >
            <div className="flex items-center justify-between w-full">
                <h2 className="text-2xl lg:text-[32px] text-primary font-bold truncate overflow-hidden py-4 whitespace-nowrap text-ellipsis">
                    {task.taskDescription}
                </h2>
                <img
                    src={task?.taskImage ?? "../../../../../public/assets/images/placeholder.png"}
                    alt="Logo"
                    className="object-cover w-[46px] h-[46px] rounded-full border"
                />
            </div>
            <div className="space-y-2 my-4">
                <div className="flex items-center space-x-2 w-full text-[#716F78] font-medium">
                    <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
                    <h5 className="text-[15px] lg:text-xl truncate overflow-hidden py-1 whitespace-nowrap text-ellipsis">{task.taskAddress || `No location`}</h5>
                </div>
                <div className="flex items-center space-x-2 w-full text-[#716F78] font-medium">
                    <FiCalendar className="h-6 w-6 font-bold" />
                    <h5 className="text-[15px] lg:text-xl">{formattedDate}</h5>
                </div>
                <div className="flex items-center space-x-2 w-full text-[#716F78] font-medium">
                    <FiClock className="h-6 w-6 font-bold" />
                    <h5 className="text-[15px] lg:text-xl">{hubTime}</h5>
                </div>
            </div>
            <div className="flex items-center justify-between">
                {/* <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#716F78] rounded-full" />
                    <h2 className="text-[#716F78] text-lg lg:text-2xl font-medium capitalize">{`${2} offers`}</h2>
                </div> */}
                <h2 className="text-primary text-lg lg:text-2xl font-bold capitalize">{availability}</h2>
                <h2 className="text-primary text-2xl lg:text-[32px] font-bold capitalize">{formatAmount(task.customerBudget, "USD", false)}</h2>
            </div>
        </motion.div>
    )
}

export default TaskCard;
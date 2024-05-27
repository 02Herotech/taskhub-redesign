"use client";

import { formatAmount } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FiCalendar, FiClock } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import React from "react";

export type NewTaskProps = {
    taskTitle: string;
    location: string;
    time: Date;
    price: number;
};

interface NewTasksProps {
    task: NewTaskProps;
}

const NewTasksCard: React.FC<NewTasksProps> = ({ task }) => {
    const router = useRouter();

    const date = task.time;
    const day = date.getDate();
    const suffixes = ["st", "nd", "rd", "th"];
    const daySuffix = suffixes[(day - 1) % 10] || suffixes[3];
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    const dayOfWeekNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ];
    const formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${hours >= 12 ? "PM" : "AM"}`;

    return (
        <motion.div
            className="lg:rounded-4xl font-satoshi rounded-xl bg-[#EBE9F4] p-5 mb-4 flex justify-between space-x-4"
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
            }}
            // onClick={() => router.push(`/explore/task-details/${task.taskTitle}`)} // Adjust URL based on actual requirements
        >
            <div className="w-2/3">
                <div className="flex w-full items-center justify-between">
                    <h2 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-4 text-2xl font-satoshiBold font-bold text-primary lg:text-[32px]">
                        {task.taskTitle}
                    </h2>
                </div>
                <div className="space-y-2">
                    <div className="flex w-full items-center space-x-2 font-medium text-[#716F78]">
                        <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
                        <h5 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-1 text-[15px] lg:text-xl">
                            {task.location || `No location`}
                        </h5>
                    </div>
                    <div className="flex w-full items-center space-x-2 font-medium text-[#716F78]">
                        <FiCalendar className="h-6 w-6 font-bold" />
                        <h5 className="text-[15px] lg:text-xl">{formattedDate}</h5>
                    </div>
                    {/* <div className="flex w-full items-center space-x-2 font-medium text-[#716F78]">
                    <FiClock className="h-6 w-6 font-bold" />
                    <h5 className="text-[15px] lg:text-xl">{formattedTime}</h5>
                </div> */}
                </div>
            </div>
            <div className="flex flex-col items-center justify-between w-1/3">
                <button className="px-4 py-2 flex items-center space-x-3 bg-tc-orange text-white rounded-full">
                    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.22222 0.5C7.4063 0.500204 7.58336 0.57069 7.71721 0.697057C7.85106 0.823424 7.93161 0.996133 7.9424 1.1799C7.95319 1.36366 7.8934 1.54461 7.77525 1.68577C7.6571 1.82693 7.48951 1.91765 7.30672 1.93939L7.22222 1.94444H1.44444V12.0556H11.5556V6.27778C11.5558 6.0937 11.6262 5.91664 11.7526 5.78279C11.879 5.64894 12.0517 5.56839 12.2355 5.5576C12.4192 5.54681 12.6002 5.6066 12.7413 5.72475C12.8825 5.8429 12.9732 6.01049 12.9949 6.19328L13 6.27778V12.0556C13.0001 12.42 12.8625 12.771 12.6147 13.0382C12.3669 13.3054 12.0273 13.4691 11.6639 13.4964L11.5556 13.5H1.44444C1.08003 13.5001 0.729035 13.3625 0.461827 13.1147C0.194618 12.8669 0.0309425 12.5273 0.00361127 12.1639L7.24158e-08 12.0556V1.94444C-0.000115252 1.58003 0.137516 1.22904 0.385303 0.961826C0.633091 0.694618 0.972721 0.530942 1.33611 0.503611L1.44444 0.5H7.22222ZM11.7311 0.747722C11.861 0.618193 12.0354 0.542991 12.2188 0.537391C12.4022 0.53179 12.5809 0.596211 12.7185 0.717569C12.8562 0.838926 12.9424 1.00812 12.9598 1.19079C12.9772 1.37345 12.9245 1.55589 12.8122 1.70106L12.7523 1.76967L5.60228 8.91894C5.47231 9.04847 5.29791 9.12368 5.1145 9.12928C4.93109 9.13488 4.75243 9.07046 4.6148 8.9491C4.47717 8.82774 4.39089 8.65855 4.37349 8.47588C4.35609 8.29321 4.40887 8.11077 4.52111 7.96561L4.58106 7.89772L11.7311 0.747722Z" fill="white" />
                    </svg>  
                    <h5>Edit task</h5>
                </button>
                <h2 className="text-2xl font-bold capitalize text-primary lg:text-[32px]">
                    {formatAmount(task.price, "USD", false)}
                </h2>
            </div>
        </motion.div>
    );
};

export default NewTasksCard;

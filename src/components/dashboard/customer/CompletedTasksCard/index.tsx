"use client";

import { formatAmount } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FiCalendar, FiClock } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import React from "react";
import { IoIosClose } from "react-icons/io";

export type CompletedTasksProps = {
    taskTitle: string;
    location: string;
    time: Date;
    price: number;
};

interface NewTasksProps {
    task: CompletedTasksProps;
}

const CompletedTasksCard: React.FC<NewTasksProps> = ({ task }) => {
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
                <button className="px-4 py-2 flex items-center space-x-2 bg-[#E10909] text-white rounded-full">
                    <IoIosClose className="w-6 h-6"/>
                    <h5>Delete task</h5>
                </button>
                <h2 className="text-2xl font-bold capitalize text-primary lg:text-[32px]">
                    {formatAmount(task.price, "USD", false)}
                </h2>
            </div>
        </motion.div>
    );
};

export default CompletedTasksCard;

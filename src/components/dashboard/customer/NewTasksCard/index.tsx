"use client";

import React, { useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { dayOfWeekNames, formatAmount, monthNames, suffixes } from "@/lib/utils";
import { CustomerTasks } from "@/types/services/tasks";

interface TaskCardProps {
    task: CustomerTasks;
}

type DropDownItem = {
    title: string;
    onClick: () => void;
    icon?: React.ReactNode;
};

const NewTasksCard = ({ task }: TaskCardProps) => {
    const dateArray = task.createdAt;
    const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const day = date.getDate();
    const daySuffix = (day === 11 || day === 12 || day === 13) ? "th" : suffixes[day % 10] || suffixes[0];
    const formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;

    const dropDownItems: DropDownItem[] = [
        {
            title: "Edit Task",
            onClick: () => setIsDropdownOpen(false),
            icon: <FaRegEdit className="text-white" />,
        },
    ];

    return (
        <motion.div
            className="lg:rounded-4xl font-satoshi rounded-xl bg-[#EBE9F4] p-4 mb-4 flex flex-col justify-between h-full"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
            <div className="flex w-full justify-between items-center space-x-2">
                <h2 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-4 text-xl font-satoshiBold font-bold text-primary lg:text-[30px]">
                    {task.taskBriefDescription}
                </h2>
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="p-2 flex items-center space-x-3 bg-primary text-white rounded-lg"
                    >
                        <BsThreeDotsVertical className="size-4" />
                    </button>
                    <div
                        className={`small-scrollbar right-0 absolute top-[calc(100%+0.2rem)] flex max-h-0 w-[190px] flex-col rounded-md bg-[#EBE9F4] transition-all duration-300 ${isDropdownOpen ? "max-h-64 overflow-y-auto border border-primary" : "max-h-0 overflow-hidden"
                            }`}
                    >
                        <div className="p-2 space-y-2 w-full">
                            {dropDownItems.map((item, index) => (
                                <button key={index} onClick={item.onClick} className="flex items-center space-x-3">
                                    <span className="bg-[#140B31] p-1 rounded-full size-9 flex items-center justify-center text-white">
                                        {item.icon}
                                    </span>
                                    <span className='lg:text-lg text-[#140B31] font-satoshiMedium'>{item.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-[#2A1769] text-sm font-satoshiMedium line-clamp-3">{task.taskDescription}</p>
            <div className="mt-auto">
                <div className="flex justify-between items-center my-2">
                    <HiOutlineLocationMarker className="h-5 w-5 font-bold text-[#716F78]" />
                    <div className="flex items-center space-x-2 font-medium text-[#716F78] w-2/3">
                        <p className="overflow-hidden truncate text-ellipsis whitespace-nowrap text-[15px] lg:text-lg">
                            {task.taskAddress || `No location`}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 font-medium text-[#716F78]">
                        <FiClock className="h-5 w-5 font-bold" />
                        <h5 className="text-[15px] lg:text-lg">{task.taskTime || "Flexible"}</h5>
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex items-center space-x-2 font-medium text-[#716F78]">
                        <FiCalendar className="h-5 w-5 font-bold" />
                        <h5 className="text-[15px] lg:text-lg">{formattedDate}</h5>
                    </div>
                    <h2 className="text-2xl font-bold capitalize text-tc-orange lg:text-[20px]">
                        {formatAmount(task.customerBudget, "USD", false)}
                    </h2>
                </div>
            </div>
        </motion.div>
    );
};

export default NewTasksCard;

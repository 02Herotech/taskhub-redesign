"use client";

import { useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { dayOfWeekNames, formatAmount, monthNames, suffixes } from "@/lib/utils";
import { CustomerTasks } from "@/types/services/tasks";
import Popup from "@/components/global/Popup";
import EditTaskForm from "../EditTaskForm";

interface TaskCardProps {
    task: CustomerTasks;
}

type DropDownItem = {
    title: string;
    onClick: () => void;
    icon?: React.ReactNode;
};

const NewTasksCard = ({ task }: TaskCardProps) => {
    const dateArray = task.taskDate;
    let date: Date;
    let formattedDate: string;

    if (dateArray && Array.isArray(dateArray) && dateArray.length >= 3) {
        date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        const day = date.getDate();
        const daySuffix = (day === 11 || day === 12 || day === 13) ? "th" : suffixes[day % 10] || suffixes[0];
        formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;
    } else {
        formattedDate = "Flexible";
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // console.log("current task:", task)

    // const day = date.getDate();
    // const daySuffix = (day === 11 || day === 12 || day === 13) ? "th" : suffixes[day % 10] || suffixes[0];
    // const formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;

    const dropDownItems: DropDownItem[] = [
        {
            title: "Edit Task",
            onClick: () => {
                setIsEditModalOpen(true);
                setIsDropdownOpen(false);
            },
            icon: <FaRegEdit className="text-white size-4 cursor-pointer" />,
        },
    ];

    return (
        <>
            {isEditModalOpen && (
                <Popup
                    isOpen={isEditModalOpen}
                    popUpTitle={(
                        <div className="flex items-center space-x-2 p-2">
                            <div className="bg-[#140B31] rounded-full p-2 flex items-center justify-center">
                                <FaRegEdit className="text-white size-4" />
                            </div>
                            <h3 className="text-[#140B31] text-lg font-bold">Edit Task</h3>
                        </div>
                    )}
                    onClose={() => setIsEditModalOpen(false)}
                >
                    <EditTaskForm setShowEditModal={setIsEditModalOpen} task={task} />
                </Popup>
            )}
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
                            className={`small-scrollbar right-0 absolute top-[calc(100%+0.2rem)] flex max-h-0 w-[130px] flex-col rounded-md bg-[#EBE9F4] transition-all duration-300 ${isDropdownOpen ? "max-h-64 overflow-y-auto border border-primary" : "max-h-0 overflow-hidden"
                                }`}
                        >
                            <div className="px-2 py-1">
                                {dropDownItems.map((item, index) => (
                                    <div key={index} onClick={item.onClick} className="flex items-center space-x-3 cursor-pointer">
                                        <span className="bg-[#140B31] p-1 rounded-full">
                                            {item.icon}
                                        </span>
                                        <span className='text-sm text-[#140B31] font-satoshiMedium'>{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-[#2A1769] text-sm font-satoshiMedium line-clamp-3">{task.taskDescription}</p>
                <div className="mt-auto">
                    <div className="flex justify-between items-center my-2">
                        <div className="flex items-center space-x-2 font-medium text-[#716F78] w-2/3">
                            <HiOutlineLocationMarker className="h-5 w-5 font-bold text-[#716F78]" />
                            <p className="overflow-hidden truncate text-ellipsis whitespace-nowrap text-[15px] lg:text-lg">
                                {task.state || `Remote`}
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
                            <h5 className="text-[15px] lg:text-lg">{formattedDate || "Flexible"}</h5>
                        </div>
                        <h2 className="text-2xl font-bold capitalize text-tc-orange lg:text-[20px]">
                            {formatAmount(task.customerBudget, "USD", false)}
                        </h2>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default NewTasksCard;

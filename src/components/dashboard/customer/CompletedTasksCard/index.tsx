"use client";

import { dayOfWeekNames, formatAmount, monthNames } from "@/lib/utils";
import { FiCalendar } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import { MdCheck } from "react-icons/md";
import { Task } from "@/types/services/tasks";

interface TaskCardProps {
    task: Task;
}

const CompletedTasksCard = ({ task }: TaskCardProps) => {
    // const date = task.time;
    // const day = date.getDate();
    // const suffixes = ["st", "nd", "rd", "th"];
    // const daySuffix = suffixes[(day - 1) % 10] || suffixes[3];
    // const formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;

    return (
        <div>
            <motion.div
                className="lg:rounded-4xl font-satoshi rounded-xl bg-[#EBE9F4] p-5 mb-4 flex justify-between"
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                }}
            >
                <div className="w-[75%]">
                    {/* <div className="flex w-full items-center justify-between">
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
                    </div>*/}
                </div> 
                <div className="flex flex-col items-end justify-between">
                    <button className="text-white px-3 py-1 flex items-center space-x-2 bg-[#E10909] rounded-full">
                        <MdCheck />
                        <h5>Delete Task</h5>
                    </button>
                    <h2 className="text-2xl font-bold capitalize text-primary lg:text-[32px]">
                        {/* {formatAmount(task.price, "USD", false)} */}
                    </h2>
                </div>
            </motion.div>

        </div>
    );
};

export default CompletedTasksCard;

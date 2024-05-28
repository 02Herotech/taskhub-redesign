"use client";

import { formatAmount } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FiCalendar } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import { MdCheck } from "react-icons/md";
import Dropdown from "@/components/global/Dropdown";
import { DeleteTaskSvg, DropReviewSvg, MenuDropdownSvg, ReportSvg } from "@/lib/svgIcons";
import Button from "@/components/global/Button";

export type CompletedTasksProps = {
    taskTitle: string;
    location: string;
    time: Date;
    price: number;
    complete: boolean
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
        "Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat",
    ];
    const formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${hours >= 12 ? "PM" : "AM"}`;

    const dropdownItems = [
        {
            title: 'Drop a review',
            onClick: () => console.log('Approve'),
            icon: DropReviewSvg
        },
        {
            title: 'Report',
            onClick: () => console.log('Request Revision'),
            icon: ReportSvg
        },
        {
            title: 'Delete Task',
            onClick: () => console.log('Delete'),
            icon: DeleteTaskSvg
        }
    ];

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
                    </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                    {task.complete ? (
                        <div className="text-status-success px-3 py-1 border border-status-success flex items-center space-x-2 bg-[#F4FCF4] rounded-full">
                            <MdCheck />
                            <h5>Done</h5>
                        </div>
                    ) : (
                        <div className="">
                            <Dropdown
                                trigger={
                                    () => (
                                        <button>
                                            {MenuDropdownSvg}
                                        </button>
                                    )}
                                className='right-0 mx-auto top-12'>
                                <form className='bg-[#EBE9F4] border border-primary rounded-md w-[218px] py-4 px-2 space-y-3'>
                                    {dropdownItems.map((item, index) => (
                                        <button className="flex items-center space-x-3" key={index} onClick={item.onClick}>
                                            <div className="bg-status-darkViolet w-9 h-9 flex items-center justify-center rounded-full">{item.icon}</div>
                                            <h5 className="text-lg text-status-darkViolet font-satoshiMedium">{item.title}</h5>
                                        </button>
                                    ))}
                                </form>
                            </Dropdown>
                        </div>
                    )}

                    <h2 className="text-2xl font-bold capitalize text-primary lg:text-[32px]">
                        {formatAmount(task.price, "USD", false)}
                    </h2>
                </div>
            </motion.div>
            {!task.complete && (
                <div className="flex items-center justify-between space-x-4">
                    <Button className="bg-status-success w-full text-white rounded-xl lg:py-8" theme="plain">
                        Approve
                    </Button>
                    <Button className="bg-[#E10909] w-full text-white rounded-xl lg:py-8" theme="plain">
                        Revision
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CompletedTasksCard;

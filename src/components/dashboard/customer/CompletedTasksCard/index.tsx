"use client";

import { dayOfWeekNames, formatAmount, monthNames, suffixes } from "@/lib/utils";
import { FiCalendar } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Task } from "@/types/services/tasks";
import { useState } from "react";
import Dropdown from "@/components/global/Dropdown";
import { DeleteTaskSvg, DropReviewSvg, RebookSvg } from "@/lib/svgIcons";
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";

interface TaskCardProps {
    task: Task;
}

type DropDownItem = {
    title: string;
    onClick: () => void;
    icon: React.ReactNode;
};

const CompletedTasksCard = ({ task }: TaskCardProps) => {
    const [dropReviewPopup, setDropReviewPopup] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedReview, setSelectedReview] = useState<string | null>(null);

    const dateArray = task.taskDate;
    const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    const day = date.getDate();
    const daySuffix = suffixes[(day % 10) - 1] || suffixes[0];
    const formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;

    const reviews = [
        "He/she stole an item in my home",
        "Disrespectful and Arrogant",
        "Lazy and non reliable",
        "I love the work",
        "Others"
    ];

    const dropDownItems: DropDownItem[] = [
        {
            title: "Drop a Review",
            onClick: () => {
                setShowDropdown(false);
                setDropReviewPopup(true);
            },
            icon: DropReviewSvg,
        },
        {
            title: "Re-book",
            onClick: () => { },
            icon: RebookSvg,
        },
        {
            title: "Delete Task",
            onClick: () => { },
            icon: DeleteTaskSvg,
        },
    ];

    return (
        <>
            {dropReviewPopup && (
                <Popup isOpen={dropReviewPopup} onClose={() => setDropReviewPopup(false)}>
                    <div className="relative bg-[#EBE9F4] rounded-2xl min-h-[200px] lg:w-[577px] font-satoshi">
                        <div className="border-b border-primary flex items-center space-x-5 px-5 py-4">
                            <div className="bg-[#140B31] p-1 rounded-full size-9 flex items-center justify-center text-white">{DropReviewSvg}</div>
                            <h2 className="text-primary font-satoshiBold lg:text-2xl">Drop a review</h2>
                        </div>
                        <div className="max-lg:p-5 lg:py-5 lg:px-8">
                            {selectedReview !== "Others" && (
                                <div className="mb-8 font-satoshi text-xl font-medium text-black space-y-5">
                                    {reviews.map((review, index) => (
                                        <div key={index} className="flex items-center space-x-5">
                                            <input
                                                type="radio"
                                                name="review"
                                                value={review}
                                                checked={selectedReview === review}
                                                onChange={() => setSelectedReview(review)}
                                            />
                                            <h4>{review}</h4>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {selectedReview === "Others" && (
                                <div className="space-y-2">
                                    <label className="font-bold text-[#140B31] text-lg">Describe your review</label>
                                    <textarea
                                        placeholder="Please provide additional feedback"
                                        className="w-full h-24 p-2 border border-[#381F8C] rounded"
                                    />
                                </div>
                            )}
                            <div className="flex items-center justify-center w-full mt-10">
                                <Button
                                    className="w-[151px] max-lg:text-sm rounded-full py-6"
                                    onClick={() => {
                                        setDropReviewPopup(false);
                                        // Add functionality to handle review submission
                                    }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </Popup>
            )}
            <motion.div
                className="lg:rounded-4xl font-satoshi rounded-xl bg-[#EBE9F4] p-5 mb-4 flex justify-between space-x-4"
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                }}
            >
                <div className="w-2/3">
                    <div className="flex w-full items-center justify-between">
                        <h2 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-4 text-2xl font-satoshiBold font-bold text-primary lg:text-[32px]">
                            {task.taskBriefDescription}
                        </h2>
                    </div>
                    <div className="space-y-2">
                        <div className="flex w-full items-center space-x-2 font-medium text-[#716F78]">
                            <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
                            <h5 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-1 text-[15px] lg:text-xl">
                                {task.taskAddress || `No location`}
                            </h5>
                        </div>
                        <div className="flex w-full items-center space-x-2 font-medium text-[#716F78]">
                            <FiCalendar className="h-6 w-6 font-bold" />
                            <h5 className="text-[15px] lg:text-xl">{formattedDate}</h5>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                    <div className="">
                        <Dropdown
                            trigger={() => (
                                <button className="p-3 flex items-center space-x-3 bg-primary text-white rounded-lg">
                                    <BsThreeDotsVertical />
                                </button>
                            )}
                            className="-left-32 top-20"
                            showDropdown={showDropdown}
                            setShowDropdown={setShowDropdown}
                        >
                            <div className="w-[200px] bg-[#EBE9F4] space-y-4 border border-primary rounded-xl p-3">
                                {dropDownItems.map((item, index) => (
                                    <button key={index} onClick={item.onClick} className="flex items-center space-x-3">
                                        <span className="bg-[#140B31] p-1 rounded-full size-9 flex items-center justify-center text-white">{item.icon}</span>
                                        <span className='lg:text-xl text-[#140B31] font-satoshiMedium'>{item.title}</span>
                                    </button>
                                ))}
                            </div>
                        </Dropdown>
                    </div>
                    <h2 className="text-2xl font-bold capitalize text-primary lg:text-[22px]">
                        {formatAmount(task.customerBudget, "USD", false)}
                    </h2>
                </div>
            </motion.div>
        </>
    );
};

export default CompletedTasksCard;
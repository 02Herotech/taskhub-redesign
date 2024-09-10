"use client";

import { dayOfWeekNames, formatAmount, monthNames, suffixes } from "@/lib/utils";
import { FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CompletedTask, Task } from "@/types/services/tasks";
import { useState } from "react";
import { DeleteTaskSvg, DropReviewSvg, RebookSvg } from "@/lib/svgIcons";
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";
import { useDeleteTaskMutation } from "@/services/tasks";
import Input from "@/components/global/Input";
import { FaCalendar } from "react-icons/fa";
import ReactDatePicker from "react-datepicker";
import RebookForm from "../RebookForm";

interface TaskCardProps {
    task: CompletedTask;
}

type DropDownItem = {
    title: string;
    onClick: () => void;
    icon: React.ReactNode;
};

const CompletedTasksCard = ({ task }: TaskCardProps) => {
    const [dropReviewPopup, setDropReviewPopup] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<string | null>(null);
    const [reviewSent, setReviewSent] = useState(false);
    const [deleteTaskPopup, setDeleteTaskPopup] = useState(false);
    const [rebookTaskPopup, setRebookTaskPopup] = useState(false);

    const dateArray = task.createdAt;
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

    const [deleteTask] = useDeleteTaskMutation();

    const dropDownItems: DropDownItem[] = [
        {
            title: "Drop a Review",
            onClick: () => {
                setIsDropdownOpen(false);
                setDropReviewPopup(true);
            },
            icon: DropReviewSvg,
        },
        {
            title: "Re-book",
            onClick: () => {
                setIsDropdownOpen(false);
                setRebookTaskPopup(true);
            },
            icon: RebookSvg,
        },
        {
            title: "Delete Task",
            onClick: () => {
                setIsDropdownOpen(false);
                setDeleteTaskPopup(true);
            },
            icon: DeleteTaskSvg,
        },
    ];

    const handleReviewSubmission = () => {
        if (selectedReview) {
            setReviewSent(true);
        }
    }

    return (
        <>
            {rebookTaskPopup && (
                <Popup isOpen={rebookTaskPopup} onClose={() => setRebookTaskPopup(false)}>
                    <RebookForm onClose={() => setRebookTaskPopup(false)} jobId={task.id} />
                </Popup>
            )}
            {deleteTaskPopup && (
                <Popup isOpen={deleteTaskPopup} onClose={() => setDeleteTaskPopup(false)}>
                    <div className="relative bg-[#EBE9F4] rounded-2xl min-h-[200px] lg:w-[577px] font-satoshi">
                        <div className="border-b border-primary flex items-center space-x-5 px-5 py-4">
                            <div className="bg-[#140B31] p-1 rounded-full size-14 flex items-center justify-center text-white">{DeleteTaskSvg}</div>
                            <h2 className="text-primary font-bold lg:text-2xl">Delete Task</h2>
                        </div>
                        <div className="max-lg:p-5 lg:py-5 lg:px-8">
                            <p className="mb-8 font-satoshiMedium text-xl font-medium text-[#140B31]">
                                Are you sure you want to delete this task? Once you delete, it will be erased from your list of task and will be gone immediately.
                            </p>
                            <div className="flex items-center justify-end my-4 space-x-5">
                                <Button
                                    className="w-[151px] max-lg:text-sm rounded-full py-6 bg-[#E1DDEE]"
                                    onClick={() => setDeleteTaskPopup(false)}
                                    theme="outline"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="w-[151px] max-lg:text-sm rounded-full py-6"
                                    onClick={() => {
                                        setDeleteTaskPopup(false)
                                        deleteTask(task.id)
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </Popup>
            )}
            {dropReviewPopup && (
                <Popup isOpen={dropReviewPopup} onClose={() => setDropReviewPopup(false)}>
                    <div className="relative bg-[#EBE9F4] rounded-2xl min-h-[200px] lg:w-[577px] font-satoshi">
                        {reviewSent ? (
                            <div className="flex items-center justify-center h-full font-satoshi py-10 px-20">
                                <div className="flex flex-col items-center space-y-5">
                                    <div className="bg-[#140B31] p-1 rounded-full size-14 flex items-center justify-center text-white">{DropReviewSvg}</div>
                                    <h1 className="font-black text-4xl text-[#2A1769]">
                                        Review Sent
                                    </h1>
                                    <p className="mb-8 font-satoshiMedium text-center text-xl font-medium text-[#140B31]">
                                        Thank you for your review, we will look into it and get back to you as soon as possible
                                    </p>
                                    <Button
                                        className="w-[151px] max-lg:text-sm rounded-full py-6"
                                        onClick={() => {
                                            setDropReviewPopup(false)
                                            setReviewSent(false)

                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="border-b border-primary flex items-center space-x-5 px-5 py-4">
                                    <div className="bg-[#140B31] p-1 rounded-full size-9 flex items-center justify-center text-white">{DropReviewSvg}</div>
                                    <h2 className="text-primary font-bold lg:text-2xl">Drop a review</h2>
                                </div>
                                <form onSubmit={handleReviewSubmission} className="max-lg:p-5 lg:py-5 lg:px-8">
                                    <div className="mb-8 font-satoshi text-xl font-medium text-black space-y-5">
                                        {reviews.map((review, index) => (
                                            <div key={index} className="flex items-center space-x-5">
                                                <input
                                                    type="radio"
                                                    name="review"
                                                    required
                                                    value={review}
                                                    checked={selectedReview === review}
                                                    onChange={() => setSelectedReview(review)}
                                                />
                                                <h4>{review}</h4>
                                            </div>
                                        ))}
                                    </div>
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
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </Popup>
            )}
            <motion.div
                className="lg:rounded-4xl font-satoshi rounded-xl bg-[#EBE9F4] p-4 mb-4 flex flex-col justify-between h-full"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
                <div className="flex w-full justify-between items-center space-x-2">
                    <h2 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-4 text-xl font-satoshiBold font-bold text-primary lg:text-[30px]">
                        {task.jobTitle}
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
                            <div className="p-2 space-y-3 w-full">
                                {dropDownItems.map((item, index) => (
                                    <button key={index} onClick={item.onClick} className="flex items-center space-x-3">
                                        <span className="bg-[#140B31] p-1 rounded-full size-7 flex items-center justify-center text-white">
                                            {item.icon}
                                        </span>
                                        <span className='text-[#140B31] font-satoshiMedium'>{item.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-[#2A1769] text-sm font-satoshiMedium line-clamp-3">{task.jobDescription}</p>
                <div className="mt-auto">
                    {/* <div className="flex justify-between items-center my-2">
                        <HiOutlineLocationMarker className="h-5 w-5 font-bold text-[#716F78]" />
                        <div className="flex items-center space-x-2 font-medium text-[#716F78] w-2/3">
                            <p className="overflow-hidden truncate text-ellipsis whitespace-nowrap text-[15px] lg:text-lg">
                                {task. || `No location`}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 font-medium text-[#716F78]">
                            <FiClock className="h-5 w-5 font-bold" />
                            <h5 className="text-[15px] lg:text-lg">{task.taskTime || "Flexible"}</h5>
                        </div>
                    </div> */}
                    <div className="flex justify-between items-end">
                        <div className="flex items-center space-x-2 font-medium text-[#716F78]">
                            <FiCalendar className="h-5 w-5 font-bold" />
                            <h5 className="text-[15px] lg:text-lg">{formattedDate}</h5>
                        </div>
                        <h2 className="text-2xl font-bold capitalize text-tc-orange lg:text-[20px]">
                            {formatAmount(task.total, "USD", false)}
                        </h2>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default CompletedTasksCard;





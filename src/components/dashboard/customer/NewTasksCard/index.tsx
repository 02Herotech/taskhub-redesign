"use client";

import { useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  dayOfWeekNames,
  formatAmount,
  formatTime24Hour,
  monthNames,
  suffixes,
} from "@/lib/utils";
import { CustomerTasks } from "@/types/services/tasks";
import Popup from "@/components/global/Popup";
import EditTaskForm from "../EditTaskForm";
import { useRouter } from "next/navigation";
import { IoEye } from "react-icons/io5";

interface TaskCardProps {
  task: CustomerTasks;
}

type DropDownItem = {
  title: string;
  onClick: () => void;
  icon?: React.ReactNode;
};

const NewTasksCard = ({ task }: TaskCardProps) => {
  const router = useRouter();
  const dateArray = task.taskDate;
  let date: Date;
  let formattedDate: string;

  if (dateArray && Array.isArray(dateArray) && dateArray.length >= 3) {
    date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    const day = date.getDate();
    const daySuffix =
      day === 11 || day === 12 || day === 13
        ? "th"
        : suffixes[day % 10] || suffixes[0];
    formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;
  } else {
    formattedDate = "Flexible";
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropDownItems: DropDownItem[] = [
    {
      title: "View Task",
      onClick: () => {
        router.push(`/customer/tasks/${task.id}`);
        setIsDropdownOpen(false);
      },
      icon: <IoEye className="size-4 cursor-pointer text-white" />,
    },
    {
      title: "Edit Task",
      onClick: () => {
        setIsEditModalOpen(true);
        setIsDropdownOpen(false);
      },
      icon: <FaRegEdit className="size-4 cursor-pointer text-white" />,
    },
  ];

  return (
    <>
      {isEditModalOpen && (
        <Popup
          isOpen={isEditModalOpen}
          popUpTitle={
            <div className="flex items-center space-x-2 p-2">
              <div className="flex items-center justify-center rounded-full bg-[#140B31] p-2">
                <FaRegEdit className="size-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#140B31]">Edit Task</h3>
            </div>
          }
          onClose={() => setIsEditModalOpen(false)}
        >
          <EditTaskForm setShowEditModal={setIsEditModalOpen} task={task} />
        </Popup>
      )}
      <motion.div
        className="lg:rounded-4xl mb-4 flex h-full flex-col justify-between rounded-xl bg-[#EBE9F4] p-5 font-satoshi"
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <div className="flex w-full items-start justify-between space-x-2">
          <h2 className="pb-4 font-satoshiBold text-xl font-bold text-primary lg:text-[30px]">
            {task.taskBriefDescription}
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 rounded-lg bg-primary p-2 text-white"
            >
              <BsThreeDotsVertical className="size-4" />
            </button>
            <div
              className={`small-scrollbar absolute right-0 top-[calc(100%+0.2rem)] flex max-h-0 w-[130px] flex-col rounded-md bg-[#EBE9F4] transition-all duration-300 ${
                isDropdownOpen
                  ? "max-h-64 overflow-y-auto border border-primary"
                  : "max-h-0 overflow-hidden"
              }`}
            >
              <div className="px-2 py-1">
                {dropDownItems.map((item, index) => (
                  <div className="my-2" key={index}>
                    <div
                      onClick={item.onClick}
                      className="flex cursor-pointer items-center space-x-3"
                    >
                      <span className="rounded-full bg-[#140B31] p-1">
                        {item.icon}
                      </span>
                      <span className="font-satoshiMedium text-sm text-[#140B31]">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="line-clamp-2 font-satoshiMedium text-sm text-[#2A1769]">
          {task.taskDescription}
        </p>
        <div className="mt-auto">
          <div className="my-2 flex items-center justify-between">
            <div className="flex w-2/3 items-center space-x-2 font-medium text-[#716F78]">
              <HiOutlineLocationMarker className="h-5 w-5 font-bold text-[#716F78]" />
              <p className="overflow-hidden truncate text-ellipsis whitespace-nowrap text-[15px] lg:text-lg">
                {task.state || `Remote`}
              </p>
            </div>
            <div className="flex items-center space-x-2 font-medium text-[#716F78]">
              <FiClock className="h-5 w-5 font-bold" />
              <h5 className="text-[15px] lg:text-lg">
                {formatTime24Hour(task.taskTime) || "Flexible"}
              </h5>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-center space-x-2 font-medium text-[#716F78]">
              <FiCalendar className="h-5 w-5 font-bold" />
              <h5 className="text-[15px] lg:text-lg">
                {formattedDate || "Flexible"}
              </h5>
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

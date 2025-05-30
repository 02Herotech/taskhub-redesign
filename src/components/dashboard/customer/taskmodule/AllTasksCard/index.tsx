"use client";

import { useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { dayOfWeekNames, formatAmount, formatTime24Hour, monthNames, suffixes } from "@/lib/utils";
import { CustomerTasks, TaskInfo } from "@/types/services/tasks";
import Popup from "@/components/global/Popup";
import EditTaskForm from "../EditTaskForm";
import { useRouter } from "next/navigation";
import { IoEye } from "react-icons/io5";
import { Category } from '../../../../../types/blog/post';
import { getBorderColor, getStatusColor } from "@/shared/statusbadge";

interface TaskCardProps {
  task: TaskInfo;
}

type DropDownItem = {
  title: string;
  onClick: () => void;
  icon?: React.ReactNode;
};

const AllTasksCard = ({ task }: TaskCardProps) => {
  const router = useRouter();
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




  return (
    <div className={`relative cursor-pointer flex flex-col border-l-[12px]  shadow-[0px_-4px_132px_0px_#00000017] ${getBorderColor(task.taskStatus)} rounded-2xl shadow-sm bg-white overflow-hidden`}>
      <div className="p-4 pl-5 flex-1">
        <div className="mb-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.taskStatus)}`}
          >
            {task.taskStatus}
          </span>
        </div>
        <h3 className="text-xs cursor-pointer font-semibold text-[#0F052E]">{task.taskBriefDescription}</h3>

        <div className="mt-4 flex justify-between items-end">
          <div className="flex flex-col space-y-2 text-xs text-gray-500">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formattedDate}</span>
            </div>

            {task.state &&
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{task.state}</span>
              </div>
            }


          </div>

          <div className="text-right">
            <span className="text-3xl font-manrope font-bold text-[#381F8C]">${task.customerBudget}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTasksCard;

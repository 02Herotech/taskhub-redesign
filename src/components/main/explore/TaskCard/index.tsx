"use client";

import { dayOfWeekNames, formatAmount, monthNames, suffixes } from "@/lib/utils";
import { Task } from "@/types/services/tasks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiCalendar, FiClock } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const router = useRouter();

  // const availability = task.active ? "Available" : "Unavailable";
  const date = task?.taskDate ? new Date(task.taskDate[0], task.taskDate[1] - 1, task.taskDate[2]) : new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const monthName = monthNames[month];
  const dayOfWeek = date.getDay();
  const dayOfWeekName = dayOfWeekNames[dayOfWeek];
  // Determine the correct suffix for the day
  let daySuffix;
  if (day === 11 || day === 12 || day === 13) {
    daySuffix = "th";
  } else {
    daySuffix = suffixes[day % 10] || suffixes[0]; // Default to "th" if suffix is undefined
  }
  // const daySuffix = suffixes[day % 10] || suffixes[0]; // Default to "th" if suffix is undefined
  const formattedDate = `${dayOfWeekName}, ${monthName} ${day}${daySuffix}`;

  // Get hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Construct the formatted time string
  let formattedTime;
  if (hours >= 12) {
    formattedTime = `${hours === 12 ? 12 : hours - 12}:${(minutes < 10 ? "0" : "") + minutes} PM`;
  } else {
    formattedTime = `${hours === 0 ? 12 : hours}:${(minutes < 10 ? "0" : "") + minutes} AM`;
  }

  // function transformHubTime(hubTime: string): string {
  //   if (typeof hubTime !== "string") {
  //     return "No time specified";
  //   }

  //   return hubTime
  //     .toLowerCase()
  //     .split("_")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(" ");
  // }

  return (
    <motion.div
      className="lg:rounded-4xl cursor-pointer rounded-xl bg-[#EBE9F4] p-5"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },

      }}
      onClick={() => router.push(`/explore/task-details/${task.id}`)}
    >
      <div className="flex w-full items-center justify-between">
        <h2 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-4 text-2xl font-bold text-primary lg:text-[32px]">
          {task.taskBriefDescription}
        </h2>
        <Image
          src={
            task?.taskImage ??
            "/assets/images/placeholder.png"
          }
          alt="Logo"
          width={46}
          height={46}
          className="size-[46px] rounded-full border object-cover"
        />
      </div>
      <p className="my-2 text-[15px] text-primary font-medium overflow-hidden truncate text-ellipsis whitespace-nowrap">{task.taskDescription}</p>
      <div className="flex w-full my-3 items-center space-x-2 font-medium text-[#716F78]">
        <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
        <h5 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-1 text-[14px]">
          {task.taskAddress || `Remote`}
        </h5>
      </div>
      <div className="my-4 flex items-center space-x-2">
        <div className="flex w-full items-center space-x-2 font-medium text-[#716F78]">
          <FiCalendar className="h-6 w-6 font-bold" />
          <h5 className="text-[14px]">{formattedDate}</h5>
        </div>
        <div className="flex w-full items-center space-x-2 font-medium text-[#716F78]">
          <FiClock className="h-6 w-6 font-bold" />
          <h5 className="text-[14px]">{task.taskTime || "Flexible"}</h5>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <h2 className="text-2xl font-bold capitalize text-primary lg:text-[32px]">
          {formatAmount(task.customerBudget, "USD", false)}
        </h2>
      </div>
    </motion.div>
  );
};

export default TaskCard;

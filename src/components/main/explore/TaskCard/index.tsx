"use client";

import { dayOfWeekNames, formatAmount, monthNames, suffixes } from "@/lib/utils";
import { Task } from "@/types/services/tasks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiCalendar, FiClock } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const router = useRouter();
  const [taskDate, setTaskDate] = useState<string>("");

  useEffect(() => {
    if (task.taskDate) {
      const dateArray = task.taskDate;

      if (dateArray && dateArray.length === 3) {
        const [year, month, day] = dateArray;
        const date = new Date(year, month - 1, day); // month is 0-indexed in Date

        const dayOfMonth = date.getDate();
        const monthName = monthNames[month - 1];
        const dayOfWeek = date.getDay();
        const dayOfWeekName = dayOfWeekNames[dayOfWeek];

        // Determine the correct suffix for the day
        let daySuffix;
        if (dayOfMonth === 11 || dayOfMonth === 12 || dayOfMonth === 13) {
          daySuffix = "th";
        } else {
          daySuffix = suffixes[dayOfMonth % 10] || suffixes[0]; // Default to "th" if suffix is undefined
        }

        setTaskDate(`${dayOfWeekName}, ${monthName} ${dayOfMonth}${daySuffix}`);
      } else {
        setTaskDate("Flexible");
      }
    }
  }, [task.taskDate]);

  return (
    <motion.div
      className="lg:rounded-4xl cursor-pointer rounded-xl bg-[#EBE9F4] p-5"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      onClick={() => router.push(`/explore/task-details/${task.id}`)}
    >
      <div className="flex w-full items-center justify-between space-x-2">
        <h2 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-4 text-2xl font-bold text-primary lg:text-[30px]">
          {task.taskBriefDescription}
        </h2>
        <Image
          src={task?.taskImage ?? "/assets/images/placeholder.png"}
          alt="Logo"
          width={46}
          height={46}
          className="size-[46px] rounded-full border object-cover"
        />
      </div>
      <p className="my-2 text-[15px] text-primary font-medium overflow-hidden truncate text-ellipsis whitespace-nowrap">
        {task.taskDescription}
      </p>
      <div className="flex w-full my-3 items-center space-x-2 font-medium text-[#716F78]">
        <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
        <h5 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-1 text-[14px]">
          {task.state || `Remote`}
        </h5>
      </div>
      <div className="my-4 flex items-center space-x-2">
        <div className="flex w-full items-center space-x-2 font-medium text-[#716F78]">
          <FiCalendar className="h-6 w-6 font-bold" />
          <h5 className="text-[14px]">{taskDate || "Flexible"}</h5>
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

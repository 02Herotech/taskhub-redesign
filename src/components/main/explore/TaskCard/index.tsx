"use client";

import { formatAmount } from "@/lib/utils";
import { Task } from "@/types/services/tasks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiCalendar, FiClock } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
// import placeholderImage from "../../../../../public/assets/images/placeholder.png";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const router = useRouter();

  const availability = task.active ? "Available" : "Unavailable";
  const currentDateTime = new Date();
  const dateArray = task?.taskDate || [
    currentDateTime.getFullYear(),
    currentDateTime.getMonth() + 1,
    currentDateTime.getDate(),
  ];
  const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

  // Define suffixes for day
  const suffixes = ["st", "nd", "rd", "th"];
  const day = date.getDate();
  const daySuffix = suffixes[(day - 1) % 10] || suffixes[3];

  // Define month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = date.getMonth();
  const monthName = monthNames[month];

  // Define day of the week names
  const dayOfWeekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = date.getDay();
  const dayOfWeekName = dayOfWeekNames[dayOfWeek];

  const formattedDate = `On ${dayOfWeekName}, ${monthName} ${day}${daySuffix}`;

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

  function transformHubTime(hubTime: string): string {
    if (typeof hubTime !== "string") {
      return "No time specified";
    }

    return hubTime
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const hubTime = transformHubTime(task.hubTime);

  return (
    <motion.div
      className="lg:rounded-4xl cursor-pointer rounded-xl bg-[#EBE9F4] p-5"
      whileHover={{ scale: 1.02 }}
      onClick={() => router.push(`/explore/task-details/${task.id}`)}
    >
      <div className="flex w-full items-center justify-between">
        <h2 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-4 text-2xl font-bold text-primary lg:text-[32px]">
          {task.taskDescription}
        </h2>
        {/* <img
          src={task?.taskImage ?? placeholderImage}
          alt="Logo"
          className="h-[46px] w-[46px] rounded-full border object-cover"
        /> */}
      </div>
      <div className="my-4 space-y-2">
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
        <div className="flex w-full items-center space-x-2 font-medium text-[#716F78]">
          <FiClock className="h-6 w-6 font-bold" />
          <h5 className="text-[15px] lg:text-xl">{hubTime}</h5>
        </div>
      </div>
      <div className="flex items-center justify-between">
        {/* <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#716F78] rounded-full" />
                    <h2 className="text-[#716F78] text-lg lg:text-2xl font-medium capitalize">{`${2} offers`}</h2>
                </div> */}
        <h2 className="text-lg font-bold capitalize text-primary lg:text-2xl">
          {availability}
        </h2>
        <h2 className="text-2xl font-bold capitalize text-primary lg:text-[32px]">
          {formatAmount(task.customerBudget, "USD", false)}
        </h2>
      </div>
    </motion.div>
  );
};

export default TaskCard;

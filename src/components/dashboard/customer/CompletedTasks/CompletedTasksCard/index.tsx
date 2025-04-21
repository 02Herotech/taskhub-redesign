"use client";

import {
  dayOfWeekNames,
  formatAmount,
  monthNames,
  suffixes,
} from "@/lib/utils";
import { FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CompletedTask, CompletedTaskDetails, Task, } from "@/types/services/tasks";
import { useState } from "react";
import { DeleteTaskSvg, DropReviewSvg, RebookSvg } from "@/lib/svgIcons";
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";
import { useDeleteTaskMutation } from "@/services/tasks";
import RebookForm from "../../RebookForm";
import Image from "next/image";
import imags from "../../../../../public/assets/images/tickk.png";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
import { getBorderColor, getStatusColor } from "@/shared/statusbadge";

interface TaskCardProps {
  task: CompletedTaskDetails;
}

type DropDownItem = {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
};

const CompletedTasksCard = ({ task }: TaskCardProps) => {
  const [dropReviewPopup, setDropReviewPopup] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reviewSent, setReviewSent] = useState<boolean>(false);
  const [deleteTaskPopup, setDeleteTaskPopup] = useState(false);
  const [rebookTaskPopup, setRebookTaskPopup] = useState(false);
  const [rating, setRating] = useState<number | 0>(0);
  const [review, setReview] = useState<string>("");
  const [hoverRating, setHoverRating] = useState<number | 0>(0);
  const [wordCount, setWordCount] = useState(0);
  const dateArray = task.createdAt;
  const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
  const day = date.getDate();
  const serviceProviderId = task.providerId;
  const categoryId = task.categoryId;
  const comment = review;
  const authInstance = useAxios();
  const router = useRouter()
  // Function to get the correct ordinal suffix
  function getOrdinalSuffix(day: any) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const daySuffix = getOrdinalSuffix(day);
  const formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;

  const reviews = [
    "He/she stole an item in my home",
    "Disrespectful and Arrogant",
    "Lazy and non reliable",
    "I love the work",
    "Others",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    const wordArray = e.target.value.split(/\s+/).filter(Boolean);
    if (wordArray.length <= 60) {
      setReview(value);
      setWordCount(wordArray.length);
    }
  };

  const handleReviewSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authInstance.post(
        `service_provider/review/${serviceProviderId}/${categoryId}`,
        { rating, comment },
      );
      setReviewSent(true);
    } catch (error: any) {
      console.log(error.response);
      setReviewSent(false);
    }
  };

  return (
    <>

      <div onClick={() => router.push(`/customer/tasks/completed-tasks/${task.id}`)} className={`relative flex flex-col hover:bg-[#E5FAEA] border-l-[12px] cursor-pointer  shadow-[0px_-4px_132px_0px_#00000017] ${getBorderColor(task.jobStatus)} rounded-2xl shadow-sm bg-white overflow-hidden`}>
        <div className="p-4 pl-5 flex-1">
          <div className="mb-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.jobStatus)}`}
            >
              {task.jobStatus}
            </span>
          </div>
          <h3 className="text-xs font-semibold cursor-pointer text-[#0F052E]">{task.jobTitle}</h3>

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

              {task.jobAddress &&
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
                  <span>{task.jobAddress}</span>
                </div>
              }


            </div>

            <div className="text-right">
              <span className="text-3xl font-manrope font-bold text-[#381F8C]">${task.total}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletedTasksCard;

type StarProps = {
  starId: number;
  rating: number | 0;
  hoverRating: number | 0;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const Star: React.FC<StarProps> = ({
  starId,
  rating,
  hoverRating,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isActive = hoverRating >= starId || (!hoverRating && rating >= starId);
  const fillColor = isActive ? "#ffd700" : "none"; // Fill the star when active
  const strokeColor = isActive ? "#ffd700" : "gray"; // Border color when active/inactive

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 cursor-pointer"
      fill={fillColor} // Set the fill color dynamically
      viewBox="0 0 24 24"
      stroke={strokeColor} // Set the stroke color dynamically
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.42 4.368a1 1 0 00.95.69h4.584c.969 0 1.371 1.24.588 1.81l-3.708 2.686a1 1 0 00-.364 1.118l1.42 4.368c.3.922-.755 1.688-1.54 1.118l-3.708-2.686a1 1 0 00-1.176 0l-3.708 2.686c-.785.57-1.84-.196-1.54-1.118l1.42-4.368a1 1 0 00-.364-1.118L2.51 9.796c-.783-.57-.38-1.81.588-1.81h4.584a1 1 0 00.95-.69l1.42-4.368z"
      />
    </svg>
  );
};

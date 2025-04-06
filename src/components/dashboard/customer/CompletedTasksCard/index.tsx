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
import { CompletedTask, Task, TaskDetails } from "@/types/services/tasks";
import { useState } from "react";
import { DeleteTaskSvg, DropReviewSvg, RebookSvg } from "@/lib/svgIcons";
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";
import { useDeleteTaskMutation } from "@/services/tasks";
import RebookForm from "../RebookForm";
import Image from "next/image";
import imags from "../../../../../public/assets/images/tickk.png";
import useAxios from "@/hooks/useAxios";

interface TaskCardProps {
  task: TaskDetails;
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
      {rebookTaskPopup && (
        <Popup
          isOpen={rebookTaskPopup}
          onClose={() => setRebookTaskPopup(false)}
        >
          <RebookForm
            onClose={() => setRebookTaskPopup(false)}
            jobId={task.id}
          />
        </Popup>
      )}
      {deleteTaskPopup && (
        <Popup
          isOpen={deleteTaskPopup}
          onClose={() => setDeleteTaskPopup(false)}
        >
          <div className="relative min-h-[200px] rounded-2xl bg-[#EBE9F4] font-satoshi lg:w-[577px]">
            <div className="flex items-center space-x-5 border-b border-primary px-5 py-4">
              <div className="flex size-14 items-center justify-center rounded-full bg-[#140B31] p-1 text-white">
                {DeleteTaskSvg}
              </div>
              <h2 className="font-bold text-primary lg:text-2xl">
                Delete Task
              </h2>
            </div>
            <div className="max-lg:p-5 lg:px-8 lg:py-5">
              <p className="mb-8 font-satoshiMedium text-xl font-medium text-[#140B31]">
                Are you sure you want to delete this task? Once you delete, it
                will be erased from your list of task and will be gone
                immediately.
              </p>
              <div className="my-4 flex items-center justify-end space-x-5">
                <Button
                  className="w-[151px] rounded-full bg-[#E1DDEE] py-6 max-lg:text-sm"
                  onClick={() => setDeleteTaskPopup(false)}
                  theme="outline"
                >
                  Cancel
                </Button>
                <Button
                  className="w-[151px] rounded-full py-6 max-lg:text-sm"
                  onClick={() => {
                    setDeleteTaskPopup(false);
                    deleteTask(task.id);
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
        <Popup
          isOpen={dropReviewPopup}
          onClose={() => {
            setDropReviewPopup(false);
            setRating(0);
            setReview("");
            setReviewSent(false);
          }}
        >
          <div className="relative min-h-[200px] rounded-2xl bg-[#EBE9F4] font-satoshi lg:w-[577px]">
            {reviewSent ? (
              <div className="flex h-full items-center justify-center p-5 font-satoshi lg:px-20 lg:py-10">
                <div className="flex flex-col items-center space-y-5">
                  <div>
                    <Image src={imags} alt="image" />
                  </div>
                  <h1 className="text-4xl font-black text-[#2A1769]">
                    Review Sent
                  </h1>
                  <p className="mb-8 text-center font-satoshiMedium text-xl font-medium text-[#140B31]">
                    Your review has been submitted successfully! Thank you for
                    your feedback
                  </p>
                  <Button
                    className="w-[151px] rounded-full py-6 max-lg:text-sm"
                    onClick={() => {
                      setDropReviewPopup(false);
                      setReviewSent(false);
                    }}
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-5 border-b border-primary px-5 py-4">
                  <div className="flex size-9 items-center justify-center rounded-full bg-[#140B31] p-1 text-white">
                    {DropReviewSvg}
                  </div>
                  <h2 className="font-bold text-primary lg:text-2xl">
                    Drop a review
                  </h2>
                </div>
                <div className="rounded-md bg-white p-6 shadow-md">
                  <form onSubmit={handleReviewSubmission}>
                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-bold text-gray-700">
                        Ratings*
                      </label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            starId={star}
                            rating={rating}
                            hoverRating={hoverRating}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-bold text-gray-700">
                        Describe your review
                      </label>
                      <textarea
                        className="focus:shadow-outline h-[150px] w-full resize-none appearance-none rounded border border-gray-700 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        placeholder="Write your review..."
                        value={review}
                        onChange={handleChange}
                        required
                      />
                      <div className="text-right text-sm text-status-darkpurple">
                        {wordCount}/60 words
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        className="w-[151px] rounded-full py-6 max-lg:text-sm"
                        type="submit"
                        onClick={() => {
                          handleReviewSubmission;
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </Popup>
      )}
      <motion.div
        className="lg:rounded-4xl mb-4 flex h-full flex-col justify-between rounded-xl bg-[#EBE9F4] p-4 font-satoshi"
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <div className="flex w-full items-center justify-between space-x-2">
          <h2 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-4 font-satoshiBold text-xl font-bold text-primary lg:text-[30px]">
            {task.jobTitle}
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 rounded-lg bg-primary p-2 text-white"
            >
              <BsThreeDotsVertical className="size-4" />
            </button>
            <div
              className={`small-scrollbar absolute right-0 top-[calc(100%+0.2rem)] flex max-h-0 w-[190px] flex-col rounded-md bg-[#EBE9F4] transition-all duration-300 ${
                isDropdownOpen
                  ? "max-h-64 overflow-y-auto border border-primary"
                  : "max-h-0 overflow-hidden"
              }`}
            >
              <div className="w-full space-y-3 p-2">
                {dropDownItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="flex items-center space-x-3"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-[#140B31] p-1 text-white">
                      {item.icon}
                    </span>
                    <span className="font-satoshiMedium text-[#140B31]">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="line-clamp-3 font-satoshiMedium text-sm text-[#2A1769]">
          {task.jobDescription}
        </p>
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
          <div className="flex items-end justify-between">
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

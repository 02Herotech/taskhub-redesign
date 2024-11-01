"use client";

import Image from "next/image";
import Button from "@/components/global/Button";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiCalendar, FiClock } from "react-icons/fi";
import { useGetTaskByIdQuery, useGetTasksOffersQuery } from "@/services/tasks";
import {
  dayOfWeekNames,
  formatAmount,
  formatTime24Hour,
  monthNames,
  suffixes,
} from "@/lib/utils";
import Loading from "@/shared/loading";
import TaskOffers from "@/components/main/explore/TaskOffers";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { connectSocket } from "@/lib/socket";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { ShareModal } from "@/components/dashboard/general/ShareModal";
import ShareTask from "@/components/dashboard/general/ShareTask";
import { usePathname } from "next/navigation";
import { ShareSvg } from "@/lib/svgIcons";

const TaskDetailsPage = ({ params }: { params: { id: string } }) => {
  const [offerAmount, setOfferAmount] = useState('');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [isInviteLoading, setIsInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const offerButtonRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname()

  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShareDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInviteError(null);

    if (!email) {
      setInviteError('Please enter an email address');
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setInviteError('Please enter a valid email address');
      return;
    }

    try {
      setInviteError('')
      setIsInviteLoading(true);

      // Create mailto link with subject and body
      const subject = encodeURIComponent('Check out this task on Oloja');
      const body = encodeURIComponent(`I thought you might be interested in this: ${process.env.NEXT_PUBLIC_URL}${pathname}`);
      const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

      // Open the mailto link
      window.location.href = mailtoLink;

      setEmail(''); // Clear form on success
      setShareDropdownOpen(false)
    } catch (err) {
      setInviteError('Failed to send invite. Please try again.');
    } finally {
      setIsInviteLoading(false);
    }
  };

  const id = params.id;
  const { data: task, isLoading, error } = useGetTaskByIdQuery(
    id as unknown as number,
  );
  const { data: offers, refetch } = useGetTasksOffersQuery(
    id as unknown as number,
  );
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );

  useEffect(() => {
    textareaRef.current?.focus();

    const handleResize = () => {
      if (modalRef.current) {
        modalRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleSubmitOffer = async (message: string) => {
    const socket = connectSocket(id as unknown as number);

    const data = {
      taskId: id,
      customerId: task?.posterId,
      serviceProviderId: user?.serviceProviderId,
      fullName: user?.firstName + " " + user?.lastName,
      message,
    };

    if (user && socket) {
      try {
        socket.emit("offer", data, () => {
          refetch();
          setOfferAmount('');
          setShowSuccessMessage(true);

          setTimeout(() => {
            setShowSuccessMessage(false);
            setShowOfferForm(false);
          }, 3000);
        });
      } catch (error) {
        console.error("Error submitting offer:", error);
      }
    } else {
      console.error("Socket not connected or user not logged in");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col w-full items-center justify-center">
        <h2 className="text-xl lg:text-3xl font-satoshiBold font-bold text-primary">Task not found!</h2>
        <p className="text-lg lg:text-xl font-satoshiMedium text-[#140B31]">
          Something went wrong, please try again later.
        </p>
      </div>
    );
  }

  const date = task?.taskDate
    ? new Date(task.taskDate[0], task.taskDate[1] - 1, task.taskDate[2])
    : new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const monthName = monthNames[month];
  const dayOfWeek = date.getDay();
  const dayOfWeekName = dayOfWeekNames[dayOfWeek];
  let daySuffix;
  if (day === 11 || day === 12 || day === 13) {
    daySuffix = "th";
  } else {
    daySuffix = suffixes[day % 10] || suffixes[0]; // Default to "th" if suffix is undefined
  }
  const formattedDate = `${dayOfWeekName}, ${monthName} ${day}${daySuffix}`;
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let formattedTime;
  if (hours >= 12) {
    formattedTime = `${hours === 12 ? 12 : hours - 12}:${(minutes < 10 ? "0" : "") + minutes} PM`;
  } else {
    formattedTime = `${hours === 0 ? 12 : hours}:${(minutes < 10 ? "0" : "") + minutes} AM`;
  }

  return (
    <section className="container py-20 font-satoshi">
      {isLoading ? (
        <div className="flex h-[full] w-full items-center justify-center">
          <Image
            src="/assets/images/marketplace/taskhub-newloader.gif"
            alt="loader"
            height={300}
            width={300}
          />
        </div>
      ) : (
        <>
          <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:space-x-5">
            <div className="space-y-7 font-satoshi lg:space-y-10">
              <h2 className="text-lg font-black text-primary lg:text-4xl">
                {task?.taskBriefDescription}
              </h2>
              <div className="space-y-3">
                <h2 className="font-satoshiMedium font-bold text-primary lg:text-2xl">
                  Task Description
                </h2>
                <p className="font-satoshiMedium text-xl font-medium text-[#221354]">
                  {task?.taskDescription}
                </p>
              </div>

              {/* Share Service */}
              <div className="bg-[#F8F7FA] px-5 py-3 rounded-xl lg:flex items-center justify-between w-full">
                <ShareTask title={task.taskBriefDescription} description={task.taskDescription} image={task.taskImage} pathname={`/guest/${id}`} />
                <div className="relative max-sm:my-4" ref={dropdownRef}>
                  {/* <Button
                    theme="secondary"
                    className="w-[152px] font-satoshiMedium text-white rounded-full"
                    onClick={() => setShareDropdownOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setShareDropdownOpen(!shareDropdownOpen);
                      }
                    }}
                    aria-expanded={shareDropdownOpen}
                    aria-haspopup="true"
                  >
                    Send Invite
                  </Button> */}
                    <div
                      onClick={() => setShareDropdownOpen(true)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setShareDropdownOpen(!shareDropdownOpen);
                        }
                      }}
                      className="cursor-pointer transform transition-transform duration-300 group-hover:scale-110"
                    >
                      {ShareSvg}
                    </div>

                  <ShareModal
                    isOpen={shareDropdownOpen}
                    onClose={() => setShareDropdownOpen(false)}
                    pathname={pathname}
                  >
                    <h5 className="text-start">Invite more friends to join</h5>
                    <form action="" onSubmit={handleSubmit}>
                      <input
                        type="email"
                        placeholder="Enter e-mail address"
                        className="mt-4 px-4 py-2 w-full bg-[#EEEEEF] outline-none rounded-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isInviteLoading}
                        aria-label="Email address"
                        aria-describedby={inviteError ? "email-error" : undefined}
                      />
                      {inviteError && (
                        <p id="email-error" className="text-sm text-red-500 mt-1">
                          {inviteError}
                        </p>
                      )}
                      <div className="flex items-center justify-center mt-5 mb-3">
                        <Button
                          theme="secondary"
                          className="font-satoshiMedium text-white rounded-full"
                          size="sm"
                          type="submit"
                          disabled={isInviteLoading}
                          loading={isInviteLoading}
                        >
                          Send Invite
                        </Button>
                      </div>
                    </form>
                  </ShareModal>
                </div>
              </div>

              <div className="space-y-5">
                <h4 className="font-satoshiMedium font-bold text-primary lg:text-2xl">
                  Location
                </h4>
                <div className="flex w-full items-center space-x-2 text-[#716F78]">
                  <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
                  <h5 className="font-satoshiMedium text-[15px] font-medium lg:text-xl">
                    {task.state
                      ? `${task.postCode}, ${task.suburb}, ${task.state}`
                      : "Remote"}
                  </h5>
                </div>
              </div>

              <div className="space-y-5">
                <h4 className="font-satoshiMedium font-bold text-primary lg:text-2xl">
                  Date and Time
                </h4>
                <div className="flex items-center space-x-3 text-[#716F78] max-lg:text-xs">
                  <FiCalendar className="h-6 w-6" />
                  <h5 className="font-satoshiMedium text-[15px] font-medium lg:text-xl">
                    On {formattedDate}
                  </h5>
                </div>
                <div className="flex items-center space-x-3 text-[#716F78] max-lg:text-xs">
                  <FiClock className="h-6 w-6" />
                  <h5 className="font-satoshiMedium text-[15px] font-medium lg:text-xl">
                    {formatTime24Hour(task.taskTime) || "Flexible"}
                  </h5>
                </div>
              </div>
            </div>

            <div className="space-y-7 lg:space-y-10">
              <div className="rounded-[20px] border-2 border-primary px-5 py-8">
                <h2 className="font-satoshi text-lg font-bold text-primary lg:text-3xl">
                  Budget Details
                </h2>
                <div className="mb-6 mt-4 border-2 border-primary" />
                <div className="flex w-full items-center justify-between">
                  <h2 className="font-satoshi text-lg font-bold text-primary lg:text-3xl">
                    AUD {formatAmount(task?.customerBudget!, "USD", false)}
                  </h2>
                  <div className="relative" ref={offerButtonRef}>
                    <Button
                      onClick={() => setShowOfferForm(true)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setShowOfferForm(true)
                        }
                      }}
                      aria-expanded={showOfferForm}
                      aria-haspopup="true"
                      className="rounded-full"
                      disabled={task?.taskStatus === 'ASSIGNED'}
                    >
                      Make an offer
                    </Button>

                    {showOfferForm && (
                      <div ref={modalRef} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center justify-center">
                        <div className="bg-white w-full sm:w-[600px] rounded-t-3xl lg:rounded-2xl px-5 pb-8 pt-2 transition-all duration-300">
                          <div className={`flex items-center justify-between ${showSuccessMessage !== true && "mb-3"}`}>
                            <h2 className={`font-clashBold text-primary text-start font-bold ${showSuccessMessage && "hidden"}`}>Your Offer</h2>
                            <div className="bg-[#EBE9F4] p-2 rounded-full">
                              <IoIosCloseCircleOutline className="size-6 text-[#5A5960] cursor-pointer" onClick={() => setShowOfferForm(false)} />
                            </div>
                          </div>

                          <AnimatePresence>
                            {showSuccessMessage ? (
                              <motion.div
                                className="py-2 px-5 rounded-xl w-full flex space-y-4 flex-col items-center justify-center"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                              >
                                <div className="size-11 bg-[#4CAF50] rounded-full flex items-center justify-center">
                                  <FaCheck className="text-white" />
                                </div>
                                <h1 className="font-semibold text-primary text-center font-clashSemiBold text-2xl lg:text-3xl">Offer posted successfully!</h1>
                                <h4 className="text-[#140B31] text-center text-xl font-medium font-satoshiMedium">Your offer has been sent to the customer, you will be notified when there’s a response.</h4>
                                <Button
                                  className="rounded-full"
                                  onClick={() => setShowOfferForm(false)}
                                >
                                  Go Back
                                </Button>
                              </motion.div>
                            ) : (
                              <div>
                                <textarea
                                  rows={5}
                                  ref={textareaRef}
                                  value={offerAmount}
                                  onChange={(e) => setOfferAmount(e.target.value)}
                                  className="w-full p-2 border border-primary rounded-xl mb-4"
                                  required
                                />
                                <Button
                                  type="submit"
                                  disabled={!offerAmount.trim()}
                                  className="rounded-full"
                                  onClick={() => handleSubmitOffer(offerAmount)}
                                >
                                  Post your offer
                                </Button>
                              </div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <h2 className="text-lg font-bold text-primary lg:text-xl">
                Reference Images
              </h2>
              {task.taskImage ? (
                <Image
                  src={task.taskImage}
                  width={200}
                  height={100}
                  alt="Explore task"
                  className="h-52 object-cover"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          </div>
        </>
      )}
      {offers && offers.length > 0 && (
        <TaskOffers
          // offers={offers}
          posterId={task?.posterId}
          currentUserId={user?.serviceProviderId!}
          taskId={Number(id)}
        />
      )}
    </section>
  );
};

export default TaskDetailsPage;

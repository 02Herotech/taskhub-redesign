"use client";

import Image from "next/image";
import Button from "@/components/global/Button";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiCalendar, FiClock } from "react-icons/fi";
import { useGetTaskByIdQuery, useGetTasksOffersQuery } from "@/services/tasks";
import {
  createSlug,
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
import { usePathname, useRouter } from "next/navigation";
import { ShareSvg } from "@/lib/svgIcons";
import useUserProfileData from "@/hooks/useUserProfileData";
import ProfileIncomplete from "@/components/global/Popup/ProfileIncomplete";
import InReview from "@/components/global/Popup/InReview";

const TaskDetailsPage = ({ params }: { params: { id: string } }) => {
  const [offerAmount, setOfferAmount] = useState("");
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [isInviteLoading, setIsInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const offerButtonRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const fetchedUserData = useUserProfileData();

  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
      setInviteError("Please enter an email address");
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setInviteError("Please enter a valid email address");
      return;
    }

    try {
      setInviteError("");
      setIsInviteLoading(true);

      // Create mailto link with subject and body
      const subject = encodeURIComponent("Check out this task on Oloja");
      const body = encodeURIComponent(
        `I thought you might be interested in this: ${process.env.NEXT_PUBLIC_URL}${pathname}`,
      );
      const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

      // Open the mailto link
      window.location.href = mailtoLink;

      setEmail(""); // Clear form on success
      setShareDropdownOpen(false);
    } catch (err) {
      setInviteError("Failed to send invite. Please try again.");
    } finally {
      setIsInviteLoading(false);
    }
  };

  const id = params.id.split("-")[0];

  const {
    data: task,
    isLoading,
    error,
    isUninitialized,
  } = useGetTaskByIdQuery(id as unknown as number);
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
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (task && !isLoading) {
      // Create the correct slug format: id-task-description
      const correctSlug = `${id}-${createSlug(task.taskBriefDescription)}`;

      // If current URL doesn't match the correct slug, redirect
      if (params.id !== correctSlug) {
        router.replace(`/task-details/${correctSlug}`);
      }
    }
  }, [task, isLoading, id, params.id, router]);

  const handleSubmitOffer = async (message: string) => {
    if (!fetchedUserData.isVerified) {
      return setShowErrorPopup(true);
    }
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
          setOfferAmount("");
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

  // Show loading state only during initial load
  if (isUninitialized || isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Show error state only if we have an error and no data
  if (error || (!isLoading && !task)) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center">
        <h2 className="font-satoshiBold text-xl font-bold text-primary lg:text-3xl">
          {error ? "Error loading task" : "Task not found!"}
        </h2>
        <p className="font-satoshiMedium text-lg text-[#140B31] lg:text-xl">
          {error
            ? "An error occurred while loading the task."
            : "The requested task could not be found."}
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-full"
        >
          Retry
        </Button>
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
              <div className="w-full items-center justify-between rounded-xl bg-[#F8F7FA] px-5 py-3 lg:flex">
                <ShareTask
                  title={task.taskBriefDescription}
                  description={task.taskDescription}
                  image={task.taskImage}
                  pathname={`/guest/${id}-${createSlug(task.taskBriefDescription)}`}
                />
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
                      if (e.key === "Enter" || e.key === " ") {
                        setShareDropdownOpen(!shareDropdownOpen);
                      }
                    }}
                    className="transform cursor-pointer transition-transform duration-300 group-hover:scale-110"
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
                        className="mt-4 w-full rounded-lg bg-[#EEEEEF] px-4 py-2 outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isInviteLoading}
                        aria-label="Email address"
                        aria-describedby={
                          inviteError ? "email-error" : undefined
                        }
                      />
                      {inviteError && (
                        <p
                          id="email-error"
                          className="mt-1 text-sm text-red-500"
                        >
                          {inviteError}
                        </p>
                      )}
                      <div className="mb-3 mt-5 flex items-center justify-center">
                        <Button
                          theme="secondary"
                          className="rounded-full font-satoshiMedium text-white"
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
                      onClick={() => {
                        if (!fetchedUserData.isVerified) {
                          return setShowErrorPopup(true);
                        }
                        setShowOfferForm(true);
                      }}
                      //! What is this for ?
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setShowOfferForm(true);
                        }
                      }}
                      aria-expanded={showOfferForm}
                      aria-haspopup="true"
                      className="rounded-full"
                      disabled={
                        task?.taskStatus === "ASSIGNED" ||
                        !fetchedUserData.firstName
                      }
                    >
                      Make an offer
                    </Button>

                    {showOfferForm && (
                      <div
                        ref={modalRef}
                        className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 sm:items-center"
                      >
                        <div className="w-full rounded-t-3xl bg-white px-5 pb-8 pt-2 transition-all duration-300 sm:w-[600px] lg:rounded-2xl">
                          <div
                            className={`flex items-center justify-between ${showSuccessMessage !== true && "mb-3"}`}
                          >
                            <h2
                              className={`text-start font-clashBold font-bold text-primary ${showSuccessMessage && "hidden"}`}
                            >
                              Your Offer
                            </h2>
                            <div className="rounded-full bg-[#EBE9F4] p-2">
                              <IoIosCloseCircleOutline
                                className="size-6 cursor-pointer text-[#5A5960]"
                                onClick={() => setShowOfferForm(false)}
                              />
                            </div>
                          </div>

                          <AnimatePresence>
                            {showSuccessMessage ? (
                              <motion.div
                                className="flex w-full flex-col items-center justify-center space-y-4 rounded-xl px-5 py-2"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                              >
                                <div className="flex size-11 items-center justify-center rounded-full bg-[#4CAF50]">
                                  <FaCheck className="text-white" />
                                </div>
                                <h1 className="text-center font-clashSemiBold text-2xl font-semibold text-primary lg:text-3xl">
                                  Offer posted successfully!
                                </h1>
                                <h4 className="text-center font-satoshiMedium text-xl font-medium text-[#140B31]">
                                  Your offer has been sent to the customer, you
                                  will be notified when there’s a response.
                                </h4>
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
                                  onChange={(e) =>
                                    setOfferAmount(e.target.value)
                                  }
                                  className="mb-4 w-full rounded-xl border border-primary p-2"
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
      <ProfileIncomplete
        isOpen={
          showErrorPopup &&
          (fetchedUserData?.verificationStatus === null ||
            fetchedUserData?.verificationStatus === "NOT_VERIFIED")
        }
        onClose={() => setShowErrorPopup(false)}
      />
      <InReview
        isOpen={
          showErrorPopup && fetchedUserData?.verificationStatus === "PENDING"
        }
        onClose={() => setShowErrorPopup(false)}
      />
    </section>
  );
};

export default TaskDetailsPage;

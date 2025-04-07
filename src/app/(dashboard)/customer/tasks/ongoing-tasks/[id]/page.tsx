"use client";

import CountdownTimer from "@/components/dashboard/customer/CountdownTimer";
import ConfirmationModal from "@/components/dashboard/customer/InspectionConfirmationModal";
import Button from "@/components/global/Button";
import Popup from "@/components/global/Popup";
import { CautionSvg, RevisionSvg } from "@/lib/svgIcons";
import {
  clearLocalStorage,
  formatAmount,
  getFromLocalStorage,
  inspectionTimes,
  revisions,
  saveToLocalStorage,
  formatTime24Hour,
} from "@/lib/utils";
import {
  useAcceptServiceMutation,
  useGetJobByIdQuery,
  useInspectTaskMutation,
  useRequestRevisionMutation,
} from "@/services/bookings";
import { useGetTaskByIdQuery } from "@/services/tasks";
import Loading from "@/shared/loading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCalendar, BiChevronDown, BiChevronUp, BiMapPin } from "react-icons/bi";
import { BsTriangleFill } from "react-icons/bs";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { FaDollarSign } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { PiCurrencyDollarSimple, PiSealWarningFill } from "react-icons/pi";

const OnogoingTaskDetailsPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [requestRevisionPopup, setRequestRevisionPopup] = useState(false);
  const [revisionSent, setRevisionSent] = useState(false);
  const [selectedRevision, setSelectedRevision] = useState("");
  const [approvePaymentPopup, setApprovePaymentPopup] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [inspectionStarted, setInspectionStarted] = useState(false);
  const [inspectionEndTime, setInspectionEndTime] = useState<Date | null>(null);
  const [inspectionError, setInspectionError] = useState("");
  const [revisionError, setRevisionError] = useState("");
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false)
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const {
    data: task,
    isLoading,
    error,
  } = useGetJobByIdQuery(id as unknown as number);

  // const { data: task,
  //   isLoading,
  //   error, } = useGetTaskByIdQuery(id as unknown as number);
  const [approvePayment, { isLoading: isApproveLoading }] =
    useAcceptServiceMutation();
  const [inspectTask, { isLoading: inspectTaskLoading }] =
    useInspectTaskMutation();
  const [requestRevision, { isLoading: isRevisionLoading }] =
    useRequestRevisionMutation();

  useEffect(() => {
    const storedData = getFromLocalStorage();
    if (storedData && storedData.taskId === id) {
      setSelectedTime(storedData.selectedTime);
      setInspectionStarted(storedData.inspectionStarted);
      setInspectionEndTime(
        storedData.inspectionEndTime
          ? new Date(storedData.inspectionEndTime)
          : null,
      );
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-[full] w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!task || error) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center">
        <h2 className="font-satoshiBold text-xl font-bold text-primary lg:text-3xl">
          Task not found!
        </h2>
        <p className="font-satoshiMedium text-lg text-[#140B31] lg:text-xl">
          Something went wrong, please try again later.
        </p>
      </div>
    );
  }

  const handleRevisionSubmission = async (e: any) => {
    e.preventDefault();
    setRevisionError("");
    const response = await requestRevision({
      jobId: task.id,
      rejectionReason: selectedRevision,
    });
    if (response.error) {
      console.error(response.error);
      setRevisionError("Job has not been completed by Service Provider");
      return;
    } else {
      setRevisionSent(true);
    }
  };

  const taskTime = formatTime24Hour(task.taskTime);

  const humanReadableTime = taskTime;

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    setShowConfirmModal(true);
    setIsDropdownOpen(false);
  };

  const startInspection = async () => {
    setInspectionError("");
    const response = await inspectTask({ jobId: task.id });
    if (response.error) {
      console.error(response.error);
      setInspectionError("Job has not been completed by Service Provider");
      return;
    } else {
      setInspectionStarted(true);
      const duration = parseDuration(selectedTime);
      const endTime = new Date(Date.now() + duration);
      setInspectionEndTime(endTime);
      setShowConfirmModal(false);
      saveToLocalStorage({
        taskId: id,
        selectedTime,
        inspectionStarted: true,
        inspectionEndTime: endTime,
      });
    }
  };

  const parseDuration = (durationString: string): number => {
    const [amount, unit] = durationString.split(" ");
    const value = parseInt(amount);
    switch (unit) {
      case "hour":
      case "hours":
        return value * 60 * 60 * 1000;
      case "days":
        return value * 24 * 60 * 60 * 1000;
      default:
        return 0;
    }
  };

  const endInspection = () => {
    setInspectionStarted(false);
    setInspectionEndTime(null);
    setSelectedTime("");
    clearLocalStorage();
  };

  const handleApprovePayment = async () => {
    try {
      setPaymentError("");
      const response = await approvePayment({ jobId: task.id });

      if (response.error) {
        console.error("Payment approval failed:", response.error);
        setPaymentError("Something went wrong, please try again");
      } else {
        setPaymentApproved(true);
        router.push("/customer/tasks?tab=Completed%20tasks");
      }
    } catch (error) {
      console.error("Payment approval failed:", error);
      setPaymentError("Something went wrong, please try again");
    }
  };

  const timeOptions = [
    { label: "1 hour", value: "1h" },
    { label: "3 hours", value: "3h" },
    { label: "5 hours", value: "5h" },
    { label: "24 hours", value: "24h" },
    { label: "3 Days", value: "3d" },
    { label: "5 Days", value: "5d" },
    { label: "7 Days", value: "7d" },
  ];

  return (
    <div className="">

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={startInspection}
        selectedTime={selectedTime}
        error={inspectionError}
        loading={inspectTaskLoading}
      />
      {/* Notification banner */}
      <div className="bg-amber-50 p-3 rounded-t-lg flex gap-1">
        <PiSealWarningFill className="w-5 h-5 text-amber-700" />
        <p className="text-amber-700 text-sm font-[500]">
          Please Note: Once a task is finished, you have 24 hrs to approve payment or request a revision. If no action
          is taken, the system would automatically approve payment and mark as completed.
        </p>
      </div>

      <div className="p-6">
        {/* Status badge */}
        <div className="mb-4">
          <span className="bg-indigo-100 text-primary border border-[#381F8C] px-4 py-1 rounded-full text-sm lowercase">{task.jobStatus}</span>
        </div>

        {/* Task title */}
        <h1 className="text-2xl  md:text-3xl font-bold mb-4 capitalize ">{task.jobTitle}</h1>

        {/* Task details and inspect task in a flex container */}
        <div className="flex justify-between items-start mb-6">
          {/* Task details */}
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center">
              <CiLocationOn className="w-4 h-4 mr-1" />
              <span className="text-sm">{"location"}</span>
            </div>
            <div className="flex items-center">
              <CiCalendar className="w-4 h-4 mr-1" />
              <span className="text-sm">{task.taskDate}</span>
            </div>
            <div className="flex items-center">
              <PiCurrencyDollarSimple className="w-4 h-4 mr-1" />
              <span className="text-sm text-primary font-bold">{task.total}</span>
            </div>
          </div>

          {/* Inspect task dropdown */}
          <div className="relative">
            <button
              className="border border-indigo-200 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-md flex items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Inspect task
              <BiChevronDown className="w-4 h-4 ml-2" />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-2">
                  <div className="mb-2 font-medium text-sm sm:text-base whitespace-nowrap">Inspect task</div>
                  <div className="space-y-2">
                    {inspectionTimes.map((time) => (
                      <label key={time} className="flex items-center">
                        <input
                          type="radio"
                          name="time"
                          value={time}
                          checked={selectedTime === time}
                          onChange={() => handleTimeSelection(time)}
                          className="mr-2"
                        />
                        <span>{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Task description */}
        <div className="mb-6 ">
          <p className="text-gray-800">{isExpanded ? task.jobDescription : `${task.jobDescription.substring(0, 100)}...`}</p>
          <span className="text-gray-500 mt-1 flex items-center" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <BiChevronUp className="w-8 h-8" /> : <BiChevronDown className="w-8 h-8" />}
          </span>
        </div>

        {/* Image placeholder */}
        {/* {task.taskImage && <div className="mb-6 border border-gray-200 rounded-md w-24 h-24 flex items-center justify-center bg-gray-50">
          <Image src={task.taskImage} alt={task.jobDescription} className="w-10 h-10 text-gray-400" />
        </div>} */}

        <div className="flex flex-wrap justify-between items-start">
          {/* Empty div to maintain layout */}
          <div></div>

          {/* Assigned to */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Assigned to</p>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs mr-2">
                { }
              </div>
              <div>
                <p className="font-medium">{ }</p>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-1">{ }</span>
                  <div className="flex">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-amber-400 text-xs">
                        {star}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="f flex flex-col min-[400px]:flex-row items-center justify-center min-[400px]:justify-between mt-6">
          <div className=" flex flex-col min-[400px]:flex-row  gap-3">
            <button onClick={() => {
              setApprovePaymentPopup(true);
            }}
              className="bg-primary text-white px-4 font-semibold py-2 rounded-[50px] whitespace-nowrap">Approve payment</button>
            <button onClick={() => setRequestRevisionPopup(true)} className="border border-primary font-semibold text-primary px-8 py-3 rounded-[50px] whitespace-nowrap">Request revision</button>
          </div>
          <button className="text-red-600 px-4 py-2">Cancel Task</button>
        </div>
      </div>

      {task.jobStatus === "INSPECTION" && (
        <InSpectionTimer
          inspectionStarted={inspectionStarted}
          selectedTime={selectedTime}
          inspectionEndTime={inspectionEndTime}
          endInspection={endInspection}
        />
      )}

      <ApprovePopup
        approvePaymentPopup={approvePaymentPopup}
        setApprovePaymentPopup={setApprovePaymentPopup}
        paymentApproved={paymentApproved}
        setPaymentApproved={setPaymentApproved}
        jobId={task.id} />

      <RequestReview
        requestRevisionPopup={requestRevisionPopup}
        setRequestRevisionPopup={setRequestRevisionPopup}
        jobId={task.id} />
    </div>
  );
};

export default OnogoingTaskDetailsPage;


type ApprovePopupProps = {
  approvePaymentPopup: boolean;
  setApprovePaymentPopup: React.Dispatch<React.SetStateAction<boolean>>
  paymentApproved: boolean;
  setPaymentApproved: React.Dispatch<React.SetStateAction<boolean>>
  jobId: number
}

const ApprovePopup = ({ approvePaymentPopup, setApprovePaymentPopup, paymentApproved, setPaymentApproved, jobId }: ApprovePopupProps) => {
  const [paymentError, setPaymentError] = useState("");
  const router = useRouter();
  const [approvePayment, { isLoading: isApproveLoading }] =
    useAcceptServiceMutation();

  const handleApprovePayment = async () => {
    try {
      setPaymentError("");
      const response = await approvePayment({ jobId });

      if (response.error) {
        console.error("Payment approval failed:", response.error);
        setPaymentError("Something went wrong, please try again");
      } else {
        setPaymentApproved(true);
        router.push("/customer/tasks?tab=Completed%20tasks");
      }
    } catch (error) {
      console.error("Payment approval failed:", error);
      setPaymentError("Something went wrong, please try again");
    }
  };
  return (
    //  {approvePaymentPopup && (
    <Popup
      isOpen={approvePaymentPopup}
      onClose={() => setApprovePaymentPopup(false)}
    >
      <div className="relative min-h-[200px] w-full max-w-[600px] overflow-y-auto rounded-2xl bg-white font-satoshi">
        {paymentApproved ? (
          <div className="flex h-full items-center justify-center p-10 font-satoshi">
            <div className="flex flex-col items-center space-y-5">
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="35"
                  cy="35"
                  r="35"
                  fill="#C1F6C3"
                  fill-opacity="0.6"
                />
                <circle cx="34.5" cy="34.5" r="22.5" fill="#A6F8AA" />
                <path
                  d="M52 34.9924L48.2291 30.742L48.7545 25.1156L43.1755 23.8619L40.2545 19L35 21.2322L29.7455 19L26.8245 23.8619L21.2455 25.1003L21.7709 30.7267L18 34.9924L21.7709 39.2427L21.2455 44.8844L26.8245 46.1381L29.7455 51L35 48.7525L40.2545 50.9847L43.1755 46.1228L48.7545 44.8691L48.2291 39.2427L52 34.9924ZM31.9091 42.6369L25.7273 36.5213L27.9064 34.3655L31.9091 38.3101L42.0936 28.2346L44.2727 30.4056L31.9091 42.6369Z"
                  fill="#4CAF50"
                />
              </svg>
              <h1 className="text-center font-satoshiBold text-3xl font-black text-[#2A1769]">
                Payment Approved!
              </h1>
              <p className="mb-8 text-center font-satoshiMedium text-lg font-medium text-[#140B31]">
                Great! your payment to the service provider has been
                approved.
              </p>
              <div className="items-center justify-center lg:flex">
                <Button
                  className="rounded-full max-lg:text-sm"
                  onClick={() => {
                    setApprovePaymentPopup(false);
                    setPaymentApproved(false);
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
              {/* {paymentError && <p className="text-red-600 text-sm mt-4 text-center">{paymentError}</p>} */}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-10 font-satoshi">
            <div className="flex flex-col items-center space-y-5">
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="35"
                  cy="35"
                  r="35"
                  fill="#C1F6C3"
                  fillOpacity="0.6"
                />
                <circle cx="34.5" cy="34.5" r="22.5" fill="#A6F8AA" />
                <path
                  d="M52 34.9924L48.2291 30.742L48.7545 25.1156L43.1755 23.8619L40.2545 19L35 21.2322L29.7455 19L26.8245 23.8619L21.2455 25.1003L21.7709 30.7267L18 34.9924L21.7709 39.2427L21.2455 44.8844L26.8245 46.1381L29.7455 51L35 48.7525L40.2545 50.9847L43.1755 46.1228L48.7545 44.8691L48.2291 39.2427L52 34.9924ZM31.9091 42.6369L25.7273 36.5213L27.9064 34.3655L31.9091 38.3101L42.0936 28.2346L44.2727 30.4056L31.9091 42.6369Z"
                  fill="#4CAF50"
                />
              </svg>
              <h1 className="font-satoshiBold text-2xl font-extrabold text-[#2A1769]">
                Approve payment
              </h1>
              <p className="mb-8 text-center font-satoshiMedium text-lg font-medium text-[#140B31]">
                Happy with the service? Great! Approve the payment to mark
                it as complete. Revision after this step may attract extra
                charges.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button
                  className="rounded-full border-none bg-[#E1DDEE] py-3 font-satoshiBold text-sm text-primary"
                  theme="outline"
                  onClick={() => setApprovePaymentPopup(false)}
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  loading={isApproveLoading}
                  disabled={paymentError != ""}
                  className="rounded-full py-3 text-sm"
                  size="sm"
                  onClick={handleApprovePayment}
                >
                  Approve
                </Button>
              </div>
              {paymentError && (
                <h4 className="text-center text-sm text-red-500">
                  {paymentError}
                </h4>
              )}
            </div>
          </div>
        )}
      </div>
    </Popup>
  )
}



type RequestReviewProps = {
  requestRevisionPopup: boolean;
  setRequestRevisionPopup: React.Dispatch<React.SetStateAction<boolean>>
  jobId: number
}

const RequestReview = ({ requestRevisionPopup, setRequestRevisionPopup, jobId, }: RequestReviewProps) => {

  const [requestRevision, { isLoading: isRevisionLoading }] =
    useRequestRevisionMutation();
  const [selectedRevision, setSelectedRevision] = useState("");
  const [revisionError, setRevisionError] = useState("");
  const [revisionSent, setRevisionSent] = useState(false);

  const handleRevisionSubmission = async (e: any) => {
    e.preventDefault();
    setRevisionError("");
    const response = await requestRevision({
      jobId: jobId,
      rejectionReason: selectedRevision,
    });
    if (response.error) {
      console.error(response.error);
      setRevisionError("Job has not been completed by Service Provider");
      return;
    } else {
      setRevisionSent(true);
    }
  };

  return (
    <Popup
      isOpen={requestRevisionPopup}
      onClose={() => setRequestRevisionPopup(false)}
    >
      <div className="relative min-h-[200px]  max-h-[90vh] overflow-y-auto rounded-2xl bg-white font-satoshi lg:w-[520px]">
        {revisionSent ? (
          <div className="flex h-full items-center justify-center p-5 font-satoshi lg:p-10">
            <div className="flex flex-col items-center space-y-5">
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="35"
                  cy="35"
                  r="35"
                  fill="#C1F6C3"
                  fillOpacity="0.6"
                />
                <circle cx="34.5" cy="34.5" r="22.5" fill="#A6F8AA" />
                <path
                  d="M52 34.9924L48.2291 30.742L48.7545 25.1156L43.1755 23.8619L40.2545 19L35 21.2322L29.7455 19L26.8245 23.8619L21.2455 25.1003L21.7709 30.7267L18 34.9924L21.7709 39.2427L21.2455 44.8844L26.8245 46.1381L29.7455 51L35 48.7525L40.2545 50.9847L43.1755 46.1228L48.7545 44.8691L48.2291 39.2427L52 34.9924ZM31.9091 42.6369L25.7273 36.5213L27.9064 34.3655L31.9091 38.3101L42.0936 28.2346L44.2727 30.4056L31.9091 42.6369Z"
                  fill="#4CAF50"
                />
              </svg>
              <h1 className="text-center text-2xl font-black text-[#2A1769] lg:text-3xl">
                Request Successful
              </h1>
              <p className="text-md mb-8 text-center font-satoshiMedium font-medium text-primary lg:text-lg">
                Your request for revision has been sent, in a short time you
                will get a response as to the date it starts and ends.
              </p>
              <Button
                className="w-[125px] rounded-full border-none bg-[#E1DDEE] py-3 font-satoshiBold text-sm text-primary"
                onClick={() => {
                  setRequestRevisionPopup(false);
                  setRevisionSent(false);
                }}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-3 px-2  py-4">
              {/* <div className="flex size-9 items-center justify-center rounded-full bg-[#140B31] p-1 text-white">
                {RevisionSvg}
              </div> */}
              <h2 className="font-bold text-primary lg:text-xl">
                Request Revision
              </h2>
            </div>
            <form
              onSubmit={handleRevisionSubmission}
              className=" lg:pt-4 w-full px-2"
            >
              <p className="mb-5 font-satoshiMedium  text-primary">
                We are committed to making sure you have the best
                experience. Why aren’t you ready to approve payment?
              </p>
              {selectedRevision !== "Others" && (
                <div className="mb-8 space-y-5 font-satoshi text-xl font-medium text-black">
                  {revisions.map((revision, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedRevision(revision)}
                      className={`w-full cursor-pointer rounded-full px-5 py-3 text-center ${selectedRevision === revision
                        ? "bg-primary text-white"
                        : "bg-[#F1F1F2] text-[#716F78]"
                        }`}
                    >
                      <h4>{revision}</h4>
                    </div>
                  ))}
                </div>
              )}

              {selectedRevision === "Others" && (
                <div className="space-y-2">
                  <label className="text-lg font-bold text-[#140B31]">
                    Others
                  </label>
                  <textarea
                    cols={8}
                    placeholder="Describe your reasons briefly"
                    className="h-24  w-full bg-[#EEEEEF] rounded-[18px]  p-2 "
                  />
                </div>
              )}
              <div className="mt-10 mb-2 flex w-full items-center justify-between gap-2">
                {selectedRevision === "Others" && (
                  <Button
                    theme="outline"
                    className="w-full rounded-full py-6 max-lg:text-sm"
                    type="button"
                    onClick={() => setSelectedRevision("")}
                  >
                    Back
                  </Button>
                )}

                <Button
                  className={`w-full rounded-full py-6 max-lg:text-sm ${selectedRevision != "others" && " w-[70%] mx-auto"}`}
                  type="submit"
                  disabled={revisionError != ""}
                  loading={isRevisionLoading}
                >
                  Submit
                </Button>
              </div>
              {revisionError && (
                <p className="mt-4 text-center text-sm text-red-600">
                  {revisionError}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </Popup>
  )
}

type InSpectionTimeProps = {
  inspectionStarted: boolean;
  selectedTime: string;
  inspectionEndTime: Date;
  endInspection: () => void
}
const InSpectionTimer = ({ inspectionStarted, selectedTime, inspectionEndTime, endInspection }: InSpectionTimeProps) => {
  return (
    <div className="py-7">
      {inspectionStarted ? (
        <div className="items-center justify-between max-sm:space-y-5 lg:flex">
          <h2 className="mb-4 text-lg font-semibold text-primary">
            Inspection requested for {selectedTime}
          </h2>
          <div className="flex items-center justify-between space-x-4">
            <div className="items-center justify-end space-x-4 lg:flex">
              {inspectionEndTime && (
                <CountdownTimer endTime={inspectionEndTime} />
              )}
            </div>
            <Button
              className=" border-red-800 bg-red-300 text-xs text-red-800"
              size="sm"
              onClick={endInspection}
            >
              End Inspection
            </Button>
          </div>
        </div>
      ) : (
        <h2 className="text-lg text-primary">
          {selectedTime
            ? `Inspection time selected: ${selectedTime}`
            : "No inspection time selected"}
        </h2>
      )}
    </div>
  )
}
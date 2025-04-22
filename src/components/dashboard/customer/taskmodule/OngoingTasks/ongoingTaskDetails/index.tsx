"use client";

import CountdownTimer from "@/components/dashboard/customer/CountdownTimer";
import ConfirmationModal from "@/components/dashboard/customer/InspectionConfirmationModal";
import Button from "@/components/global/Button";
import Popup from "@/components/global/Popup";
import ImageViewer from "@/components/imageviewer";
import { CautionSvg, RevisionSvg } from "@/lib/svgIcons";
import {
  clearLocalStorage,
  formatAmount,
  getFromLocalStorage,
  inspectionTimes,
  revisions,
  saveToLocalStorage,
  formatTime24Hour,
  cancellationReasons,
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
import { BiCalendar, BiChevronDown, BiChevronUp, BiMapPin, BiXCircle } from "react-icons/bi";
import { BsTriangleFill } from "react-icons/bs";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { FaDollarSign } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IoArrowBackSharp } from "react-icons/io5";
import { PiCurrencyDollarSimple, PiSealWarningFill } from "react-icons/pi";
import CancelPopup from "./cancelpopup";
import ApprovePopup from "./approvepopup";
import RequestReview from "./requestreview";
import { FiRefreshCw } from "react-icons/fi";
import MoreButtonDropdown from "../../components/dropdown";

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
  const [cancelPopup, setCancelPopup] = useState(false)
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

  useEffect(() => {
    if (task) {
      router.push(`/customer/tasks/ongoing-tasks/${task.jobInfo.id}?title=${task.jobInfo.jobTitle}`);
    }
  }, [task])

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



  const taskTime = formatTime24Hour(task.jobInfo.taskTime);

  const dropdownItems = [
    {
      id: 2,
      icon: FiRefreshCw,
      label: "Request revision",
      onClick: () => setRequestRevisionPopup(true),
    },
    {
      id: 3,
      icon: BiXCircle,
      label: "Cancel task",
      onClick: () => setCancelPopup(true),
    },
  ]

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    setShowConfirmModal(true);
    setIsDropdownOpen(false);
  };

  const startInspection = async () => {
    setInspectionError("");
    const response = await inspectTask({ jobId: task.jobInfo.id });
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
      <div className="bg-[#FFF0DA] p-2 mb-4 rounded-t-lg flex gap-1 border border-neutral-500 warningshadow">
        <PiSealWarningFill className="w-5 h-5 text-amber-700" />
        <p className="text-[#FE9B07] text-sm font-[500] font-manrope">
          Please Note: Once a task is finished, you have 24 hrs to approve payment or request a revision. If no action
          is taken, the system would automatically approve payment and mark as completed.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Status badge */}
        <div className="mb-4 flex items-center justify-between">
          <p className="bg-indigo-100 text-primary border border-[#381F8C] px-4 py-1 rounded-full text-sm uppercase">{task.jobInfo.jobStatus}</p>
          <MoreButtonDropdown dropdownItems={dropdownItems} />
        </div>

        {/* Task title */}
        <h1 className="text-2xl  md:text-3xl font-bold mb-4 capitalize ">{task.jobInfo.jobTitle}</h1>

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
              <span className="text-sm">{task.jobInfo.taskDate}</span>
            </div>
            <div className="flex items-center">
              <PiCurrencyDollarSimple className="w-4 h-4 mr-1" />
              <span className="text-sm text-primary font-bold">{task.jobInfo.total}</span>
            </div>
          </div>

          {/* Inspect task dropdown */}
          <div className="relative ">
            <button
              className="bg-indigo-100 flex items-center gap-1 text-primary border border-[#381F8C] px-2 py-1 rounded-full text-sm uppercase whitespace-nowrap"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Inspect task
              <BiChevronDown className="w-4 h-4 ml-2" />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-2">
                  <div className="bg-indigo-100 text-primary border border-[#381F8C] px-4 py-1 rounded-full text-sm uppercase">Inspect task</div>
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
        <div className="mb-6 flex flex-col  items-start justify-between gap-2">
          <p className="text-primary font-medium text-lg  flex-1 whitespace-pre-line">
            {isExpanded ? task.jobInfo.jobDescription : `${task.jobInfo.jobDescription.substring(0, 200)}...`}
          </p>
          <span className="text-gray-500 mt-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <BiChevronUp className="w-8 h-8" /> : <BiChevronDown className="w-8 h-8" />}
          </span>
        </div>

        {/* Image placeholder */}
        {task.taskImage && <div className="mb-6  relative  rounded-md w-48 h-48 flex items-center justify-center ">
          {/* <Image src={task.taskImage} alt={task.jobInfo.jobTitle} fill className="w-20 h-20 text-gray-400" /> */}
          <ImageViewer
            src={task.taskImage}
            alt={task.jobInfo.jobTitle}
          />
        </div>}

        <div className="flex flex-wrap justify-end">
          {/* Assigned to */}
          <div className="mb-4 flex flex-col">
            <p className="text-sm text-primary mb-2 font-bold">Assigned to</p>
            <div className="flex items-center">
              {task.assignedDTO.profileImage &&
                <div className="flex relative items-center justify-center w-10 h-10 text-primary text-xs mr-2">
                  <Image src={task.assignedDTO.profileImage} alt={task.assignedDTO.fullName} fill className="w-10 h-10 text-gray-400" />
                </div>
              }
              <div>
                <p className="font-medium">{task.assignedDTO.fullName}</p>
                <div className="flex items-center ">
                  <span className="text-sm text-gray-500 mr-1">4.5</span>
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
            {/* <button onClick={() => setRequestRevisionPopup(true)} className="border border-primary font-semibold text-primary px-8 py-3 rounded-[50px] whitespace-nowrap">Request revision</button> */}
          </div>
          {/* <button onClick={() => setCancelPopup(true)} className="text-red-600 px-4 py-2">Cancel Task</button> */}
        </div>
      </div>

      {task.jobInfo.jobStatus === "INSPECTION" && (
        <InSpectionTimer
          inspectionStarted={inspectionStarted}
          selectedTime={selectedTime}
          inspectionEndTime={inspectionEndTime}
          endInspection={endInspection}
        />
      )}

      <CancelPopup
        cancelPopup={cancelPopup}
        setCancelPopup={setCancelPopup}
        jobId={task.jobInfo.id} />

      <ApprovePopup
        approvePaymentPopup={approvePaymentPopup}
        setApprovePaymentPopup={setApprovePaymentPopup}
        paymentApproved={paymentApproved}
        setPaymentApproved={setPaymentApproved}
        jobId={task.jobInfo.id} />

      <RequestReview
        requestRevisionPopup={requestRevisionPopup}
        setRequestRevisionPopup={setRequestRevisionPopup}
        jobId={task.jobInfo.id} />
    </div>
  );
};

export default OnogoingTaskDetailsPage;



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
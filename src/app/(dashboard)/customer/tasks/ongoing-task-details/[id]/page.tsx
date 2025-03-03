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
import Loading from "@/shared/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsTriangleFill } from "react-icons/bs";
import { IoArrowBackSharp } from "react-icons/io5";

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

  const {
    data: task,
    isLoading,
    error,
  } = useGetJobByIdQuery(id as unknown as number);
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

  return (
    <>
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={startInspection}
        selectedTime={selectedTime}
        error={inspectionError}
        loading={inspectTaskLoading}
      />
      {requestRevisionPopup && (
        <Popup
          isOpen={requestRevisionPopup}
          onClose={() => setRequestRevisionPopup(false)}
        >
          <div className="relative min-h-[200px] overflow-y-auto rounded-2xl bg-white font-satoshi lg:w-[577px]">
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
                  <p className="text-md mb-8 text-center font-satoshiMedium font-medium text-[#140B31] lg:text-lg">
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
                <div className="flex items-center space-x-5 border-b border-primary px-5 py-4">
                  <div className="flex size-9 items-center justify-center rounded-full bg-[#140B31] p-1 text-white">
                    {RevisionSvg}
                  </div>
                  <h2 className="font-bold text-primary lg:text-xl">
                    Request Revision
                  </h2>
                </div>
                <form
                  onSubmit={handleRevisionSubmission}
                  className="max-lg:p-5 lg:px-8 lg:py-5"
                >
                  <p className="mb-5 font-satoshiMedium text-lg text-[#140B31]">
                    We are committed to making sure you have the best
                    experience. Why aren’t you ready to approve payment?
                  </p>
                  {selectedRevision !== "Others" && (
                    <div className="mb-8 space-y-5 font-satoshi text-xl font-medium text-black">
                      {revisions.map((revision, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedRevision(revision)}
                          className={`w-full cursor-pointer rounded-full px-5 py-3 text-center ${
                            selectedRevision === revision
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
                        placeholder="Tell us your reason for requesting a revision"
                        className="h-24 w-full rounded border border-[#381F8C] p-2"
                      />
                    </div>
                  )}
                  <div className="mt-10 flex w-full items-center justify-center gap-2">
                    {selectedRevision === "Others" && (
                      <Button
                        theme="outline"
                        className="w-[151px] rounded-full py-6 max-lg:text-sm"
                        type="button"
                        onClick={() => setSelectedRevision("")}
                      >
                        Back
                      </Button>
                    )}

                    <Button
                      className="w-[151px] rounded-full py-6 max-lg:text-sm"
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
      )}
      {approvePaymentPopup && (
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
      )}

      <div className="mt-[5rem] p-4 lg:px-14">
        <div className="mb-5 flex items-center space-x-2">
          <Button className="px-2" onClick={router.back}>
            <IoArrowBackSharp className="size-7" />
          </Button>
          <Button>My ongoing task</Button>
        </div>
        <div className="font-satoshi">
          <div className="flex w-full items-center space-x-4 rounded-3xl bg-[#FFF0DA] p-4 text-tc-orange">
            {CautionSvg}
            <p className="text-base">
              Please Note: Once a task is finished, you have 24 hrs to approve
              or request a revision, If no action is taken, the system would
              automatically approve payment and mark as completed.
            </p>
          </div>
        </div>
        <div className="mt-8 justify-between border-b border-[#C1BADB] pb-8 lg:flex lg:space-x-8">
          <div className="space-y-5 lg:flex-1">
            <h1 className="text-2xl font-bold text-primary">{task.jobTitle}</h1>
            <h5 className="font-satoshiMedium text-black">
              {task.jobDescription}
            </h5>
            {task.jobStatus === "INSPECTION" && (
              <div className="relative">
                <button
                  className="flex w-[190px] items-center justify-center gap-x-4 rounded-3xl bg-[#F1F1F2] px-4 py-2 text-base font-bold text-[#140B31] transition-colors duration-300"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div
                    className={`fixed left-0 top-0 h-screen w-screen ${isDropdownOpen ? "block" : "hidden"} `}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  ></div>
                  {selectedTime ? (
                    <span>{selectedTime}</span>
                  ) : (
                    <span>Inspect Task</span>
                  )}
                  <span>
                    <BsTriangleFill
                      fill="#140B31"
                      className="size-2 rotate-[60deg] text-[#140B31]"
                    />
                  </span>
                </button>
                <div
                  className={`small-scrollbar absolute top-[calc(100%+0.2rem)] flex max-h-0 w-[190px] flex-col rounded-md bg-[#F1F1F2] transition-all duration-300 ${isDropdownOpen ? "max-h-64 overflow-y-auto" : "max-h-0  overflow-hidden"} `}
                >
                  <div className="w-full space-y-3 p-5">
                    {inspectionTimes.map((time, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="radio"
                          name="inspectionTime"
                          value={time}
                          checked={selectedTime === time}
                          onChange={() => handleTimeSelection(time)}
                          className="form-radio"
                        />
                        <span className="font-satoshiMedium text-primary lg:text-xl">
                          {time}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex-col items-end justify-between max-sm:mt-5 max-sm:space-y-4 lg:flex">
            <h4 className="text-lg text-[#716F78]">{humanReadableTime}</h4>
            <h2 className="text-xl font-bold capitalize text-primary">
              {formatAmount(task.total, "USD", false)}
            </h2>
            {task.jobStatus === "INSPECTION" && (
              <div className="flex items-center space-x-10 lg:justify-end lg:text-lg">
                <button
                  className="text-tc-orange"
                  onClick={() => setRequestRevisionPopup(true)}
                >
                  Request Revision
                </button>
                <button
                  className="text-[#34A853]"
                  onClick={() => {
                    setPaymentError("");
                    setApprovePaymentPopup(true);
                  }}
                >
                  Approve payment
                </button>
              </div>
            )}
          </div>
        </div>
        {task.jobStatus === "INSPECTION" && (
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
        )}
      </div>
    </>
  );
};

export default OnogoingTaskDetailsPage;

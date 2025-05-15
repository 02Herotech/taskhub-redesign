"use client"
import MoreButtonDropdown from '@/components/dashboard/customer/taskmodule/components/dropdown';
import { formatTime24Hour } from '@/lib/utils';
import { useGetJobByIdQuery } from '@/services/bookings';
import Loading from '@/shared/loading';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import { BiChevronDown, BiChevronUp, BiXCircle } from 'react-icons/bi';
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { FiRefreshCw } from 'react-icons/fi';
import { PiCurrencyDollarSimple, PiSealWarningFill } from 'react-icons/pi';
import ImageViewer from 'react-simple-image-viewer';
import CompleteTaskModal from './completeTask';



const OngoingTask = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();

  const [requestRevisionPopup, setRequestRevisionPopup] = useState(false);
  const [approvePaymentPopup, setApprovePaymentPopup] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false)
  const [cancelPopup, setCancelPopup] = useState(false)
  const [completeTaskPopup, setCompleteTaskPopup] = useState(false)
  const {
    data: task,
    isLoading,
    error,
  } = useGetJobByIdQuery(id);


  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };


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
      label: "Report Task",
      onClick: () => setRequestRevisionPopup(true),
    },
    {
      id: 3,
      icon: BiXCircle,
      label: "Dispute",
      onClick: () => setCancelPopup(true),
    },
  ]

  return (
    <div className="">

      <div className="bg-[#FFF0DA] p-2 mb-4 rounded-t-lg flex gap-1  warningshadow">
        <PiSealWarningFill className="w-5 h-5 text-amber-700" />
        <p className="text-[#FE9B07] text-sm font-[500] font-manrope">
          Please Note: Once a task is finished, you have 24 hrs to approve payment or request a revision. If no action
          is taken, the system would automatically approve payment and mark as completed.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <p className="bg-indigo-100 text-primary border border-[#381F8C] px-4 py-1 rounded-full text-sm uppercase">{task.jobInfo.jobStatus}</p>
          {/* <MoreButtonDropdown dropdownItems={dropdownItems} /> */}
        </div>

        <h1 className="text-2xl  md:text-3xl font-bold mb-4 capitalize ">{task.jobInfo.jobTitle}</h1>

        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center">
              <CiLocationOn className="w-4 h-4 mr-1" />
              <span className="text-sm">{task.jobInfo.jobAddress}</span>
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
        </div>

        <div className="mb-6 flex flex-col  items-start justify-between gap-2">
          <p className="text-primary font-medium text-lg  flex-1 whitespace-pre-line">
            {isExpanded ? task.jobInfo.jobDescription : `${task.jobInfo.jobDescription.substring(0, 200)}...`}
          </p>
          <span className="text-gray-500 mt-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <BiChevronUp className="w-8 h-8" /> : <BiChevronDown className="w-8 h-8" />}
          </span>
        </div>


        {Array.isArray(task.taskImage) && task.taskImage.length > 0 && <div className="my-8  relative  w-24 h-24 flex items-center justify-center ">
          {task.taskImage?.map((picture, index) =>
            <Image onClick={() => openImageViewer(index)} key={picture} src={picture} alt="job image" fill className="w-20 h-20 text-gray-400" />
          )}

          {isViewerOpen && (
            <ImageViewer
              src={task.taskImage}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
              backgroundStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                zIndex: 1000
              }}
            />
          )}
        </div>}

        <div className="flex flex-wrap justify-end">
          {/* Assigned to */}
          <div className="mb-4 flex flex-col">
            <p className="text-sm text-primary mb-2 font-bold">Assigned By</p>
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
        {task.jobInfo.jobStatus === "IN_PROGRESS" &&
        <div className=" flex flex-col min-[400px]:flex-row items-center justify-center min-[400px]:justify-between mt-6">
            <div className=" flex flex-col min-[400px]:flex-row  gap-3">
              <button onClick={() => setCompleteTaskPopup(true)}
                className="bg-primary text-white px-4 font-semibold py-2 rounded-[50px] whitespace-nowrap">Complete Task</button>
            </div>
          </div>
        }
      </div>

      <CompleteTaskModal completeTaskPopup={completeTaskPopup} setCompleteTaskPopup={setCompleteTaskPopup} />

    </div>
  );
}

export default OngoingTask
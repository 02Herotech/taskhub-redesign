"use client"
import { useGetJobByIdQuery } from '@/services/bookings';
import Loading from '@/shared/loading';
import { formatDateFromArray } from '@/utils';
import Image from 'next/image';
import React, { useCallback, useState } from 'react'
import { BiNotepad } from 'react-icons/bi';
import { FaCalendar } from 'react-icons/fa';
import ImageViewer from 'react-simple-image-viewer';
import { FiCalendar, FiChevronDown, FiChevronUp, FiDollarSign, FiMapPin } from 'react-icons/fi';

const CompletedTaskDetails = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showRobookModal, setShowRebookModal] = useState(false)
  const [deleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [showReoccuringModal, setShowReoccuringModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);


  const {
    data: completedTask,
    isLoading,
    error,
  } = useGetJobByIdQuery(id as unknown as number);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

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

  if (!completedTask || error) {
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

  const dropdownItems = [
    {
      id: 2,
      icon: FaCalendar,
      label: "Make Task Reoccurning",
      onClick: () => setShowReoccuringModal(true),
    },
    {
      id: 3,
      icon: BiNotepad,
      label: "Rebook ",
      onClick: () => setShowRebookModal(true),
    },
  ]

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-[60vh] justify-between ">
      <div className="">
        <div className="mb-4 flex items-center justify-between">
          <p className="bg-indigo-100 text-primary border border-[#381F8C] px-4 py-1 rounded-full text-sm lowercase">
            {completedTask.jobInfo.jobStatus}
          </p>

        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">{completedTask.jobInfo.jobTitle}</h2>
          <button className="text-sm text-primary font-semibold rounded-full px-4 py-1 border border-primary">Post as new</button>
        </div>

        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FiMapPin className="w-4 h-4" />
            <span>{completedTask.jobInfo.jobAddress}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiCalendar className="w-4 h-4" />
            <span>{formatDateFromArray(completedTask.jobInfo.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiDollarSign className="w-4 h-4" />
            <span>{completedTask.jobInfo.total}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-primary font-medium whitespace-pre-line">
            {isExpanded ? completedTask.jobInfo.jobDescription : completedTask.jobInfo.jobDescription?.length > 100 ? `${completedTask.jobInfo.jobDescription.substring(0, 150)}...` : completedTask.jobInfo.jobDescription}
          </p>
          {completedTask.jobInfo.jobDescription?.length > 150 && (
            <button onClick={toggleExpand} className="flex items-center text-gray-500 mt-2">
              {isExpanded ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>


        {Array.isArray(completedTask.taskImage) && completedTask.taskImage.length > 0 && <div className="my-8  relative  w-24 h-24 flex items-center justify-center ">
          {completedTask.taskImage?.map((picture, index) =>
            <Image onClick={() => openImageViewer(index)} key={picture} src={picture} alt="job image" fill className="w-20 h-20 text-gray-400" />
          )}

          {isViewerOpen && (
            <ImageViewer
              src={completedTask.taskImage}
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

        {completedTask.assignedDTO.fullName && (
          <div className="w-full flex flex-col items-end justify-start pt-4 mt-4">
            <div className="text-sm text-primary font-bold  mb-2 sm:mb-0">Assigned to</div>
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={completedTask.assignedDTO.profileImage || "/placeholder.svg"}
                  alt={completedTask.assignedDTO.fullName || ""}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="">
                <div className="font-medium text-sm">{completedTask.assignedDTO.fullName}</div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-1">({4.5.toFixed(1)})</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(4.5) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between p-4 md:p-6 mt-2">
        <div className="flex gap-2">
          <button type="button" onClick={() => setShowReviewModal(true)} className="text-white rounded-[50px] px-4 py-2 text-sm bg-primary" >
            Post a review
          </button>
        </div>
      </div>

    </div>
  )
}

export default CompletedTaskDetails
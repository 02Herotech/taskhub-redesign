"use client"
import { useGetTaskByIdQuery } from '@/services/tasks'
import Loading from '@/shared/loading'
import { formatDateFromArray } from '@/utils'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer';
import { FiCalendar, FiChevronDown, FiChevronUp, FiDollarSign, FiMapPin } from 'react-icons/fi'
import Offers from '@/components/dashboard/components/offers'

const OffersDetails = ({ params }: { params: { id: string } }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const { data: offer, isLoading, error } = useGetTaskByIdQuery(Number(params.id))

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

  if (!offer || error) {
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
  const isAssigned = offer?.taskInfo?.taskStatus === "ASSIGNED";
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-[60vh] justify-between ">
      <div className="">
        <div className="mb-4 flex items-center justify-between">
          <p className="bg-[#DCFAFF] text-[#36DDFB] border border-[#36DDFB] px-4 py-1 rounded-full text-sm lowercase">
            offer
          </p>

        </div>
        <h1 className='text-2xl text-[#716F78] font-semibold my-2'>Task Description</h1>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-3xl font-bold capitalize">{offer.taskInfo.taskBriefDescription}</h2>
        </div>

        <div className="mb-4">
          <p className="text-primary font-medium whitespace-pre-line">
            {isExpanded ? offer.taskInfo.taskDescription : offer.taskInfo.taskDescription?.length > 100 ? `${offer.taskInfo.taskDescription.substring(0, 150)}...` : offer.taskInfo.taskDescription}
          </p>
          {offer.taskInfo.taskDescription?.length > 150 && (
            <button onClick={toggleExpand} className="flex items-center text-gray-500 mt-2">
              {isExpanded ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>

        <div className="bg-white rounded-[16px] border mb-4  shadow-[0px_-460px_250px_0px_#00000000]">
          <div className="flex items-center justify-between">
            <div className="p-4">
              <h4 className=" text-gray-500 font-semibold mb-1 max-[320px]:text-xs text-base">Budget Details</h4>
              <p className="text-indigo-800 font-manrope font-bold text-base sm:text-2xl">
                {`AUD $${offer.taskInfo.customerBudget}`}
              </p>
            </div>

            {/* Vertical Divider */}
            <div className="h-16 w-px bg-gray-200 mx-2"></div>

            <div className="flex items-center space-x-4 p-4">
              <button
                disabled
                // onClick={() => setShowEditModal(true)}
                className="bg-primary/50  max-[320px]:text-xs text-base text-white px-4 py-2  sm:px-12 sm:py-6 rounded-full  font-bold"
              >
                Edit service details
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FiMapPin className="w-4 h-4" />
            <span>{`${offer.taskInfo.state || ""} ${offer.taskInfo.suburb || ""} ${offer.taskInfo.postCode || ""}`}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiCalendar className="w-4 h-4" />
            <span>{formatDateFromArray(offer.taskInfo.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiDollarSign className="w-4 h-4" />
            <span>{offer.taskInfo.customerBudget}</span>
          </div>
        </div>


        {Array.isArray(offer.taskInfo.displayPictures) && offer.taskInfo.displayPictures.length > 0 && <div className="my-8  relative  w-24 h-24 flex items-center justify-center ">
          {offer.taskInfo.displayPictures?.map((picture, index) =>
            <Image onClick={() => openImageViewer(index)} key={picture} src={picture} alt="job image" fill className="w-20 h-20 text-gray-400" />
          )}

          {isViewerOpen && (
            <ImageViewer
              src={offer.taskInfo.displayPictures}
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

        <Offers id={params.id} isAssigned={isAssigned} />
      </div>
    </div>
  )
}

export default OffersDetails
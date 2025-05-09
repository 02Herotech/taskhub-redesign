"use client"
import MoreButtonDropdown from '@/components/dashboard/customer/taskmodule/components/dropdown'
import { useGetBookingDetailsQuery } from '@/services/bookings'
import { task } from '@/services/tasks'
import Loading from '@/shared/loading'
import { formatDateFromArray } from '@/utils'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { BiCalendar, BiChevronDown, BiChevronUp, BiMapPin } from 'react-icons/bi'
import { CiCalendar, CiLocationOn } from 'react-icons/ci'
import { FaRegShareFromSquare } from 'react-icons/fa6'
import { PiCurrencyDollarSimple } from 'react-icons/pi'
import ImageViewer from 'react-simple-image-viewer';
import StartTaskModal from './StartTask'


const AssignedTaskDetails = ({ params }: { params: { id: string } }) => {
  const { data: bookingDetails, isLoading } = useGetBookingDetailsQuery({ booking_id: params.id })

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [startTaskPopup, setStartTaskPopup] = useState(false);



  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
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



  const shouldTruncate = bookingDetails.bookingDescription.length > 150
  const displayDescription =
    !isDescriptionExpanded && shouldTruncate ? `${bookingDetails.bookingDescription.substring(0, 150)}...` : bookingDetails.bookingDescription

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Posted by badge */}
      <div className="flex items-center justify-between  mb-4">
        <p className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
          {bookingDetails.bookingStage}
        </p>
        {/* <MoreButtonDropdown dropdownItems={dropdownItems} /> */}
      </div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-manrope font-bold text-gray-900 mb-2">{bookingDetails.bookingTitle}</h2>

      <div className="flex justify-between items-start mb-6">
        {/* Task details */}
        <div className="flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center">
            <CiLocationOn className="w-4 h-4 mr-1" />
            <span className="text-sm">{`${bookingDetails?.userAddress?.state || ""} ${bookingDetails?.userAddress?.suburb || ""} ${bookingDetails?.userAddress?.postCode || ""}`}</span>
          </div>
          <div className="flex items-center">
            <CiCalendar className="w-4 h-4 mr-1" />
            <span>{formatDateFromArray(bookingDetails?.bookedAt)}</span>
          </div>
          <div className="flex items-center">
            <PiCurrencyDollarSimple className="w-4 h-4 mr-1" />
            <span className="text-sm text-primary font-bold">{`${bookingDetails.price}`}</span>
          </div>
        </div>
      </div>

      {/* Task Description */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-gray-600 text-base md:text-2xl my-2">Service Description</h3>
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <FaRegShareFromSquare className='w-4 h-4' />
          </button>
        </div>

        <p className="text-primary tracking-[0%] font-medium whitespace-pre-line">{displayDescription}</p>

        {shouldTruncate && (
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center mt-1"
          >
            {isDescriptionExpanded ? (
              <>
                <BiChevronUp size={20} />
              </>
            ) : (
              <>
                <BiChevronDown size={20} />
              </>
            )}
          </button>
        )}
      </div>

      {/*image */}
      {bookingDetails?.task?.displayPictures?.length > 0 &&
        <div className="my-8  relative   flex items-center  gap-2 ">
          {Array.isArray(bookingDetails?.task?.displayPictures) && bookingDetails?.task?.displayPictures?.map((picture, index) =>
            <div className='w-24 h-24 relative'>
              <Image onClick={() => openImageViewer(index)} key={picture} src={picture} alt="job image" fill className="w-10 h-10 object-cover text-gray-400" />
            </div>
          )}

          {isViewerOpen && (
            <ImageViewer
              src={bookingDetails?.task?.displayPictures}
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
        </div>
      }


      {
        bookingDetails.bookingStage === 'PAID' &&
        <div className=" flex flex-col min-[400px]:flex-row items-center justify-center min-[400px]:justify-between mt-8">
          <div className=" flex flex-col min-[400px]:flex-row  gap-3">
            <button onClick={() => setStartTaskPopup(true)} className="bg-primary text-white px-8 font-semibold py-2 rounded-[50px] whitespace-nowrap">Start Task</button>
          </div>
        </div>
      }

      <StartTaskModal startTaskPopup={startTaskPopup} setStartTaskPopup={setStartTaskPopup} />
    </div>
  )
}

export default AssignedTaskDetails
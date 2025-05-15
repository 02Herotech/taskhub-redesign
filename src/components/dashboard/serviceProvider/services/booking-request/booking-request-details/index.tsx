"use client"
import { booking, useGetServiceProviderBookingRequestDetailsQuery } from '@/services/bookings'
import Loading from '@/shared/loading'
import { formatDateFromArray } from '@/utils'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { BiChevronDown, BiChevronUp, BiXCircle } from 'react-icons/bi'
import { CiCalendar, CiLocationOn } from 'react-icons/ci'

import { PiCurrencyDollarSimple } from 'react-icons/pi'
import Requests from './booking-request-chat'

const BookingRequestDetails = ({ params }: { params: { id: string } }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false)

  const { data: bookingRequest, isLoading, error } = useGetServiceProviderBookingRequestDetailsQuery({ bookingId: params.id })

  console.log(bookingRequest, "data")

  // const openImageViewer = useCallback((index: number) => {
  //   setCurrentImage(index);
  //   setIsViewerOpen(true);
  // }, []);

  // const closeImageViewer = () => {
  //   setCurrentImage(0);
  //   setIsViewerOpen(false);
  // };


  if (isLoading) {
    return (
      <div className="flex h-[full] w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!bookingRequest || error) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center">
        <h2 className="font-satoshiBold text-xl font-bold text-primary lg:text-3xl">
          You have no booking requests
        </h2>
        <p className="font-satoshiMedium text-lg text-[#646466] lg:text-xl">
          Something went wrong, please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="">

      {/* <div className='bg-[#E5E0F8]  flex items-start gap-2 p-2 rounded-md mb-4'>
        <MdWarning />
        <p className=' text-primary flex-1 max-w-[900px]'>This convo’s public, so keep it clean—no sensitive stuff! Lock in the deal, send a custom quote, and once it’s accepted, slide into a private chat.
        </p>
      </div> */}
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F7D5C5] border border-[#974722]  text-[#974722]`}>Booking Request</p>
        </div>

        <div className='flex items-center gap-4 mb-5'>
          {bookingRequest?.customer?.user?.profileImage &&
            <div className="flex relative items-center justify-center w-10 h-10 text-primary text-xs mr-2">
              <Image src={bookingRequest?.customer?.user.profileImage} alt={bookingRequest?.customer?.user.fullName} fill className="w-10 h-10 text-gray-400" />
            </div>
          }

          <div>
            <h1 className="text-3xl font-bold text-primary">{bookingRequest?.customer?.user.fullName}</h1>
            <p className="text-gray-600">{formatDateFromArray(bookingRequest.bookedAt)}</p>
          </div>
        </div>


        {/* Task title */}
        <h1 className="text-2xl  md:text-4xl font-bold mb-4 capitalize ">{bookingRequest.bookingTitle}</h1>

        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center">
              <CiLocationOn className="w-4 h-4 mr-1" />
              <span className="text-sm">{`${bookingRequest?.userAddress?.state} ${bookingRequest?.userAddress?.suburb} ${bookingRequest?.userAddress?.postCode}`}</span>
            </div>
            <div className="flex items-center">
              <CiCalendar className="w-4 h-4 mr-1" />
              <span className="text-sm">{formatDateFromArray(bookingRequest.updatedAt)}</span>
            </div>
            <div className="flex items-center">
              <PiCurrencyDollarSimple className="w-4 h-4 mr-1" />
              <span className="text-2xl text-primary font-bold">{bookingRequest.price}</span>
            </div>
          </div>
        </div>

        {/* Task description */}
        <div className="mb-6 flex flex-col  items-start justify-between gap-2">
          <p className="text-primary font-medium text-lg  flex-1 whitespace-pre-line">
            {isExpanded ? bookingRequest.bookingDescription : `${bookingRequest.bookingDescription.substring(0, 200)}...`}
          </p>
          <span className="text-gray-500 mt-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <BiChevronUp className="w-8 h-8" /> : <BiChevronDown className="w-8 h-8" />}
          </span>
        </div>
        <Requests listingId={bookingRequest.listing.id} customerId={bookingRequest.customer.id} />
      </div>
    </div>
  )
}

export default BookingRequestDetails
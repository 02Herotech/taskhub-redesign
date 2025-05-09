"use client"
import { useGetServiceProviderBookingRequestQuery } from '@/services/bookings';
import { RootState } from '@/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import BookingRequestCard from './booking-request-card';
import Pagination from '@/components/pagination';
import Loading from '@/shared/loading';
const BookingRequests = () => {

  const [page, setPage] = useState(0)
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data: bookingRequest, isLoading } = useGetServiceProviderBookingRequestQuery({ providerId: user?.serviceProviderId, page }, {
    skip: !user?.serviceProviderId
  })


  if (isLoading) {
    return (
      <Loading />
    );
  }


  return (
    <>
      {bookingRequest?.content?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
          <h2 className="text-2xl font-bold text-primary text-center">
            No tasks available, please click the button below to post a new task.
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {bookingRequest?.content?.map((bookingRequest, index) => (
            <BookingRequestCard key={index} bookingRequest={bookingRequest} />
          ))}
        </div>
      )}
      <Pagination pageNumber={bookingRequest?.pageNumber} setPage={setPage} totalPages={bookingRequest?.totalPages} />
    </>
  )
}

export default BookingRequests
"use client"
import { RootState } from '@/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Loading from "@/shared/loading";
import { useGetBookingRequestQuery } from '@/services/bookings';
import Pagination from '@/components/pagination';
import BookingRequestCard from './bookingRequestCard';

const BookingRequestPage = () => {
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const userId = userProfile.profile?.customerId
  const [page, setPage] = useState(0)
  const { data: bookingRequests, isLoading } = useGetBookingRequestQuery({ customerId: userId!, page }, {
    skip: !userId,
  });

  if (!userId || isLoading) {
    return <Loading />;
  }

  console.log(bookingRequests, "bookingsent")

  return (
    <>
      {bookingRequests?.content?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
          <h2 className="text-2xl font-bold text-primary text-center">
            No Booking request  available.
          </h2>

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {bookingRequests.content?.map((request, index) => (
            <BookingRequestCard key={index} request={request} />
          ))}
        </div>
      )}
      <Pagination pageNumber={bookingRequests?.pageNumber} setPage={setPage} totalPages={bookingRequests?.totalPages} />
    </>
  )
}

export default BookingRequestPage
import BookingRequestDetails from '@/components/dashboard/serviceProvider/services/booking-request/booking-request-details'
import React from 'react'

const BookingRequestDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <BookingRequestDetails params={params} />
  )
}

export default BookingRequestDetailsPage
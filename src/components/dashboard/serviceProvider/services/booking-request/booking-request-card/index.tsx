import { dayOfWeekNames, monthNames, suffixes } from '@/lib/utils';
import { getBorderColor, getStatusColor } from '@/shared/statusbadge';
import { Booking } from '@/types/services/tasks';
import { formatDateFromNumberArray } from '@/utils';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { FaAddressBook } from 'react-icons/fa';

const BookingRequestCard = ({ bookingRequest }: { bookingRequest: Booking }) => {
  const session = useSession();
  const router = useRouter()
  const profileImage = session?.data?.user.user.profileImage;
  const firstName = session?.data?.user.user.firstName;
  const lastName = session?.data?.user.user.lastName;
  const fullName = `${firstName} ${lastName}`;

  return (

    <div onClick={() => router.push(`/service-provider/services/booking-requests/${bookingRequest.id}`)} className={`relative flex flex-col hover:bg-[#F7D5C5] border-l-[12px] cursor-pointer  shadow-[0px_-4px_132px_0px_#00000017] border-[#974722] rounded-2xl  bg-white overflow-hidden`}>
      <div className="p-4 pl-5 flex-1">
        <div className="mb-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F7D5C5] border border-[#974722]  text-[#974722]`}
          >
            Booking Request
          </span>
        </div>
        <h3 className="text-xs font-semibold text-[#0F052E]">{bookingRequest.bookingTitle}</h3>
        {/* <p className="mt-1 text-sm text-[#110049] line-clamp-3">{bookingRequest.bookingRequestInfo.bookingRequestInfo.bookingRequestDescription}...</p> */}

        <div className="mt-4 flex justify-between items-end">
          <div className="flex flex-col space-y-1 text-xs text-gray-500">
            <div className="flex items-center">
              <CiCalendar />
              <span>{formatDateFromNumberArray(bookingRequest.bookedAt)}</span>
            </div>

            {bookingRequest.userAddress &&
              <div className="flex items-center">
                <CiLocationOn />
                <span>{`${bookingRequest.userAddress.state || ""} ${bookingRequest.userAddress.suburb || ""} ${bookingRequest.userAddress.postCode || ""}`}</span>
              </div>
            }
            <div>
              {/* <span>{bookingRequest.bookingRequestInfo.bookingRequestInfo.taskType}</span> */}
            </div>

          </div>

          <div className="text-right">
            <span className="text-3xl font-manrope font-bold text-[#381F8C]">${bookingRequest.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingRequestCard
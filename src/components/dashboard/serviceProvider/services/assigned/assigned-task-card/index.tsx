import { dayOfWeekNames, monthNames } from '@/lib/utils';
import { getBorderColor, getStatusColor } from '@/shared/statusbadge';
import { Booking, JobItem } from '@/types/services/jobs';
import { useRouter } from 'next/navigation';
import React from 'react'
import { PiAddressBook } from 'react-icons/pi';

const AssignedTaskCard = ({ booking }: { booking: JobItem }) => {
  const router = useRouter()
  const dateArray = booking.jobInfo.createdAt;
  const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
  const day = date.getDate();
  function getOrdinalSuffix(day: any) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const daySuffix = getOrdinalSuffix(day);
  const formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;
  return (
    <>
      <div onClick={() => router.push(`/service-provider/services/assigned-task/${booking.jobInfo.id}`)} className={`relative flex flex-col hover:bg-[#FBF1E2] border-l-[12px] cursor-pointer  border-[#F59315] rounded-2xl shadow-sm bg-white overflow-hidden`}>
        <div className="p-4 pl-5 flex-1">
          <div className="mb-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-[#E68A13] bg-[#FBF1E2] border border-[##FBF1E2]`}
            >
              {booking.jobInfo.jobStatus}
            </span>
          </div>
          <h3 className="text-xs font-semibold cursor-pointer text-[#0F052E] capitalize">{booking.jobInfo.jobTitle}</h3>

          <div className="mt-4 flex justify-between items-end">
            <div className="flex flex-col space-y-2 text-xs text-gray-500">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{formattedDate}</span>
              </div>

              {booking.jobInfo.jobAddress && (
                <div className="flex items-center">
                  <PiAddressBook />
                  <span>
                    {booking.jobInfo.jobAddress}
                  </span>
                </div>
              )}
            </div>

            <div className="text-right">
              <span className="text-3xl font-manrope font-bold text-[#381F8C]">${booking.jobInfo.total}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AssignedTaskCard
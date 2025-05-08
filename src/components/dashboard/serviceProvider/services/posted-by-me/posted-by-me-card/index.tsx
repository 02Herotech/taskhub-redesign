import { dayOfWeekNames, monthNames, suffixes } from '@/lib/utils';
import { getBorderColor, getStatusColor } from '@/shared/statusbadge'
import { Listing } from '@/types/services/serviceprovider'
import { formatDateFromArray } from '@/utils';
import { useRouter } from 'next/navigation';
import React from 'react'
import { CiCalendar, CiLocationOn } from 'react-icons/ci';

const PostedByMeCard = ({ listing }: { listing: Listing }) => {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/service-provider/services/posted-by-me/${listing.id}`)} className={`relative flex flex-col border-l-[12px] hover:bg-[#E6F3FF] cursor-pointer  shadow-[0px_-4px_132px_0px_#00000017] border-[#0887FF] rounded-2xl  bg-white overflow-hidden`}>
      <div className="p-4 pl-5 flex-1">
        <div className="mb-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-[#0887FF] border-[#0887FF] bg-[#BEDFFE]`}
          >
            Posted by me
          </span>
        </div>
        <h3 className="text-xs font-semibold text-[#0F052E]">{listing.listingTitle}</h3>

        <div className="mt-4 flex justify-between items-end">
          <div className="flex flex-col space-y-2 text-xs text-gray-500">
            <div className="flex items-center">
              <CiCalendar />
              <span>{formatDateFromArray(listing.createdAt)}</span>
            </div>

            {listing.state &&
              <div className="flex items-center">
                <CiLocationOn />
                <span>{listing.state}</span>
              </div>
            }
          </div>

          <div className="text-right">
            <span className="text-3xl font-manrope font-bold text-[#381F8C]">${listing.planOnePrice}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostedByMeCard;


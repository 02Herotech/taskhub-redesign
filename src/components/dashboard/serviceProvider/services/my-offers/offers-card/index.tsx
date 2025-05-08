"use client"
import { Task } from '@/types/chat'
import { formatDateFromArray } from '@/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'

const OfferCard = ({ offer }: { offer: Task }) => {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/service-provider/services/my-offers/${offer.id}`)} className={`relative flex flex-col hover:bg-[#DCFAFF] border-l-[12px] cursor-pointer  shadow-[0px_-4px_132px_0px_#00000017] border-[#36DDFB] rounded-2xl  bg-white overflow-hidden`}>
      <div className="p-4 pl-5 flex-1">
        <div className="mb-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-[#36DDFB] border-[#36DDFB] bg-[#DCFAFF]`}
          >
            My offer
          </span>
        </div>
        <h3 className="text-xs font-semibold text-[#0F052E]">{offer.taskBriefDescription}</h3>

        <div className="mt-4 flex justify-between items-end">
          <div className="flex flex-col space-y-1 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FaCalendarAlt />
              <span>{formatDateFromArray(offer.createdAt)}</span>
            </div>

            {offer.state || offer.suburb || offer.postCode &&
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt />
                <span>{`${offer.state || ""}, ${offer.suburb || ""}, ${offer.postCode || ""}`}</span>
              </div>
            }
            <div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-manrope font-bold text-[#381F8C]">${offer.customerBudget}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferCard
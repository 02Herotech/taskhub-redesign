"use client"
import { useGetServiceProviderBookingsChatsQuery } from '@/services/chat'
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import Request from './request'

const Requests = ({ listingId, customerId }: { listingId: string, customerId: number }) => {
  const [viewAll, setViewAll] = useState(false);
  const { data: requests, isLoading, refetch, } = useGetServiceProviderBookingsChatsQuery({ listingId, customerId })


  if (isLoading) {
    return (
      <div>Loading chats ...</div>
    )
  }

  console.log(requests, "requests")

  return (
    <div className="mb-4">
      <div className="mt-14 min-h-96">


        <ul className="space-y-3">
          {requests?.map((request) => (
            <Request
              key={request.id}
              request={request}
              listingId={Number(listingId)}
              refetch={refetch}
            // isAssigned={isAssigned}
            />
          ))}
        </ul>
      </div>

    </div>
  )
}

export default Requests
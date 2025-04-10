"use client"
import React, { useState } from 'react'
import { useGetJobByIdQuery } from '@/services/bookings'
import Loading from '@/shared/loading'
import {
  FiCalendar as Calendar,
  FiChevronDown as ChevronDown,
  FiChevronUp as ChevronUp,
  FiMapPin as MapPin,
  FiShare2 as Share2,
  FiTrash2 as Trash2,
} from "react-icons/fi"
import { useGetTaskByIdQuery } from '@/services/tasks'


type PostedByMeProps = {
  postedBy: string
  title: string
  description: string
  budget: {
    currency: string
    amount: number
  }
  location: string
  date: string
  offers?: {
    text: string
    checked: boolean
  }[]
  onEdit?: () => void
  onDelete?: () => void
}
const PostedByMe = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const {
    data: task,
    isLoading,
    error,
  } = useGetTaskByIdQuery(id as unknown as number);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [showOffers, setShowOffers] = useState(true)

  if (isLoading) {
    return (
      <div className="flex h-[full] w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!task || error) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center">
        <h2 className="font-satoshiBold text-xl font-bold text-primary lg:text-3xl">
          Task not found!
        </h2>
        <p className="font-satoshiMedium text-lg text-[#140B31] lg:text-xl">
          Something went wrong, please try again later.
        </p>
      </div>
    );
  }


  // Truncate description if it's too long and not expanded
  const shouldTruncate = task.jobDescription.length > 100
  const displayDescription =
    !isDescriptionExpanded && shouldTruncate ? `${task.jobDescription.substring(0, 100)}...` : task.jobDescription

  return (
    <div className="w-full">
      {/* Posted by badge */}
      <div className="flex justify-between items-start mb-4">
        <span className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
          Posted by me
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{task.jobTitle}</h2>

      {/* Task Description */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-gray-600 text-sm md:text-base">Task Description</h3>
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        <p className="text-gray-800">{displayDescription}</p>

        {shouldTruncate && (
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center mt-1"
          >
            {isDescriptionExpanded ? (
              <>
                Show less <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Budget, Delete and Edit Button Row */}
      <div className="bg-white rounded-md border mb-4">
        <div className="flex items-center justify-between">
          <div className="p-4">
            <h4 className="text-sm text-gray-500 mb-1">Budget Details</h4>
            <p className="text-indigo-800 font-bold text-lg">
              {"200"}
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="h-16 w-px bg-gray-200 mx-2"></div>

          <div className="flex items-center space-x-4 p-4">

            <button
              className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full"
              aria-label="Delete task"
            >
              <Trash2 className="h-5 w-5" />
            </button>

            <button
              className="bg-indigo-800 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Edit task details
            </button>
          </div>
        </div>
      </div>

      {/* Location and Date */}
      <div className="flex flex-wrap gap-6 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{task.jobAddress}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{task.taskDate}</span>
        </div>
      </div>

      {/* Offers */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-orange-500">Offers</h3>
          <button
            onClick={() => setShowOffers(!showOffers)}
            className="text-orange-500 hover:text-orange-700 text-sm flex items-center"
          >
            View {showOffers ? "less" : "more"}{" "}
            <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showOffers ? "rotate-180" : ""}`} />
          </button>
        </div>


      </div>
    </div>
  )
}

export default PostedByMe
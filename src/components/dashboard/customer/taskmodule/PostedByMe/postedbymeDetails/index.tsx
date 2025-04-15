"use client"
import React, { useEffect, useState } from 'react'
import Loading from '@/shared/loading'
import {
  FiCalendar as Calendar,
  FiChevronDown as ChevronDown,
  FiChevronUp as ChevronUp,
  FiMapPin as MapPin,
  FiTrash2 as Trash2,
} from "react-icons/fi"
import { useGetTaskByIdQuery, useGetTasksOffersQuery } from '@/services/tasks'
import Image from 'next/image'
import { FaRegShareFromSquare } from 'react-icons/fa6'
import Offers from './Offers'
import EditTaskForm from '../../EditTaskForm'
import { truncateSync } from 'node:fs'
import Popup from '@/components/global/Popup'
import DeleteTask from '../../DeleteTask'
import { useRouter } from 'next/navigation'
import ImageViewer from '@/components/imageviewer'
import { formatDateFromArray } from '@/utils'


const PostedByMe = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter()
  const {
    data: task,
    isLoading,
    error,
  } = useGetTaskByIdQuery(id as unknown as number);
  const [viewAll, setViewAll] = useState(false);
  const [editModalOpen, setIsEditModalOpen] = useState(false)
  const [deleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { data: offers, refetch } = useGetTasksOffersQuery(
    id as unknown as number,
  );

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  useEffect(() => {
    if (task) {
      router.push(`/customer/tasks/posted-by-me/${task.taskInfo.id}?title=${task.taskInfo.taskBriefDescription}`);
    }
  }, [task])

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

  const isAssigned = task?.taskInfo?.taskStatus === "ASSIGNED";

  // Truncate description if it's too long and not expanded
  const shouldTruncate = task.taskInfo.taskDescription.length > 150
  const displayDescription =
    !isDescriptionExpanded && shouldTruncate ? `${task.taskInfo.taskDescription.substring(0, 150)}...` : task.taskInfo.taskDescription

  return (
    <div className="w-full">
      {/* Posted by badge */}
      <div className="flex justify-between items-start mb-4">
        <span className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
          Posted by me
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-manrope font-bold text-gray-900 mb-2">{task.taskInfo.taskBriefDescription}</h2>

      {/* Task Description */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-gray-600 text-base md:text-2xl my-2">Task Description</h3>
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <FaRegShareFromSquare className='w-4 h-4' />
          </button>
        </div>

        <p className="text-primary tracking-[0%] font-medium">{displayDescription}</p>

        {shouldTruncate && (
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center mt-1"
          >
            {isDescriptionExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 ml-1" />
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
      <div className="bg-white rounded-[16px] border mb-4  shadow-[0px_-460px_250px_0px_#00000000]">
        <div className="flex items-center justify-between">
          <div className="p-4">
            <h4 className=" text-gray-500 font-semibold mb-1 max-[320px]:text-xs text-base">Budget Details</h4>
            <p className="text-indigo-800 font-manrope font-bold text-base sm:text-2xl">
              {`AUD $${task.taskInfo.customerBudget}`}
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="h-16 w-px bg-gray-200 mx-2"></div>

          <div className="flex items-center space-x-4 p-4">

            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full"
              aria-label="Delete task"
            >
              <Trash2 className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-primary   max-[320px]:text-xs text-base text-white px-4 py-2  sm:px-12 sm:py-6 rounded-full  font-bold"
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
          <span>{task.taskInfo.state}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formatDateFromArray(task.taskInfo.createdAt)}</span>
        </div>
      </div>

      {/*image */}
      {task.taskInfo.taskImage && <div className="my-8  relative  w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center ">
        {/* <Image src={task.taskInfo.taskImage} alt="job image" fill className="w-20 h-20 text-gray-400" /> */}
        <ImageViewer
          src={task.taskInfo.taskImage}
          alt={task.taskInfo.taskBriefDescription}
        />
      </div>}

      <Offers id={id} isAssigned={isAssigned} />

      <Popup isOpen={editModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditTaskForm setShowEditModal={setIsEditModalOpen} taskDetails={task} />
      </Popup>

      <Popup isOpen={deleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <DeleteTask setIsDeleteModalOpen={setIsDeleteModalOpen} taskDetails={task} />
      </Popup>
    </div>
  )
}

export default PostedByMe
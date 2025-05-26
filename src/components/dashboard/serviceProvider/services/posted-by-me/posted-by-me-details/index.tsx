"use client"
import MoreButtonDropdown from '@/components/dashboard/customer/taskmodule/components/dropdown';
import { useGetServiceByIdQuery } from '@/services/listings';
import Loading from '@/shared/loading';
import { formatDateFromArray } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { BiCalendar, BiChevronDown, BiChevronUp, BiMapPin } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { FaRegShareFromSquare } from 'react-icons/fa6';
import ImageViewer from 'react-simple-image-viewer';
import EditListing from '../edit-listing';

const reviews = [
  {
    id: 1,
    name: "Jane Sawyer",
    date: "May 5th, 2024",
    rating: 5,
    text: "Recently worked with Stacey on a project, and I was blown away by their skills. They were professional, attentive and went above and beyond. Such a charming final product. They were...",
    note: "I need a babysitter for Tuesday",
    avatar: "/avatars/jane.png",
  },
  {
    id: 2,
    name: "Fay Dorren",
    date: "Feb 15th, 2024",
    rating: 5,
    text: "Recently worked with Stacey on a project, and I was blown away by their skills. They were professional, attentive and went above and beyond. Such a charming final product. They were...",
    note: "I need a babysitter for Thursday",
    avatar: "/avatars/fay.png",
  },
]

const PostedByMeDetails = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter()
  const {
    data: service,
    isLoading,
    error,
  } = useGetServiceByIdQuery(id as unknown as number);
  const [viewAll, setViewAll] = useState(false);
  const [deleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)


  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  // useEffect(() => {
  //   if (service) {
  //     router.push(`/service-provider/services/posted-by-me/${service.taskInfo.id}?title=${service.taskInfo.taskBriefDescription}`);
  //   }
  // }, [service])

  if (isLoading) {
    return (
      <div className="flex h-[full] w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!service || error) {
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


  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const dropdownItems = [
    {
      id: 2,
      icon: BsTrash2,
      label: "Delete Task",
      onClick: () => setIsDeleteModalOpen(true),
    },

  ]
  // const isAssigned = service?.taskInfo?.taskStatus === "ASSIGNED";

  // Truncate description if it's too long and not expanded
  const shouldTruncate = service.listingDescription.length > 150
  const displayDescription =
    !isDescriptionExpanded && shouldTruncate ? `${service.listingDescription.substring(0, 150)}...` : service.listingDescription

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Posted by badge */}
      <div className="flex items-center justify-between  mb-4">
        <p className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
          Posted by me
        </p>
        <MoreButtonDropdown dropdownItems={dropdownItems} />
      </div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-manrope font-bold text-gray-900 mb-2">{service.listingTitle}</h2>

      {/* Task Description */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-gray-600 text-base md:text-2xl my-2">Service Description</h3>
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <FaRegShareFromSquare className='w-4 h-4' />
          </button>
        </div>

        <p className="text-primary tracking-[0%] font-medium whitespace-pre-line">{displayDescription}</p>

        {shouldTruncate && (
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center mt-1"
          >
            {isDescriptionExpanded ? (
              <>
                <BiChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                <BiChevronDown className="h-4 w-4 ml-1" />
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
              {`AUD $${service.planOnePrice}`}
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="h-16 w-px bg-gray-200 mx-2"></div>

          <div className="flex items-center space-x-4 p-4">
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-primary   max-[320px]:text-xs text-base text-white px-4 py-2  sm:px-12 sm:py-6 rounded-full  font-bold"
            >
              Edit service details
            </button>
          </div>
        </div>
      </div>

      {/* Location and Date */}
      <div className="flex flex-wrap gap-6 mb-4">
        <div className="flex items-center text-gray-600">
          <BiMapPin className="h-4 w-4 mr-2" />
          <span>{service.state}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <BiCalendar className="h-4 w-4 mr-2" />
          <span>{formatDateFromArray(service.createdAt as [number, number, number])}</span>
        </div>
      </div>

      {/*image */}
      {service.businessPictures.length > 0 &&
        <div className="my-8  relative   flex items-center  gap-2 ">
          {service.businessPictures.map((picture, index) =>
            <div className='w-24 h-24 relative'>
              <Image onClick={() => openImageViewer(index)} key={picture} src={picture} alt="job image" fill className="w-10 h-10 text-gray-400" />
            </div>
          )}

          {isViewerOpen && (
            <ImageViewer
              src={service.businessPictures}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
              backgroundStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                zIndex: 1000
              }}
            />
          )}
        </div>
        }


      {/* <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Ratings and reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div> */}

      <EditListing showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
    </div>
  )
}

export default PostedByMeDetails




function ReviewCard({ review }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-center mb-2">
        <div className="relative w-10 h-10 mr-3">
          <Image
            src={review.avatar || "/placeholder.svg"}
            alt={review.name}
            className="rounded-full object-cover"
            fill
            sizes="40px"
          />
        </div>
        <div>
          <h3 className="font-semibold text-sm">{review.name}</h3>
          <p className="text-xs text-gray-500">{review.date}</p>
        </div>
      </div>

      <div className="flex mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>

      <p className="text-sm text-[#1C046C] mb-3">{review.text}</p>

      <div className="text-sm text-gray-500 italic">{review.note}</div>
    </div>
  )
}
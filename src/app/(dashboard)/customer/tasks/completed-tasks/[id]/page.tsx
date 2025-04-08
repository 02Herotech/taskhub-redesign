"use client"

import { useState } from "react"
import Image from "next/image"
import { FiMapPin, FiCalendar, FiDollarSign, FiChevronDown, FiChevronUp } from "react-icons/fi"

interface JobPostingCardProps {
  status: "completed" | "active" | "pending"
  title: string
  location: string
  date: string
  budget: string
  description: string
  thumbnailSrc?: string
  assignedTo?: {
    name: string
    avatarSrc: string
    rating: number
  }
  primaryButtonColor?: string
}

export default function CompletedTaskDetailsPage({
  status = "completed",
  title = "Graphic Designer Needed.",
  location = "Brisbane QLD",
  date = "Sat June 8th",
  budget = "200",
  description = "Our brand has a clear vision, a set of guiding principles, and a defined aesthetic direction. However, we are looking for a designer who can take these elements and elevate them—bringing their own unique perspective while staying true to the core identity of our business. The final logo must not only be visually striking but also adaptable across various platforms and media, including digital, print, and merchandise.",
  thumbnailSrc,
  assignedTo,
  primaryButtonColor = "#381F8C",
}: JobPostingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="flex flex-col min-h-[60vh] justify-between ">
      <div className="">
        {/* Status badge */}
        <div className="mb-4">
          <span
            className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${status === "completed"
                ? "bg-green-100 text-green-800"
                : status === "active"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }
            `}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        {/* Title and Post as new button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          <button className="text-sm text-primary font-semibold rounded-full px-4 py-1 border border-primary">Post as new</button>
        </div>

        {/* Location, date, budget */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FiMapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiCalendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiDollarSign className="w-4 h-4" />
            <span>{budget}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-700">
            {isExpanded ? description : description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </p>
          {description.length > 100 && (
            <button onClick={toggleExpand} className="flex items-center text-gray-500 mt-2">
              {isExpanded ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Thumbnail */}
        {thumbnailSrc && (
          <div className="mb-4">
            <div className="relative w-24 h-16 rounded-md overflow-hidden">
              <Image src={thumbnailSrc || "/placeholder.svg"} alt="Job thumbnail" fill className="object-cover" />
            </div>
          </div>
        )}

        {/* Assigned to */}
        {assignedTo && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 mt-4">
            <div className="text-sm text-gray-600 mb-2 sm:mb-0">Assigned to</div>
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={assignedTo.avatarSrc || "/placeholder.svg"}
                  alt={assignedTo.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-sm">{assignedTo.name}</div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-1">({assignedTo.rating.toFixed(1)})</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(assignedTo.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex justify-between p-4 md:p-6 mt-2">
        <div className="flex gap-2">
          <button className="text-white rounded-[50px] px-4 py-2 text-sm" style={{ backgroundColor: primaryButtonColor }}>
            Post a review
          </button>
          <button className="rounded-[50px] px-4 py-2 text-sm bg-white font-semibold border border-primary">Rebook</button>
        </div>
        <button className="text-red-500 hover:text-red-700 px-4 py-2 font-semibold text-sm">Delete task</button>
      </div>
    </div>
  )
}

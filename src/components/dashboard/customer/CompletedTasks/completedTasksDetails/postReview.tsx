"use client"
import Popup from '@/components/global/Popup';
import React, { useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa';


type PostRevewProps = {
  showReviewModalPopup: boolean;
  setShowReviewModalPopup: React.Dispatch<React.SetStateAction<boolean>>
}
const PostReview = ({ showReviewModalPopup, setShowReviewModalPopup }: PostRevewProps) => {
  const [rating, setRating] = useState(3)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [commet, setCommet] = useState("")

  const handleStarClick = (index: number) => {
    setRating(index)
  }

  const handleStarHover = (index: number) => {
    setHoveredRating(index)
  }

  const handleStarLeave = () => {
    setHoveredRating(0)
  }
  return (

    <Popup
      isOpen={showReviewModalPopup}
      onClose={() => setShowReviewModalPopup(false)}
    >

      <div className="relative min-h-[200px] p-6  max-h-[90vh] overflow-y-auto rounded-2xl bg-white font-satoshi lg:w-[520px]">
        <div className=" w-full  relative">
          {/* Header */}
          <h2 className="text-[30px] leading-[6%] font-bold text-primary mb-6 font-clashBold">Drop a review</h2>

          {/* Rating */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              Ratings <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2" onMouseLeave={handleStarLeave}>
              {[1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleStarClick(index)}
                  onMouseEnter={() => handleStarHover(index)}
                  className="focus:outline-none"
                >
                  {index <= (hoveredRating || rating) ? (
                    <FaStar className="w-8 h-8 text-orange-400" />
                  ) : (
                    <FaRegStar className="w-8 h-8 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Review text */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Describe your review</label>
            <textarea
              className="w-full h-40 px-4 py-3 bg-gray-100 rounded-lg resize-none focus:outline-none"
              placeholder="Write your review..."
              onChange={(e) => setCommet(e.target.value)}
            ></textarea>
          </div>

          <div className='flex items-center justify-center'>
            {/* Submit button */}
            <button
              type="button"
              className=" w-full sm:w-[60%] mx-auto py-3 px-4 bg-primary text-white font-medium rounded-full hover:bg-[#2d1569] transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default PostReview
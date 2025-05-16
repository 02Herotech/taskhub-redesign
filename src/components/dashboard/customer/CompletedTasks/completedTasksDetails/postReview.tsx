"use client"
import Button from '@/components/global/Button';
import Popup from '@/components/global/Popup';
import SuccessModal from '@/components/global/successmodal';
import { SuccessIcon } from '@/icons/icons';
import { usePostReviewMutation } from '@/services/user';
import { RootState } from '@/store';
import { JobDataDetails } from '@/types/services/tasks';
import React, { useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';


type PostRevewProps = {
  jobDetails: JobDataDetails
  showReviewModalPopup: boolean;
  setShowReviewModalPopup: React.Dispatch<React.SetStateAction<boolean>>
}
const PostReview = ({ showReviewModalPopup, setShowReviewModalPopup, jobDetails: { jobInfo } }: PostRevewProps) => {
  const [rating, setRating] = useState(3)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [reviewsent, setReviewSent] = useState(false)
  const [step, setStep] = useState(1)
  const [postReview, { isLoading, isSuccess, error }] = usePostReviewMutation();
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const handleStarClick = (index: number) => {
    setRating(index)
  }

  const handleStarHover = (index: number) => {
    setHoveredRating(index)
  }

  const handleStarLeave = () => {
    setHoveredRating(0)
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    console.log(rating, comment)
    e.preventDefault();
    try {
      const response = await postReview({
        categoryId: jobInfo.categoryId,
        serviceProviderId: jobInfo.providerId,
        reviewerUserId: user.id,
        customerId: jobInfo.customerId,
        rating,
        comment
      }).unwrap()

      setReviewSent(true);
    } catch (error: any) {
      console.log(error);
      setReviewSent(false);
    }
  }
  return (

    <Popup
      isOpen={showReviewModalPopup}
      onClose={() => setShowReviewModalPopup(false)}
    >

      <div className="relative min-h-[200px] p-6  max-h-[90vh] overflow-y-auto rounded-2xl bg-white font-manrope lg:w-[520px]">
        {!reviewsent &&
          <form onSubmit={handleSubmitReview} className=" w-full  relative">
            <h2 className="text-[30px] leading-[6%] font-bold text-primary mb-6 font-clashBold">Drop a review</h2>

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

            <div className="mb-6">
              <label className="block mb-2 font-medium">Describe your review</label>
              <textarea
                rows={10}
                className="w-full block  h-40 px-4 py-3 bg-gray-100 rounded-lg resize-none focus:outline-none"
                placeholder="Write your review..."
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            <div className='flex items-center justify-center'>
              <Button
                disabled={isLoading}
                type='submit'
                className="w-[151px] rounded-full py-6 max-lg:text-sm"
              >
                Submit
              </Button>
            </div>
          </form>}


        {reviewsent &&
          <SuccessModal
            icon={<SuccessIcon />}
            onDone={() => { setShowReviewModalPopup(false); setReviewSent(false) }}
            title="Review Sent"
            message="Your review has been sent successfully" />
        }
      </div>
    </Popup>
  )
}

export default PostReview
"use client"
import Popup from '@/components/global/Popup';
import React, { useState } from 'react'


type RebookTaskProps = {
  showRebookModalPopup: boolean;
  setShowRebookModalPopup: React.Dispatch<React.SetStateAction<boolean>>
}
const RebookTask = ({ showRebookModalPopup, setShowRebookModalPopup }: RebookTaskProps) => {

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    amount: "",
    details: "",
  })

  const [currentStep, setCurrentStep] = useState(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContinue = () => {
    setCurrentStep(2)
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Here you would typically send the data to an API
  }

  const formatDate = () => {
    if (!formData.date) return ""
    const date = new Date(formData.date)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `Mon, ${monthNames[date.getMonth()]} ${date.getDate()}`
  }

  const formatTime = () => {
    if (!formData.time) return ""
    const [hours, minutes] = formData.time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "pm" : "am"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const formatAmount = () => {
    if (!formData.amount) return ""
    return `$${formData.amount}`
  }
  return (
    <Popup
      isOpen={showRebookModalPopup}
      onClose={() => setShowRebookModalPopup(false)}
    >
      <div className="relative min-h-[200px] p-6  max-h-[90vh] overflow-y-auto rounded-2xl bg-white font-satoshi lg:w-[520px]">
        <h2 className="text-2xl font-bold text-[#3b1c8c] mb-4">Re-book task</h2>

        {currentStep === 1 ? (
          <>
            <p className="text-gray-700 mb-3">
              Please note that when you re-book a task or service, you&apos;ll only be charged once the task is completed.
            </p>

            <section className='flex items-center gap-4'>

              <div className="mb-4 w-full">
                <label className="block mb-2 font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3b1c8c]"
                />
              </div>

              <div className="mb-4 w-full">
                <label className="block mb-2 font-medium">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3b1c8c]"
                />
              </div>
            </section>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Amount</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0000 0000 0000 0000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3b1c8c]"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Details</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Write reasons for re-booking here..."
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#3b1c8c]"
              ></textarea>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="w-full py-3 px-4 bg-[#3b1c8c] text-white font-medium rounded-full hover:bg-[#2d1569] transition-colors"
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-6">
              Please be reminded: there will be a charge for re-booking a task once it&apos;s completed.
            </p>

            <h3 className="font-medium text-right mb-4">Re-booking Details</h3>

            <div className="mb-2 flex">
              <span className="text-amber-500 font-medium w-28">Date:</span>
              <span>{formatDate()}</span>
            </div>

            <div className="mb-2 flex">
              <span className="text-amber-500 font-medium w-28">Time:</span>
              <span>{formatTime()}</span>
            </div>

            <div className="mb-2 flex">
              <span className="text-amber-500 font-medium w-28">Amount:</span>
              <span>{formatAmount()}</span>
            </div>

            <div className="mb-6 flex">
              <span className="text-amber-500 font-medium w-28">Description:</span>
              <span>{formData.details}</span>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 px-4 bg-[#f0edf9] text-[#3b1c8c] font-medium rounded-full hover:bg-[#e6e0f5] transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 py-3 px-4 bg-[#3b1c8c] text-white font-medium rounded-full hover:bg-[#2d1569] transition-colors"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </Popup>
  )
}

export default RebookTask
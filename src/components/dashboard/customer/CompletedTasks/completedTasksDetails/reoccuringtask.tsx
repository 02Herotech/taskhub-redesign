"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import Popup from "@/components/global/Popup"
import { recurringFormSchema, RecurringFormValues } from "../../taskmodule/taskschema"
import { generateTimeOptions } from "@/utils"




type ReoccuringTaskProps = {
  showReoccuringModal: boolean;
  setShowReoccuringModal: React.Dispatch<React.SetStateAction<boolean>>

}
export default function RecurringTaskForm({ setShowReoccuringModal, showReoccuringModal }: ReoccuringTaskProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [formData, setFormData] = useState<RecurringFormValues>({
    frequency: "weekly",
    day: "Monday",
    time: "00:00",
    endType: "never",
    endDate: null,
    amount: "200",
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RecurringFormValues>({
    resolver: zodResolver(recurringFormSchema),
    defaultValues: formData,
    mode: "onBlur",
  })

  const watchEndType = watch("endType")
  const watchFrequency = watch("frequency")

  const handleContinue = (data: RecurringFormValues) => {
    setFormData({ ...formData, ...data })
    setStep(2)
  }

  const handleSubmitForm = (data: RecurringFormValues) => {
    const finalData = { ...formData, ...data }
    console.log("Form submitted:", finalData)
  }

  const handleBack = () => {
    setStep(1)
  }

  const getRecurringText = () => {
    if (watchFrequency === "weekly") {
      return `Every ${formData.day?.toLowerCase()}, weekly`
    } else if (watchFrequency === "daily") {
      return "Every day"
    } else if (watchFrequency === "monthly") {
      return `Every month on day ${formData.day}`
    } else {
      return `Every year`
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "pm" : "am"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  return (
    <Popup
      isOpen={showReoccuringModal}
      onClose={() => { setShowReoccuringModal(false) }}
    >

      <div className="relative min-h-[200px] p-2 sm:p-6  max-h-[90vh] overflow-y-auto rounded-2xl bg-white font-satoshi lg:w-[520px]">
        {step === 1 && (
          <div className="  w-full  relative">
            <h2 className="text-2xl font-bold text-primary font-manrope mb-4">Make reoccurring</h2>

            <p className="text-gray-700 mb-6">
              Please note that when you want to set a task or service to reoccur, you will be charged for it by the end of
              each completed date.
            </p>

            <form onSubmit={handleSubmit(handleContinue)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">How often do you want it to occur?</label>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Duration</label>
                  <div className="relative">
                    <select
                      {...register("frequency")}
                      className={`w-full p-3 border ${errors.frequency ? "border-red-500" : "border-gray-300"
                        } rounded-lg appearance-none bg-white pr-10 focus:outline-none focus:ring-2 ${errors.frequency ? "focus:ring-red-500" : "focus:ring-indigo-500"
                        }`}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  {errors.frequency && <p className="text-red-500 text-sm mt-1">{errors.frequency.message}</p>}
                </div>

                <div className="flex gap-4 mb-4">
                  {watchFrequency === "weekly" && (
                    <div className="flex-1">
                      <label className="block text-gray-700 mb-1">Day</label>
                      <div className="relative">
                        <select
                          {...register("day")}
                          className={`w-full p-3 border ${errors.day ? "border-red-500" : "border-gray-300"
                            } rounded-lg appearance-none bg-white pr-10 focus:outline-none focus:ring-2 ${errors.day ? "focus:ring-red-500" : "focus:ring-indigo-500"
                            }`}
                        >
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                          <option value="Sunday">Sunday</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                      {errors.day && <p className="text-red-500 text-sm mt-1">{errors.day.message}</p>}
                    </div>
                  )}

                  <div className="mb-4 w-full">
                    <label className="block mb-2 font-medium">Time</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3b1c8c]"
                      id="time" name="time"   {...register("time")}>
                      {generateTimeOptions().map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">When do you want it to end?</label>

                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="never"
                    value="never"
                    {...register("endType")}
                    className={`w-5 h-5 ${errors.endType ? "text-red-600 border-red-500" : "text-indigo-600 border-gray-300"
                      } focus:ring-indigo-500`}
                  />
                  <label htmlFor="never" className="ml-2 text-gray-700">
                    Never
                  </label>
                </div>

                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="on"
                    value="on"
                    {...register("endType")}
                    className={`w-5 h-5 ${errors.endType ? "text-red-600 border-red-500" : "text-indigo-600 border-gray-300"
                      } focus:ring-indigo-500`}
                  />
                  <label htmlFor="on" className="ml-2 text-gray-700">
                    On
                  </label>

                  {watchEndType === "on" && (
                    <div className="ml-4 flex-1">
                      <input
                        type="date"
                        {...register("endDate", {
                          setValueAs: (value) => (value ? new Date(value) : null),
                        })}
                        className={`w-full p-2 border ${errors.endDate ? "border-red-500" : "border-gray-300"
                          } rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 ${errors.endDate ? "focus:ring-red-500" : "focus:ring-indigo-500"
                          }`}
                      />
                      {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
                    </div>
                  )}
                </div>
                {errors.endType && <p className="text-red-500 text-sm mt-1">{errors.endType.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Amount ($)</label>
                <input
                  type="text"
                  {...register("amount")}
                  className={`w-full p-3 border ${errors.amount ? "border-red-500" : "border-gray-300"
                    } rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 ${errors.amount ? "focus:ring-red-500" : "focus:ring-indigo-500"
                    }`}
                  placeholder="Enter amount"
                />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-800 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-70"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="">
            <h2 className="relative text-2xl font-bold text-primary font-manrope mb-4">Details</h2>
            <p className="text-gray-700 mb-6">
              Please be reminded that you will be charged for it by the end of each completed date.
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-indigo-900 mb-4">Reoccurring Details</h3>

              <div className="space-y-3">
                <div className="flex">
                  <span className="text-amber-500 font-medium w-28">Date:</span>
                  <span className="text-gray-800">{getRecurringText()}</span>
                </div>

                <div className="flex">
                  <span className="text-amber-500 font-medium w-28">Time:</span>
                  <span className="text-gray-800">{formatTime(formData.time || "00:00")}</span>
                </div>

                <div className="flex">
                  <span className="text-amber-500 font-medium w-28">Amount:</span>
                  <span className="text-gray-800">${formData.amount}</span>
                </div>

                <div className="flex">
                  <span className="text-amber-500 font-medium w-28">End date:</span>
                  <span className="text-gray-800">
                    {formData.endType === "never"
                      ? "Never"
                      : formData.endDate
                        ? format(new Date(formData.endDate), "EEE, MMM yyyy")
                        : "Not set"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                Back
              </button>

              <button
                onClick={handleSubmit(handleSubmitForm)}
                disabled={isSubmitting}
                className="flex-1 bg-indigo-800 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-70"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </Popup>
  )
}







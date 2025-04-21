"use client"
import Button from '@/components/global/Button';
import Popup from '@/components/global/Popup';
import { SuccessIcon } from '@/icons/icons';
import { useRebookJobMutation } from '@/services/bookings';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';


type RebookTaskProps = {
  showRebookModalPopup: boolean;
  setShowRebookModalPopup: React.Dispatch<React.SetStateAction<boolean>>
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  jobId: number
}

type FormData = {
  date: string;
  time: string;
  amount: number;
  description: string;
};
const RebookTask = ({ showRebookModalPopup, setShowRebookModalPopup, jobId, currentStep, setCurrentStep }: RebookTaskProps) => {
  const [rebookTask, { isLoading: rebookTaskLoading, error: rebookTaskError }] = useRebookJobMutation();


  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const [formData, setFormData] = useState<FormData>({
    date: "",
    time: "",
    amount: 0,
    description: "",
  })


  const timeOptions = [];
  console.log(currentStep, "step")
  const generateTimeOptions = () => {
    const hours = ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
    const amPm = ['AM', 'PM'];
    const intervals = ['00', '15', '30', '45'];

    // Loop to generate time slots
    hours.forEach((hour) => {
      amPm.forEach((period) => {
        intervals.forEach((minute) => {
          timeOptions.push(`${hour}:${minute} ${period}`);
        });
      });
    });
  };

  generateTimeOptions();
  console.log(formData, "formData")
  const handleContinue = (data: FormData) => {
    setFormData((prev) => ({ ...prev, ...data }))

    console.log(data, "form data")
    setCurrentStep(2)
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleRebook = async () => {
    try {
      await rebookTask({ jobId, ...formData }).unwrap();
      setCurrentStep(3)
    } catch (error) {
      console.error('Error re-booking task:', error);
    }
  };


  const formatDate = () => {
    if (!formData.date) return ""
    const date = new Date(formData.date)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `Mon, ${monthNames[date.getMonth()]} ${date.getDate()}`
  }


  const formatAmount = () => {
    if (!formData.amount) return ""
    return `$${formData.amount}`
  }
  return (
    <Popup
      isOpen={showRebookModalPopup}
      onClose={() => { setShowRebookModalPopup(false); setCurrentStep(1) }}
    >
      <div className="relative min-h-[200px] p-2 sm:p-6  max-h-[90vh] overflow-y-auto rounded-2xl bg-white font-satoshi lg:w-[520px]">
        {currentStep != 3 && <h2 className="text-2xl font-bold text-[#3b1c8c] mb-4">Re-book task</h2>}

        {currentStep === 1 &&
          <form>
            <p className="text-gray-700 mb-3">
              Please note that when you re-book a task or service, you&apos;ll only be charged once the task is completed.
            </p>

            <section className='flex flex-col sm:flex-row  items-center  gap-2 sm:gap-4'>
              <div className="mb-4 w-full">
                <label className="block mb-2 font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  {...register("date")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3b1c8c]"
                />
              </div>

              <div className="mb-4 w-full">
                <label className="block mb-2 font-medium">Time</label>

                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3b1c8c]"
                  id="time" name="time"   {...register("time")}>
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Amount</label>
              <input
                type="text"
                name="amount"
                {...register("amount", { valueAsNumber: true })}

                placeholder="0000 0000 0000 0000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3b1c8c]"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Details</label>
              <textarea
                name="description"
                {...register("description")}
                placeholder="Write reasons for re-booking here..."
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#3b1c8c]"
              ></textarea>
            </div>

            <button
              type="button"
              onClick={handleSubmit(handleContinue)}
              className="w-full py-3 px-4 bg-[#3b1c8c] text-white font-medium rounded-full hover:bg-[#2d1569] transition-colors"
            >
              Continue
            </button>
          </form>
        }

        {currentStep === 2 &&
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
            <span>{formData.time}</span>
            </div>

            <div className="mb-2 flex">
              <span className="text-amber-500 font-medium w-28">Amount:</span>
              <span>{formatAmount()}</span>
            </div>

            <div className="mb-6 flex">
              <span className="text-amber-500 font-medium w-28">Description:</span>
            <span>{formData.description}</span>
            </div>

            <div className="flex gap-4">
            <Button
                type="button"
                onClick={handleBack}
              className=" w-full  py-3 px-4 bg-[#f0edf9] text-[#3b1c8c] border-transparent font-medium rounded-full hover:bg-[#e6e0f5] transition-colors"
              >
                Back
            </Button>

            <Button
              className="w-full rounded-full"
              onClick={handleRebook}
              type="button"
              loading={rebookTaskLoading}
            >
              Submit
              </Button>
            </div>
          </>
        }

        {currentStep === 3 &&
          <div className=" w-full px-2 sm:px-6 relative flex flex-col items-center space-y-4">
            <SuccessIcon />
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">Review Sent</h2>
            <p className="text-center text-[#140B31] font-medium mb-6">
              Re-Booking Proposal sent to Service Provider successfully
            </p>
            <button onClick={() => { setCurrentStep(null); setShowRebookModalPopup(false); reset(); }} className="bg-indigo-800 hover:bg-indigo-700 text-white font-medium py-2 px-10 rounded-full">
              Done
            </button>
          </div>
        }
      </div>
    </Popup>
  )
}

export default RebookTask

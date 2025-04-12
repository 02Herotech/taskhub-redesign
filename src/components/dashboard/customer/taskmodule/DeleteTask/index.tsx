"use client"
import Button from '@/components/global/Button';
import { SuccessIcon } from '@/icons/icons';
import { useDeleteJobMutation, useDeleteTaskMutation } from '@/services/tasks';
import { JobDataDetails, TaskResponse } from '@/types/services/tasks';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react'


interface TaskCardProps {
  jobDetails?: JobDataDetails
  taskDetails?: TaskResponse
  setIsDeleteModalOpen: (value: boolean) => void;
}
const DeleteTask = ({ taskDetails, setIsDeleteModalOpen, jobDetails }: TaskCardProps) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [deleteJob] = useDeleteJobMutation()
  const [step, setStep] = useState(1)
  const router = useRouter()
  const handleDelete = async () => {
    console.log("task", taskDetails?.taskInfo.id, "job", jobDetails?.jobInfo.id)
    try {
      jobDetails?.jobInfo.id ? await deleteJob(jobDetails?.jobInfo.id) :
        await deleteTask(taskDetails.taskInfo.id)
      setStep(2)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" min-h-[200px] rounded-2xl  font-manrope sm:w-[400px]">
      {step === 1 &&
        <div>
          <div className=" absolute top-4 left-6 ">
            <h2 className="font-bold text-primary lg:text-2xl">
              Delete Task
            </h2>
          </div>

          <div className="max-lg:p-5 lg:px-8 lg:mt-16">
            <p className="mb-8 font-manrope text-xl text-center font-medium text-[#140B31]">
              Are you sure you want to delete this task? Once you delete, it
              will be erased from your list of task and will be gone
              immediately.
            </p>
            <div className="my-2 flex items-center justify-center space-x-5">
              <Button
                className="w-[151px] rounded-full bg-[#E1DDEE] py-6 max-lg:text-sm"
                onClick={() => setIsDeleteModalOpen(false)}
                theme="outline"
              >
                Cancel
              </Button>
              <Button
                className="w-[151px] rounded-full py-6 max-lg:text-sm"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      }
      {step === 2 &&
        <div className=" w-full px-2 sm:px-6 flex flex-col items-center space-y-4">
          <SuccessIcon />
          <h2 className="text-2xl font-bold text-indigo-900 mb-3"></h2>
          <p className="text-center text-[#140B31] font-medium mb-6">
            Successfully Deleted
          </p>

          <button onClick={() => { router.push("/customer/tasks/posted-by-me"); setIsDeleteModalOpen(false); }} className="bg-indigo-800 hover:bg-indigo-700 text-white font-medium py-2 px-10 rounded-full">
            Done
          </button>
        </div>

      }
    </div>
  )
}

export default DeleteTask
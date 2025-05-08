"use client"

import { BeatLoader } from "react-spinners"

interface ConfirmationModalProps {
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  title = "Are you sure you want to complete this task?",
  description = "Please confirm to proceed, remember to only do this if you are done with the task.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading,
  onCancel,
  onConfirm
}: ConfirmationModalProps) {
  return (
    <div className=" max-w-md mx-auto w-full">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-[#1a0b4b] mb-4">{title}</h2>
        <p className="text-gray-600 mb-8">{description}</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button onClick={onConfirm} className="px-6 py-3 bg-[#3a1a8f] text-white font-medium rounded-full hover:bg-[#2a1070] transition-colors">
            {isLoading ? <BeatLoader size={12} loading={isLoading} /> : `${confirmText}`}
          </button>
          <button onClick={onCancel} className="px-6 py-3 bg-[#e8e5f5] text-[#3a1a8f] font-medium rounded-full hover:bg-[#d8d2f0] transition-colors">
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  )
}

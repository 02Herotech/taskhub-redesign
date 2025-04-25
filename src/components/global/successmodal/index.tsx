"use client"
import { useRouter } from "next/navigation";
import React from "react";

interface SuccessModalProps {
  title?: string;
  message: string;
  onDone?: () => void;
  icon?: React.ReactNode;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  title = "Success",
  message,
  onDone,
  icon,
}) => {
  const router = useRouter();

  const handleDone = () => {
    if (onDone) {
      onDone();
    } else {
      router.back();
    }
  };

  return (
    <div className="w-full px-2 sm:px-6 flex flex-col items-center space-y-4">
      {icon}
      <h2 className="text-2xl font-bold text-indigo-900 mb-3">{title}</h2>
      <p className="text-center text-[#140B31] font-medium mb-6">{message}</p>
      <button
        onClick={handleDone}
        className="bg-indigo-800 hover:bg-indigo-700 text-white font-medium py-2 px-10 rounded-full"
      >
        Done
      </button>
    </div>
  );
};

export default SuccessModal;

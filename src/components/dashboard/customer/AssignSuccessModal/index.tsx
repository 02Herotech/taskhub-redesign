import React from 'react';
import Button from '@/components/global/Button';
import { FaCheck } from 'react-icons/fa';

interface SuccessModalProps {
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full sm:w-[600px] flex flex-col items-center justify-center rounded-lg p-5 shadow-lg space-y-4">
                <div className="size-11 bg-[#4CAF50] rounded-full flex items-center justify-center">    
                    <FaCheck className="text-white" />
                </div>
                <h2 className="font-semibold text-primary text-center font-clashSemiBold text-2xl lg:text-4xl">Task Assigned Successfully!</h2>
                <p className="text-[#140B31] text-center text-xl font-medium font-satoshiMedium">The task has been successfully assigned to the selected service provider.</p>
                <div className="flex justify-center">
                    <Button size="sm" onClick={onClose} className="rounded-full">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;

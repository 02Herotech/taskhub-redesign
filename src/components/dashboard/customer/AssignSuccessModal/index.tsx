import React from 'react';
import Button from '@/components/global/Button';

interface SuccessModalProps {
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full sm:w-[400px] rounded-lg p-5 shadow-lg">
                <h2 className="text-lg font-bold text-green-600">Task Assigned Successfully!</h2>
                <p className="mt-2 text-gray-700">The task has been successfully assigned to the selected service provider.</p>
                <div className="flex justify-end mt-4">
                    <Button size="sm" onClick={onClose} className="rounded-full">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;

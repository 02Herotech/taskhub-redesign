import React from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";

interface ProgressBarProps {
    currentPage: number;
    progress: number;
}

const Progress: React.FC<ProgressBarProps> = ({ currentPage, progress }) => {
    const getTitle = () => {
        switch (currentPage) {
            case 1:
                return 'Task Details';
            case 2:
                return 'Location and Budget';
            default:
                return '';
        }
    };

    return (
        <div className="fixed block lg:hidden left-0 top-20 z-10 w-full bg-white shadow-md py-3">
            <div className="flex items-center justify-evenly p-4">
                <FaArrowLeftLong className="text-status-purpleBase text-2xl" />
                <h2 className="text-[#381F8C] text-xl font-clashBold">{getTitle()}</h2>
            </div>
            <div className="flex items-center px-4">
                <div className="h-1 w-full bg-[#EAE9EB]">
                    <div className="h-full bg-status-purpleBase" style={{ width: `${progress}%` }}></div>
                </div>

            </div>
            <div className="flex items-center justify-end px-4">
                <span className="text-status-purpleBase ml-2">{`Step ${currentPage} of 2`}</span>
            </div>
        </div>
    );
};

export default Progress;

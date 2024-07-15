import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';

interface ProgressBarProps {
    currentPage: number;
    progress: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentPage, progress, setCurrentPage }) => {
    const router = useRouter();

    const handleBackClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            router.back();
        }
    };


    useEffect(() => {
        if (currentPage === 2) {
            window.scrollTo(0, 0);
        }
    }, [currentPage]);

    useEffect(() => {
        if (currentPage === 3) {
            window.scrollTo(0, 0);
        }
    }, [currentPage]);

    const getTitle = () => {
        switch (currentPage) {
            case 1:
                return 'Service Description';
            case 2:
                return 'Service Details';
            case 3:
                return 'Image Upload';
            default:
                return '';
        }
    };

    return (
        <div className="fixed block lg:hidden left-0 top-20 z-10 w-full bg-white shadow-md py-3">
            <div className="flex items-center justify-evenly p-4">
                <FaArrowLeftLong
                    className="text-status-purpleBase text-2xl cursor-pointer"
                    aria-label="Back"
                    onClick={handleBackClick}
                />
                <h2 className="text-[#381F8C] text-xl font-clashBold">{getTitle()}</h2>
            </div>
            <div className="flex items-center px-4">
                <div className="h-1 w-full bg-[#EAE9EB]" aria-label="Progress Bar">
                    <div className="h-full bg-status-purpleBase" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="flex items-center justify-end px-4">
                <span className="text-status-purpleBase ml-2">{`Step ${currentPage} of 3`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;

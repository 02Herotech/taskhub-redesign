import React from "react";
import { IoMdClose } from "react-icons/io";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
    return (
        <div
            className={`fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-60 ${isOpen ? "" : "hidden"
                }`}
        >
            <div className="relative flex justify-center rounded-lg bg-white p-2 md:p-6 shadow-lg">
                <div className="absolute right-2 top-2">
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <IoMdClose />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Popup;

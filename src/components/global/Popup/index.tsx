import React, { useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    popUpTitle?: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children, popUpTitle }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    const popupVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.3 } },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-60"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={backdropVariants}
                >
                    <motion.div
                        ref={popupRef}
                        className="relative flex justify-between items-center z-10 rounded-xl bg-white shadow-lg mx-10 lg:mx-0"
                        variants={popupVariants}
                    >
                        {popUpTitle && (
                            <div className="absolute top-0 left-0 p-2 z-10">
                                {popUpTitle}
                            </div>
                        )}
                        <div className="absolute top-0 right-0 p-2 cursor-pointer z-10">
                            <button
                                onClick={onClose}
                                className="text-primary hover:text-gray-800 bg-[#EBE9F4] rounded-3xl p-2"
                            >
                                <IoMdClose className="size-4 border-2 border-primary rounded-3xl" />
                            </button>
                        </div>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Popup;
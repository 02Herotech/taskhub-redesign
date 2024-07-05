import React, { useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    popupTitle?: any;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children, popupTitle }) => {
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
                        className="relative flex flex-col z-10 rounded-xl bg-white shadow-lg w-full max-w-lg"
                        variants={popupVariants}
                    >
                        {popupTitle && (
                            <div className="w-full p-2">
                                {popupTitle}
                                <div className="border-b-2 border-[#140B31] w-full mt-1" />
                            </div>
                        )}
                        <div className="absolute top-0 right-0 p-2 cursor-pointer z-10">
                            <button
                                onClick={onClose}
                                className="text-primary hover:text-gray-800 bg-[#EBE9F4] rounded-3xl p-2"
                            >
                                <IoMdClose className="w-[24px] h-[24px] border-2 border-primary rounded-3xl" />
                            </button>
                        </div>
                        <main className="">
                            {children}
                        </main>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Popup;

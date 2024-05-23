import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ToastProps {
    body: React.ReactNode;
    isVisible: boolean;
    onClose: () => void;
    theme?: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ body, isVisible, onClose, theme = 'success' }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className={`fixed top-5 right-5 rounded-[19px] shadow-lg z-50 ${theme === 'success' ? 'bg-[#EBE9F4]' : 'bg-status-error-10'}`}
                    style={{ width: '360px' }}
                >
                    <div className="relative">
                        {/* Background Pattern */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[19px]">
                            <svg width="55" height="56" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M-0.178468 54.9999C17.5006 29.5 33.3427 20.8693 54.8215 -1.0001" stroke="#C1BADB" stroke-width="0.5" />
                                <path d="M-0.178468 54.9999C17.5006 29.5 33.3427 20.8693 54.8215 -1.0001" stroke="#C1BADB" stroke-width="0.5" />
                                <path d="M-0.178468 54.9999C17.5006 29.5 33.3427 20.8693 54.8215 -1.0001" stroke="#C1BADB" stroke-width="0.5" />
                                <path d="M-0.178468 54.9999C17.5006 29.5 33.3427 20.8693 54.8215 -1.0001" stroke="#C1BADB" stroke-width="0.5" />
                            </svg>
                        </div>

                        {/* Close Button */}
                        <div className="absolute top-2 right-2">
                            <IoIosCloseCircleOutline
                                onClick={onClose}
                                className={`${theme === 'success' ? 'text-primary' : 'text-status-error-100'} w-6 h-6 cursor-pointer`}
                            />
                        </div>

                        {/* Toast Content */}
                        <div className="relative p-6 pt-8">
                            {body}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;

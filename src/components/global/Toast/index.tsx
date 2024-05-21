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
                    exit={{ opacity: 0, x: 50, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className={`fixed top-10 right-8 p-6 rounded-[19px] shadow-lg z-50 m-10 ${theme === 'success' ? ' bg-[#EBE9F4]' : 'bg-status-error-10'}`}
                >
                    <div className="flex items-center justify-between space-x-3">
                        <div>{body}</div>
                        <IoIosCloseCircleOutline onClick={onClose} className={`${theme === 'success' ? ' text-primary' : 'text-status-error-100'} w-7 h-7 cursor-pointer`}/>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
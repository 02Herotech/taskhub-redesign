import React, { ReactNode } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    pathname: string;
    children: ReactNode;
}

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        x: '-50%',
        y: '-45%' // Slightly offset to create a nice sliding effect
    },
    visible: {
        opacity: 1,
        scale: 1,
        x: '-50%',
        y: '-50%',
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 400
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        x: '-50%',
        y: '-45%',
        transition: {
            duration: 0.2
        }
    }
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        key="overlay"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={overlayVariants}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={onClose}
                        transition={{ duration: 0.2 }}
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={modalVariants}
                        className="fixed left-1/2 top-1/2 w-full sm:w-96 max-w-[95vw] bg-white rounded-xl z-50 p-5 shadow-xl"
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, pathname, children }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between mb-3"
            >
                <h2 className="font-bold text-primary font-clashSemiBold text-3xl">Send Invite</h2>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <IoIosCloseCircleOutline
                        className="size-6 text-primary cursor-pointer"
                        onClick={onClose}
                    />
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {children}
            </motion.div>
        </Modal>
    );
};

export { Modal, ShareModal };
export type { ModalProps, ShareModalProps };
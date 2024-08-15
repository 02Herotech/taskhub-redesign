import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/global/Button';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';

interface OfferFormProps {
    onClose: () => void;
    onSubmit: (offer: string) => void;
}

const OfferForm: React.FC<OfferFormProps> = ({ onClose, onSubmit }) => {
    const [offerAmount, setOfferAmount] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(offerAmount);
        setOfferAmount('');
        setShowSuccessMessage(true);

        setTimeout(() => {
            setShowSuccessMessage(false);
            onClose();
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center justify-center">
            <div className="bg-white w-full sm:w-[500px] rounded-t-3xl lg:rounded-2xl px-5 pb-8 pt-2 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-clashBold text-primary text-start font-bold">Your Offer</h2>
                    <div className="bg-[#EBE9F4] p-2 rounded-full">
                        <IoIosCloseCircleOutline className="size-6 text-[#5A5960] cursor-pointer" onClick={onClose} />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        rows={5}
                        ref={textareaRef}
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                        className="w-full p-2 border border-primary rounded-xl mb-4"
                        required
                    />
                    <Button
                        type="submit"
                        disabled={!offerAmount.trim()}
                        className="rounded-full"
                    >
                        Post your offer
                    </Button>
                </form>

                <AnimatePresence>
                    {showSuccessMessage && (
                        <motion.div
                            className="bg-green-100 border-green-400 text-green-600 py-2 px-5 rounded-xl mt-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <svg
                                className="w-6 h-6 mr-2 text-green-600 inline-block"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span className="font-semibold">Offer posted successfully!</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OfferForm;
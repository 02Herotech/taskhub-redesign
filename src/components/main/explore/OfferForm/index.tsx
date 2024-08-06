import React, { useState } from 'react';
import Button from '@/components/global/Button';
import { IoIosCloseCircleOutline } from "react-icons/io";

interface OfferFormProps {
    onClose: () => void;
    onSubmit: (offer: string) => void;
}

const OfferForm: React.FC<OfferFormProps> = ({ onClose, onSubmit }) => {
    const [offerAmount, setOfferAmount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(offerAmount);
        onClose();
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
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                        className="w-full p-2 border border-primary rounded-xl mb-4"
                        required
                    />
                    <Button type="submit" className="rounded-full">Post your offer</Button>
                </form>
            </div>
        </div>
    );
};

export default OfferForm;
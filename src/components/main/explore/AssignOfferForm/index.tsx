import React, { useState } from 'react';
import Button from '@/components/global/Button';
import { IoIosCloseCircleOutline } from "react-icons/io";

interface User {
    name: string;
    avatar: string;
}

interface Offer {
    id: string;
    user: User;
    message: string;
    timestamp: string;
}

interface AssignOfferFormProps {
    onClose: () => void;
    onAssign: (offerId: string) => void;
    offers: Offer[];
}

const AssignOfferForm: React.FC<AssignOfferFormProps> = ({ onClose, onAssign, offers }) => {
    const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSelectOffer = (offerId: string) => {
        setSelectedOffer(offerId);
        setShowConfirmation(true);
    };

    const handleConfirmAssign = () => {
        if (selectedOffer) {
            onAssign(selectedOffer);
            onClose();
        }
    };

    const extractOfferAmount = (message: string) => {
        const match = message.match(/\$(\d+)/);
        return match ? match[1] : 'N/A';
    };

    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-white w-full max-w-[600px] rounded-2xl px-5 pb-8 pt-2 pr-8 transition-all duration-300 h-[70vh]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-clashBold text-primary text-start font-bold">Assign Task</h2>
                    <div className="bg-[#EBE9F4] p-2 rounded-full" onClick={onClose}>
                        <IoIosCloseCircleOutline className="size-6 text-[#5A5960] cursor-pointer" />
                    </div>
                </div>
                {!showConfirmation ? (
                    <div className="space-y-4 h-80 overflow-y-auto small-scrollbar">
                        <h3 className="font-semibold">Select a service provider to assign the task:</h3>
                        {offers.map((offer) => (
                            <div key={offer.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <img src={offer.user.avatar} alt={offer.user.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold">{offer.user.name}</p>
                                        <p className="text-sm text-gray-600">Offer: ${extractOfferAmount(offer.message)}</p>
                                        <p className="text-xs text-gray-500">{offer.timestamp}</p>
                                    </div>
                                </div>
                                <Button size='sm' onClick={() => handleSelectOffer(offer.id)} className="rounded-full">
                                    Assign
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h3 className="font-semibold">Are you sure you want to assign this task?</h3>
                        {selectedOffer && (
                            <div>
                                <p>You are about to assign this task to {offers.find(o => o.id === selectedOffer)?.user.name}.</p>
                                <p>Offer: ${extractOfferAmount(offers.find(o => o.id === selectedOffer)?.message || '')}</p>
                            </div>
                        )}
                        <div className="flex justify-end space-x-3">
                            <Button size='sm' onClick={() => setShowConfirmation(false)} theme='outline' className="rounded-full">
                                Cancel
                            </Button>
                            <Button size='sm' onClick={handleConfirmAssign} className="rounded-full">
                                Confirm Assignment
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssignOfferForm;
import React, { useState } from 'react';
import Button from '@/components/global/Button';
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from 'next/image';
import { useAssignTaskMutation } from '@/services/tasks';
import SuccessModal from '../AssignSuccessModal';

interface AssignOfferFormProps {
    onClose: () => void;
    onAssign: (offerId: string) => void;
    offers: Offer[];
    taskId: number;
}

const AssignOfferForm: React.FC<AssignOfferFormProps> = ({ onClose, onAssign, offers, taskId }) => {
    const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [assignTask] = useAssignTaskMutation();

    const handleSelectOffer = (offerId: string) => {
        setSelectedOffer(offerId);
        setShowConfirmation(true);
    };

    const handleConfirmAssign = async () => {
        if (!selectedOffer) return;
        const selectedOfferData = offers.find(offer => offer.id === selectedOffer);

        if (!selectedOfferData) return;

        try {
            const body = {
                taskId,
                serviceProviderId: selectedOfferData.serviceProviderId,
            };
            await assignTask(body).unwrap();
            onAssign(selectedOffer);
            setShowConfirmation(false);
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error assigning task:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-white w-full max-w-[600px] rounded-2xl px-5 pb-8 pt-2 pr-8 transition-all duration-300 max-h-[70vh]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-clashBold text-primary text-start font-bold">Assign Task</h2>
                    <div className="bg-[#EBE9F4] p-2 rounded-full" onClick={onClose}>
                        <IoIosCloseCircleOutline className="size-6 text-[#5A5960] cursor-pointer" />
                    </div>
                </div>
                {!showConfirmation ? (
                    <>
                        {offers.length > 0 ? (
                            offers.map((offer) => (
                                <div className="space-y-4 h-80 overflow-y-auto small-scrollbar">
                                    <h3 className="font-semibold">Select a service provider to assign the task:</h3>
                                    <div key={offer.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Image
                                                src="/assets/images/placeholder.jpeg"
                                                alt={offer.fullName}
                                                width={32}
                                                height={32}
                                                className="rounded-full mr-2"
                                            />
                                            <div>
                                                <p className="font-semibold">{offer.fullName}</p>
                                            </div>
                                        </div>
                                        <Button size='sm' onClick={() => handleSelectOffer(offer.id)} className="rounded-full">
                                            Assign
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="font-semibold">No available offers to assign.</p>
                        )}
                    </>
                ) : (
                    <div className="space-y-4">
                        <h3 className="font-semibold">Are you sure you want to assign this task?</h3>
                        {selectedOffer && (
                            <div>
                                <p>You are about to assign this task to {offers.find(o => o.id === selectedOffer)?.fullName}.</p>
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

            {showSuccessModal && (
                <SuccessModal onClose={() => setShowSuccessModal(false)} />
            )}
        </div>
    );
};

export default AssignOfferForm;
import React, { useState } from "react";
import Button from "@/components/global/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from "next/image";
import { useAssignTaskMutation } from "@/services/tasks";
import SuccessModal from "../AssignSuccessModal";

interface AssignOfferFormProps {
  onClose: () => void;
  onAssign: (offerId: string) => void;
  offers: Offer[];
  taskId: number;
}

const AssignOfferForm: React.FC<AssignOfferFormProps> = ({
  onClose,
  onAssign,
  offers,
  taskId,
}) => {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [assignTask, { isLoading, error }] = useAssignTaskMutation();

  const handleSelectOffer = (offerId: string) => {
    setSelectedOffer(offerId);
    setShowConfirmation(true);
  };

  const handleConfirmAssign = async () => {
    if (!selectedOffer) return;
    const selectedOfferData = offers.find(
      (offer) => offer.id === selectedOffer,
    );

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
    } catch (error: any) {
      console.error("Error assigning task:", error);
      setErrorMessage(error.data.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="max-h-[70vh] w-full max-w-[600px] rounded-2xl bg-[#EBE9F4] px-5 pb-8 pr-8 pt-2 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-start font-clashBold font-bold text-primary">
            Assign Task
          </h2>
          <div className="rounded-full bg-[#EBE9F4] p-2" onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 cursor-pointer text-[#5A5960]" />
          </div>
        </div>
        {!showConfirmation ? (
          <div className="small-scrollbar h-80 space-y-4 overflow-y-auto">
            <h3 className="font-semibold">
              Select a service provider to assign the task:
            </h3>
            {offers.length > 0 ? (
              offers
                .reduce<Offer[]>((uniqueOffers, offer) => {
                  // Check if the service provider is already in the uniqueOffers array
                  if (
                    !uniqueOffers.some(
                      (uOffer) =>
                        uOffer.serviceProviderId === offer.serviceProviderId,
                    )
                  ) {
                    uniqueOffers.push(offer);
                  }
                  return uniqueOffers;
                }, [])
                .map((offer) => (
                  <div
                    key={offer.id}
                    className="flex items-center justify-between rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={
                          offer.service_provider_profile_Image ||
                          "/assets/images/placeholder.jpeg"
                        }
                        alt={offer.fullName}
                        width={100}
                        height={100}
                        className="mr-2 size-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{offer.fullName}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleSelectOffer(offer.id)}
                      className="rounded-full"
                    >
                      Assign
                    </Button>
                  </div>
                ))
            ) : (
              <p className="font-semibold">No available offers to assign.</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-semibold">
              You are about to assign this task to{" "}
              {offers.find((o) => o.id === selectedOffer)?.fullName}
            </h3>
            {selectedOffer && (
              <div>
                <p>Are you sure you want to assign this task?</p>
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <Button
                size="sm"
                onClick={() => setShowConfirmation(false)}
                theme="outline"
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                loading={isLoading}
                onClick={handleConfirmAssign}
                className="rounded-full"
              >
                Assign
              </Button>
            </div>
            {errorMessage ||
              (error && (
                <h4 className="text-center text-sm text-red-500">{`${errorMessage}. Please try again`}</h4>
              ))}
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

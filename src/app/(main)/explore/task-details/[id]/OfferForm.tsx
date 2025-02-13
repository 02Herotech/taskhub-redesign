"use client";
import Popup from "@/components/global/Popup/PopupTwo";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/global/Button";
import { FaCheck } from "react-icons/fa6";
import { connectSocket } from "@/lib/socket";
import { useParams } from "next/navigation";

//Add loading prop for button
type Props = {
  showOfferForm: boolean;
  closeOfferForm: () => void;
  showErrorPopup: () => void;
  isVerified: boolean;
  user: UserProfileTypes;
  refetchOffers: (...args: any[]) => any;
  taskPosterId: number;
};

function OfferForm({
  showOfferForm,
  closeOfferForm,
  showErrorPopup,
  isVerified,
  user,
  refetchOffers,
  taskPosterId,
}: Props) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");

  const params = useParams();
  const id = (params.id as string).split("-")[0];

  const handleSubmitOffer = async (message: string) => {
    if (!isVerified) {
      return showErrorPopup();
    }
    const socket = connectSocket(id as unknown as number);

    const data = {
      taskId: id,
      customerId: taskPosterId,
      serviceProviderId: user?.serviceProviderId,
      fullName: user?.firstName + " " + user?.lastName,
      message,
    };

    if (user && socket) {
      try {
        socket.emit("offer", data, () => {
          refetchOffers();
          setOfferAmount("");
          setShowSuccessMessage(true);

          setTimeout(() => {
            setShowSuccessMessage(false);
            closeOfferForm();
          }, 3000);
        });
      } catch (error) {
        console.error("Error submitting offer:", error);
      }
    } else {
      console.error("Socket not connected or user not logged in");
    }
  };
  return (
    <Popup
      isOpen={showOfferForm}
      onClose={closeOfferForm}
      popUpTitle={
        !showSuccessMessage ? (
          <h3 className="font-clashSemiBold text-xl text-primary lg:text-3xl">
            Send an offer
          </h3>
        ) : (
          <></>
        )
      }
    >
      <div className="relative mt-10 max-h-[700px] min-w-[320px] max-w-[700px] bg-white p-5 sm:min-w-[560px]">
        <AnimatePresence>
          {showSuccessMessage ? (
            <motion.div
              className="flex w-full flex-col items-center justify-center space-y-4 rounded-xl px-5 py-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-[#4CAF50]">
                <FaCheck className="text-white" />
              </div>
              <h1 className="text-center font-clashSemiBold text-2xl font-semibold text-primary lg:text-3xl">
                Offer posted successfully!
              </h1>
              <h4 className="text-center font-satoshiMedium text-xl font-medium text-[#140B31]">
                Your offer has been sent to the customer, you will be notified
                when there’s a response.
              </h4>
              <Button className="rounded-full" onClick={closeOfferForm}>
                Go Back
              </Button>
            </motion.div>
          ) : (
            <div>
              <textarea
                rows={5}
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                className="mb-4 w-full rounded-xl border border-primary p-2"
                required
              />
              <Button
                type="submit"
                disabled={!offerAmount.trim()}
                className="rounded-full"
                onClick={() => handleSubmitOffer(offerAmount)}
              >
                Post your offer
              </Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Popup>
  );
}

export default OfferForm;

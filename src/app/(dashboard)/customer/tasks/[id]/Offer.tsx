import React from "react";
import Image from "next/image";
import { useState } from "react";
import { formatTimeAgo } from "@/lib/utils";
import { LiaReplySolid } from "react-icons/lia";
import SendPayment from "./SendPayment";
import { FaStar } from "react-icons/fa6";
import ReplyForm from "./ReplyForm";
import useAxios from "@/hooks/useAxios";
import { BeatLoader } from "react-spinners";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAcceptOfferMutation, useAssignTaskMutation } from "@/services/tasks";
import SuccessModal from "@/components/global/successmodal";
import Popup from "@/components/global/Popup";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type Props = {
  offer: Offer;
  taskId: number;
  refetch: any;
  isAssigned: boolean;
};

type AcceptOfferData = {
  data: {
    clientSecret: string;
    hasCard: boolean;
  };
  message: string; 
  successful: boolean;
};

function Offer({ offer, taskId, refetch, isAssigned }: Props) {
  const [confirmPaymentModal, setConfirmPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const authInstance = useAxios();

  // const [assignTask, { isLoading: isAssignLoading, error }] = useAssignTaskMutation();
  const [acceptOffer, { isLoading: isAcceptLoading, error: acceptError }] = useAcceptOfferMutation()


  const handleAcceptOffer = async () => {
    try {

      const response = await acceptOffer({ taskId, serviceProviderId: offer.serviceProviderId }).unwrap();
      console.log(response)

      if (response.data.hasCard) {
        setConfirmPaymentModal(true);
      } else {
        setClientSecret(response.data.clientSecret);
      }

    } catch (error) {
      console.error("Error occured while accepting task: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  // const handleConfirmAssign = async () => {
  //   try {
  //     await assignTask({ taskId, serviceProviderId: offer.serviceProviderId }).unwrap();
  //     setClientSecret(true)
  //     setShowSuccessModal(true);
  //   } catch (error: any) {
  //     console.error("Error assigning task:", error);
  //   }
  // };


  return (
    <li className="border-b border-[#C1BADB] pb-4" key={offer.id}>
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Image
              src={
                offer.service_provider_profile_Image ||
                "/assets/images/placeholder.jpeg"
              }
              width={30}
              height={30}
              alt="Service provder profile picture"
              className="size-[30px] rounded-full object-cover object-top md:size-14"
            />
            <p className="font-satoshiMedium text-lg text-primary ">
              {offer.fullName}
            </p>

          </div>
          {offer.offerAmount && (
            <p className="font-satoshiMedium text-sm text-[#E58C06] md:text-xl">
              Price: ${offer.offerAmount}
            </p>
          )}
        </div>

        <div className="w-full my-3 ">
          <button
            type="submit"
            className="block w-full cursor-pointer  text-center rounded-full bg-primary px-5 py-2 font-satoshiBold text-sm font-bold text-white disabled:opacity-50 md:text-base"
            disabled={isAssigned || isLoading}
            onClick={() => handleAcceptOffer()}
          >
            {isAssigned ? "Assigned" : isAcceptLoading ? <BeatLoader color="white" size={13} /> : "Accept"}
          </button>
        </div>

        <div className="flex-grow">
          <div className="relative rounded-xl bg-[#EBE9F4] p-2 sm:p-3">

            <div className=" flex justify-between items-center">
              <p className=" font-manrope text-sm text-[#140B31] sm:max-w-full sm:text-xl">
                {offer.message}
              </p>

              <div className="text-right">
                <p className="block font-satoshiMedium text-xs text-primary sm:text-base">
                  {formatTimeAgo(offer.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Rest of the thread  */}
          <ul className="mt-5 pl-10 w-full space-y-2">
            {offer.offerThreadList.map((offerThread) => (
              <li key={Math.random() * 1234}>
                <div className="">
                  <div className="flex item-center justify-between">
                    <div className="flex gap-1 items-center">
                      <Image
                        src={
                          offerThread.userProfileImage ||
                          "/assets/images/placeholder.jpeg"
                        }
                        alt="User profile picture"
                        width={30}
                        height={30}
                        className="size-[30px] rounded-full object-cover object-top md:size-12"
                      />
                      <p className="font-satoshiMedium text-base text-primary">
                        {offerThread.fullName}
                      </p>
                    </div>
                  </div>

                  <div className=" w-full  p-2  sm:p-3">
                    <p className=" bg-[#B6A58B] p-3 rounded-xl font-manrope text-sm text-[#140B31] w-full sm:text-xl">
                      {offerThread.message}
                    </p>
                    <p className="block text-right font-manrope text-xs text-primary sm:text-base">
                      {formatTimeAgo(offerThread.timeStamp)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!isAssigned && (
        <ReplyForm taskId={taskId} offerId={offer.id} refetch={refetch} />
      )}

      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              variables: { colorPrimary: "#381f8c" },
              theme: "flat",
            },
            loader: "always",
          }}
        >
          <SendPayment
            closeModal={() => setClientSecret(null)}
            clientSecret={clientSecret}
          />
        </Elements>
      )}

      <Popup isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <SuccessModal onDone={() => setShowSuccessModal(false)} message={`Task assigned successfully to ${offer.fullName}`} />
      </Popup>

    </li>
  );
}

export default Offer;

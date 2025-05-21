import React from "react";
import Popup from "@/components/global/Popup/PopupTwo";
import { FormEvent, useState } from "react";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { wallet } from "@/services/wallet";
import { useDispatch } from "react-redux";

type Props = {
  closeModal: () => void;
  clientSecret: string;
  setAmount: (amount: string) => void;
};

function SendPayment({ clientSecret, closeModal, setAmount }: Props) {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      setIsProcessing(true);
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message || "Something went wrong");
        return;
      }
      const { error, paymentIntent } = await stripe?.confirmPayment({
        elements,
        clientSecret,
        redirect: "if_required",
      });
      if (error) {
        console.error("Error while confirming payment", error);
        setErrorMessage(error.message || "Something went wrong");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        const amount = paymentIntent.amount / 100;
        setAmount((amount - amount * 0.017 - 0.3).toFixed(2));
        dispatch(wallet.util.invalidateTags(["Wallet"]));
        closeModal();
      }
    } catch (error) {
      console.error("Error while making/initiating payment", error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <Popup
      isOpen={Boolean(clientSecret)}
      onClose={closeModal}
      popUpTitle={
        <h3 className="my-2 font-clashSemiBold text-xl text-primary lg:text-2xl">
          Fund &nbsp;Wallet
        </h3>
      }
    >
      <div className="relative mt-14 h-full min-w-[340px] max-w-[500px] bg-white p-5 sm:min-w-[560px]">
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button
            disabled={!stripe || !elements || isProcessing}
            className="mx-auto mt-5 flex w-max items-center justify-center rounded-full bg-primary px-10 py-2 font-satoshiBold font-bold text-[#EBE9F4] disabled:opacity-55"
            type="submit"
          >
            {isProcessing ? "Processing..." : "Submit"}
          </button>
          {errorMessage && (
            <p className="w-full text-sm font-medium text-red-500">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </Popup>
  );
}

export default SendPayment;

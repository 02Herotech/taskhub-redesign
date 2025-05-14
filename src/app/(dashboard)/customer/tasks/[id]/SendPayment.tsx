import Popup from "@/components/global/Popup/PopupTwo";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {
  closeModal: () => void;
  clientSecret: string | null;
};

function SendPayment({ closeModal, clientSecret }: Props) {
  const [saveCard, setSaveCard] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const pathname = usePathname()


  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    try {
      setIsProcessing(true);
      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        // Show error to your customer
        setErrorMessage(submitError.message || "Something went wrong");
        return;
      }

      const { error } = await stripe?.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/${pathname}`,
        },
      });

      if (error) {

        setErrorMessage(error.message || "Something went wrong");
      } else {
        setPaymentSuccess(true)

        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
      setIsProcessing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Popup
      isOpen={Boolean(clientSecret)}
      onClose={closeModal}
    >
      <div className="relative mt-10 h-full  min-w-[320px] max-w-[500px]  bg-white p-5 sm:min-w-[560px]">
        <h3 className="font-clashSemiBold text-xl text-primary my-4 lg:text-3xl">
          Offer &nbsp;Accepted
        </h3>
        <p className="mb-2 font-satoshiBold text-sm font-bold text-primary md:text-lg">
          Please choose a payment method so we can proceed with your
          task/request.
        </p>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <div className="my-3 flex flex-row-reverse justify-end gap-3">
            <label
              htmlFor="save-card"
              className="font-satoshiMedium text-[#140B31]"
            >
              Save payment information
            </label>
            <input
              type="checkbox"
              name="save-card"
              id="save-card"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
            />
          </div>
          <button
            disabled={!stripe || !elements || isProcessing}
            className="mx-auto mt-5 flex w-max items-center justify-center rounded-full bg-primary px-4 py-2 font-satoshiBold font-bold text-[#EBE9F4] disabled:opacity-55"
            type="submit"
          >
            {isProcessing ? "Processing..." : "Send Payment"}
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default SendPayment;

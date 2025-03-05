import Popup from "@/components/global/Popup/PopupTwo";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type Props = {
  open: boolean;
  closeModal: () => void;
  clientSecret: string | null;
};

function SendPayment({ open, closeModal, clientSecret }: Props) {
  const [saveCard, setSaveCard] = useState(false);
  return (
    <Popup
      isOpen={open && Boolean(clientSecret)}
      onClose={closeModal}
      popUpTitle={
        <h3 className="font-clashSemiBold text-xl text-primary lg:text-3xl">
          Offer &nbsp;Accepted
        </h3>
      }
    >
      <div className="relative mt-10 max-h-[550px] min-w-[320px] max-w-[500px] overflow-y-auto bg-white p-5 sm:min-w-[560px]">
        <p className="mb-2 font-satoshiBold text-sm font-bold text-primary md:text-lg">
          Please choose a payment method so we can proceed with your
          task/request.
        </p>
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
          <form>
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
              className="mx-auto mt-5 block w-max rounded-full bg-primary px-4 py-2 font-satoshiBold font-bold text-[#EBE9F4]"
              type="submit"
            >
              Send Payment
            </button>
          </form>
        </Elements>
      </div>
    </Popup>
  );
}

export default SendPayment;

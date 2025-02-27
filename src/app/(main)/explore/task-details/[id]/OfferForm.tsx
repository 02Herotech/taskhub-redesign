"use client";
import Popup from "@/components/global/Popup/PopupTwo";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/global/Button";
import { FaCheck } from "react-icons/fa6";
import { connectSocket } from "@/lib/socket";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//Todo Ask for max value for offerMessage string
const offerSchema = z.object({
  offerPrice: z
    .number({ invalid_type_error: "Offer amount is required" })
    .min(1, "Offer must be above $1"),
  message: z.string().min(1, "Please enter your message"),
});

type OfferSchema = z.infer<typeof offerSchema>;

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

  const params = useParams();
  const id = (params.id as string).split("-")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OfferSchema>({ resolver: zodResolver(offerSchema) });
  const submitForm: SubmitHandler<OfferSchema> = (formData) => {
    console.log(formData);

    if (!isVerified) return showErrorPopup();
    const socket = connectSocket(id as unknown as number);

    const data = {
      taskId: id,
      customerId: taskPosterId,
      serviceProviderId: user?.serviceProviderId,
      fullName: user?.firstName + " " + user?.lastName,
      message: formData.message,
      offerPrice: formData.offerPrice,
    };

    if (user && socket) {
      try {
        socket.emit("offer", data, () => {
          refetchOffers();
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
            <form
              className="space-y-6 px-1"
              onSubmit={handleSubmit(submitForm)}
            >
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block font-satoshiBold text-base font-bold text-primary sm:text-lg"
                >
                  Your offer price
                </label>
                <div className="flex w-full items-center rounded-lg border bg-[#EEEEEF]">
                  <div className="border-r border-black px-3">$</div>
                  <input
                    id="price"
                    type="number"
                    min={1}
                    className="block w-full appearance-none rounded-lg bg-transparent p-3 text-black placeholder-[#55535A] outline-none placeholder:font-satoshiMedium"
                    placeholder="100"
                    {...register("offerPrice", { valueAsNumber: true })}
                  />
                </div>

                <p className="ml-1 mt-1 text-sm text-[#FF0000]">
                  {errors?.offerPrice?.message}
                </p>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-satoshiBold text-base font-bold text-primary sm:text-lg"
                >
                  Drop a message
                </label>
                <textarea
                  id="message"
                  className="block w-full rounded-lg bg-[#EEEEEF] p-3 placeholder-[#55535A] outline-none placeholder:font-satoshiMedium"
                  placeholder="Write message here..."
                  rows={5}
                  {...register("message")}
                ></textarea>
                <p className="ml-1 mt-1 text-sm text-[#FF0000]">
                  {errors?.message?.message}
                </p>
              </div>

              <button
                type="submit"
                className="rounded-full bg-primary px-4 py-2 text-white"
              >
                Post your offer
              </button>
            </form>
          )}
        </AnimatePresence>
      </div>
    </Popup>
  );
}

export default OfferForm;

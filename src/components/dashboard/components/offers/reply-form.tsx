import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LiaReplySolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { IoClose } from "react-icons/io5";
import { connectSocket } from "@/lib/socket";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const offerSchema = z.object({
  offerAmount: z
    .number({ invalid_type_error: "Offer amount is required" })
    .min(1, "Offer must be above $1"),
  message: z.string().min(1, "Please enter your message"),
});

type OfferSchema = z.infer<typeof offerSchema>;

type Props = { taskId: number; offerId: string; refetch: any };

function ReplyForm({ taskId, offerId, refetch }: Props) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OfferSchema>({ resolver: zodResolver(offerSchema) });

  const submitOfferReply: SubmitHandler<OfferSchema> = (data) => {
    const socket = connectSocket(taskId);
    if (!socket) {
      console.error("Socket connection failed");
      return;
    }
    if (!user || !user.id || !user.firstName || !user.lastName) {
      console.error("User is not logged in or missing required information");
      return;
    }
    const payload = {
      offerThreadList: [
        {
          taskId,
          offerId,
          userId: user.serviceProviderId || user.customerId,
          fullName: `${user.firstName} ${user.lastName}`,
          message: data.message,
          offerAmount: data.offerAmount,
        },
      ],
    };

    console.log(payload, "payload")
    try {
      socket.emit("offer/replies", payload, () => {
        reset();
        refetch();
        setShowReplyForm(false);
      });
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  return (
    <div>
      <AnimatePresence initial={false} mode="wait">
        {!showReplyForm ? (
          <motion.button
            className=" flex items-center gap-1 text-primary sm:gap-2 pl-10"
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReplyForm(true)}
          >
            <LiaReplySolid
              strokeWidth={1.2}
              className="rotate-180 text-base md:text-xl"
            />
            <span className="font-satoshiBold text-base font-semibold sm:text-xl ">
              Reply
            </span>
          </motion.button>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative mt-4 flex flex-wrap gap-[6px] rounded-lg border border-primary bg-[#EEEEEF99] p-4"
            onSubmit={handleSubmit(submitOfferReply)}
          >
            <textarea
              className="flex-grow resize-none appearance-none bg-transparent outline-none placeholder:font-satoshiMedium placeholder:text-[#716F78] sm:p-2"
              placeholder="Send a message..."
              rows={5}
              required
              {...register("message")}
            ></textarea>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 rounded-xl border border-[#C1BADB] bg-[#FCF4E6] p-1 px-2 sm:gap-2 sm:p-2">
                <label
                  htmlFor="price"
                  className="font-satoshiBold font-bold text-[#E58C06] sm:text-lg"
                >
                  $
                </label>
                <input
                  id="price"
                  type="number"
                  required
                  min={1}
                  placeholder="0"
                  autoComplete="off"
                  className="max-w-14 appearance-none bg-transparent font-bold outline-none placeholder:text-[#E58C06] sm:max-w-24 sm:text-lg"
                  {...register("offerAmount", { valueAsNumber: true })}
                />
              </div>
              <button
                className="mt-auto self-end rounded-xl bg-primary px-4 py-2 font-satoshiBold font-bold text-white"
                type="submit"
              >
                Send
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="absolute -right-3 -top-3 flex size-8 items-center justify-center rounded-full bg-[#EBE9F4] p-1 font-bold"
            >
              <IoClose />
            </button>
            <div className="w-full text-red-500">
              {errors.offerAmount?.message}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ReplyForm;
